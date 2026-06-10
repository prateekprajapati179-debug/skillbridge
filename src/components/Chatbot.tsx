import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Code, Copy, Check, ChevronDown } from 'lucide-react';
import type { ChatMessage } from '../types';

const QUICK_ACTIONS = [
  { icon: '🎯', label: 'DSA Roadmap', query: 'Create a DSA roadmap for me from basics to advanced' },
  { icon: '💼', label: 'Interview Tips', query: 'What are the most common interview questions for Google?' },
  { icon: '📚', label: 'Best Resources', query: 'What are the best free resources to learn web development?' },
  { icon: '🚀', label: 'Career Path', query: 'What skills do I need to become a Full Stack Developer?' },
];

const SUGGESTED_QUESTIONS = [
  'How do I start learning DSA?',
  'What skills does Google look for?',
  'Best roadmap for Full Stack Dev?',
  'How to prepare for system design?',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm your AI study mentor. I can help you with DSA, career guidance, interview prep, and learning resources. What would you like to know?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, open, scrollToBottom]);

  const copyToClipboard = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const assistantMsg: ChatMessage = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseKey}`,
          Apikey: supabaseKey,
        },
        body: JSON.stringify({ message: text, history: messages }),
      });

      if (!res.ok) throw new Error('API failed');
      if (!res.body) throw new Error('No stream body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content || '';
              fullText += token;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: fullText };
                return updated;
              });
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Here's some quick advice: Focus on building strong fundamentals in DSA, practice daily on LeetCode, and work on real projects. Try asking again in a moment!",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (content: string, idx: number) => {
    const parts: React.ReactNode[] = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={key++}>{content.slice(lastIndex, match.index)}</span>);
      }
      const code = match[2].trim();
      parts.push(
        <div key={key++} className="relative bg-slate-800 rounded-lg my-2 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Code className="w-3 h-3" />
              {match[1] || 'code'}
            </div>
            <button
              onClick={() => copyToClipboard(code, idx)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <pre className="p-3 text-sm text-slate-200 overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(<span key={key++}>{content.slice(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : content;
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open AI Chatbot"
        >
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
          <div className="relative w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Chat with AI Mentor
          </span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          style={{ height: '580px' }}
        >
          <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0F172A]" />
              </div>
              <div>
                <div className="text-white font-semibold">AI Study Mentor</div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span className="text-slate-400 text-xs">Powered by Groq LLaMA 3</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in-0 duration-200`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}>
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div className={`max-w-[85%] group ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl rounded-tr-md'
                    : 'bg-white text-slate-800 rounded-2xl rounded-tl-md shadow-sm border border-slate-100'
                }`}>
                  <div className={`px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user' ? '' : 'prose prose-sm max-w-none'
                  }`}>
                    {msg.content || (loading && i === messages.length - 1 ? (
                      <div className="flex gap-1 items-center py-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : '')}
                    {msg.content && (msg.role === 'assistant' ? formatMessage(msg.content, i) : msg.content)}
                  </div>
                  {msg.role === 'assistant' && msg.content && (
                    <div className="px-3 pb-2 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => copyToClipboard(msg.content, i)}
                        className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors"
                        title="Copy response"
                      >
                        {copiedIdx === i ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-4 py-3 bg-white border-t border-slate-100">
              <div className="text-xs text-slate-500 mb-2 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                Quick Actions
              </div>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.query)}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-lg transition-colors text-left"
                  >
                    <span className="text-base">{action.icon}</span>
                    <span className="text-xs font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-white border-t border-slate-100">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about DSA, careers, interviews..."
                  disabled={loading}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder-slate-400 disabled:opacity-60 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex-shrink-0"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
