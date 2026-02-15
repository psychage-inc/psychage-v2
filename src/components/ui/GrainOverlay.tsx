import React from 'react';

interface GrainOverlayProps {
    className?: string;
    opacity?: number;
}

const GrainOverlay: React.FC<GrainOverlayProps> = ({ className = '', opacity = 0.05 }) => {
    return (
        <div
            className={`absolute inset-0 pointer-events-none z-[0] mix-blend-overlay ${className}`}
            style={{ opacity }}
        >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.80"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
};

export default GrainOverlay;
