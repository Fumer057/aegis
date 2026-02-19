import { describe, it, expect } from 'vitest';
import { OrbitPredictor, OrbitState } from './OrbitEngine';
import { Vector3 } from 'three';

describe('OrbitEngine', () => {
    it('should calculate orbital speed correctly', () => {
        // approximate speed at 400km is ~7.66 km/s
        const speed = OrbitPredictor.getOrbitalSpeed(400);
        expect(speed).toBeCloseTo(7668, -1); // within 10m/s
    });

    it('should propagate orbit state', () => {
        const initialState: OrbitState = {
            position: new Vector3(7000000, 0, 0),
            velocity: new Vector3(0, 0, 7500)
        };

        const dt = 1; // 1 second
        const newState = OrbitPredictor.propagate(initialState, dt);

        // Position should change
        expect(newState.position.x).not.toBe(initialState.position.x);
        // Velocity should change due to gravity
        expect(newState.velocity.x).not.toBe(initialState.velocity.x);
    });
});
