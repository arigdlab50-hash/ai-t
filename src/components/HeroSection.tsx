import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, Ticket, Plane, MapPin, Hotel, Compass, Globe, Luggage, Landmark, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onQuickPrompt: (promptText: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onQuickPrompt }) => {
  const samplePrompts = [
    "I'm visiting Quetta for 3 days. What should I see?",
    "Book me a bus ticket from Quetta to Karachi.",
    "Find the cheapest flight to Islamabad tomorrow.",
    "Recommend family-friendly hotels in Lahore.",
    "What local food should I try in Peshawar?",
    "Create a 5-day travel itinerary for Hunza.",
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 mb-8 shadow-2xl border border-blue-900/40">
      {/* Background glowing blurred radial orbs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -ml-20 -mb-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Text & Call To Actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Next-Gen AI Travel Assistant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
            Plan Your Perfect Trip with <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">AI</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
            Discover cities, book flights, buses, trains, and hotels, explore attractions, and receive personalized travel plans from your AI travel assistant.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('planner')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Planning</span>
            </button>

            <button
              onClick={() => setActiveTab('tickets')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm backdrop-blur-md transition-all transform hover:-translate-y-0.5"
            >
              <Ticket className="w-4 h-4 text-cyan-400" />
              <span>Book Tickets</span>
            </button>
          </div>

          {/* Prompt Suggestion Chips */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Try Asking AI:</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.slice(0, 3).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onQuickPrompt(prompt)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-blue-600/30 text-slate-300 hover:text-white border border-slate-700/60 hover:border-blue-400/50 transition-all text-left flex items-center gap-1.5 group"
                >
                  <span>"{prompt}"</span>
                  <ArrowRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Graphic AI Illustration Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm lg:max-w-none bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-3xl p-6 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
            {/* Illustration graphic canvas mockup */}
            <div className="relative aspect-4/3 w-full rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-4 text-center">
              {/* World map grid SVG background */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* TravelMate AI Official Logo Graphic */}
              <div className="relative w-36 h-36 mb-2 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow" />
                
                {/* Center Logo image badge */}
                <div className="w-28 h-28 rounded-full bg-white p-1 shadow-xl shadow-cyan-500/30 z-10 flex items-center justify-center overflow-hidden border-2 border-cyan-400/60">
                  <img src="/logo.jpg" alt="TravelMate AI Official Logo" className="w-full h-full object-cover rounded-full" />
                </div>

                {/* Floating satellite icons */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 p-1.5 rounded-xl bg-blue-600/90 text-white shadow-md border border-blue-400/30 z-20">
                  <Plane className="w-3.5 h-3.5 transform -rotate-45" />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 p-1.5 rounded-xl bg-amber-500/90 text-white shadow-md border border-amber-300/30 z-20">
                  <Luggage className="w-3.5 h-3.5" />
                </div>
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 p-1.5 rounded-xl bg-indigo-600/90 text-white shadow-md border border-indigo-400/30 z-20">
                  <Landmark className="w-3.5 h-3.5" />
                </div>
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 p-1.5 rounded-xl bg-emerald-600/90 text-white shadow-md border border-emerald-400/30 z-20">
                  <Hotel className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Chat bubble graphic */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700/80 text-left space-y-1 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wide">TravelMate AI Assistant</span>
                </div>
                <p className="text-xs text-slate-200">
                  "I found 3 luxury hotels in Lahore and a direct flight from Quetta to Islamabad for tomorrow morning!"
                </p>
              </div>
            </div>

            {/* Micro Stats Banner */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="bg-slate-800/50 rounded-xl p-2.5 border border-slate-700/40">
                <p className="text-base font-extrabold text-white">500+</p>
                <p className="text-[10px] text-slate-400">Cities Covered</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-2.5 border border-slate-700/40">
                <p className="text-base font-extrabold text-cyan-400">99.8%</p>
                <p className="text-[10px] text-slate-400">AI Accuracy</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-2.5 border border-slate-700/40">
                <p className="text-base font-extrabold text-emerald-400">Instant</p>
                <p className="text-[10px] text-slate-400">Itineraries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
