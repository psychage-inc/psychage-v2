import React, { useRef, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useState } from 'react';

/** Silent error boundary — renders nothing on crash so the page stays usable. */
class Canvas3DErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: Error) {
        console.warn('[Hero3D] WebGL/Three.js failed to initialise — falling back to gradient-only background.', error.message);
    }
    render() {
        return this.state.hasError ? null : this.props.children;
    }
}

function isWebGLAvailable(): boolean {
    try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
        return false;
    }
}

const ParticleField = (props: any) => {
    const ref = useRef<any>();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((_state, delta) => {
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
                    color="#1A9B8C"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const Hero3D: React.FC<{ className?: string }> = ({ className }) => {
    const [webGLSupported] = useState(isWebGLAvailable);

    if (!webGLSupported) return null;

    return (
        <Canvas3DErrorBoundary>
            <div className={`w-full h-full absolute inset-0 -z-10 ${className}`}>
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticleField />
                </Canvas>
            </div>
        </Canvas3DErrorBoundary>
    );
};

export default Hero3D;
