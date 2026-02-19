import { useSimulationStore } from '../../store/simulationStore';
import { TrendingUp, CheckCircle2 } from 'lucide-react';

export const OptimizationVisualizer = () => {
    const { optimizationData = [], status } = useSimulationStore(); // 👈 default empty array

    if (!optimizationData || optimizationData.length === 0) return null;

    // Normalize data for display
    const maxCost = Math.max(...optimizationData.map(d => d.cost), 1); // 👈 prevent divide-by-zero

    const lastStep = optimizationData[optimizationData.length - 1];

    return (
        <div className="w-96 bg-black/95 border-2 border-aegis-secondary p-6 rounded-xl backdrop-blur-xl animate-slide-up shadow-[0_0_50px_rgba(0,255,100,0.2)]">
            <h3 className="text-aegis-secondary font-orbitron text-lg mb-4 border-b border-aegis-secondary/50 pb-2 flex items-center gap-2 tracking-widest">
                <TrendingUp size={24} /> ML VELOCITY OPTIMIZER
            </h3>

            <div className="h-48 flex items-end gap-1.5 border-l-2 border-b-2 border-gray-600 p-2 relative bg-gray-900/50 rounded-tr-lg">
                {optimizationData?.map((step, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-aegis-secondary/50 to-aegis-secondary hover:brightness-125 transition-all relative group rounded-t-sm"
                        style={{ height: `${Math.max((step.cost / maxCost) * 100, 5)}%` }}
                    >
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 bg-white text-black font-bold text-xs p-2 rounded whitespace-nowrap mb-2 z-50 pointer-events-none shadow-lg">
                            V: {step.velocity?.toFixed(2)} | Cost: {step.cost?.toFixed(1)}
                        </div>
                    </div>
                ))}

                <div className="absolute top-2 right-2 text-xs text-aegis-secondary/70 font-mono bg-black/50 px-2 py-1 rounded">
                    Gradient Descent (Epoch {optimizationData.length})
                </div>
            </div>

            {status === 'EVADING' && lastStep && (
                <div className="mt-4 text-sm text-white bg-aegis-secondary/20 border border-aegis-secondary/50 p-2 rounded flex items-center justify-center gap-2 font-bold animate-pulse">
                    <CheckCircle2 size={18} className="text-aegis-secondary" />
                    <span>OPTIMAL VELOCITY FOUND: {lastStep.velocity?.toFixed(2)} km/s</span>
                </div>
            )}
        </div>
    );
};

