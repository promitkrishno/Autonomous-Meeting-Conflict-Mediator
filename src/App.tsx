import React, { useState } from 'react';
import { Menu, X, CheckCircle2, Info } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { MediatorDashboard } from './components/MediatorDashboard';
import { SmartCalendarView } from './components/SmartCalendarView';
import { InterceptionResolutionModal } from './components/InterceptionResolutionModal';
import { TeamHealthDeepDive } from './components/TeamHealthDeepDive';
import { SystemSettings } from './components/SystemSettings';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden text-foreground selection:bg-primary/20 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-14 md:bottom-12 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`px-4 py-3 rounded-lg shadow-lg border text-sm font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-primary text-primary-foreground border-primary/20' : 'bg-card text-foreground border-border'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <Info size={18} />}
            {toast.message}
          </div>
        </div>
      )}

      {/* Sidebar Overlay (Active on all screens when open) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Drawer Sidebar (Hidden by default on all screens, slides in when toggled) */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false); // Close sidebar after selection
          }} 
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      
      <main className="flex-1 h-full overflow-hidden relative flex flex-col">
        {/* Global Header (Visible on all screens) */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
             <button onClick={toggleSidebar} className="p-2 -ml-2 mr-1 rounded-lg hover:bg-muted text-foreground transition-colors">
               <Menu size={22} />
             </button>
             <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">
                A
              </div>
              <h1 className="font-semibold text-sm sm:text-base leading-tight text-foreground hidden sm:block">Conflict Mediator</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-20 w-full">
          {activeTab === 'dashboard' && <MediatorDashboard />}
          {activeTab === 'calendar' && (
            <SmartCalendarView 
              onResolveClick={() => setIsModalOpen(true)} 
              showToast={showToast}
            />
          )}
          {activeTab === 'team' && <TeamHealthDeepDive />}
          {activeTab === 'settings' && <SystemSettings />}
        </div>
      </main>

      {isModalOpen && <InterceptionResolutionModal 
        onClose={() => setIsModalOpen(false)} 
        onApply={() => {
          setIsModalOpen(false);
          showToast('Resolution applied successfully. Meeting rescheduled.', 'success');
        }}
      />}
      
      {/* Global Footer */}
      <div className="fixed bottom-0 w-full p-2.5 text-center text-[10px] md:text-xs text-muted-foreground bg-card/90 backdrop-blur-md z-30 border-t border-border shadow-[0_-4px_10px_rgb(0,0,0,0.02)]">
        Developed By <a href="https://github.com/promitkrishno" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:underline hover:text-primary transition-colors">Promit Krishno Sarker</a>
      </div>
    </div>
  );
}
