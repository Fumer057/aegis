import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line, Sphere, Html } from '@react-three/drei';
import { Vector3, CatmullRomCurve3 } from 'three';
import { useSimulationStore } from '../../store/simulationStore';
import { OrbitPredictor } from '../../modules/OrbitEngine';

const Earth = () => {
    return (
        <group>
            <Sphere args={[2, 64, 64]}>
                <meshStandardMaterial
                    color="#1a4d8c"
                    emissive="#001133"
                    roughness={0.7}
                    metalness={0.1}
                    wireframe={true} // Sci-fi look
                />
            </Sphere>
            {/* Atmosphere Glow */}
            <Sphere args={[2.05, 64, 64]}>
                <meshBasicMaterial
                    color="#00f3ff"
                    transparent
                    opacity={0.1}
                    side={2} // DoubleSide
                />
            </Sphere>
        </group>
    );
};

const Satellite = () => {
    const { altitude, velocity, status } = useSimulationStore();
    const meshRef = useRef<any>();

    // Animate satellite orbit
    useFrame(({ clock }) => {
        if (meshRef.current) {
            const t = clock.getElapsedTime() * 0.1; // Slow orbit time
            const r = 3.5 + (altitude / 1000); // Scale altitude for visual

            // Simple circular orbit for visualization
            const x = Math.cos(t) * r;
            const z = Math.sin(t) * r;

            meshRef.current.position.set(x, 0, z);
            meshRef.current.rotation.y = -t;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Main Body */}
            <mesh>
                <boxGeometry args={[0.2, 0.1, 0.1]} />
                <meshStandardMaterial color={status === 'EVADING' ? '#ff0055' : '#ffffff'} />
            </mesh>
            {/* Solar Panels */}
            <mesh position={[0, 0, 0.2]}>
                <boxGeometry args={[0.02, 0.2, 0.4]} />
                <meshStandardMaterial color="#00aaee" emissive="#002244" />
            </mesh>
            <mesh position={[0, 0, -0.2]}>
                <boxGeometry args={[0.02, 0.2, 0.4]} />
                <meshStandardMaterial color="#00aaee" emissive="#002244" />
            </mesh>

            {/* Status Label */}
            <Html distanceFactor={10} position={[0, 0.3, 0]}>
                <div className="bg-black/50 text-white text-xs px-1 border border-white/20 whitespace-nowrap backdrop-blur-sm">
                    SAT-1 ({status})
                </div>
            </Html>
        </group>
    );
};

const OrbitPath = () => {
    const points = useMemo(() => {
        // Create a circular path
        const curve = new CatmullRomCurve3([
            new Vector3(4, 0, 0),
            new Vector3(0, 0, 4),
            new Vector3(-4, 0, 0),
            new Vector3(0, 0, -4),
        ], true);
        return curve.getPoints(50);
    }, []);

    return (
        <Line
            points={points}
            color="#ffffff"
            opacity={0.2}
            transparent
            lineWidth={1}
        />
    );
};

export const SpaceScene = () => {
    return (
        <div className="w-full h-screen absolute top-0 left-0 -z-10 bg-aegis-bg">
            <Canvas camera={{ position: [6, 4, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Earth />
                <Satellite />
                <OrbitPath />

                <OrbitControls enableZoom={true} enablePan={false} maxDistance={20} minDistance={3} />
                <gridHelper args={[20, 20, 0x2e2e48, 0x111116]} position={[0, -2.5, 0]} />
            </Canvas>
        </div>
    );
};
