import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "rounded-2xl font-display font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-blue-600 shadow-[0_4px_0_rgb(29,78,216)] active:shadow-none active:translate-y-[4px]",
    secondary: "bg-brand-green text-white hover:bg-teal-500 shadow-[0_4px_0_rgb(13,148,136)] active:shadow-none active:translate-y-[4px]",
    accent: "bg-brand-accent text-white hover:bg-orange-500 shadow-[0_4px_0_rgb(194,65,12)] active:shadow-none active:translate-y-[4px]",
    outline: "border-2 border-brand-dark/20 text-brand-dark hover:bg-brand-dark/5 bg-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-xl"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};