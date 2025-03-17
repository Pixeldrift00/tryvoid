
import React, { useEffect, useState } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useChatStore } from '@/store/chatStore';
import RadialNodeView from '../nodes/RadialNodeView';
import { cn } from '@/lib/utils';
import { Settings, MessageSquare, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isRadialViewOpen, toggleRadialView } = useChatStore();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Ensure theme is applied after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full flex relative bg-gradient-to-b from-void-50 to-void-100 dark:from-void-900 dark:to-void-950 transition-colors duration-300">
      {/* Sidebar - increased width to 64 (16rem) */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-64 bg-background/60 backdrop-blur-sm border-r border-void-200 dark:border-void-800 flex flex-col items-center py-4 z-50 transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="px-4 pb-4 border-b border-void-200 dark:border-void-800">
          {/* Chat history would go here */}
        </div>
        <div className="flex-1" />
        <div className="px-4 space-y-2">
          <button
            onClick={() => navigate('/')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-void-200/80 dark:hover:bg-void-800/80",
              location.pathname === '/' && "bg-void-200/80 dark:bg-void-800/80"
            )}
            aria-label="Chat"
          >
            <MessageSquare size={20} />
            <span>Chat</span>
          </button>
          <button
            onClick={() => navigate('/home')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-void-200/80 dark:hover:bg-void-800/80",
              location.pathname === '/home' && "bg-void-200/80 dark:bg-void-800/80"
            )}
            aria-label="Home"
          >
            <Home size={20} />
            <span>Home</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-void-200/80 dark:hover:bg-void-800/80",
              location.pathname === '/settings' && "bg-void-200/80 dark:bg-void-800/80"
            )}
            aria-label="Settings"
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64">
        <header className="w-full px-4 py-3 glass-panel fixed top-0 z-40 flex justify-between items-center border-b border-void-200 dark:border-void-800">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2"
              aria-label="Toggle sidebar"
            >
              <div className="w-2 h-2 rounded-full bg-void-900 dark:bg-void-50 transition-colors" />
            </button>
            {/* Void SVG logo */}
            <div className="flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" className="stroke-void-900 dark:stroke-void-50" strokeWidth="2"/>
                <circle cx="12" cy="12" r="5" className="fill-void-900 dark:fill-void-50"/>
              </svg>
            </div>
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
      </div>
      
      {/* Radial View Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity",
          isRadialViewOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleRadialView}
      />
      
      {/* Radial View Panel */}
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
