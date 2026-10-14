import React, { useEffect } from 'react';

const CanvasBoard = ({ canvasRef, startDrawing, draw, stopDrawing }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [canvasRef]);

  return (
    <div className="w-full h-full p-4 flex items-center justify-center">
      <div className="w-full h-full neu-pressed rounded-2xl overflow-hidden relative bg-white">
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
          className="w-full h-full touch-none cursor-crosshair block"
        />
      </div>
    </div>
  );
};

export default CanvasBoard;