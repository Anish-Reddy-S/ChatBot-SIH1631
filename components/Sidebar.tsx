import React, { useState } from 'react';
import TodoList from './sidebar/TodoList';
import Notes from './sidebar/Notes';
import QuickLinks from './sidebar/QuickLinks';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

type Tool = 'todo' | 'notes' | 'links';

const ToolButton: React.FC<{
  label: string;
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex-1 flex flex-col items-center justify-center p-3 text-xs font-medium border-b-2 transition-all duration-200 ${
            isActive 
            ? 'text-blue-600 border-blue-600 bg-blue-50' 
            : 'text-slate-500 border-transparent hover:bg-slate-100'
        }`}
    >
        {icon}
        <span className="mt-1">{label}</span>
    </button>
);

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, closeSidebar }) => {
  const [activeTool, setActiveTool] = useState<Tool>('todo');

  const tools: { id: Tool, label: string; icon: JSX.Element; component: JSX.Element }[] = [
    { id: 'todo', label: 'To-Do', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>, component: <TodoList /> },
    { id: 'notes', label: 'Notes', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>, component: <Notes /> },
    { id: 'links', label: 'Links', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>, component: <QuickLinks /> },
  ];

  const activeComponent = tools.find(t => t.id === activeTool)?.component;

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black bg-opacity-40 z-20 transition-opacity lg:hidden ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`
          bg-white border-r border-slate-200 z-30
          w-72 flex flex-col
          transition-transform duration-300 ease-in-out
          fixed inset-y-0 left-0
          lg:static lg:w-80 lg:transform-none lg:flex-shrink-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${!isSidebarOpen && 'lg:hidden'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">Campus Tools</h2>
          <button onClick={closeSidebar} className="lg:hidden p-1 text-slate-500 hover:text-slate-800">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
          </button>
        </div>
        
        <div className="flex border-b border-slate-200">
            {tools.map(tool => (
                <ToolButton 
                    key={tool.id} 
                    label={tool.label}
                    icon={tool.icon} 
                    isActive={activeTool === tool.id}
                    onClick={() => setActiveTool(tool.id)}
                />
            ))}
        </div>

        <div className="flex-grow overflow-y-auto">
          {activeComponent}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;