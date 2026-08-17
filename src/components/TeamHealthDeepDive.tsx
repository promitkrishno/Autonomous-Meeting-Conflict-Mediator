import React, { useState } from 'react';
import {
  LineChart, Line, ResponsiveContainer, Tooltip as RechartsTooltip,
} from 'recharts';
import { TrendingUp, AlertTriangle, Clock3, Search, ChevronDown, ArrowUpRight } from 'lucide-react';
import { cn } from './Sidebar';

const members = [
  {
    id: 1,
    name: 'Alice Mercer',
    initials: 'AM',
    role: 'Product Lead',
    risk: 'healthy' as const,
    workloadHrs: 32,
    capacityHrs: 40,
    toneData: [
      { v: 80 }, { v: 83 }, { v: 85 }, { v: 84 }, { v: 87 }, { v: 88 }, { v: 90 },
    ],
  },
  {
    id: 2,
    name: 'Bob Trenton',
    initials: 'BT',
    role: 'Engineering Manager',
    risk: 'high' as const,
    workloadHrs: 45,
    capacityHrs: 40,
    toneData: [
      { v: 75 }, { v: 70 }, { v: 62 }, { v: 58 }, { v: 55 }, { v: 52 }, { v: 49 },
    ],
  },
  {
    id: 3,
    name: 'Charlie Ray',
    initials: 'CR',
    role: 'Backend Engineer',
    risk: 'elevated' as const,
    workloadHrs: 36,
    capacityHrs: 40,
    toneData: [
      { v: 78 }, { v: 76 }, { v: 74 }, { v: 72 }, { v: 71 }, { v: 70 }, { v: 68 },
    ],
  },
  {
    id: 4,
    name: 'Diana Lowe',
    initials: 'DL',
    role: 'Design Lead',
    risk: 'healthy' as const,
    workloadHrs: 28,
    capacityHrs: 40,
    toneData: [
      { v: 82 }, { v: 84 }, { v: 86 }, { v: 85 }, { v: 88 }, { v: 89 }, { v: 91 },
    ],
  },
  {
    id: 5,
    name: 'Ethan Voss',
    initials: 'EV',
    role: 'Frontend Engineer',
    risk: 'elevated' as const,
    workloadHrs: 38,
    capacityHrs: 40,
    toneData: [
      { v: 77 }, { v: 75 }, { v: 74 }, { v: 73 }, { v: 72 }, { v: 71 }, { v: 70 },
    ],
  },
  {
    id: 6,
    name: 'Fiona Kraft',
    initials: 'FK',
    role: 'Data Analyst',
    risk: 'healthy' as const,
    workloadHrs: 30,
    capacityHrs: 40,
    toneData: [
      { v: 85 }, { v: 87 }, { v: 86 }, { v: 88 }, { v: 90 }, { v: 89 }, { v: 92 },
    ],
  },
];

const riskConfig = {
  healthy: { label: 'Healthy', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  elevated: { label: 'Elevated', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  high: { label: 'High Risk', bg: 'bg-alert-light', text: 'text-alert', dot: 'bg-alert' },
};

function RiskBadge({ risk }: { risk: keyof typeof riskConfig }) {
  const c = riskConfig[risk];
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', c.bg, c.text)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', c.dot)} />
      {c.label}
    </span>
  );
}

function Sparkline({ data, risk }: { data: { v: number }[]; risk: keyof typeof riskConfig }) {
  const color = risk === 'healthy' ? '#94bba5' : risk === 'elevated' ? '#f59e0b' : '#e07a5f';
  return (
    <div className="w-20 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <RechartsTooltip
            contentStyle={{ fontSize: 10, padding: '2px 6px', borderRadius: 4 }}
            itemStyle={{ color: color }}
            formatter={(val: number) => [`${val}`, 'Score']}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function WorkloadBar({ hrs, capacity }: { hrs: number; capacity: number }) {
  const pct = Math.min((hrs / capacity) * 100, 100);
  const overCapacity = hrs > capacity;
  return (
    <div className="flex items-center gap-2.5 w-full min-w-[140px]">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all', overCapacity ? 'bg-alert' : 'bg-primary')}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={cn('text-xs font-medium tabular-nums whitespace-nowrap', overCapacity ? 'text-alert' : 'text-muted-foreground')}>
        {hrs}/{capacity}h
      </span>
    </div>
  );
}

const summaryAvatarColors = ['bg-primary/20 text-primary', 'bg-alert-light text-alert', 'bg-secondary text-secondary-foreground'];

export function TeamHealthDeepDive() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('This Week');

  const highRiskCount = members.filter(m => m.risk === 'high').length;

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Team Health Deep-Dive</h2>
          <p className="text-muted-foreground mt-1 text-sm">Individual wellbeing metrics and workload analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search member..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring w-44"
            />
          </div>
          <button className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors">
            <span>{filter}</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Card 1: Overall Health Score */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Team Health Score</p>
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-bold text-foreground leading-none">82</span>
              <span className="text-sm text-muted-foreground mb-0.5">/100</span>
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              <ArrowUpRight size={13} className="text-emerald-600" />
              <span className="text-xs text-emerald-600 font-medium">+4 pts this week</span>
            </div>
          </div>
        </div>

        {/* Card 2: High Risk Members */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-alert-light flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-alert" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">High Risk Members</p>
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-bold text-alert leading-none">{highRiskCount}</span>
              <span className="text-sm text-muted-foreground mb-0.5">/ {members.length} members</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">Intervention recommended</p>
          </div>
        </div>

        {/* Card 3: Meetings Intercepted */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Clock3 size={20} className="text-secondary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Meetings Intercepted</p>
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-bold text-foreground leading-none">14</span>
              <span className="text-sm text-muted-foreground mb-0.5">hrs saved</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">Across 8 interventions</p>
          </div>
        </div>
      </div>

      {/* Member List */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Member Overview</h3>
          <span className="text-xs text-muted-foreground">{filtered.length} members</span>
        </div>

        {/* Table header — hidden on mobile */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-2.5 border-b border-border bg-muted/40">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Member</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Burnout Risk</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Comm. Tone</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Workload</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide sr-only">Action</span>
        </div>

        <div className="divide-y divide-border">
          {filtered.map(member => (
            <div
              key={member.id}
              className="px-5 py-4 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 md:gap-4 items-center group hover:bg-muted/30 transition-colors"
            >
              {/* Name + Avatar */}
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0',
                  summaryAvatarColors[member.id % summaryAvatarColors.length]
                )}>
                  {member.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>

              {/* Risk Badge */}
              <div className="flex items-center md:block">
                <span className="text-xs text-muted-foreground mr-2 md:hidden">Risk:</span>
                <RiskBadge risk={member.risk} />
              </div>

              {/* Sparkline */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground md:hidden">Tone:</span>
                <Sparkline data={member.toneData} risk={member.risk} />
              </div>

              {/* Workload bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground md:hidden whitespace-nowrap">Load:</span>
                <WorkloadBar hrs={member.workloadHrs} capacity={member.capacityHrs} />
              </div>

              {/* Action */}
              <div>
                <button className="text-xs font-medium text-primary hover:text-primary/80 hover:underline transition-colors whitespace-nowrap px-3 py-1.5 rounded-md hover:bg-primary/5">
                  View Insights →
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              No members match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
