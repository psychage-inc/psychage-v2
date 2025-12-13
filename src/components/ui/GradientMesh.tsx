import React from 'react';

const GradientMesh: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[100px] animate-pulse-slow" />
            <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/20 blur-[120px] animate-blob" />
            <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-teal-400/20 blur-[100px] animate-blob animation-delay-2000" />
        </div>
    );
};

export default GradientMesh;
