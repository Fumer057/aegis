import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line, Sphere, Html } from '@react-three/drei';
import { Vector3, CatmullRomCurve3 } from 'three';
import { useSimulationStore } from '../../store/simulationStore';
import { OrbitPredictor } from '../../modules/OrbitEngine';
import { DebrisField } from './DebrisField';
import { predictPathLinear, predictPathLSTM } from '../../modules/AIPrediction';

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
            // Visual speed factor: 7.66 km/s (real) -> ~0.5 rad/s (visual)
            const speedFactor = velocity / 15;
            const t = clock.getElapsedTime() * speedFactor;

            const r = 3.5 + (altitude / 1000); // Scale altitude for visual

            // Simple circular orbit for visualization
            let x = Math.cos(t) * r;
            let z = Math.sin(t) * r;
            let y = 0;

            // Evasion Visual: Deviate from plane
            if (status === 'EVADING') {
                y = Math.sin(t * 5) * 0.5; // Wobble/Maneuver visual
            }

            meshRef.current.position.set(x, y, z);
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

const AIPredictionPaths = () => {
    const { status, velocity } = useSimulationStore();

    // Calculated based on current satellite position (mocked for visualizer static pos)
    const current = new Vector3(3.5, 0, 0); // Matches Satellite orbit R=3.5
    // Use stored velocity for prediction input
    const linearPoints = useMemo(() => predictPathLinear(current, new Vector3(3.5, 0, -0.1 * (velocity / 7.66)), 20), [velocity]);
    const lstmPoints = useMemo(() => predictPathLSTM({ position: current, velocity: new Vector3(0, 0, velocity) }, 20), [velocity]);

    if (status !== 'EVADING' && status !== 'WARNING') return null;

    return (
        <group>
            {/* Linear Regression Prediction (Red/Error) */}
            <Line points={linearPoints} color="red" opacity={0.5} transparent lineWidth={1} dashed dashScale={1} />

            {/* LSTM Prediction (Green/Correct) */}
            <Line points={lstmPoints} color="#00ff00" opacity={0.8} transparent lineWidth={2} />
        </group>
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
                <DebrisField />
                <OrbitPath />
                <AIPredictionPaths />

                <OrbitControls enableZoom={true} enablePan={false} maxDistance={20} minDistance={3} />
                <gridHelper args={[20, 20, 0x2e2e48, 0x111116]} position={[0, -2.5, 0]} />
            </Canvas>
        </div>
    );
};
