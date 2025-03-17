
import React from 'react';

interface Percent90Props {
  className?: string;
  size?: number;
}

const Percent90: React.FC<Percent90Props> = ({ className = '', size = 24 }) => {
  return (
    <svg 
      width={size}
      height={size}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 5L5 19" />
      <circle cx="9" cy="8" r="3" />
      <path d="M17 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M17 11v7" />
    </svg>
  );
};

export default Percent90;
