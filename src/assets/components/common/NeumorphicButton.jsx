import React from 'react';

const NeumorphicButton = ({ children, onClick, active = false, className = '', type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`neu-button px-4 py-2 font-medium text-gray-700 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
        active ? 'active' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default NeumorphicButton;