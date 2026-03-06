import React from 'react';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12 w-auto text-[#1A1A1A] dark:text-white" }) => (
    <svg width="400" height="100" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Jost:wght@700&display=swap');
          .futura-text {
            font-family: 'Jost', sans-serif;
            font-weight: 700;
            font-size: 60px;
            letter-spacing: 2px;
          }
        `}
            </style>
        </defs>
        <text x="50%" y="70" textAnchor="middle" className="futura-text">
            <tspan fill="#0D9488">PSY</tspan><tspan fill="currentColor">CHAGE</tspan>
        </text>
    </svg>
);
