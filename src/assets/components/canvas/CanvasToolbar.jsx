import React from 'react';
import NeumorphicButton from '../common/NeumorphicButton';

const CanvasToolbar = ({ tool, setTool, color, setColor, lineWidth, setLineWidth, onClear }) => {
  const colors = ['#1e293b', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 neu-floating p-3 rounded-2xl flex items-center gap-4 bg-[#e0e5ec] z-10">
      <div className="flex gap-2">
        <NeumorphicButton active={tool === 'pencil'} onClick={() => setTool('pencil')}>
          ✏️ Pencil
        </NeumorphicButton>
        <NeumorphicButton active={tool === 'eraser'} onClick={() => setTool('eraser')}>
          🧹 Eraser
        </NeumorphicButton>
      </div>

      <div className="h-6 w-[2px] bg-gray-300"></div>

      <div className="flex items-center gap-2">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => {
              setColor(c);
              if (tool === 'eraser') setTool('pencil');
            }}
            className={`w-7 h-7 rounded-full transition-transform ${
              color === c && tool !== 'eraser' ? 'scale-125 border-2 border-white shadow-md' : ''
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <div className="h-6 w-[2px] bg-gray-300"></div>

      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
        <span>Size:</span>
        <input
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="w-20 accent-slate-700 cursor-pointer"
        />
      </div>

      <div className="h-6 w-[2px] bg-gray-300"></div>

      <NeumorphicButton onClick={onClear} className="text-red-600 hover:text-red-700">
        🗑️ Clear
      </NeumorphicButton>
    </div>
  );
};

export default CanvasToolbar;