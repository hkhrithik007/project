import React from 'react';

interface AnimatedRupeeProps {
  isActive: boolean;
}

const AnimatedRupee: React.FC<AnimatedRupeeProps> = ({ isActive }) => {
  return (
    <div className={`inline-flex items-center justify-center ${isActive ? 'animate-pulse' : ''}`}>
      <div className={`
        text-4xl font-bold text-[#D7263D] 
        ${isActive ? 'animate-bounce' : ''}
        transition-all duration-300
      `}>
        ₹
      </div>
      {isActive && (
        <div className="ml-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-[#D7263D] rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-[#D7263D] rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-[#D7263D] rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedRupee;