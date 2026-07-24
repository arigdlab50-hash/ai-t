import React from 'react';
import { Menu, Search, Sparkles, Bell, Globe } from 'lucide-react';
import { ActiveTab } from '../types';
import { CURRENCIES } from '../data/currencies';

interface HeaderProps {
  onMenuToggle: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onOpenAuth: () => void;
  selectedCurrency: string;
  onOpenCurrencyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onOpenAuth,
  selectedCurrency,
  onOpenCurrencyModal,
}) => {
  const currentCurrencyInfo = CURRENCIES[selectedCurrency] || CURRENCIES.USD;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 flex items-center justify-between transition-all">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand logo for mobile/tablet */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex lg:hidden items-center gap-2 cursor-pointer"
        >
          <img src="/logo.jpg" alt="TravelMate AI" className="w-8 h-8 rounded-xl object-cover shadow-xs border border-slate-200" />
          <span className="font-extrabold text-sm text-slate-900 tracking-tight">TravelMate <span className="text-blue-600">AI</span></span>
        </div>

        {/* Global Quick Search Bar */}
        <form onSubmit={onSearchSubmit} className="relative hidden md:block w-72 lg:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask AI or search cities (e.g. Quetta, Paris)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </form>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick AI Prompt Trigger */}
        <button
          onClick={() => setActiveTab('chat')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200/60 transition-all shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
          <span className="hidden sm:inline">Ask TravelMate AI</span>
        </button>

        {/* Language / Currency Switcher */}
        <button
          onClick={onOpenCurrencyModal}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 text-slate-700 hover:text-blue-600 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-xs"
          title="Change Payment Currency"
        >
          <span className="text-sm">{currentCurrencyInfo.flag}</span>
          <span className="font-extrabold">{currentCurrencyInfo.code}</span>
          <span className="text-slate-400 font-normal">({currentCurrencyInfo.symbol})</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
        </button>

        {/* Login / Profile */}
        <button
          onClick={onOpenAuth}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold shadow-xs transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-[10px]">
            AA
          </div>
          <span className="hidden sm:inline">Sign In</span>
        </button>
      </div>
    </header>
  );
};
