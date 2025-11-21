import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function HeartParticles({ count = 3000 }) {
    const points = useRef();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const t = Math.random() * Math.PI * 2;
            const r = Math.random() * 1.5; // Randomness in thickness

            // Heart shape formula
            // x = 16sin^3(t)
            // y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
            // Scale down by factor of 15 to fit in view

            const x = (16 * Math.pow(Math.sin(t), 3));
            const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            const z = (Math.random() - 0.5) * 2; // Thickness

            // Add some random spread
            positions[i * 3] = (x * 0.1) + (Math.random() - 0.5) * 0.2;
            positions[i * 3 + 1] = (y * 0.1) + (Math.random() - 0.5) * 0.2;
            positions[i * 3 + 2] = z * 0.5;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        points.current.rotation.y = time * 0.1;
        points.current.rotation.z = Math.sin(time * 0.5) * 0.1;
        // Pulse effect
        const scale = 1 + Math.sin(time * 2) * 0.05;
        points.current.scale.set(scale, scale, scale);
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#f43f5e"
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#fda4af" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <HeartParticles />
            </Float>

            <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
                <Text
                    position={[0, -2.5, 0]}
                    fontSize={0.8}
                    color="#fda4af"
                    font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff"
                    anchorX="center"
                    anchorY="middle"
                >
                    For You
                </Text>
            </Float>
        </>
    );
}

export default function Hero3D() {
    return (
        <div className="h-[70vh] w-full bg-gradient-to-b from-black/5 to-transparent">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Scene />
            </Canvas>
        </div>
    );
}
