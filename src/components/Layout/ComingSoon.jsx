import React from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function ComingSoon({ title = 'Coming Soon' }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4 animate-fade-in">
      <div className="w-20 h-20 mb-6 rounded-3xl bg-surfaceHover flex items-center justify-center border border-surfaceBorder shadow-sm">
        <AutoAwesomeIcon className="text-textMuted text-4xl" />
      </div>
      
      <h1 className="text-2xl font-bold text-textMain tracking-tight mb-2">
        {title}
      </h1>
      
      <p className="text-textMuted max-w-sm leading-relaxed">
        We are building this feature with advanced AI capabilities. It will be available in the next release.
      </p>
    </div>
  );
}
