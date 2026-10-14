import { useState, useRef, useCallback } from 'react';
import { normalizeCoordinates, denormalizeCoordinates } from '../utils/coordinateScaler';

export const useCanvas = (socket, roomCode) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#1e293b');
  const [lineWidth, setLineWidth] = useState(3);
  const currentStrokeRef = useRef([]);

  const drawSegment = useCallback((ctx, start, end, strokeColor, strokeWidth, isEraser) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = isEraser ? '#FFFFFF' : strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    const norm = normalizeCoordinates(x, y, canvas.width, canvas.height);
    currentStrokeRef.current = [norm];
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const currentNorm = normalizeCoordinates(x, y, canvas.width, canvas.height);
    const lastNorm = currentStrokeRef.current[currentStrokeRef.current.length - 1];

    const start = denormalizeCoordinates(lastNorm.normX, lastNorm.normY, canvas.width, canvas.height);
    const end = { x, y };

    drawSegment(ctx, start, end, color, lineWidth, tool === 'eraser');
    currentStrokeRef.current.push(currentNorm);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentStrokeRef.current.length > 1 && socket && roomCode) {
      const strokeData = {
        points: currentStrokeRef.current,
        color,
        lineWidth,
        isEraser: tool === 'eraser',
      };
      socket.emit('draw_stroke', strokeData);
    }
    currentStrokeRef.current = [];
  };

  const renderRemoteStroke = useCallback((strokeData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { points, color: remoteColor, lineWidth: remoteWidth, isEraser } = strokeData;

    for (let i = 1; i < points.length; i++) {
      const start = denormalizeCoordinates(points[i - 1].normX, points[i - 1].normY, canvas.width, canvas.height);
      const end = denormalizeCoordinates(points[i].normX, points[i].normY, canvas.width, canvas.height);
      drawSegment(ctx, start, end, remoteColor, remoteWidth, isEraser);
    }
  }, [drawSegment]);

  const clearBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return {
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
  };
};