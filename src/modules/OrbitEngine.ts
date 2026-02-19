import { Vector3 } from 'three';

// Constants
const G = 6.67430e-11;
const M_EARTH = 5.972e24; // kg
const R_EARTH = 6371e3; // m

export interface OrbitState {
    position: Vector3;
    velocity: Vector3;
}

export class OrbitPredictor {
    // Simple Keplerian propagator (Two-body problem)
    // In a real app, this would be much more complex (perturbations, etc.)
    static propagate(state: OrbitState, dt: number): OrbitState {
        const r = state.position.length();
        const a = state.position.clone().normalize().multiplyScalar(- (G * M_EARTH) / (r * r));

        // Euler integration (sufficient for visualization dt < 1s)
        // For higher precision, use Runge-Kutta 4
        const newVelocity = state.velocity.clone().add(a.multiplyScalar(dt));
        const newPosition = state.position.clone().add(newVelocity.clone().multiplyScalar(dt));

        return {
            position: newPosition,
            velocity: newVelocity
        };
    }

    static getOrbitalSpeed(altitudeKm: number): number {
        const r = R_EARTH + altitudeKm * 1000;
        return Math.sqrt((G * M_EARTH) / r);
    }
}
