
import React from 'react';

interface LogoProps {
  variant?: 'color' | 'white' | 'monochrome';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ variant = 'color', size = 'md', showText = true }) => {
  const isWhite = variant === 'white';
  const colorPrimary = isWhite ? '#FFFFFF' : (variant === 'monochrome' ? '#6E8F3A' : '#6E8F3A');
  const textColor = isWhite ? '#FFFFFF' : '#3A3A3A';
  
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className={`flex items-center gap-4 ${sizeClasses[size]}`}>
      {/* Symbol: Stylized panda paw print in a circle */}
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" stroke={colorPrimary} strokeWidth="3" />
        {/* Paw pads */}
        <ellipse cx="32" cy="38" rx="8" ry="10" fill={colorPrimary} />
        <ellipse cx="44" cy="28" rx="8" ry="10" fill={colorPrimary} />
        <ellipse cx="58" cy="28" rx="8" ry="10" fill={colorPrimary} />
        <ellipse cx="70" cy="38" rx="8" ry="10" fill={colorPrimary} />
        {/* Main pad */}
        <path d="M30 65C30 55 40 50 50 50C60 50 72 55 72 65C72 75 60 82 50 82C40 82 30 75 30 65Z" fill={colorPrimary} />
      </svg>

      {showText && (
        <>
          {/* Separator */}
          <div className={`h-2/3 w-[1px] ${isWhite ? 'bg-white/40' : 'bg-gray-300'}`} />

          {/* Logotype */}
          <span 
            className="font-sans font-semibold tracking-wider text-xl lg:text-2xl" 
            style={{ color: textColor }}
          >
            MboMa & Co.
          </span>
        </>
      )}
    </div>
  );
};

export default Logo;
