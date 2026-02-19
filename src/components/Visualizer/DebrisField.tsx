import { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, Color } from 'three';
import { useSimulationStore } from '../../store/simulationStore';

export const DebrisField = () => {
    const meshRef = useRef<InstancedMesh>(null);
    const { threatDetected } = useSimulationStore();
    const count = 1000;

    // Create random positions for debris
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 10;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new Object3D(), []);

    useLayoutEffect(() => {
        if (meshRef.current) {
            for (let i = 0; i < count; i++) {
                dummy.position.set(particles[i].xFactor, particles[i].yFactor, particles[i].zFactor);
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [dummy, particles]);

    useFrame((state) => {
        if (meshRef.current) {
            particles.forEach((particle, i) => {
                let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
                t = particle.t += speed / 2;
                const a = Math.cos(t) + Math.sin(t * 1) / 10;
                const b = Math.sin(t) + Math.cos(t * 2) / 10;
                const s = Math.cos(t);

                // Update position
                dummy.position.set(
                    (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                    (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                    (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
                );

                // Rotate debris
                dummy.rotation.set(s * 5, s * 5, s * 5);
                dummy.updateMatrix();

                meshRef.current?.setMatrixAt(i, dummy.matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshStandardMaterial
                color={threatDetected ? "#ff3333" : "#aaaaaa"}
                emissive={threatDetected ? "#550000" : "#222222"}
                wireframe={true}
            />
        </instancedMesh>
    );
};
