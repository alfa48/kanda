import React from 'react';
import { Loader2 } from 'lucide-react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading, 
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-between font-sans transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-carbon-blue disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: "bg-carbon-blue text-white hover:bg-carbon-blueHover active:bg-[#002d9c]",
    secondary: "bg-carbon-gray80 text-white hover:bg-carbon-gray90",
    ghost: "bg-transparent text-carbon-blue hover:bg-carbon-gray10 hover:text-carbon-blueHover",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base", // Carbon default is usually 48px or 40px (field height)
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className="flex items-center gap-2">
        {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
        {children}
      </span>
      {icon && <span className="ml-4">{icon}</span>}
    </button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, helperText, className = '', ...props }) => {
  return (
    <div className="flex flex-col w-full mb-4">
      {label && <label className="text-xs text-carbon-gray80 mb-1 font-semibold uppercase tracking-wide">{label}</label>}
      <input 
        className={`h-10 bg-carbon-gray10 border-b border-carbon-gray80 px-4 text-carbon-gray100 placeholder-gray-500 focus:outline-none focus:border-carbon-blue focus:ring-1 focus:ring-carbon-blue transition-all ${className}`}
        {...props}
      />
      {helperText && <span className="text-xs text-gray-500 mt-1">{helperText}</span>}
    </div>
  );
};

// --- Tile/Card ---
interface TileProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Tile: React.FC<TileProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-white p-4 border border-gray-200 hover:border-gray-300 transition-colors ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// --- ProgressBar ---
interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  size?: 'sm' | 'md';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, label, size='md' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const height = size === 'sm' ? 'h-1' : 'h-4';
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-xs font-medium text-gray-700">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 ${height}`}>
        <div 
          className={`bg-carbon-blue ${height} transition-all duration-500 ease-out`} 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
};

// --- Badge ---
export const Badge: React.FC<{children: React.ReactNode, type?: 'neutral' | 'success'}> = ({ children, type='neutral' }) => {
  const colors = type === 'success' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  return (
    <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider ${colors}`}>
      {children}
    </span>
  );
};
