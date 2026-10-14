import React, { useState } from 'react';
import NeumorphicButton from '../common/NeumorphicButton';
import { useAuth } from '../../context/AuthContext';

const SettingsDropdown = ({ onOpenAccount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <div className="relative">
      <NeumorphicButton onClick={() => setIsOpen(!isOpen)} className="!rounded-full w-10 h-10 p-0 flex items-center justify-center">
        ⚙️
      </NeumorphicButton>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 neu-floating bg-[#e0e5ec] rounded-xl p-2 z-30 flex flex-col gap-1">
          <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-300">
            Signed in as <br />
            <strong className="text-gray-800">{user?.username}</strong>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenAccount();
            }}
            className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200/50 rounded-lg transition-colors"
          >
            👤 Account Details
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100/50 rounded-lg transition-colors"
          >
            🚪 Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;