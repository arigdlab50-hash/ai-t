import React, { useState } from 'react';
import { ActiveTab, GeneratedItinerary } from '../types';
import {
  Sparkles,
  Calendar,
  DollarSign,
  MapPin,
  Compass,
  CheckCircle2,
  Clock,
  Printer,
  Share2,
  Download,
  Bot,
  Utensils,
  Sun,
  ShieldAlert,
} from 'lucide-react';

interface PlannerViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSaveItinerary?: (itinerary: GeneratedItinerary) => void;
}

export const PlannerView: React.FC<PlannerViewProps> = ({ setActiveTab, onSaveItinerary }) => {
  const [destination, setDestination] = useState('Quetta');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('Moderate');
  const [travelStyle, setTravelStyle] = useState('Sightseeing & Culture');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);

  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, days, budget, travelStyle }),
      });

      const data = await res.json();
      if (data.itinerary) {
        setGeneratedItinerary(data.itinerary);
        if (onSaveItinerary) onSaveItinerary(data.itinerary);
      }
    } catch (err) {
      console.error('Planner error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Itinerary Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Custom Day-by-Day Travel Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Specify your destination, length of stay, and budget to receive an instant, AI-generated custom day-by-day itinerary complete with attraction schedules, local dining suggestions, packing lists, and safety tips.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerateItinerary} className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase">Destination City</label>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Quetta, Hunza, Paris"
              className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 focus:border-cyan-400 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase">Trip Duration (Days)</label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 focus:border-cyan-400 outline-none"
            >
              <option value={1}>1 Day Express</option>
              <option value={2}>2 Days Weekend Getaway</option>
              <option value={3}>3 Days Classic Explorer</option>
              <option value={5}>5 Days Full Tour</option>
              <option value={7}>7 Days Complete Vacation</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase">Budget & Style</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 focus:border-cyan-400 outline-none"
            >
              <option value="Budget">Backpacker / Budget</option>
              <option value="Moderate">Moderate / Family</option>
              <option value="Luxury">Luxury / Premium</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Bot className="w-4 h-4 animate-spin" />
                  <span>Generating AI Plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Itinerary</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Generated Result Container */}
      {generatedItinerary && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Custom AI Itinerary Generated
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                {generatedItinerary.days}-Day Tour of {generatedItinerary.destination}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{generatedItinerary.overview}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Key Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-1">
              <span className="text-[10px] font-bold uppercase text-blue-700">Estimated Cost</span>
              <p className="text-base font-extrabold text-slate-900">{generatedItinerary.estimatedTotalCost}</p>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-[10px] font-bold uppercase text-emerald-700">Best Season</span>
              <p className="text-base font-extrabold text-slate-900">{generatedItinerary.bestTimeToVisit}</p>
            </div>
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-1">
              <span className="text-[10px] font-bold uppercase text-amber-700">Weather Forecast</span>
              <p className="text-base font-extrabold text-slate-900">{generatedItinerary.weatherSummary}</p>
            </div>
          </div>

          {/* Daily Schedule breakdown */}
          <div className="space-y-6">
            <h3 className="text-lg font-extrabold text-slate-900">Day-by-Day Activity Schedule</h3>

            <div className="space-y-6">
              {generatedItinerary.dailyItinerary.map((day) => (
                <div key={day.dayNumber} className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50/40">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                    <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        D{day.dayNumber}
                      </span>
                      <span>{day.title}</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Morning */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 space-y-1">
                      <span className="font-bold text-amber-600 uppercase text-[10px]">Morning</span>
                      <p className="font-semibold text-slate-900">{day.morning.activity}</p>
                      <p className="text-slate-500">{day.morning.location}</p>
                    </div>

                    {/* Afternoon */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 space-y-1">
                      <span className="font-bold text-blue-600 uppercase text-[10px]">Afternoon</span>
                      <p className="font-semibold text-slate-900">{day.afternoon.activity}</p>
                      <p className="text-slate-500">{day.afternoon.location}</p>
                    </div>

                    {/* Evening */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 space-y-1">
                      <span className="font-bold text-indigo-600 uppercase text-[10px]">Evening</span>
                      <p className="font-semibold text-slate-900">{day.evening.activity}</p>
                      <p className="text-slate-500">{day.evening.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
