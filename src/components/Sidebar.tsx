import React from 'react';
import { ActiveTab } from '../types';
import {
  Compass,
  Bot,
  Ticket,
  Building2,
  MapPin,
  Sparkles,
  Navigation,
  Luggage,
  User,
  LogOut,
  X,
  Plane,
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  savedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  savedCount,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'chat', label: 'AI Chat', icon: Bot, badge: 'AI' },
    { id: 'tickets', label: 'Book Tickets', icon: Ticket },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'cities', label: 'Explore Cities', icon: MapPin },
    { id: 'planner', label: 'Travel Planner', icon: Sparkles, badge: 'New' },
    { id: 'nearby', label: 'Nearby Attractions', icon: Navigation },
    { id: 'trips', label: 'My Trips', icon: Luggage, count: savedCount },
    { id: 'profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-slate-900 text-slate-100 flex flex-col z-50 transition-transform duration-300 ease-in-out border-r border-slate-800 shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header / Brand */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-11 h-11 rounded-2xl bg-white p-0.5 shadow-lg shadow-blue-500/20 overflow-hidden shrink-0 border border-slate-700">
              <img src="/logo.jpg" alt="TravelMate AI Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                <span>TravelMate</span>
                <span className="text-cyan-400 font-extrabold text-xs px-1.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20">AI</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Plan Smart. Travel Easy.</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Main Menu
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as ActiveTab);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-600/20 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                )}

                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* AI status & User Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="mb-3 p-3 rounded-xl bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-800/30 flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Gemini 3.6 Engine</p>
              <p className="text-[10px] text-slate-400">Real-time trip assistant active</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="User"
                className="w-8 h-8 rounded-full border border-slate-700 object-cover"
              />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Anabia Ayat</p>
                <p className="text-[10px] text-slate-400">Traveler Member</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              title="Settings"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
