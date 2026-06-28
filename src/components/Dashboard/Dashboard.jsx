import React from 'react';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BugReportIcon from '@mui/icons-material/BugReport';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="premium-card p-6 flex flex-col relative overflow-hidden group">
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150 ${colorClass}`} />
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-textMuted">{title}</h3>
      <div className={`p-2 rounded-xl bg-surfaceHover text-textMain`}>
        <Icon fontSize="small" />
      </div>
    </div>
    <div className="flex items-baseline gap-3">
      <h2 className="text-3xl font-bold text-textMain tracking-tight">{value}</h2>
      <span className={`text-xs font-semibold ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain tracking-tight">Overview</h1>
          <p className="text-sm text-textMuted mt-1">Welcome back, Rahul. Here's what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all font-medium text-sm">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Queries" value="1,248" icon={AssessmentIcon} trend={12} colorClass="bg-blue-500" />
        <StatCard title="Open Issues" value="42" icon={BugReportIcon} trend={-5} colorClass="bg-rose-500" />
        <StatCard title="Closed Issues" value="1,180" icon={CheckCircleIcon} trend={8} colorClass="bg-emerald-500" />
        <StatCard title="SLA Breached" value="3" icon={AccessTimeIcon} trend={-2} colorClass="bg-amber-500" />
      </div>

      {/* AI Insights & Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 premium-card p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-textMain">Resolution Trends</h2>
            <select className="bg-surfaceHover border border-surfaceBorder rounded-lg px-3 py-1.5 text-sm text-textMain outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-surfaceBorder rounded-xl bg-surfaceHover/50">
            {/* Placeholder for actual chart */}
            <div className="text-center">
              <TrendingUpIcon className="text-textMuted mb-2 mx-auto" fontSize="large" />
              <p className="text-sm text-textMuted">Interactive Chart Area</p>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="premium-card bg-gradient-to-br from-surface to-primary/5 p-6 flex flex-col border border-primary/10">
          <div className="flex items-center gap-2 mb-6">
            <AutoAwesomeIcon className="text-accent" />
            <h2 className="text-lg font-semibold text-textMain">AI Insights</h2>
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="p-4 rounded-xl bg-surface border border-surfaceBorder shadow-sm">
              <h4 className="text-sm font-semibold text-textMain mb-1">Bottleneck Detected</h4>
              <p className="text-xs text-textMuted leading-relaxed">
                "Payment Gateway" category has a 45% longer resolution time than average this week. Consider assigning more team members to these tickets.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-surface border border-surfaceBorder shadow-sm">
              <h4 className="text-sm font-semibold text-textMain mb-1">Duplicate Trend</h4>
              <p className="text-xs text-textMuted leading-relaxed">
                12 similar queries about "Login 500 error" created in the last 2 hours. AI suggests creating a unified Knowledge Base article.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-surface border border-surfaceBorder shadow-sm">
              <h4 className="text-sm font-semibold text-textMain mb-1">Team Performance</h4>
              <p className="text-xs text-textMuted leading-relaxed">
                Rahul resolved 15 critical issues yesterday, which is 30% above the team average.
              </p>
            </div>
          </div>
          
          <button className="mt-6 w-full py-2.5 rounded-xl border border-primary/20 text-primary hover:bg-primary/5 transition-colors text-sm font-semibold">
            View All AI Insights
          </button>
        </div>
      </div>
      
    </div>
  );
}
