import React from 'react';
import { motion } from 'framer-motion';

export default function Pagination({ postsPerPage, totalPosts, paginate, currentPage = 1 }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (pageNumbers.length <= 1) return null;

    return (
        <nav aria-label="Pagination">
            <ul className="flex items-center gap-2 glass border border-surfaceBorder rounded-2xl p-1.5 shadow-sm">
                {pageNumbers.map(number => {
                    const isActive = number === currentPage;
                    return (
                        <li key={number}>
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.88 }}
                                onClick={() => paginate(number)}
                                className={`relative w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                                    isActive
                                        ? 'text-white'
                                        : 'text-textMuted hover:text-primary hover:bg-surfaceHover'
                                }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activePage"
                                        transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30 -z-10"
                                    />
                                )}
                                {number}
                            </motion.button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
