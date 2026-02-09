import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`glass-panel rounded-[2rem] p-6 shadow-xl ${onClick ? 'cursor-pointer hover:scale-[1.02] transition-transform' : ''} ${className}`}
    >
      {children}
    </div>
  );
};