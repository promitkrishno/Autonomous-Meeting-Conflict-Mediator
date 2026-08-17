import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
  LineChart, Line
} from 'recharts';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

const workloadData = [
  { name: 'Alice M.', capacity: 40, scheduled: 38 },
  { name: 'Bob T.', capacity: 40, scheduled: 45 }, // Over capacity
  { name: 'Charlie R.', capacity: 32, scheduled: 28 },
  { name: 'Diana L.', capacity: 40, scheduled: 30 },
];

const sentimentData = [
  { day: 'Mon', score: 85 },
  { day: 'Tue', score: 82 },
  { day: 'Wed', score: 75 },
  { day: 'Thu', score: 68 }, // Dip
  { day: 'Fri', score: 78 },
  { day: 'Sat', score: 85 },
  { day: 'Sun', score: 88 },
];

const recentIntercepts = [
  { id: 1, title: 'Design Sync moved to async', detail: 'Saved 45 mins', type: 'resolved', time: '2 hours ago' },
  { id: 2, title: 'Q3 Planning needs intervention', detail: 'Burnout risk detected for 3 members', type: 'warning', time: '3 hours ago' },
  { id: 3, title: 'Engineering All-Hands conflict', detail: 'Double-booked with 1:1', type: 'warning', time: '5 hours ago' },
  { id: 4, title: 'Product Review auto-rescheduled', detail: 'Avoided triple-booking for Bob T.', type: 'resolved', time: '1 day ago' },
];

export function MediatorDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto h-full w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Overview</h2>
          <p className="text-muted-foreground mt-1 text-sm">Monitor team health and meeting load</p>
        </div>
        <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-full border border-border shadow-sm w-fit">
          <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: 'rgb(37, 192, 29)' }} />
          <span className="text-sm font-medium text-foreground">System Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Team Workload */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">Team Workload (Hours)</h3>
            <p className="text-sm text-muted-foreground">Capacity vs Scheduled for current week</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} width={80} />
                <RechartsTooltip cursor={{fill: '#f1f5f9'}} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                <Bar dataKey="capacity" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={16} name="Capacity" />
                <Bar dataKey="scheduled" fill="#94bba5" radius={[0, 4, 4, 0]} barSize={16} name="Scheduled" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Tone Analysis */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground">Team Sentiment Trends</h3>
            <p className="text-sm text-muted-foreground">Aggregated from Slack & Email tone analysis (7 days)</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} domain={[0, 100]} />
                <RechartsTooltip cursor={{stroke: '#e2e8f0', strokeWidth: 2}} />
                <Line type="monotone" dataKey="score" stroke="#94bba5" strokeWidth={3} dot={{ fill: '#94bba5', r: 4 }} activeDot={{ r: 6 }} name="Sentiment Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Recent Intercepts */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm lg:col-span-2">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-foreground">Recent Interventions</h3>
              <p className="text-sm text-muted-foreground">Automated scheduling conflict resolutions</p>
            </div>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          
          <div className="divide-y divide-border">
            {recentIntercepts.map(intercept => (
              <div key={intercept.id} className="py-4 flex items-start gap-4">
                <div className="mt-0.5">
                  {intercept.type === 'resolved' ? (
                    <CheckCircle2 className="text-primary" size={20} />
                  ) : (
                    <AlertTriangle className="text-alert" size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">{intercept.title}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{intercept.detail}</p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground gap-1.5">
                  <Clock size={14} />
                  {intercept.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
