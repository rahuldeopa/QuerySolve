import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SensorsIcon from '@mui/icons-material/Sensors'; // Using as Signal icon
import BlurOffIcon from '@mui/icons-material/BlurOff'; // Using as Noise icon

export default function TechVote({ initialScore, initialVoteStatus, onUpvote, onDownvote }) {
    const [voteStatus, setVoteStatus] = useState(initialVoteStatus || 'none'); // 'signal', 'noise', 'none'
    
    // Update local state if the prop changes
    React.useEffect(() => {
        setVoteStatus(initialVoteStatus || 'none');
    }, [initialVoteStatus]);
    const [animateSignal, setAnimateSignal] = useState(false);
    const [animateNoise, setAnimateNoise] = useState(false);

    const handleSignal = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Visual Animation
        setAnimateSignal(true);
        setTimeout(() => setAnimateSignal(false), 800);
        
        // Trigger API Callback
        if (onUpvote) onUpvote(e);
        
        // Optimistic color update
        setVoteStatus(prev => prev === 'signal' ? 'none' : 'signal');
    };

    const handleNoise = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Visual Animation
        setAnimateNoise(true);
        setTimeout(() => setAnimateNoise(false), 500);

        // Trigger API Callback
        if (onDownvote) onDownvote(e);
        
        // Optimistic color update
        setVoteStatus(prev => prev === 'noise' ? 'none' : 'noise');
    };

    return (
        <div className="flex flex-col items-center gap-2 flex-shrink-0 bg-surfaceHover/50 border border-surfaceBorder rounded-xl p-2 h-max relative select-none">
            
            {/* The Signal Button */}
            <div className="relative">
                <button 
                    onClick={handleSignal}
                    className={`p-1.5 rounded-lg transition-all active:scale-95 z-10 relative
                        ${voteStatus === 'signal' 
                            ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                            : 'hover:bg-emerald-500/10 text-textMuted hover:text-emerald-400'
                        }
                    `}
                    title="Boost Signal"
                >
                    <SensorsIcon fontSize="small" />
                </button>

                {/* Glowing Wave Animation */}
                <AnimatePresence>
                    {animateSignal && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0.8 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="absolute inset-0 rounded-full bg-emerald-500 pointer-events-none"
                            style={{ zIndex: 0 }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* The Score */}
            <span className={`text-lg font-extrabold transition-colors duration-300
                ${voteStatus === 'signal' ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : ''}
                ${voteStatus === 'noise' ? 'text-rose-500 drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]' : ''}
                ${voteStatus === 'none' ? 'text-textMain' : ''}
            `}>
                {initialScore}
            </span>

            {/* The Noise Button */}
            <div className="relative">
                <motion.button 
                    onClick={handleNoise}
                    animate={animateNoise ? { x: [-2, 2, -2, 2, 0], y: [1, -1, 1, -1, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className={`p-1.5 rounded-lg transition-all active:scale-95 z-10 relative
                        ${voteStatus === 'noise' 
                            ? 'bg-rose-500/20 text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]' 
                            : 'hover:bg-rose-500/10 text-textMuted hover:text-rose-500'
                        }
                    `}
                    title="Mark as Noise"
                >
                    <BlurOffIcon fontSize="small" />
                </motion.button>
            </div>
            
            {/* Visual Glitch Overlay for Noise */}
            <AnimatePresence>
                {animateNoise && (
                    <motion.div
                        initial={{ opacity: 0, scaleY: 1 }}
                        animate={{ opacity: [0, 0.8, 0], scaleY: [1, 1.5, 1], filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-rose-500/10 mix-blend-overlay pointer-events-none rounded-xl"
                        style={{ zIndex: 20 }}
                    />
                )}
            </AnimatePresence>

        </div>
    );
}
