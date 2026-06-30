import React from 'react';
import { HomeOutlined, LocalFireDepartmentOutlined, TrendingUpOutlined, PublicOutlined, TagOutlined, AccountCircleOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const itemBase = "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200";

export default function Sidebar() {
    return (
        <div className="hidden lg:flex w-64 flex-shrink-0 min-h-[calc(100vh-4rem)] border-r border-surfaceBorder bg-surface/30 flex-col overflow-y-auto custom-scrollbar">
            <div className="py-6 px-4 flex flex-col gap-6 sticky top-16">

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
                            to="/questions"
                            className={({ isActive }) => `${itemBase} ${isActive && window.location.pathname === '/questions' ? 'bg-surfaceHover text-textMain font-bold' : 'text-textMuted hover:bg-surfaceHover/50 hover:text-textMain'}`}
                        >
                            <LocalFireDepartmentOutlined fontSize="small" className="transition-transform duration-200 group-hover:scale-110" /> Popular
                        </NavLink>
                    </motion.div>
                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}>
                        <NavLink
                            to="/questions?filter=unanswered"
                            className={`${itemBase} text-textMuted hover:bg-surfaceHover/50 hover:text-textMain`}
                        >
                            <TrendingUpOutlined fontSize="small" className="transition-transform duration-200 group-hover:scale-110" /> Unanswered
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
    );
}
