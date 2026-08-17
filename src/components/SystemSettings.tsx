import React, { useState } from 'react';
import { Sliders, ToggleLeft, ToggleRight, CheckCircle2, ExternalLink, Bell, Settings2, Plug, User } from 'lucide-react';
import { cn } from './Sidebar';

// ── Integrations data ──────────────────────────────────────────────────────────
const integrations = [
  {
    id: 'google',
    name: 'Google Workspace',
    description: 'Calendar, Meet & Gmail sync',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    connected: true,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Message tone & async updates',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zm2.521-10.123a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521H8.834zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522V8.834zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/>
      </svg>
    ),
    connected: true,
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Meeting & channel monitoring',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path d="M19.5 7.5h-3V6a3 3 0 1 0-6 0v1.5H7.5A1.5 1.5 0 0 0 6 9v9a1.5 1.5 0 0 0 1.5 1.5h12A1.5 1.5 0 0 0 21 18V9a1.5 1.5 0 0 0-1.5-1.5zm-10.5 0V6a1.5 1.5 0 0 1 3 0v1.5H9zm10.5 10.5H7.5V9h12v9z" fill="#5059C9"/>
        <circle cx="12" cy="13.5" r="2.25" fill="#5059C9"/>
      </svg>
    ),
    connected: true,
  },
];

// ── Toggle component ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
        checked ? 'bg-primary' : 'bg-muted'
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5',
          checked ? 'translate-x-4' : 'translate-x-0.5'
        )}
      />
    </button>
  );
}

// ── Sensitivity slider ────────────────────────────────────────────────────────
const sensitivitySteps = [
  { value: 0, label: 'Lenient', sublabel: 'Suggest only' },
  { value: 50, label: 'Balanced', sublabel: 'Standard' },
  { value: 100, label: 'Strict', sublabel: 'Auto-intercept high risk' },
];

function SensitivitySlider() {
  const [value, setValue] = useState(50);

  const activeStep = value <= 25 ? 0 : value <= 75 ? 1 : 2;

  return (
    <div className="space-y-4">
      <div className="relative pt-1">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="w-full h-1.5 appearance-none rounded-full bg-muted cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:shadow-sm
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110"
          style={{
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${value}%, var(--muted) ${value}%, var(--muted) 100%)`
          }}
        />
      </div>

      <div className="flex justify-between">
        {sensitivitySteps.map((step, i) => (
          <div
            key={step.value}
            className={cn(
              'flex flex-col items-center gap-0.5 cursor-pointer select-none',
              i === 0 && 'items-start',
              i === sensitivitySteps.length - 1 && 'items-end'
            )}
            onClick={() => setValue(step.value)}
          >
            <span className={cn(
              'text-sm font-medium transition-colors',
              activeStep === i ? 'text-primary' : 'text-muted-foreground'
            )}>
              {step.label}
            </span>
            <span className={cn(
              'text-xs transition-colors',
              activeStep === i ? 'text-primary/70' : 'text-muted-foreground/60'
            )}>
              {step.sublabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings categories ────────────────────────────────────────────────────────
const categories = [
  { id: 'general', label: 'General', icon: Settings2 },
  { id: 'ai', label: 'AI Preferences', icon: Sliders },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
];

// ── Main component ─────────────────────────────────────────────────────────────
export function SystemSettings() {
  const [activeCategory, setActiveCategory] = useState('ai');
  const [toggles, setToggles] = useState({ downgrade: true, async: false, focusBlock: true });

  const setToggle = (key: keyof typeof toggles) => (v: boolean) =>
    setToggles(prev => ({ ...prev, [key]: v }));

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">System & AI Settings</h2>
        <p className="text-muted-foreground mt-1 text-sm">Configure AI behavior, integrations, and automation rules</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Inner sidebar */}
        <aside className="md:w-52 flex-shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left whitespace-nowrap flex-shrink-0',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon size={16} />
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main panel */}
        <div className="flex-1 min-w-0 space-y-5">
          {activeCategory === 'ai' && (
            <>
              {/* Section 1: Sensitivity Slider */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sliders size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI Mediation Sensitivity</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Control how aggressively the AI intercepts and resolves scheduling conflicts
                    </p>
                  </div>
                </div>
                <SensitivitySlider />
              </div>

              {/* Section 2: Auto-Resolution Rules */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <ToggleRight size={18} className="text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Auto-Resolution Rules</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Automate routine interventions based on detected patterns
                    </p>
                  </div>
                </div>

                <div className="space-y-0 divide-y divide-border">
                  {[
                    {
                      key: 'downgrade' as const,
                      title: 'Downgrade back-to-back 1-hour meetings',
                      description: 'Automatically shorten to 30 mins when meetings are scheduled consecutively',
                    },
                    {
                      key: 'async' as const,
                      title: 'Suggest async Slack updates for status syncs',
                      description: 'Replace recurring status meetings with async Slack thread prompts',
                    },
                    {
                      key: 'focusBlock' as const,
                      title: 'Block focus time under high stress',
                      description: 'Reserve 2-hour focus windows when burnout indicators are elevated',
                    },
                  ].map(rule => (
                    <div key={rule.key} className="flex items-start justify-between gap-4 py-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{rule.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{rule.description}</p>
                      </div>
                      <Toggle checked={toggles[rule.key]} onChange={setToggle(rule.key)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Integrations */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Plug size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Connected Integrations</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Manage the apps the AI uses to monitor and act on scheduling data
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {integrations.map(app => (
                    <div
                      key={app.id}
                      className="border border-border rounded-xl p-4 flex flex-col gap-3 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          {app.icon}
                        </div>
                        {app.connected && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 size={11} />
                            Connected
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{app.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{app.description}</p>
                      </div>
                      <button className="mt-auto flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-primary hover:underline transition-colors">
                        Manage
                        <ExternalLink size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeCategory !== 'ai' && (
            <div className="bg-card border border-border rounded-xl p-10 shadow-sm flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                {(() => {
                  const cat = categories.find(c => c.id === activeCategory);
                  if (!cat) return null;
                  const Icon = cat.icon;
                  return <Icon size={22} className="text-muted-foreground" />;
                })()}
              </div>
              <p className="text-sm font-medium text-foreground">
                {categories.find(c => c.id === activeCategory)?.label} settings
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                This section is coming soon. Configure your preferences once it's available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
