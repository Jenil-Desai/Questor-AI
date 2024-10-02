import React from 'react';

const Alert = ({ type, message, onClose }) => {
  const alertStyle = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  }[type];

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${alertStyle}`}>
      <span>{message}</span>
      <button className="ml-4 text-white font-bold" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Alert;
