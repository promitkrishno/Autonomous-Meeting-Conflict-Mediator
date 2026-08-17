import React from 'react';
import { Calendar, LayoutDashboard, Settings, Activity, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dpImg from '../imports/dp.jpg';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClose?: () => void;
}

export function Sidebar({ activeTab, setActiveTab, onClose }: SidebarProps) {
  const tabs = [
    { id: 'dashboard', label: 'Mediator Dashboard', icon: LayoutDashboard },
    { id: 'calendar', label: 'Smart Calendar', icon: Calendar },
    { id: 'team', label: 'Team Health', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-[100dvh] flex flex-col p-4 shadow-sm">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            A
          </div>
          <div>
            <h1 className="font-semibold text-sm leading-tight text-foreground">Autonomous</h1>
            <p className="text-xs text-muted-foreground leading-tight">Conflict Mediator</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors md:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors text-left",
                isActive 
                  ? "bg-secondary text-secondary-foreground font-medium" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </nav>
      
      <div className="mt-auto">
        <div className="px-3 py-4 border-t border-border mt-4 flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <img src={dpImg} alt="User profile" className="w-8 h-8 rounded-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Promit Krishno Sarker</p>
            <p className="text-xs text-muted-foreground truncate">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
