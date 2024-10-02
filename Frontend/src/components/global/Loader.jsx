// components/global/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-70 z-50">
      <div className="loader">
        <div className="spinner"></div>
        <p className="mt-4 text-white text-lg">Loading...</p>
      </div>

      <style jsx="true">{`
        .spinner {
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid #ffffff;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
