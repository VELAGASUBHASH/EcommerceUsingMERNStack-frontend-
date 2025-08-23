import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2 h-20 w-full">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full bg-black animate-bounce"
          style={{ animationDelay: `${i * 0.2}s` }}
        ></div>
      ))}
    </div>
  );
};

export default LoadingSpinner;
