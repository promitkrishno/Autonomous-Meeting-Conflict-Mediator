import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, Calendar as CalendarIcon, Clock, ArrowRightLeft, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from './Sidebar';

export function SmartCalendarView({ onResolveClick, showToast }: { onResolveClick: () => void, showToast: (msg: string, type?: 'success' | 'info') => void }) {
  const hours = Array.from({ length: 9 }, (_, i) => i + 9); // 9 AM to 5 PM
  const days = ['Mon, 12', 'Tue, 13', 'Wed, 14', 'Thu, 15', 'Fri, 16'];

  const [isConverting, setIsConverting] = useState(false);
  const [isResolvedLocally, setIsResolvedLocally] = useState(false);

  const handleConvertAsync = () => {
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      setIsResolvedLocally(true);
      showToast('Meeting converted to async successfully.');
    }, 1000);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto h-full w-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 md:mb-6">
        <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Smart Calendar</h2>
          <div className="flex items-center gap-1 bg-card border border-border rounded-md p-1 shadow-sm shrink-0">
            <button className="p-1 hover:bg-muted rounded text-muted-foreground transition-colors"><ChevronLeft size={16} className="md:w-[18px] md:h-[18px]" /></button>
            <span className="text-xs md:text-sm font-medium px-1 md:px-2 whitespace-nowrap">Oct 12 – 16, 2026</span>
            <button className="p-1 hover:bg-muted rounded text-muted-foreground transition-colors"><ChevronRight size={16} className="md:w-[18px] md:h-[18px]" /></button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col relative">
        {/* Scrollable Container for Calendar */}
        <div className="overflow-x-auto flex-1 flex flex-col">
          <div className="min-w-[700px] flex-1 flex flex-col relative">
            {/* Calendar Header */}
            <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] border-b border-border bg-muted/30 sticky top-0 z-20">
              <div className="p-3 text-xs font-medium text-muted-foreground text-center border-r border-border bg-muted/30">GMT-4</div>
              {days.map(day => (
                <div key={day} className="p-3 text-sm font-medium text-foreground text-center border-r border-border last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 overflow-y-auto relative min-h-[600px]">
              {hours.map(hour => (
                <div key={hour} className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] border-b border-border min-h-[80px]">
                  <div className="p-2 text-xs text-muted-foreground text-center border-r border-border relative">
                    <span className="relative -top-3 bg-card px-1">{hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}</span>
                  </div>
                  {days.map((day) => (
                    <div key={day} className="border-r border-border last:border-r-0 relative"></div>
                  ))}
                </div>
              ))}

              {/* Regular Events */}
              <div className="absolute bg-secondary/80 border-l-4 border-secondary-foreground rounded shadow-sm p-1.5 sm:p-2 overflow-hidden hover:bg-secondary transition-colors"
                   style={{ top: '20px', left: 'calc(80px + 0%)', width: '19%', height: '60px' }}>
                <p className="text-[10px] sm:text-xs font-semibold text-secondary-foreground truncate">Product Sync</p>
                <p className="text-[8px] sm:text-[10px] text-secondary-foreground/80 truncate">9:15 - 10:00 AM</p>
              </div>

              <div className="absolute bg-accent/80 border-l-4 border-muted-foreground rounded shadow-sm p-1.5 sm:p-2 overflow-hidden hover:bg-accent transition-colors"
                   style={{ top: '180px', left: 'calc(80px + 20%)', width: '19%', height: '120px' }}>
                <p className="text-[10px] sm:text-xs font-semibold text-foreground truncate">Design Review</p>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground truncate">11:00 - 12:30 PM</p>
              </div>

              {/* Conflict Event - Needs Intervention */}
              {!isResolvedLocally ? (
                <>
                  <div className="absolute z-10 bg-alert-light border-2 border-alert rounded-md shadow-md p-1.5 sm:p-2 animate-pulse-slow cursor-pointer hover:bg-alert-light/80 transition-colors"
                       style={{ top: '340px', left: 'calc(80px + 60%)', width: '19%', height: '80px' }}
                       onClick={onResolveClick}>
                    <div className="flex items-start justify-between gap-1">
                      <div className="overflow-hidden">
                        <p className="text-[10px] sm:text-xs font-bold text-alert truncate">Q3 Planning</p>
                        <p className="text-[8px] sm:text-[10px] text-alert/80 font-medium truncate">1:00 - 2:00 PM</p>
                      </div>
                      <AlertCircle size={14} className="text-alert shrink-0 hidden sm:block" />
                    </div>
                  </div>

                  {/* Popover Tooltip for Conflict */}
                  <div className="absolute bg-card rounded-xl shadow-2xl border border-alert/30 p-3 sm:p-4 z-20 animate-in fade-in zoom-in-95 duration-200 w-[240px] sm:w-[280px]"
                       style={{ top: '430px', left: 'calc(80px + 69.5%)', transform: 'translateX(-50%)' }}>
                    <div className="absolute left-1/2 -top-2 w-4 h-4 bg-card border-l border-t border-alert/30 rotate-45 transform -translate-x-1/2"></div>
                    
                    <div className="flex items-center gap-2 text-alert mb-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <h4 className="font-semibold text-xs sm:text-sm">Burnout Risk Detected</h4>
                    </div>
                    
                    <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                      3 participants have back-to-back meetings and high stress indicators.
                    </p>
                    
                    <div className="flex flex-col gap-2">
                      <button onClick={onResolveClick} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] sm:text-xs font-medium py-1.5 sm:py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-2 active:scale-95">
                        <ArrowRightLeft size={14} />
                        Auto-Reschedule
                      </button>
                      <button 
                        onClick={handleConvertAsync} 
                        disabled={isConverting}
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-[10px] sm:text-xs font-medium py-1.5 sm:py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:active:scale-100"
                      >
                        {isConverting ? <Loader2 size={14} className="animate-spin" /> : <MessageSquare size={14} />}
                        {isConverting ? 'Converting...' : 'Convert to Async'}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute bg-primary/10 border-l-4 border-primary rounded shadow-sm p-1.5 sm:p-2 overflow-hidden transition-all duration-300"
                     style={{ top: '340px', left: 'calc(80px + 60%)', width: '19%', height: '80px' }}>
                  <div className="flex items-start justify-between gap-1">
                    <div className="overflow-hidden">
                      <p className="text-[10px] sm:text-xs font-bold text-primary truncate">Q3 Planning (Async)</p>
                      <p className="text-[8px] sm:text-[10px] text-primary/80 font-medium truncate">Resolved</p>
                    </div>
                    <CheckCircle2 size={14} className="text-primary shrink-0 hidden sm:block" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
