import React from 'react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function WorkflowBuilder() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4 animate-fade-in">
      
      <div className="w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20 shadow-lg relative">
        <AccountTreeIcon className="text-primary text-5xl" />
        <div className="absolute -top-2 -right-2 bg-background rounded-full p-1 shadow-md">
          <AutoAwesomeIcon className="text-accent text-xl animate-pulse-slow" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-textMain tracking-tight mb-3">
        Automate your Query Workflows
      </h1>
      
      <p className="text-textMuted max-w-lg mb-8 leading-relaxed">
        Let AI build your automation pipelines. When an issue is created, automatically assign the right team, notify users, and set SLA reminders without writing any code.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all font-semibold">
          <AddIcon fontSize="small" />
          Create Workflow
        </button>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-surface border border-surfaceBorder text-textMain rounded-xl hover:bg-surfaceHover hover:border-textMuted/30 transition-all font-semibold">
          <AutoAwesomeIcon fontSize="small" className="text-accent" />
          Generate with AI
        </button>
      </div>
      
      {/* Visual Workflow Preview Placeholder */}
      <div className="mt-16 w-full max-w-4xl border border-surfaceBorder rounded-2xl bg-surface p-6 shadow-sm hidden md:block">
        <div className="flex items-center justify-between opacity-50 select-none">
          <div className="p-4 bg-background border border-surfaceBorder rounded-xl text-sm font-medium">Issue Created</div>
          <div className="h-0.5 w-16 bg-surfaceBorder"></div>
          <div className="p-4 bg-background border border-primary/50 text-primary rounded-xl text-sm font-medium">Assign Team (AI)</div>
          <div className="h-0.5 w-16 bg-surfaceBorder"></div>
          <div className="p-4 bg-background border border-surfaceBorder rounded-xl text-sm font-medium">Notify User</div>
          <div className="h-0.5 w-16 bg-surfaceBorder"></div>
          <div className="p-4 bg-background border border-surfaceBorder rounded-xl text-sm font-medium">Set SLA</div>
        </div>
      </div>

    </div>
  );
}
