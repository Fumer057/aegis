import { useRef, useEffect } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { Bot, Terminal } from 'lucide-react';

export const AIPanel = () => {
    const { aiReasoningLog = [], status } = useSimulationStore(); // 👈 default empty array
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [aiReasoningLog]);

    return (
        <div className="w-80 bg-aegis-bg/90 border border-aegis-primary/30 p-4 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.1)] flex flex-col h-64">
            <h3 className="text-aegis-primary font-orbitron text-sm mb-2 border-b border-aegis-primary/30 pb-1 flex items-center gap-2">
                <Bot size={16} /> AEGIS AI ASSISTANT
            </h3>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto font-mono text-xs space-y-1 pr-2"
            >
                {aiReasoningLog?.length === 0 ? (   // 👈 optional chaining added
                    <div className="text-gray-600 italic flex items-center gap-2">
                        <Terminal size={12} /> System Standby...
                    </div>
                ) : (
                    aiReasoningLog?.map((log, i) => (  // 👈 safe map
                        <div key={i} className="animate-fade-in">
                            <span className="text-aegis-primary/50 mr-2">
                                [{new Date().toLocaleTimeString().split(' ')[0]}]
                            </span>
                            <span className="text-gray-300">{log}</span>
                        </div>
                    ))
                )}

                {status === 'EVADING' && (
                    <div className="text-aegis-secondary animate-pulse mt-2">
                        » EXECUTION IN PROGRESS...
                    </div>
                )}
            </div>
        </div>
    );
};
