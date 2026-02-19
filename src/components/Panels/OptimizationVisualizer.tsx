import { useSimulationStore } from '../../store/simulationStore';
import { TrendingUp, CheckCircle2 } from 'lucide-react';

export const OptimizationVisualizer = () => {
    const { optimizationData, status } = useSimulationStore();

    if (optimizationData.length === 0) return null;

    // Normalize data for display
    const maxCost = Math.max(...optimizationData.map(d => d.cost));

    return (
        <div className="absolute bottom-24 right-4 w-80 bg-aegis-bg/90 border border-aegis-secondary/50 p-4 rounded-lg backdrop-blur-md animate-slide-up">
            <h3 className="text-aegis-secondary font-orbitron text-sm mb-2 border-b border-aegis-secondary/30 pb-1 flex items-center gap-2">
                <TrendingUp size={16} /> ML OPTIMIZER
            </h3>

            <div className="h-32 flex items-end gap-1 border-l border-b border-gray-700 p-1 relative">
                {optimizationData.map((step, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-aegis-secondary/30 hover:bg-aegis-secondary transition-all relative group"
                        style={{ height: `${(step.cost / maxCost) * 100}%` }}
                    >
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-xs text-white p-1 rounded whitespace-nowrap mb-1 z-10 pointer-events-none">
                            V: {step.velocity.toFixed(2)} | Cost: {step.cost.toFixed(1)}
                        </div>
                    </div>
                ))}
                <div className="absolute top-2 right-2 text-xs text-gray-500 font-mono">
                    Gradient Descent (Epoch {optimizationData.length})
                </div>
            </div>

            {status === 'EVADING' && (
                <div className="mt-2 text-xs text-aegis-primary flex items-center gap-1">
                    <CheckCircle2 size={12} /> Optimal Solution Found: V={optimizationData[optimizationData.length - 1].velocity.toFixed(2)}m/s
                </div>
            )}
        </div>
    );
};
