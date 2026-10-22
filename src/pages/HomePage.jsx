import React, { useState } from 'react';
import NeumorphicInput from '../assets/components/common/NeumorphicInput';
import NeumorphicButton from '../assets/components/common/NeumorphicButton';
import CreateRoomModal from '../assets/components/modals/CreateRoomModal';
import SettingsDropdown from '../assets/components/layout/SettingsDropdown';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const HomePage = () => {
  const [roomCode, setRoomCode] = useState('');
  const [password, setPassword] = useState('');
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthMode, setIsAuthMode] = useState('login');
  const [authData, setAuthData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const { user, login, signup } = useAuth();
  const navigate = useNavigate();

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isAuthMode === 'login') {
        await login(authData.email, authData.password);
      } else {
        await signup(authData.username, authData.email, authData.password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!roomCode.trim()) return;

    setError('');
    try {
      const res = await fetch(`${API_URL}/api/rooms/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code: roomCode, password }),
      });

      const data = await res.json();
      if (res.status === 401 && data.requiresPassword) {
        setRequiresPassword(true);
        setError('Password required to enter this room.');
        return;
      }

      if (!res.ok) throw new Error(data.message || 'Unable to join room');

      navigate(`/canvas/${data.room.code}`, { state: { password } });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRoomCreated = (room) => {
    const code = room?.code || room?.roomCode;
    if (code) {
      navigate(`/canvas/${code}`, { state: { password: room.autoPassword } });
    } else {
      setError('Room created, but failed to retrieve room code.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="neu-floating p-8 rounded-3xl w-full max-w-md bg-[#e0e5ec]">
          <h1 className="text-2xl font-black text-center text-gray-800 mb-2">DoodleDraw.io</h1>
          <p className="text-xs text-center text-gray-500 mb-6">Real-time Neumorphic Canvas</p>

          {error && <div className="text-red-600 text-xs mb-4 text-center font-medium">{error}</div>}

          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
            {isAuthMode === 'signup' && (
              <NeumorphicInput
                placeholder="Username"
                value={authData.username}
                onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
                required
              />
            )}
            <NeumorphicInput
              type="email"
              placeholder="Email"
              value={authData.email}
              onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
              required
            />
            <NeumorphicInput
              type="password"
              placeholder="Password"
              value={authData.password}
              onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
              required
            />

            <NeumorphicButton type="submit" className="mt-2 font-bold text-gray-800">
              {isAuthMode === 'login' ? 'Sign In' : 'Create Account'}
            </NeumorphicButton>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsAuthMode(isAuthMode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              className="text-xs text-gray-600 hover:text-gray-800 underline"
            >
              {isAuthMode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex justify-between items-center w-full max-w-4xl mx-auto mb-12">
        <h1 className="text-xl font-bold text-gray-800">DoodleDraw.io</h1>
        <SettingsDropdown onOpenAccount={() => navigate('/account')} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full">
        <div className="neu-floating p-8 rounded-3xl w-full bg-[#e0e5ec] text-center mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Welcome, {user.username}!</h2>
          <p className="text-xs text-gray-500 mb-6">Create a new canvas room or enter an existing room code.</p>

          <div className="flex flex-col gap-4">
            <NeumorphicButton
              onClick={() => setIsModalOpen(true)}
              className="py-3 font-semibold text-gray-800"
            >
              ➕ Create New Room
            </NeumorphicButton>

            <div className="flex items-center gap-2 my-2">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {error && <div className="text-red-600 text-xs font-medium">{error}</div>}

            <form onSubmit={handleJoinRoom} className="flex flex-col gap-3">
              <NeumorphicInput
                placeholder="Enter Room Code (e.g. X9K2M1)"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                required
              />

              {requiresPassword && (
                <NeumorphicInput
                  type="password"
                  placeholder="Enter Room Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              )}

              <NeumorphicButton type="submit" className="py-2.5">
                🚀 Join Room
              </NeumorphicButton>
            </form>
          </div>
        </div>
      </div>

      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRoomCreated={handleRoomCreated}
      />
    </div>
  );
};

export default HomePage;