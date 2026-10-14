import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import NeumorphicInput from '../common/NeumorphicInput';
import NeumorphicButton from '../common/NeumorphicButton';

const ChatDrawer = ({ isOpen, messages, onSendMessage, currentUser }) => {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
  };

  return (
    <div className="w-80 h-full neu-flat p-4 flex flex-col bg-[#e0e5ec] transition-all duration-300 z-10">
      <h2 className="text-sm font-bold text-gray-700 mb-3 border-b border-gray-300 pb-2">Room Chat</h2>
      
      <div className="flex-1 overflow-y-auto pr-1">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            msg={msg}
            isCurrentUser={msg.username === currentUser?.username}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <NeumorphicInput
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <NeumorphicButton type="submit">Send</NeumorphicButton>
      </form>
    </div>
  );
};

export default ChatDrawer;