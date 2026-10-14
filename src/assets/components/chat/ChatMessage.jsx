import React from 'react';

const ChatMessage = ({ msg, isCurrentUser }) => {
  return (
    <div className={`flex flex-col mb-3 ${isCurrentUser ? 'items-end' : 'items-start'}`}>
      <span className="text-[10px] text-gray-500 mb-1 px-1">
        {msg.username} • {msg.timestamp}
      </span>
      <div
        className={`px-3 py-2 rounded-xl text-xs max-w-[80%] break-words ${
          isCurrentUser ? 'neu-flat bg-slate-800 text-white font-medium' : 'neu-pressed bg-[#e0e5ec] text-gray-800'
        }`}
      >
        {msg.message}
      </div>
    </div>
  );
};

export default ChatMessage;