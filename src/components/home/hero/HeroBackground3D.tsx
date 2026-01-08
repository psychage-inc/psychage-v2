import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

interface NeuralProps {
    count?: number;
    connectionDistance?: number;
    mouseInteractionRadius?: number;
}

const SynapticWeb: React.FC<NeuralProps> = ({
    count = 200,
    connectionDistance = 1.2,
    mouseInteractionRadius = 2.5
}) => {
    const pointsRef = useRef<THREE.Points>(null!);
    const linesRef = useRef<THREE.LineSegments>(null!);
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);

    // Generate random points in a sphere
    const positions = useMemo(() => {
        return random.inSphere(new Float32Array(count * 3), { radius: 3.5 }) as Float32Array;
    }, [count]);

    // Create geometry for lines (will be updated each frame)
    const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);

    // Mouse position in 3D space
    const mouse = useRef(new THREE.Vector3());

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Slow rotation of the entire system
        if (pointsRef.current) {
            pointsRef.current.rotation.x = Math.sin(time / 10) * 0.1;
            pointsRef.current.rotation.y = Math.cos(time / 15) * 0.1;
        }

        // Update mouse position based on pointer
        mouse.current.set(
            (state.pointer.x * state.viewport.width) / 2,
            (state.pointer.y * state.viewport.height) / 2,
            0
        );

        // Update point positions for interactivity
        const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // Store regular positions to revert to
        // Simplified: Just applying a subtle drift + mouse repulsion
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Basic drift
            const x = positions[i3];
            const y = positions[i3 + 1];
            const z = positions[i3 + 2];

            const ix = positionsArray[i3];
            const iy = positionsArray[i3 + 1];
            const iz = positionsArray[i3 + 2];

            // Distance to mouse
            const dx = mouse.current.x - ix;
            const dy = mouse.current.y - iy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseInteractionRadius) {
                const force = (mouseInteractionRadius - dist) / mouseInteractionRadius;
                // Repel
                positionsArray[i3] -= dx * force * 0.05;
                positionsArray[i3 + 1] -= dy * force * 0.05;
            } else {
                // Return to original (lerp)
                positionsArray[i3] += (x - ix) * 0.02;
                positionsArray[i3 + 1] += (y - iy) * 0.02;
                positionsArray[i3 + 2] += (z - iz) * 0.02;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Connect close points
        // Note: Doing this in JS every frame for 100+ points is expensive. 
        // Optimization: Only compute connections between a subset or use shaders.
        // For this demo, we'll keep count low (100-150) for performance.
    });

    return (
        <group>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Points ref={pointsRef as any} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#2dd4bf"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
            {/* Connections would ideally be a custom InstancedMesh or similar for performance */}
            {/* For now, let's rely on the Points looking like a cloud and add some static floating connections if needed, 
          or just use a few reliable animated lines using distinct components if we want high quality */}
        </group>
    );
};

// Optimization: Use a pre-connected structure or specific lines rather than dynamic N^2 search
const StaticConnections = () => {
    // Generate some fixed random connections
    const linePoints = useMemo(() => {
        const pts = [];
        const count = 30;
        for (let i = 0; i < count; i++) {
            const start = random.inSphere(new Float32Array(3), { radius: 3 });
            const end = random.inSphere(new Float32Array(3), { radius: 3 });
            pts.push(new THREE.Vector3(start[0], start[1], start[2]));
            pts.push(new THREE.Vector3(end[0], end[1], end[2]));
        }
        return pts;
    }, []);

    return (
        <Line
            points={linePoints}
            color="#a855f7" // Purple
            opacity={0.2}
            transparent
            lineWidth={1}
        />
    );
}


const HeroBackground3D: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <SynapticWeb count={150} />
                <StaticConnections />
            </Canvas>
        </div>
    );
};

export default HeroBackground3D;
