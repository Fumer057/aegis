import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../../services/ai';
import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

export const AIChatOverlay: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: 'SYSTEM ONLINE. AWAITING INPUT.' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInputValue('');
        setIsLoading(true);

        const response = await sendMessageToAI(userMessage);

        setMessages(prev => [...prev, {
            role: 'ai',
            content: response.error ? `ERROR: ${response.error}` : response.reply
        }]);
        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 font-mono">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-80 md:w-96 bg-black/80 border border-cyan-500/50 backdrop-blur-md rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-cyan-900/30 p-3 border-b border-cyan-500/30 flex justify-between items-center text-cyan-400">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="text-sm font-bold tracking-wider">AI_ASSISTANT_V1</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:text-cyan-200 transition-colors"
                            >
                                <Minimize2 size={16} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded text-sm ${msg.role === 'user'
                                                ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-50 ml-4 rounded-tr-none'
                                                : 'bg-slate-900/80 border border-slate-700 text-cyan-100 mr-4 rounded-tl-none'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-900/80 border border-slate-700 p-3 rounded text-cyan-400 text-sm flex gap-1 items-center">
                                        <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-3 border-t border-cyan-500/30 bg-black/40 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="ENTER_COMMAND..."
                                className="flex-1 bg-cyan-950/30 border border-cyan-500/30 rounded px-3 py-2 text-sm text-cyan-100 placeholder-cyan-700 focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputValue.trim()}
                                className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 border border-cyan-500/50 rounded px-3 py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="bg-cyan-500/10 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500 rounded-full p-4 shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all group"
                >
                    <MessageSquare className="w-6 h-6 group-hover:animate-pulse" />
                </motion.button>
            )}
        </div>
    );
};
