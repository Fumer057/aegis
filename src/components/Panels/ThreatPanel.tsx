import { useSimulationStore } from '../../store/simulationStore';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const ThreatPanel = () => {
    const { status, threatDetected } = useSimulationStore();

    return (
        <div className={`w-80 p-4 rounded-lg backdrop-blur-md border transition-all duration-500 ${threatDetected ? 'bg-red-950/80 border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.4)] animate-pulse' : 'bg-aegis-bg/80 border-aegis-primary/30 shadow-[0_0_15px_rgba(0,243,255,0.2)]'}`}>
            <h3 className={`font-orbitron text-lg mb-2 border-b pb-1 flex items-center justify-between ${threatDetected ? 'text-red-500 border-red-500/30' : 'text-aegis-primary border-aegis-primary/30'}`}>
                <span className="flex items-center gap-2">
                    {threatDetected ? <AlertTriangle size={18} /> : <ShieldCheck size={18} />}
                    THREAT MONITOR
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${threatDetected ? 'bg-red-500 text-black font-bold' : 'bg-green-500/20 text-green-400'}`}>
                    {status}
                </span>
            </h3>

            <div className="h-32 bg-aegis-dark/50 rounded border border-gray-800 relative overflow-hidden flex items-center justify-center">
                {/* Radar visualization placeholder */}
                <div className="absolute inset-0 border-2 border-gray-800 rounded-full scale-75 opacity-20"></div>
                <div className="absolute inset-0 border-2 border-gray-800 rounded-full scale-50 opacity-20"></div>
                <div className="absolute w-full h-[1px] bg-gray-800 top-1/2"></div>
                <div className="absolute h-full w-[1px] bg-gray-800 left-1/2"></div>

                {/* This would be the radar sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-aegis-primary/10 to-transparent w-full h-full animate-[spin_4s_linear_infinite] origin-center opacity-30"></div>

                {threatDetected ? (
                    <div className="absolute top-1/3 right-1/3">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute"></div>
                        <div className="w-3 h-3 bg-red-500 rounded-full relative"></div>
                    </div>
                ) : (
                    <div className="text-gray-600 text-xs font-mono">SCANNING SECTOR...</div>
                )}
            </div>

            {threatDetected && (
                <div className="mt-3 text-red-400 text-sm font-mono border-l-2 border-red-500 pl-2">
                    <p>WARNING: COLLISION IMMINENT</p>
                    <p>OBJECT: UNKNOWN DEBRIS</p>
                    <p>ACTION: EVASIVE MANEUVER REQ.</p>
                </div>
            )}
        </div>
    );
};
