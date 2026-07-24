import React, { useState, useRef, useEffect } from 'react';
import { ActiveTab, ChatMessage } from '../types';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  Ticket,
  Building2,
  Calendar,
  Compass,
  Copy,
  Check,
  RefreshCw,
  MessageSquare,
} from 'lucide-react';

interface AIChatViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const AIChatView: React.FC<AIChatViewProps> = ({
  setActiveTab,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-0',
      sender: 'ai',
      text: `Hello! I'm **TravelMate AI**, your intelligent travel assistant. 

How can I help you today? You can ask me to:
- Recommend attractions & local food in **Quetta**, **Lahore**, **Peshawar**, or any city worldwide.
- Find & compare flights, buses, or train connections.
- Recommend family or luxury hotels within your budget.
- Create custom day-by-day travel itineraries.
- Provide weather summaries & travel safety tips.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "I'm visiting Quetta for 3 days. What should I see?",
    "Book me a bus ticket from Quetta to Karachi.",
    "Find the cheapest flight to Islamabad tomorrow.",
    "Recommend family-friendly hotels in Lahore.",
    "What local food should I try in Peshawar?",
    "Create a 5-day travel itinerary for Hunza.",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length > 0) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();
      const replyText = data.reply || 'I am ready to help you plan your next destination!';

      // Detect quick context actions based on user query
      const quickActions: { label: string; action: string; payload?: any }[] = [];
      const lowerText = text.toLowerCase();
      if (lowerText.includes('ticket') || lowerText.includes('bus') || lowerText.includes('flight') || lowerText.includes('train')) {
        quickActions.push({ label: 'Book Tickets Now', action: 'tickets' });
      }
      if (lowerText.includes('hotel') || lowerText.includes('stay') || lowerText.includes('resort')) {
        quickActions.push({ label: 'Browse Hotels', action: 'hotels' });
      }
      if (lowerText.includes('itinerary') || lowerText.includes('plan') || lowerText.includes('days')) {
        quickActions.push({ label: 'Generate Full Itinerary', action: 'planner' });
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: quickActions.length > 0 ? quickActions : undefined,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'I apologize, but I had trouble reaching the AI travel server. Please check your network connection and try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking === id) {
        window.speechSynthesis.cancel();
        setIsSpeaking(null);
        return;
      }
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#_`-]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);
      setIsSpeaking(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="p-4 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white p-0.5 shadow-md shadow-cyan-500/30 overflow-hidden shrink-0 border border-slate-700">
            <img src="/logo.jpg" alt="TravelMate AI" className="w-full h-full object-cover rounded-xl" />
          </div>
          <div>
            <h2 className="font-bold text-base text-white flex items-center gap-2">
              <span>TravelMate AI Chatbot</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 font-bold">
                Online
              </span>
            </h2>
            <p className="text-xs text-slate-300">Ask questions about cities, routes, hotels, and itineraries</p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'm-reset',
                sender: 'ai',
                text: 'Chat history cleared. How can TravelMate AI assist your travel plans today?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ])
          }
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs font-semibold flex items-center gap-1.5"
          title="Reset Chat"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs overflow-hidden ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white p-0.5 border border-slate-200'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-5 h-5" />
              ) : (
                <img src="/logo.jpg" alt="AI Avatar" className="w-full h-full object-cover rounded-xl" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`space-y-2 rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10 rounded-tr-none'
                  : 'bg-white border border-slate-200/90 text-slate-800 shadow-sm rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap font-normal">{msg.text}</div>

              {/* Message Footer / Actions */}
              <div
                className={`flex items-center justify-between pt-2 border-t text-[11px] ${
                  msg.sender === 'user'
                    ? 'border-blue-500/40 text-blue-100'
                    : 'border-slate-100 text-slate-400'
                }`}
              >
                <span>{msg.timestamp}</span>

                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="p-1 hover:text-slate-700 transition-colors"
                      title="Copy Message"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleSpeak(msg.id, msg.text)}
                      className="p-1 hover:text-slate-700 transition-colors"
                      title="Listen Voice"
                    >
                      {isSpeaking === msg.id ? (
                        <VolumeX className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Action Badges if attached */}
              {msg.quickActions && msg.quickActions.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {msg.quickActions.map((qa, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(qa.action as ActiveTab)}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span>{qa.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 mr-auto max-w-xl">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-xs font-medium text-slate-500 flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span>TravelMate AI is thinking...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Chips Box */}
      <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200/80 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span>Suggestions:</span>
        </span>
        {suggestionChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 hover:border-blue-300 font-medium transition-all shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input controls */}
      <div className="p-4 bg-white border-t border-slate-200/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask anything about cities, tickets, hotels, or travel plans..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />

          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
