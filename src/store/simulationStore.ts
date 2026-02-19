import { create } from 'zustand';

export type SystemStatus = 'IDLE' | 'WARNING' | 'EVADING' | 'SAFE';

import { OptimizationStep, optimizeFuelUsage } from '../modules/FuelOptimizer';

interface SimulationState {
    fuelStart: number;
    fuelCurrent: number;
    altitude: number; // km
    velocity: number; // km/s
    status: SystemStatus;
    threatDetected: boolean;
    evasionActive: boolean;
    aiReasoningLog: string[];
    optimizationData: OptimizationStep[];

    // Actions
    setFuel: (amount: number) => void;
    setInitialParams: (alt: number, vel: number, fuel: number) => void;
    consumeFuel: (amount: number) => void;
    setStatus: (status: SystemStatus) => void;
    setThreatDetected: (detected: boolean) => void;
    triggerEvasion: () => void;
    resetSimulation: () => void;
    addReasoningLog: (log: string) => void;
    setOptimizationData: (data: OptimizationStep[]) => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
    fuelStart: 1000,
    fuelCurrent: 1000,
    altitude: 400, // ISS rough altitude
    velocity: 7.66, // Orbital velocity
    status: 'IDLE',
    threatDetected: false,
    evasionActive: false,
    aiReasoningLog: [],
    optimizationData: [],

    setFuel: (amount) => set({ fuelCurrent: amount }),
    setInitialParams: (alt, vel, fuel) => set({ altitude: alt, velocity: vel, fuelStart: fuel, fuelCurrent: fuel }),
    consumeFuel: (amount) => set((state) => ({
        fuelCurrent: Math.max(0, state.fuelCurrent - amount)
    })),
    setStatus: (status) => set({ status }),
    setThreatDetected: (detected) => set({
        threatDetected: detected,
        status: detected ? 'WARNING' : 'IDLE'
    }),
    addReasoningLog: (log) => set((state) => ({ aiReasoningLog: [...state.aiReasoningLog, log] })),
    setOptimizationData: (data) => set({ optimizationData: data }),
    triggerEvasion: () => {
        const { fuelCurrent, velocity, consumeFuel } = get();

        set({ evasionActive: true, status: 'EVADING' });

        // 1. Start AI Reasoning
        get().addReasoningLog("Analyzing threat vector...");
        setTimeout(() => get().addReasoningLog(`Velocity Impact Factor: ${(velocity / 7.66).toFixed(2)}x`), 400);
        setTimeout(() => get().addReasoningLog("Simulating 500 potential trajectories..."), 800);

        // 2. Run Optimization (Simulated delay)
        setTimeout(() => {
            get().addReasoningLog("Optimizing Delta-V for minimal fuel consumption...");
            // Higher velocity = Higher baseline cost/effort
            const targetDeltaV = 50 * (velocity / 7.0);
            const optData = optimizeFuelUsage(targetDeltaV, fuelCurrent);
            get().setOptimizationData(optData);

            const best = optData[optData.length - 1];
            setTimeout(() => {
                get().addReasoningLog(`Optimal Solution: Burn ${best.velocity.toFixed(2)} m/s (Cost: ${best.cost.toFixed(1)})`);
                get().addReasoningLog("Executing Maneuver Sequence...");

                // Deduct Fuel
                consumeFuel(best.cost);
            }, 1000);
        }, 1500);
    },
    resetSimulation: () => set((state) => ({
        fuelCurrent: state.fuelStart, // Fix: Use the configured start value
        status: 'IDLE',
        threatDetected: false,
        evasionActive: false,
        optimizationData: [],
        aiReasoningLog: []
    }))
}));
