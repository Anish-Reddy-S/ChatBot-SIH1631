import React from 'react';
import { APP_TITLE } from '../constants';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  toggleSidebar: () => void;
}

const NavLink: React.FC<{
  view: View;
  currentView: View;
  setCurrentView: (view: View) => void;
  children: React.ReactNode;
}> = ({ view, currentView, setCurrentView, children }) => {
  const isActive = currentView === view;
  const classes = `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? 'bg-blue-700 text-white'
      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
  }`;

  return (
    <button onClick={() => setCurrentView(view)} className={classes}>
      {children}
    </button>
  );
};

const HamburgerIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, toggleSidebar }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-10 flex-shrink-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4 p-1 text-white hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white">
                <HamburgerIcon />
            </button>
            <img src="https://picsum.photos/seed/dteaplogo/40/40" alt="CampusAssist Logo" className="h-10 w-10 mr-3 rounded-full"/>
            <h1 className="text-xl font-semibold">{APP_TITLE}</h1>
        </div>
        <nav className="flex items-center space-x-2">
            <NavLink view={View.CHAT} currentView={currentView} setCurrentView={setCurrentView}>Chat</NavLink>
            <NavLink view={View.FAQ} currentView={currentView} setCurrentView={setCurrentView}>FAQ</NavLink>
            <NavLink view={View.ABOUT} currentView={currentView} setCurrentView={setCurrentView}>About</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;