import { useState } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { Settings, Play, RefreshCw } from 'lucide-react';

export const ConfigPanel = () => {
    const { altitude, velocity, fuelStart, setInitialParams, resetSimulation } = useSimulationStore();
    const [isOpen, setIsOpen] = useState(false);

    // Local state for inputs
    const [inputAlt, setInputAlt] = useState(altitude);
    const [inputVel, setInputVel] = useState(velocity);
    const [inputFuel, setInputFuel] = useState(fuelStart);

    const handleApply = () => {
        setInitialParams(Number(inputAlt), Number(inputVel), Number(inputFuel));
        resetSimulation();
        setIsOpen(false);
    };

    return (
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${isOpen ? 'w-80' : 'w-12 bg-transparent'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -left-0 top-0 bg-aegis-dark border border-aegis-primary text-aegis-primary p-2 rounded-lg hover:bg-aegis-primary/20 z-50"
            >
                <Settings size={20} />
            </button>

            {isOpen && (
                <div className="bg-aegis-bg/95 border border-aegis-primary/50 p-6 rounded-lg backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] ml-14">
                    <h3 className="text-aegis-primary font-orbitron text-lg mb-4 border-b border-aegis-primary/30 pb-2">
                        MISSION CONFIG
                    </h3>

                    <div className="space-y-4 font-rajdhani">
                        <div>
                            <label className="text-gray-400 text-sm block mb-1">ALTITUDE (km)</label>
                            <input
                                type="number"
                                value={inputAlt}
                                onChange={(e) => setInputAlt(Number(e.target.value))}
                                className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-white focus:border-aegis-primary outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-gray-400 text-sm block mb-1">VELOCITY (km/s)</label>
                            <input
                                type="number"
                                value={inputVel}
                                onChange={(e) => setInputVel(Number(e.target.value))}
                                className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-white focus:border-aegis-primary outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-gray-400 text-sm block mb-1">FUEL CAPACITY (Units)</label>
                            <input
                                type="number"
                                value={inputFuel}
                                onChange={(e) => setInputFuel(Number(e.target.value))}
                                className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-white focus:border-aegis-primary outline-none"
                            />
                        </div>

                        <div className="pt-4 flex gap-2">
                            <button
                                onClick={handleApply}
                                className="flex-1 bg-aegis-primary/20 border border-aegis-primary text-aegis-primary hover:bg-aegis-primary hover:text-black py-2 rounded font-bold transition-all flex items-center justify-center gap-2"
                            >
                                <Play size={16} /> LAUNCH
                            </button>
                            <button
                                onClick={resetSimulation}
                                className="bg-white/10 border border-white/20 text-white hover:bg-white/20 p-2 rounded transition-all"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
