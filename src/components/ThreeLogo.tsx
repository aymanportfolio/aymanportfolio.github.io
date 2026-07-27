import React from 'react';

interface ThreeLogoProps {
  size?: number;
  className?: string;
}

export const ThreeLogo: React.FC<ThreeLogoProps> = ({ size = 42, className = '' }) => {
  return (
    <div
      className={`relative rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 shadow-lg hover:scale-105 transition-transform overflow-hidden flex-shrink-0 cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      title="AYMAN Portfolio Logo"
    >
      <img
        src="/ayman_profile.jpg"
        alt="AYMAN Portfolio Logo"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};
