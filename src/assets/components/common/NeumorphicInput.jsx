import React from 'react';

const NeumorphicInput = ({ type = 'text', placeholder, value, onChange, className = '', name, required = false }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`neu-input text-gray-800 placeholder-gray-400 text-sm w-full ${className}`}
    />
  );
};

export default NeumorphicInput;