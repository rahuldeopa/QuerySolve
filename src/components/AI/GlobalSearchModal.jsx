import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent, but we might want to focus
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-surface border border-surfaceBorder rounded-2xl shadow-2xl overflow-hidden animate-slide-up mx-4">
        <div className="flex items-center px-4 py-4 border-b border-surfaceBorder bg-surfaceHover">
          <SearchIcon className="text-textMuted mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-textMain text-lg placeholder-textMuted"
            placeholder="Search naturally (e.g. 'show unresolved payment issues')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-textMuted bg-surface border border-surfaceBorder rounded-md ml-3">ESC</kbd>
        </div>

        {/* AI Semantic Suggestion (only show if query is long enough) */}
        {query.length > 3 && (
          <div className="px-4 py-3 bg-primary/5 border-b border-surfaceBorder flex items-center gap-3">
            <AutoAwesomeIcon className="text-accent" fontSize="small" />
            <span className="text-sm text-textMain">
              AI searching for semantics matching <span className="font-semibold">"{query}"</span>...
            </span>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto py-2">
          
          <div className="px-4 py-2 text-xs font-semibold text-textMuted uppercase tracking-wider">
            Recent Queries
          </div>
          
          <div className="px-2">
            <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-surfaceHover rounded-xl text-left transition-colors group">
              <div className="w-8 h-8 rounded-full bg-surface border border-surfaceBorder flex items-center justify-center group-hover:border-primary">
                <ListAltIcon fontSize="small" className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-textMain group-hover:text-primary transition-colors">Payment Gateway Failing in Production</div>
                <div className="text-xs text-textMuted">ISSUE-402 • Open • High Priority</div>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-surfaceHover rounded-xl text-left transition-colors group">
              <div className="w-8 h-8 rounded-full bg-surface border border-surfaceBorder flex items-center justify-center group-hover:border-secondary">
                <PeopleIcon fontSize="small" className="text-secondary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-textMain group-hover:text-secondary transition-colors">Assign to Rahul Deopa</div>
                <div className="text-xs text-textMuted">Action</div>
              </div>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
