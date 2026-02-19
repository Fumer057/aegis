import { Vector3 } from 'three';

// Simple "AI" that calculates a vector perpendicular to the threat vector
// to maximize miss distance with minimal fuel.
export function calculateEvasiveManeuver(
    satellitePos: Vector3,
    satelliteVel: Vector3,
    threatPos: Vector3,
    threatVel: Vector3
): Vector3 {
    // 1. Vector from sat to threat
    const threatVec = threatPos.clone().sub(satellitePos);

    // 2. We want to burn PERPENDICULAR to the threat vector and our velocity
    // This pushes us "up" or "down" relative to the collision plane usually

    const orbitalNormal = satellitePos.clone().cross(satelliteVel).normalize();

    // Cross threat vector with orbital normal to find a radial/tangential mix
    // But simplest is often just to burn Normal or Anti-Normal

    // Let's decide direction based on where the threat is.
    // If threat is "above", go "down".

    // Simplified: Just burn Normal (perpendicular to orbit plane)
    // This changes inclination, which is expensive but effective for missing a point impact
    // For this demo, let's just push away from the threat vector projected on the normal plane.

    const evasionDir = threatVec.clone().cross(satelliteVel).normalize();

    // Magnitude depends on urgency. Let's say 50 m/s delta-v
    return evasionDir.multiplyScalar(50);
}

export function calculateFuelCost(deltaV: Vector3, mass: number = 1000): number {
    // Tsiolkovsky rocket equation simplified
    // Fuel = Mass * (1 - e^(-deltaV / Isp * g0))
    // For game simulation, linear approximation:
    return deltaV.length() * 0.5; // Arbitrary units
}
