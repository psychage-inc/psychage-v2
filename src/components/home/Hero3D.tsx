import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useState } from 'react';
// Note: We might need to adjust imports if 'maath' or 'next-themes' are not installed or used differently. 
// Checking package.json earlier showed 'maath' is installed. 'next-themes' might not be, so I'll check or make it adaptive. 
// Actually package.json showed 'maath' and 'three' and '@react-three/fiber' and '@react-three/drei'.
// It did NOT show 'next-themes', but 'tailwind-merge' etc. I will use a prop or class-based theme detection if needed, or just default colors that work in both.

const ParticleField = (props: any) => {
    const ref = useRef<any>();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#0d9488" // Teal-600
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const Hero3D: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`w-full h-full absolute inset-0 -z-10 ${className}`}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleField />
            </Canvas>
        </div>
    );
};

export default Hero3D;
