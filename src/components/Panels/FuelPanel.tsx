import { useSimulationStore } from '../../store/simulationStore';
import { Battery, BatteryCharging } from 'lucide-react';

export const FuelPanel = () => {
    const { fuelCurrent, fuelStart } = useSimulationStore();
    const percentage = (fuelCurrent / fuelStart) * 100;
    const isLow = percentage < 20;

    return (
        <div className="w-64 bg-aegis-bg/80 border border-aegis-primary/30 p-4 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.2)]">
            <h3 className={`font-orbitron text-lg mb-2 border-b  pb-1 flex items-center gap-2 ${isLow ? 'text-red-500 border-red-500/30' : 'text-aegis-primary border-aegis-primary/30'}`}>
                {isLow ? <Battery size={18} /> : <BatteryCharging size={18} />} SYSTEM RESOURCES
            </h3>

            <div className="flex justify-between items-end mb-1">
                <span className="text-gray-400 text-sm font-rajdhani">FUEL CELL</span>
                <span className={`text-2xl font-bold font-rajdhani ${isLow ? 'text-red-500' : 'text-aegis-primary'}`}>
                    {percentage.toFixed(1)}%
                </span>
            </div>

            <div className="w-full bg-aegis-dark h-3 rounded-full overflow-hidden border border-gray-800">
                <div
                    className={`h-full transition-all duration-300 ${isLow ? 'bg-red-600 shadow-[0_0_10px_red]' : 'bg-aegis-primary shadow-[0_0_10px_#00f3ff]'}`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <div className="mt-2 text-xs text-gray-500 font-mono text-right">
                {fuelCurrent.toFixed(0)} / {fuelStart.toFixed(0)} UNITS
            </div>
        </div>
    );
};
