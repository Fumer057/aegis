import { describe, it, expect } from 'vitest';
import { detectThreats, SpaceObject } from './ThreatDetection';
import { Vector3 } from 'three';

describe('ThreatDetection', () => {

    it('should detect threats within range', () => {
        const satPos = new Vector3(0, 0, 0);
        const satVel = new Vector3(0, 0, 0);

        const threat: SpaceObject = {
            id: 'T1',
            position: new Vector3(1000, 0, 0),
            velocity: new Vector3(-10, 0, 0),
            type: 'DEBRIS',
            radius: 10
        };

        const result = detectThreats(satPos, satVel, [threat], 5000);

        expect(result.detected).toBe(true);
        expect(result.severity).toBe('CRITICAL');
        expect(result.timeToImpact).toBe(100);
    });

    it('should ignore threats moving away', () => {
        const satPos = new Vector3(0, 0, 0);
        const satVel = new Vector3(0, 0, 0);

        const threat: SpaceObject = {
            id: 'T1',
            position: new Vector3(1000, 0, 0),
            velocity: new Vector3(10, 0, 0),
            type: 'DEBRIS',
            radius: 10
        };

        const result = detectThreats(satPos, satVel, [threat], 5000);

        expect(result.detected).toBe(false);
    });

});
