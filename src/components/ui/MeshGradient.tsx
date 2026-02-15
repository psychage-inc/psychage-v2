import React from 'react';
import GrainOverlay from './GrainOverlay';

interface MeshGradientProps {
    className?: string;
}

const MeshGradient: React.FC<MeshGradientProps> = ({ className = '' }) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-teal-200/30 blur-[120px] mix-blend-multiply animate-blob" />
            <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-cyan-100/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] rounded-full bg-emerald-100/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
            <GrainOverlay opacity={0.03} />
        </div>
    );
};

export default MeshGradient;
