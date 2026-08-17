import React, { useState } from 'react';
import { AlertTriangle, Clock, Activity, Users, CalendarDays, Zap, MessageSquare, X, Loader2 } from 'lucide-react';
import { cn } from './Sidebar';

interface ModalProps {
  onClose: () => void;
  onApply: () => void;
}

export function InterceptionResolutionModal({ onClose, onApply }: ModalProps) {
  const [selectedAction, setSelectedAction] = useState<number | null>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onApply();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-border animate-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-alert-light px-4 md:px-6 py-4 flex items-center justify-between border-b border-alert/20 sticky top-0 z-10">
          <div className="flex items-center gap-2 md:gap-3 text-alert">
            <AlertTriangle size={20} className="md:w-[24px] md:h-[24px] fill-alert/20 shrink-0" />
            <h2 className="text-base md:text-lg font-semibold leading-tight">Meeting Intercepted: Q3 Planning</h2>
          </div>
          <button onClick={onClose} className="text-alert/60 hover:text-alert transition-colors p-1 rounded-full hover:bg-alert/10 shrink-0 ml-2">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6 flex-1">
          {/* AI Analysis Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Zap size={16} className="text-primary" />
              AI Analysis
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-alert-light text-alert text-xs font-medium border border-alert/20">
                <Activity size={14} />
                Heavy Workload
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-alert-light text-alert text-xs font-medium border border-alert/20">
                <Users size={14} />
                Tone Alert
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-secondary-foreground/20">
                <Clock size={14} />
                Back-to-Back
              </span>
            </div>
          </div>

          {/* Suggested Actions Section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Suggested Actions</h3>
            <div className="flex flex-col gap-3">
              {[
                { id: 1, icon: CalendarDays, title: 'Find next available 1-hour slot next week', desc: 'Reschedules to Tuesday when workload is 40% lighter.' },
                { id: 2, icon: Clock, title: 'Downgrade to 15-minute standup', desc: 'Keep the slot but reduce time to ease back-to-back pressure.' },
                { id: 3, icon: MessageSquare, title: 'Cancel and request async Slack updates', desc: 'Completely eliminates meeting load. Prompts team for updates.' },
              ].map(action => (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action.id)}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-xl border text-left transition-all",
                    selectedAction === action.id 
                      ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm" 
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  )}
                >
                  <div className={cn(
                    "mt-0.5 p-2 rounded-lg",
                    selectedAction === action.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    <action.icon size={18} />
                  </div>
                  <div>
                    <h4 className={cn("font-medium text-sm", selectedAction === action.id ? "text-foreground" : "text-foreground/80")}>
                      {action.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-6 py-4 bg-muted/30 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 sticky bottom-0">
          <button onClick={onClose} disabled={isSubmitting} className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors active:scale-95 disabled:opacity-70 disabled:active:scale-100">
            Dismiss Alert
          </button>
          <button 
            onClick={handleApply} 
            disabled={isSubmitting || selectedAction === null} 
            className="w-full sm:w-auto px-5 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:active:scale-100"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
            {isSubmitting ? 'Applying...' : 'Apply Resolution'}
          </button>
        </div>

      </div>
    </div>
  );
}
