import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import ChatView from './views/ChatView';
import FAQ from './components/pages/FAQ';
import About from './components/pages/About';
import Sidebar from './components/Sidebar';
import { View } from './types';


export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<View>(View.CHAT);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Set initial sidebar state based on screen size for better UX
  useEffect(() => {
    const checkSize = () => {
      // lg breakpoint in tailwind is 1024px
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    // Check on initial load after splash screen
    if (!showSplash) {
      checkSize();
      window.addEventListener('resize', checkSize);
    }
    return () => window.removeEventListener('resize', checkSize);
  }, [showSplash]);


  return (
    <>
      {showSplash && <SplashScreen onFinished={() => setShowSplash(false)} />}
      <div className={`flex h-screen bg-white ${showSplash ? 'hidden' : ''}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          />
          
          {/* Main content area */}
          {currentView === View.CHAT && <ChatView />}
          
          {currentView !== View.CHAT && (
            <main className="flex-grow overflow-y-auto p-4 md:p-8 bg-neutral-50">
              {currentView === View.FAQ && <FAQ />}
              {currentView === View.ABOUT && <About />}
            </main>
          )}

          <Footer />
        </div>
      </div>
    </>
  );
};