import React from 'react';
import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';

const AnimatedShape = ({ position, color, speed, distort }: { position: [number, number, number], color: string, speed: number, distort: number }) => {
    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere args={[1.5, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    envMapIntensity={0.75}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.1}
                    //   distort={distort}
                    speed={speed} // Reduced speed from distort prop if needed
                    distort={distort}
                //   speed={4} 
                />
            </Sphere>
        </Float>
    )
}

const HeroBackgroundFluid: React.FC = () => {
    return (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50/50 to-teal-50/50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500 overflow-hidden">
            {/* Fallback/Base Gradient */}
            <div className="absolute inset-0 opacity-40 blur-[100px] bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.15),transparent_50%)]" />

            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />

                <group position={[0, 0, 0]}>
                    {/* Main Teal Shape */}
                    <AnimatedShape
                        position={[2, 0, -2]}
                        color="#2dd4bf" // Teal-400
                        speed={1.5}
                        distort={0.4}
                    />
                    {/* Secondary Purple Shape */}
                    <AnimatedShape
                        position={[-2.5, 1, -3]}
                        color="#a855f7" // Purple-500
                        speed={2}
                        distort={0.3}
                    />
                    {/* Tertiary Blue Shape */}
                    <AnimatedShape
                        position={[0, -2, -1]}
                        color="#6366f1" // Indigo-500
                        speed={1.8}
                        distort={0.5}
                    />
                </group>
            </Canvas>

            {/* Premium Noise Overlay for Texture */}
            <div className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay z-10"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
};

export default HeroBackgroundFluid;
