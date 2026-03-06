import React from 'react';

interface LogoIconProps {
    className?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ className = "h-20 w-auto" }) => (
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="100" cy="100" r="20" fill="#1A1A1A" />
        <circle cx="100" cy="50" r="13" fill="#1A1A1A" />
        <circle cx="143.3" cy="75" r="13" fill="#00A896" />
        <circle cx="143.3" cy="125" r="13" fill="#1A1A1A" />
        <circle cx="100" cy="150" r="13" fill="#1A1A1A" />
        <circle cx="56.7" cy="125" r="13" fill="#1A1A1A" />
        <circle cx="56.7" cy="75" r="13" fill="#1A1A1A" />
        <line x1="122.5" y1="87" x2="126.8" y2="84.5" stroke="#1A1A1A" strokeWidth="8" strokeLinecap="round" />
    </svg>
);
