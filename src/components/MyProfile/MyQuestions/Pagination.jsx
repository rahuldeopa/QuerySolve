import React from 'react';

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className="flex justify-center mt-6">
            <ul className="flex items-center gap-1.5" aria-label="Pagination">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button 
                            onClick={() => paginate(number)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold bg-surface border border-surfaceBorder text-textMuted hover:text-primary hover:border-primary/30 hover:bg-primary/5 hover:-translate-y-0.5 active:scale-90 transition-all duration-200"
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
