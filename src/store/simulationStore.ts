import { create } from 'zustand';

export type SystemStatus = 'IDLE' | 'WARNING' | 'EVADING' | 'SAFE';

interface SimulationState {
    fuelStart: number;
    fuelCurrent: number;
    altitude: number; // km
    velocity: number; // km/s
    status: SystemStatus;
    threatDetected: boolean;
    evasionActive: boolean;

    // Actions
    setFuel: (amount: number) => void;
    consumeFuel: (amount: number) => void;
    setStatus: (status: SystemStatus) => void;
    setThreatDetected: (detected: boolean) => void;
    triggerEvasion: () => void;
    resetSimulation: () => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
    fuelStart: 1000,
    fuelCurrent: 1000,
    altitude: 400, // ISS rough altitude
    velocity: 7.66, // Orbital velocity
    status: 'IDLE',
    threatDetected: false,
    evasionActive: false,

    setFuel: (amount) => set({ fuelCurrent: amount }),
    consumeFuel: (amount) => set((state) => ({
        fuelCurrent: Math.max(0, state.fuelCurrent - amount)
    })),
    setStatus: (status) => set({ status }),
    setThreatDetected: (detected) => set({
        threatDetected: detected,
        status: detected ? 'WARNING' : 'IDLE'
    }),
    triggerEvasion: () => set({
        evasionActive: true,
        status: 'EVADING'
    }),
    resetSimulation: () => set({
        fuelCurrent: 1000,
        status: 'IDLE',
        threatDetected: false,
        evasionActive: false
    })
}));
