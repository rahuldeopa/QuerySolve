import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Background3D from './Background3D';
import doubt from './doubt.png';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import CodeIcon from '@mui/icons-material/Code';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Homepage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background transition-colors duration-300">
            {/* 3D Background */}
            <Background3D />
            
            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column - Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col gap-6"
                    >
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-surfaceHover/60 backdrop-blur-md text-primary px-4 py-2 rounded-full border border-surfaceBorder w-max font-semibold text-sm shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                        >
                            <StarIcon fontSize="small" className="mb-0.5" /> The #1 Developer Community
                        </motion.div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-textMain drop-shadow-sm">
                            Unlock the Power of <br/>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                Collective Intelligence
                            </span>
                        </h1>
                        
                        <p className="text-lg text-textMuted max-w-lg leading-relaxed">
                            Join thousands of developers asking questions, solving problems, and building the future together. QuerySolve is your premium hub for technical knowledge.
                        </p>
                        
                        <motion.div 
                            className="flex flex-wrap gap-4 mt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <NavLink to="/questions" className="bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-indigo-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-indigo-500/20 transition-transform transform hover:-translate-y-1">
                                Explore Questions <ArrowForwardIcon fontSize="small" className="ml-1" />
                            </NavLink>
                            <NavLink to="/register" className="glass hover:bg-surfaceHover text-textMain font-semibold py-3 px-8 rounded-full border border-surfaceBorder transition-transform transform hover:-translate-y-1">
                                Join Community
                            </NavLink>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-surfaceBorder">
                            {[
                                { number: '10k+', label: 'Active Users' },
                                { number: '50k+', label: 'Questions Solved' },
                                { number: '99%', label: 'Resolution Rate' }
                            ].map((stat, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + (idx * 0.1) }}
                                    className="flex flex-col"
                                >
                                    <span className="text-3xl font-bold text-textMain">{stat.number}</span>
                                    <span className="text-sm text-textMuted">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    
                    {/* Right Column - Visuals */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative hidden md:flex justify-center items-center"
                    >
                        <motion.img 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            src={doubt} 
                            alt="Developers Collaborating" 
                            className="w-full max-w-md drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-10"
                        />
                        
                        {/* Floating Cards */}
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute top-10 -right-4 glass px-5 py-3 rounded-xl flex items-center gap-4 z-20"
                        >
                            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xl">
                                <CheckIcon />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-textMain">Answer Accepted</h4>
                                <p className="text-xs text-textMuted">+15 Reputation Points</p>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
                            className="absolute bottom-20 -left-8 glass px-5 py-3 rounded-xl flex items-center gap-4 z-20"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-primary flex items-center justify-center text-xl">
                                <CodeIcon />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-textMain">New Solution Found</h4>
                                <p className="text-xs text-textMuted">React Hooks Implementation</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            <footer className="absolute bottom-0 w-full text-center py-6 border-t border-surfaceBorder bg-surface/80 backdrop-blur-md z-20">
                <p className="text-sm text-textMuted">
                    © 2025 Made With <FavoriteIcon fontSize="small" className="text-secondary mx-1 mb-0.5" /> QuerySolve Platform
                </p>
            </footer>
        </div>
    );
}

export default Homepage;
