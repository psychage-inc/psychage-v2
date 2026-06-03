import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12 w-auto text-[#1A1A1A] dark:text-white" }) => (
    <svg width="400" height="100" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <style>
                {`
          .psychage-wordmark {
            font-family: 'Satoshi', system-ui, -apple-system, sans-serif;
            font-weight: 800;
            font-size: 60px;
            letter-spacing: 2px;
          }
        `}
            </style>
        </defs>
        <text x="50%" y="70" textAnchor="middle" className="psychage-wordmark">
            <tspan fill="#1A9B8C">PSY</tspan>
            <tspan fill="currentColor">CHAGE</tspan>
        </text>
    </svg>
);
