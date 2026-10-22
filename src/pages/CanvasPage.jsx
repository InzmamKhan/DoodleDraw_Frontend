import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import TopHeaderBar from '../assets/components/canvas/TopHeaderBar';
import CanvasBoard from '../assets/components/canvas/CanvasBoard';
import CanvasToolbar from '../assets/components/canvas/CanvasToolbar';
import ChatDrawer from '../assets/components/chat/ChatDrawer';
import { useSocketContext } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { useCanvas } from '../hooks/useCanvas';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CanvasPage = () => {
  const { roomCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const { user } = useAuth();

  const [roomDetails, setRoomDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const roomPassword = location.state?.password;

  const {
    canvasRef,
    tool,
    setTool,
    color,
    setColor,
    lineWidth,
    setLineWidth,
    startDrawing,
    draw,
    stopDrawing,
    renderRemoteStroke,
    clearBoard,
  } = useCanvas(socket, roomCode);

  useEffect(() => {
    if (!roomCode) return;

    fetch(`${API_URL}/api/rooms/${roomCode}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.room) {
          setRoomDetails(data.room);
        } else {
          console.error('Room details missing:', data.message);
          navigate('/');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch room:', err);
        navigate('/');
      });
  }, [roomCode, navigate]);

  useEffect(() => {
    if (!socket || !user || !roomCode) return;

    const currentUserId = user.id || user._id;

    socket.emit('join_room', {
      roomCode,
      userId: currentUserId,
      username: user.username,
    });

    socket.on('user_joined', ({ users }) => setUsers(users));
    socket.on('user_left', ({ users }) => setUsers(users));

    socket.on('init_canvas_state', (strokes) => {
      clearBoard();
      strokes.forEach((stroke) => renderRemoteStroke(stroke));
    });

    socket.on('draw_stroke', (strokeData) => {
      renderRemoteStroke(strokeData);
    });

    socket.on('clear_canvas', () => {
      clearBoard();
    });

    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('teardown_warning', ({ message }) => {
      setWarningMessage(message);
    });

    socket.on('teardown_cancelled', () => {
      setWarningMessage('');
    });

    socket.on('room_destroyed', () => {
      navigate('/');
    });

    socket.on('room_full', () => {
      alert('Room is full (Max 5 users).');
      navigate('/');
    });

    return () => {
      socket.emit('leave_room');
      socket.off('user_joined');
      socket.off('user_left');
      socket.off('init_canvas_state');
      socket.off('draw_stroke');
      socket.off('clear_canvas');
      socket.off('receive_message');
      socket.off('teardown_warning');
      socket.off('teardown_cancelled');
      socket.off('room_destroyed');
      socket.off('room_full');
    };
  }, [socket, user, roomCode, renderRemoteStroke, clearBoard, navigate]);

  const handleSendMessage = (text) => {
    if (!socket) return;
    socket.emit('send_message', { message: text, username: user.username });
  };

  const handleClearCanvas = () => {
    if (!socket) return;
    socket.emit('clear_canvas');
  };

  const handleLeaveRoom = () => {
    if (socket) socket.emit('leave_room');
    navigate('/');
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#e0e5ec] overflow-hidden">
      <TopHeaderBar
        roomCode={roomCode}
        roomName={roomDetails?.name}
        users={users}
        onLeave={handleLeaveRoom}
        toggleChat={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
        roomPassword={roomPassword}
      />

      {warningMessage && (
        <div className="bg-amber-500 text-white text-xs py-1.5 px-4 text-center font-bold tracking-wide z-30">
          ⚠️ {warningMessage}
        </div>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 relative h-full">
          <CanvasBoard
            canvasRef={canvasRef}
            startDrawing={startDrawing}
            draw={draw}
            stopDrawing={stopDrawing}
          />

          <CanvasToolbar
            tool={tool}
            setTool={setTool}
            color={color}
            setColor={setColor}
            lineWidth={lineWidth}
            setLineWidth={setLineWidth}
            onClear={handleClearCanvas}
          />
        </div>

        <ChatDrawer
          isOpen={isChatOpen}
          messages={messages}
          onSendMessage={handleSendMessage}
          currentUser={user}
        />
      </div>
    </div>
  );
};

export default CanvasPage;