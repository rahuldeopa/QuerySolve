import React from 'react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';

const articles = [
  { id: 1, title: 'How to resolve Payment Gateway Errors', views: '1.2k', author: 'Rahul Deopa' },
  { id: 2, title: 'Understanding SLA Policies', views: '850', author: 'Jane Doe' },
  { id: 3, title: 'Onboarding Guide for New Engineers', views: '2.4k', author: 'Admin' },
];

export default function KnowledgeBase() {
  return (
    <div className="space-y-6 pb-20 animate-fade-in h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textMain tracking-tight">Knowledge Base</h1>
          <p className="text-sm text-textMuted mt-1">Centralized documentation for your team.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <SearchIcon fontSize="small" className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="pl-9 pr-4 py-2 bg-surfaceHover border border-surfaceBorder rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all font-medium text-sm">
            <AddIcon fontSize="small" />
            <span>New Article</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-textMain mb-2">Automated Documentation</h2>
          <p className="text-sm text-textMuted max-w-md leading-relaxed">
            AI automatically drafts knowledge base articles from resolved issues to prevent repetitive queries and speed up team onboarding.
          </p>
        </div>
        <LibraryBooksIcon className="text-accent text-6xl opacity-80" />
      </div>

      {/* Top Articles Grid */}
      <div>
        <h3 className="text-sm font-semibold text-textMuted uppercase tracking-wider mb-4">Top Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map(article => (
            <div key={article.id} className="premium-card p-5 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-surfaceHover flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                <DescriptionIcon className="text-textMuted group-hover:text-primary transition-colors" fontSize="small" />
              </div>
              <h4 className="text-base font-semibold text-textMain mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h4>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-surfaceBorder">
                <span className="text-xs text-textMuted">{article.author}</span>
                <span className="text-xs font-medium text-textMuted bg-surfaceHover px-2 py-1 rounded-md">{article.views} views</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
