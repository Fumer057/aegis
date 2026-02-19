import { TelemetryPanel } from "../Panels/TelemetryPanel";
import { FuelPanel } from "../Panels/FuelPanel";
import { ThreatPanel } from "../Panels/ThreatPanel";
import { useSimulationStore } from "../../store/simulationStore";
import { ConfigPanel } from "./ConfigPanel";
import { AIPanel } from "../Panels/AIPanel";
import { OptimizationVisualizer } from "../Panels/OptimizationVisualizer";

// UI Overlay
export const HeadsUpDisplay = () => {
    const { threatDetected, setThreatDetected, triggerEvasion, resetSimulation } = useSimulationStore();

    const handleThreatToggle = () => {
        setThreatDetected(!threatDetected);
    };

    return (
        <div className="relative w-screen h-screen pointer-events-none">
            {/* Top Bar */}
            <div className="absolute top-0 w-full p-2 flex justify-center bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
                <h1 className="text-2xl font-orbitron text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    AEGIS ORBIT // DEFENSE SYSTEM
                </h1>
            </div>

            {/* Panels - Enable pointer events for them if they become interactive */}
            <div className="pointer-events-auto">
                <ConfigPanel />
                <TelemetryPanel />
                <FuelPanel />
                <ThreatPanel />
                <AIPanel />
                <OptimizationVisualizer />
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-2 pointer-events-auto">
                <button
                    onClick={handleThreatToggle}
                    className="bg-aegis-dark/80 border border-aegis-primary hover:bg-aegis-primary/20 text-aegis-primary px-4 py-2 rounded font-orbitron transition-all"
                >
                    {threatDetected ? "CLEAR THREAT" : "SIMULATE THREAT"}
                </button>
                <button
                    onClick={triggerEvasion}
                    disabled={!threatDetected}
                    className={`px-4 py-2 rounded font-orbitron transition-all border ${threatDetected ? 'bg-red-900/50 border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer' : 'bg-gray-800/50 border-gray-700 text-gray-500 cursor-not-allowed'}`}
                >
                    INITIATE EVASION
                </button>
                <button
                    onClick={resetSimulation}
                    className="bg-aegis-dark/80 border border-white/20 hover:bg-white/10 text-white/70 px-4 py-2 rounded font-orbitron transition-all"
                >
                    RESET SYSTEM
                </button>
            </div>

            {/* Center Reticle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full pointer-events-none flex items-center justify-center">
                <div className="w-2 h-2 bg-aegis-primary rounded-full opacity-50"></div>
                <div className="absolute w-[20px] h-[20px] border-l border-t border-aegis-primary top-10 left-10"></div>
                <div className="absolute w-[20px] h-[20px] border-r border-t border-aegis-primary top-10 right-10"></div>
                <div className="absolute w-[20px] h-[20px] border-l border-b border-aegis-primary bottom-10 left-10"></div>
                <div className="absolute w-[20px] h-[20px] border-r border-b border-aegis-primary bottom-10 right-10"></div>
            </div>
        </div>
    );
};
