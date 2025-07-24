import React from 'react';
import AnimatedRupee from './AnimatedRupee';

const LoadingScreen: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="mb-8">
        <AnimatedRupee isActive={true} />
      </div>
      <h2 className="text-2xl font-bold text-[#004E98] mb-4">
        Calculating Your Perfect Plan...
      </h2>
      <p className="text-gray-600 mb-8">
        Our AI is analyzing your profile to recommend the best health insurance coverage for you.
      </p>
      <div className="flex justify-center space-x-2">
        <div className="w-3 h-3 bg-[#004E98] rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-[#D7263D] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-[#004E98] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;