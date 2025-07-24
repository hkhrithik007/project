import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <img 
        src="/path/to/your-logo.png" 
        alt="NICSAN Logo" 
        className="h-12 w-auto"
        onError={(e) => {
          // Fallback to text logo if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'block';
        }}
      />
      <div 
        className="hidden text-2xl font-bold text-[#004E98]"
        style={{ display: 'none' }}
      >
        NICSAN
      </div>
    </div>
  );
};

export default Logo;