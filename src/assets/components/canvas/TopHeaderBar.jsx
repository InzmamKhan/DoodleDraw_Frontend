import React, { useState } from 'react';
import NeumorphicButton from '../common/NeumorphicButton';

const TopHeaderBar = ({ roomCode, roomName, users, onLeave, toggleChat, isChatOpen, roomPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full px-6 py-3 neu-flat flex items-center justify-between bg-[#e0e5ec] z-20">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-gray-800 text-lg">{roomName || 'Canvas Room'}</h1>
        <div className="neu-pressed px-3 py-1 rounded-lg text-xs font-mono text-gray-600 flex items-center gap-2">
          <span>Code: <strong>{roomCode}</strong></span>
          {roomPassword && (
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-800 transition-colors ml-1"
              title="Toggle Password Visibility"
            >
              {showPassword ? `🔐 ${roomPassword}` : '👁️'}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex -space-x-2 overflow-hidden mr-2">
          {users.map((u, idx) => (
            <div
              key={idx}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-[#e0e5ec] bg-slate-700 text-white flex items-center justify-center text-xs font-semibold uppercase"
              title={u.username}
            >
              {u.username.substring(0, 2)}
            </div>
          ))}
        </div>

        <NeumorphicButton active={isChatOpen} onClick={toggleChat}>
          💬 Chat
        </NeumorphicButton>

        <NeumorphicButton onClick={onLeave} className="text-red-600">
          🚪 Leave
        </NeumorphicButton>
      </div>
    </div>
  );
};

export default TopHeaderBar;