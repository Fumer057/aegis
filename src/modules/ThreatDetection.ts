import { Vector3 } from 'three';

export interface SpaceObject {
    id: string;
    position: Vector3;
    velocity: Vector3;
    type: 'DEBRIS' | 'HOSTILE' | 'FRIENDLY';
    radius: number; // Collision radius in meters
}

export interface ThreatAssessment {
    detected: boolean;
    timeToImpact: number; // seconds
    threatObject?: SpaceObject;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export function detectThreats(
    satellitePos: Vector3,
    satelliteVel: Vector3,
    objects: SpaceObject[],
    warningRadius: number = 50000 // 50km
): ThreatAssessment {
    let closestThreat: SpaceObject | undefined;
    let minDistance = Infinity;

    for (const obj of objects) {
        const dist = satellitePos.distanceTo(obj.position);

        // Simple proximity check
        if (dist < warningRadius) {
            if (dist < minDistance) {
                minDistance = dist;
                closestThreat = obj;
            }
        }
    }

    if (closestThreat) {
        // Calculate closing speed
        const relVel = closestThreat.velocity.clone().sub(satelliteVel);
        const closingSpeed = -relVel.dot(closestThreat.position.clone().sub(satellitePos).normalize());

        // Only a threat if getting closer
        if (closingSpeed > 0) {
            const timeToImpact = minDistance / closingSpeed;
            let severity: ThreatAssessment['severity'] = 'LOW';

            if (minDistance < 1000) severity = 'CRITICAL';
            else if (minDistance < 5000) severity = 'HIGH';
            else if (minDistance < 20000) severity = 'MEDIUM';

            return {
                detected: true,
                timeToImpact,
                threatObject: closestThreat,
                severity
            };
        }
    }

    return { detected: false, timeToImpact: Infinity, severity: 'LOW' };
}
