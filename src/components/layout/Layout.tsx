
import React, { useEffect, useState } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useChatStore } from '@/store/chatStore';
import RadialNodeView from '../nodes/RadialNodeView';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isRadialViewOpen, toggleRadialView } = useChatStore();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is applied after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-gradient-to-b from-void-50 to-void-100 dark:from-void-900 dark:to-void-950 transition-colors duration-300">
      <header className="w-full px-4 py-3 glass-panel fixed top-0 z-50 flex justify-between items-center border-b border-void-200 dark:border-void-800">
        <div className="flex items-center">
          <h1 className="text-xl font-medium tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-void-900 to-void-600 dark:from-void-50 dark:to-void-300">
              void
            </span>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleRadialView}
            className="p-2 rounded-full transition-all hover:bg-void-200 dark:hover:bg-void-800"
            aria-label="Toggle radial view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="21.17" y1="8" x2="12" y2="8" />
              <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
              <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
            </svg>
          </button>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 pt-16 w-full max-w-5xl mx-auto pb-32">
        {children}
      </main>
      
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity",
          isRadialViewOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleRadialView}
      />
      
      <div 
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 h-[85vh] bg-background rounded-t-2xl border-t border-void-200 dark:border-void-800 shadow-2xl transition-transform duration-500 ease-in-out",
          isRadialViewOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-1 bg-void-300 dark:bg-void-700 rounded-full opacity-70" />
        </div>
        <div className="p-4 h-full">
          <h2 className="text-xl font-medium mb-4 text-center">Conversation Tree</h2>
          <RadialNodeView />
        </div>
      </div>
    </div>
  );
};

export default Layout;
