import React, { useState } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const dummyQueries = [
  { id: 'ISSUE-402', title: 'Payment Gateway Failing in Production', status: 'Open', priority: 'High', assignee: 'Rahul Deopa' },
  { id: 'ISSUE-401', title: 'Login Page UI Broken on Mobile', status: 'In Progress', priority: 'Medium', assignee: 'Jane Doe' },
  { id: 'ISSUE-400', title: 'Update dependencies to fix vulnerability', status: 'Closed', priority: 'High', assignee: 'System' },
];

export default function QueryBoard() {
  const [view, setView] = useState('list'); // 'list' or 'kanban'

  return (
    <div className="space-y-6 pb-20 animate-fade-in h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain tracking-tight">Queries</h1>
          <p className="text-sm text-textMuted mt-1">Manage, filter, and resolve issues.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surfaceHover p-1 rounded-xl border border-surfaceBorder">
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-colors ${view === 'list' ? 'bg-surface shadow-sm text-textMain' : 'text-textMuted hover:text-textMain'}`}
            >
              <ViewListIcon fontSize="small" />
            </button>
            <button 
              onClick={() => setView('kanban')}
              className={`p-1.5 rounded-lg transition-colors ${view === 'kanban' ? 'bg-surface shadow-sm text-textMain' : 'text-textMuted hover:text-textMain'}`}
            >
              <ViewColumnIcon fontSize="small" />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surfaceHover border border-surfaceBorder rounded-xl transition-colors text-sm font-medium">
            <FilterListIcon fontSize="small" />
            Filter
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all font-medium text-sm group">
            <AddIcon fontSize="small" />
            <span>New Issue</span>
            <div className="w-px h-4 bg-white/20 mx-1"></div>
            <AutoAwesomeIcon fontSize="small" className="text-accent group-hover:animate-pulse" title="Generate with AI" />
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 bg-surface border border-surfaceBorder rounded-2xl overflow-hidden flex flex-col shadow-sm">
        {view === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surfaceHover border-b border-surfaceBorder">
                  <th className="px-6 py-4 text-xs font-semibold tracking-wider text-textMuted uppercase">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold tracking-wider text-textMuted uppercase">Title</th>
                  <th className="px-6 py-4 text-xs font-semibold tracking-wider text-textMuted uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold tracking-wider text-textMuted uppercase">Priority</th>
                  <th className="px-6 py-4 text-xs font-semibold tracking-wider text-textMuted uppercase">Assignee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surfaceBorder">
                {dummyQueries.map(q => (
                  <tr key={q.id} className="hover:bg-surfaceHover/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 text-sm font-medium text-textMuted">{q.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-textMain group-hover:text-primary transition-colors">{q.title}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        q.status === 'Open' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400' :
                        q.status === 'In Progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                      }`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        q.priority === 'High' ? 'border-rose-500/50 text-rose-600 dark:text-rose-400' :
                        'border-surfaceBorder text-textMuted'
                      }`}>
                        {q.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-textMuted flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                        {q.assignee.charAt(0)}
                      </div>
                      {q.assignee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto bg-surfaceHover/30">
            {/* Kanban Columns */}
            {['Open', 'In Progress', 'Closed'].map(status => (
              <div key={status} className="flex flex-col bg-surface border border-surfaceBorder rounded-2xl p-4 shadow-sm h-full max-h-[70vh]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-textMain">{status}</h3>
                  <span className="text-xs bg-surfaceHover text-textMuted px-2 py-1 rounded-full">
                    {dummyQueries.filter(q => q.status === status).length}
                  </span>
                </div>
                
                <div className="space-y-3 overflow-y-auto no-scrollbar flex-1">
                  {dummyQueries.filter(q => q.status === status).map(q => (
                    <div key={q.id} className="p-4 bg-background border border-surfaceBorder rounded-xl hover:border-primary/50 hover:shadow-md transition-all cursor-grab active:cursor-grabbing">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-textMuted">{q.id}</span>
                        <AutoAwesomeIcon fontSize="inherit" className="text-textMuted hover:text-accent cursor-pointer transition-colors" title="AI Summary" />
                      </div>
                      <h4 className="text-sm font-medium text-textMain mb-3 leading-snug">{q.title}</h4>
                      <div className="flex items-center justify-between mt-auto">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${
                          q.priority === 'High' ? 'border-rose-500/50 text-rose-600' : 'border-surfaceBorder text-textMuted'
                        }`}>
                          {q.priority}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary" title={q.assignee}>
                          {q.assignee.charAt(0)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
