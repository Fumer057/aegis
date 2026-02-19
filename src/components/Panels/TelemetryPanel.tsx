import { useSimulationStore } from '../../store/simulationStore';
import { Activity, Gauge } from 'lucide-react';

export const TelemetryPanel = () => {
    const { altitude, velocity } = useSimulationStore();
    return (
        <div className="w-64 bg-aegis-bg/80 border border-aegis-primary/30 p-4 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.2)]">
            <h3 className="text-aegis-primary font-orbitron text-lg mb-2 border-b border-aegis-primary/30 pb-1 flex items-center gap-2">
                <Activity size={18} /> TELEMETRY
            </h3>
            <div className="space-y-3 font-rajdhani">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">ALTITUDE</span>
                    <span className="text-xl font-bold">{altitude.toFixed(1)} km</span>
                </div>
                <div className="w-full bg-aegis-dark h-1 rounded overflow-hidden">
                    <div className="h-full bg-aegis-primary w-[70%] animate-pulse"></div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400">VELOCITY</span>
                    <span className="text-xl font-bold">{velocity.toFixed(3)} km/s</span>
                </div>
                <div className="w-full bg-aegis-dark h-1 rounded overflow-hidden">
                    <div className="h-full bg-aegis-secondary w-[85%]"></div>
                </div>
            </div>
        </div>
    );
};
