import React, { useState } from 'react';
import { HomeOutlined, LocalFireDepartmentOutlined, TrendingUpOutlined, PublicOutlined, TagOutlined, AccountCircleOutlined, Menu, Close, CheckCircleOutlineOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const itemBase = "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button (Only visible on small screens) */}
            <button 
                onClick={() => setIsOpen(true)} 
                className="lg:hidden fixed bottom-6 left-6 z-40 p-3 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
            >
                <Menu />
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    onClick={() => setIsOpen(false)} 
                    className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity"
                ></div>
            )}

            {/* Sidebar Container */}
            <div className={`fixed inset-y-0 left-0 z-50 lg:z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:sticky lg:top-16 lg:translate-x-0 transition-transform duration-300 ease-in-out flex w-64 flex-shrink-0 h-screen lg:h-[calc(100vh-4rem)] border-r border-surfaceBorder bg-surface lg:bg-surface/30 flex-col overflow-y-auto no-scrollbar shadow-2xl lg:shadow-none`}>
                
                <div className="py-6 px-4 flex flex-col gap-6 sticky top-0 lg:top-16 relative">
                    {/* Mobile Close Button */}
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="lg:hidden absolute top-3 right-3 z-50 p-2 text-textMuted hover:text-textMain transition-colors bg-surface/50 rounded-full"
                    >
                        <Close />
                    </button>

                {/* Feeds */}
                <div className="flex flex-col gap-1">
                    <p className="px-3 pb-2 text-[10px] font-bold text-textMuted uppercase tracking-widest">Feeds</p>
                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}>
                        <NavLink
                            to="/"
                            className={({ isActive }) => `${itemBase} ${isActive ? 'bg-surfaceHover text-textMain font-bold' : 'text-textMuted hover:bg-surfaceHover/50 hover:text-textMain'}`}
                        >
                            <HomeOutlined fontSize="small" className="transition-transform duration-200 group-hover:scale-110" /> Home
                        </NavLink>
                    </motion.div>
                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}>
                        <NavLink
                            to="/questions?filter=top"
                            className={({ isActive }) => `${itemBase} ${isActive && window.location.pathname === '/questions' && window.location.search === '?filter=top' ? 'bg-surfaceHover text-textMain font-bold' : 'text-textMuted hover:bg-surfaceHover/50 hover:text-textMain'}`}
                        >
                            <LocalFireDepartmentOutlined fontSize="small" className="transition-transform duration-200 group-hover:scale-110" /> Popular
                        </NavLink>
                    </motion.div>
                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}>
                        <NavLink
                            to="/questions?filter=unanswered"
                            className={({ isActive }) => `${itemBase} ${isActive && window.location.pathname === '/questions' && window.location.search === '?filter=unanswered' ? 'bg-surfaceHover text-textMain font-bold' : 'text-textMuted hover:bg-surfaceHover/50 hover:text-textMain'}`}
                        >
                            <TrendingUpOutlined fontSize="small" className="transition-transform duration-200 group-hover:scale-110" /> Unanswered
                        </NavLink>
                    </motion.div>
                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}>
                        <NavLink
                            to="/questions?filter=resolved"
                            className={({ isActive }) => `${itemBase} ${isActive && window.location.pathname === '/questions' && window.location.search === '?filter=resolved' ? 'bg-surfaceHover text-textMain font-bold' : 'text-textMuted hover:bg-surfaceHover/50 hover:text-textMain'}`}
                        >
                            <CheckCircleOutlineOutlined fontSize="small" className="transition-transform duration-200 group-hover:scale-110" /> Resolved
                        </NavLink>
                    </motion.div>
                </div>

                <div className="h-px bg-surfaceBorder w-full"></div>

                {/* Discover */}
                <div className="flex flex-col gap-1">
                    <p className="px-3 pb-2 text-[10px] font-bold text-textMuted uppercase tracking-widest">Discover</p>
                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}>
                        <NavLink
                            to="/tags"
                            className={({ isActive }) => `${itemBase} ${isActive ? 'bg-surfaceHover text-textMain font-bold' : 'text-textMuted hover:bg-surfaceHover/50 hover:text-textMain'}`}
                        >
                            <TagOutlined fontSize="small" className="transition-transform duration-200 group-hover:scale-110" /> Tags & Topics
                        </NavLink>
                    </motion.div>
                    {localStorage.getItem('token') && (
                        <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) => `${itemBase} ${isActive ? 'bg-surfaceHover text-textMain font-bold' : 'text-textMuted hover:bg-surfaceHover/50 hover:text-textMain'}`}
                            >
                                <AccountCircleOutlined fontSize="small" className="transition-transform duration-200 group-hover:scale-110" /> Profile
                            </NavLink>
                        </motion.div>
                    )}
                </div>

                {/* Ask Question Button (Twitter Style) */}
                <div className="mt-4 px-2">
                    <motion.button 
                        whileHover={{ scale: 1.03 }} 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            if (localStorage.getItem('token')) {
                                window.location.href = '/editor';
                            } else {
                                window.location.href = '/login';
                            }
                        }}
                        className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-full shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-colors text-[15px]"
                    >
                        Ask Question
                    </motion.button>
                </div>

                {/* Auth section if not logged in */}
                {!localStorage.getItem('token') && (
                    <div className="mt-4 p-4 rounded-xl shadow-lg bg-surfaceHover/30 flex flex-col gap-3 relative overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/15 rounded-full blur-2xl -z-10"></div>
                        <p className="text-xs text-textMuted leading-relaxed">
                            Log in to vote, post questions, and join discussions!
                        </p>
                        <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.96 }}>
                            <NavLink to="/login" className="block w-full py-2 bg-gradient-to-r from-primary to-accent text-white text-center rounded-lg text-sm font-bold shadow-lg shadow-primary/30">
                                Log In
                            </NavLink>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                            <NavLink to="/register" className="block w-full py-2 bg-transparent border border-surfaceBorder text-textMain text-center rounded-lg text-sm font-bold hover:bg-surfaceHover hover:border-primary/30 transition-colors">
                                Sign Up
                            </NavLink>
                        </motion.div>
                    </div>
                )}

            </div>
        </div>
        </>
    );
}
