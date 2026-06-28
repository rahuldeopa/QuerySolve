import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';

export default function AuthModal({ isOpen, onClose, message = "Join the community to view full threads and vote!" }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className="bg-surface border border-surfaceBorder w-full max-w-md rounded-2xl p-8 relative shadow-2xl shadow-primary/20 overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-surfaceHover text-textMuted hover:text-textMain hover:rotate-90 active:scale-90 transition-all duration-300"
                        >
                            <CloseIcon fontSize="small" />
                        </button>

                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-primary/10 ring-4 ring-primary/5 flex items-center justify-center text-primary text-3xl mb-2 animate-pulse-slow">
                                <LockIcon fontSize="large" />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-textMain">Authentication Required</h2>
                            
                            <p className="text-textMuted leading-relaxed">
                                {message}
                            </p>

                            <div className="flex flex-col w-full gap-3 mt-6">
                                <NavLink
                                    to="/login"
                                    className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/40 active:scale-95 text-center"
                                >
                                    Log In
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="w-full bg-surfaceHover hover:bg-surfaceBorder text-textMain font-semibold py-3 px-4 rounded-xl border border-surfaceBorder transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 active:scale-95 text-center"
                                >
                                    Create an Account
                                </NavLink>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
