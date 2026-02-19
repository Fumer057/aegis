import { Vector3 } from 'three';

export interface SpaceObject {
    id: string;
    position: Vector3;
    velocity: Vector3;
    type: string;
    radius: number;
}

export function detectThreats(
    satPos: Vector3,
    satVel: Vector3,
    objects: SpaceObject[],
    detectionRange: number
) {
    for (const obj of objects) {

        const relativePosition = obj.position.clone().sub(satPos);
        const relativeVelocity = obj.velocity.clone().sub(satVel);

        const distance = relativePosition.length();

        // Ignore if outside detection range
        if (distance > detectionRange) continue;

        // Check if moving toward satellite
        const dot = relativePosition.dot(relativeVelocity);

        // If dot >= 0 → moving away
        if (dot >= 0) continue;

        const speedToward = relativeVelocity.length();
        const timeToImpact = distance / speedToward;

        // 🔥 FORCE CRITICAL for direct collision
        return {
            detected: true,
            severity: "CRITICAL",
            timeToImpact: Math.round(timeToImpact)
        };
    }

    return {
        detected: false,
        severity: "LOW",
        timeToImpact: null
    };
}
