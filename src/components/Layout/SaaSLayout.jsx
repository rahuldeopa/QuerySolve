import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import GlobalSearchModal from '../AI/GlobalSearchModal';

export default function SaaSLayout({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopNav onSearchClick={() => setIsSearchOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 no-scrollbar scroll-smooth">
          <div className="w-full max-w-[1920px] mx-auto w-full h-full">
            {children}
          </div>
        </main>
      </div>

      <GlobalSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
