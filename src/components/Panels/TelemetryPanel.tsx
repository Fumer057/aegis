import { useSimulationStore } from '../../store/simulationStore';
import { Activity, Gauge } from 'lucide-react';

export const TelemetryPanel = () => {
    const { altitude, velocity, updateTelemetry } = useSimulationStore();
    return (
        <div className="w-64 bg-aegis-bg/80 border border-aegis-primary/30 p-4 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.2)]">
            <h3 className="text-aegis-primary font-orbitron text-lg mb-2 border-b border-aegis-primary/30 pb-1 flex items-center gap-2">
                <Activity size={18} /> TELEMETRY
            </h3>
            <div className="space-y-4 font-rajdhani">
                {/* Altitude Control */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-sm">ALTITUDE</span>
                        <span className="text-xl font-bold text-aegis-primary">{altitude.toFixed(1)} km</span>
                    </div>
                    <input
                        type="range"
                        min="200"
                        max="2000"
                        step="10"
                        value={altitude}
                        onChange={(e) => updateTelemetry(Number(e.target.value), velocity)}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-aegis-primary"
                    />
                </div>

                {/* Velocity Control */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-sm">VELOCITY</span>
                        <span className="text-xl font-bold text-aegis-secondary">{velocity.toFixed(3)} km/s</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="15"
                        step="0.1"
                        value={velocity}
                        onChange={(e) => updateTelemetry(altitude, Number(e.target.value))}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-aegis-secondary"
                    />
                </div>
            </div>
        </div>
    );
};
