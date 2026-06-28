import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AttachmentIcon from '@mui/icons-material/Attachment';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello Rahul. I am your QuerySolve AI Assistant. I can help you search issues, summarize reports, or automate workflows. How can I help today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs = [...messages, { role: 'user', content: input }];
    setMessages(newMsgs);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMsgs, { 
        role: 'ai', 
        content: `I've analyzed your request. Here are the top 3 open payment issues:\n\n1. ISSUE-402: Gateway Failing\n2. ISSUE-415: Stripe Webhook Timeout\n3. ISSUE-420: Refund Processing Error\n\nWould you like me to summarize these for the team?` 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-surface border border-surfaceBorder rounded-2xl overflow-hidden shadow-sm animate-fade-in">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-surfaceBorder bg-surfaceHover flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg">
          <AutoAwesomeIcon />
        </div>
        <div>
          <h2 className="text-lg font-bold text-textMain">QuerySolve AI</h2>
          <p className="text-xs text-textMuted">Powered by advanced reasoning models</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.role === 'user' ? 'bg-primary text-white' : 'bg-accent/10 text-accent border border-accent/20'
              }`}>
                {msg.role === 'user' ? 'R' : <AutoAwesomeIcon fontSize="small" />}
              </div>

              {/* Message Bubble */}
              <div className={`px-5 py-3 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-sm shadow-md shadow-primary/20' 
                  : 'bg-surface border border-surfaceBorder text-textMain rounded-tl-sm shadow-sm'
              }`}>
                {msg.content}
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-surface border-t border-surfaceBorder">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center">
          <button type="button" className="absolute left-3 p-2 text-textMuted hover:text-primary transition-colors">
            <AttachmentIcon fontSize="small" />
          </button>
          
          <input
            type="text"
            className="w-full bg-background border border-surfaceBorder rounded-2xl pl-12 pr-14 py-4 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-sm"
            placeholder="Ask AI to find issues, analyze trends, or draft a report..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          
          <button 
            type="submit" 
            disabled={!input.trim()}
            className={`absolute right-3 p-2 rounded-xl transition-all ${
              input.trim() 
                ? 'bg-primary text-white hover:bg-primary-hover shadow-md shadow-primary/20' 
                : 'bg-surfaceHover text-textMuted cursor-not-allowed'
            }`}
          >
            <SendIcon fontSize="small" />
          </button>
        </form>
        <div className="text-center mt-2">
          <span className="text-[10px] text-textMuted">AI can make mistakes. Verify important information.</span>
        </div>
      </div>

    </div>
  );
}
