import React from 'react';

const Button = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      {label}
    </button>
  );
};

export default Button;
