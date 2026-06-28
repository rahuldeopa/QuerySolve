import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useTheme } from '../../context/ThemeContext';

export default function TopNav({ onSearchClick }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md border-b border-surfaceBorder sticky top-0 z-20 transition-colors duration-300">

      {/* Search Bar (Triggers Command Palette) */}
      <div className="flex-1 max-w-xl">
        <button
          onClick={onSearchClick}
          className="w-full flex items-center gap-2 px-4 py-2 bg-surfaceHover/50 border border-surfaceBorder rounded-xl text-textMuted hover:bg-primary/5 hover:border-primary/30 transition-colors group"
        >
          <SearchIcon fontSize="small" className="group-hover:text-primary transition-colors" />
          <span className="text-sm font-medium">Search queries, people, or ask AI...</span>
          <div className="ml-auto flex items-center gap-1">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold text-textMuted bg-surface border border-surfaceBorder rounded-md">Ctrl</kbd>
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold text-textMuted bg-surface border border-surfaceBorder rounded-md">K</kbd>
          </div>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-4">

        {/* AI Action */}
        <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 transition-colors">
          <AutoAwesomeIcon fontSize="small" className="text-accent" />
          <span className="text-sm font-semibold text-gradient">Ask AI</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-textMuted hover:text-textMain hover:bg-surfaceHover rounded-full transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </button>

        {/* Notifications */}
        <button className="p-2 text-textMuted hover:text-textMain hover:bg-surfaceHover rounded-full transition-colors relative">
          <NotificationsNoneIcon fontSize="small" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-secondary rounded-full border border-surface"></span>
        </button>
      </div>
    </header>
  );
}
