import React from 'react';
import { CityData, ActiveTab } from '../types';
import {
  ArrowLeft,
  MapPin,
  Sun,
  Calendar,
  DollarSign,
  Star,
  Utensils,
  ShieldCheck,
  Bus,
  Sparkles,
  Building2,
  Bookmark,
  Share2,
} from 'lucide-react';

interface CityDetailViewProps {
  city: CityData;
  onBack: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  onAskAIAboutCity: (cityName: string) => void;
}

export const CityDetailView: React.FC<CityDetailViewProps> = ({
  city,
  onBack,
  setActiveTab,
  onAskAIAboutCity,
}) => {
  return (
    <div className="space-y-8">
      {/* Back CTA & Quick Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200/80 shadow-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cities</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAskAIAboutCity(city.name)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Ask TravelMate AI about {city.name}</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 min-h-80 sm:min-h-96 flex items-end p-6 sm:p-10">
        <img
          src={city.image}
          alt={city.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="relative z-10 text-white max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-xs font-bold text-white border border-blue-400/30">
            <MapPin className="w-3.5 h-3.5" />
            <span>{city.country}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{city.name}</h1>
          <p className="text-sm sm:text-base text-cyan-200 font-medium italic">"{city.tagline}"</p>

          <div className="flex flex-wrap gap-4 pt-3 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>{city.weather.temp} • {city.weather.condition}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Best: {city.bestTimeToVisit}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Budget: {city.estimatedDailyBudget}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview & History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">City Overview & History</h2>
          <p className="text-sm text-slate-700 leading-relaxed font-normal">{city.overview}</p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900 block mb-1 font-bold">Historical Heritage:</strong>
            {city.history}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2 text-cyan-300">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Safety & Travel Tips</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {city.safetyTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-slate-800">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Local Transit:</p>
            <p className="text-xs text-slate-200 leading-relaxed">{city.transportation}</p>
          </div>
        </div>
      </div>

      {/* Top Attractions Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center justify-between">
          <span>Top Attractions in {city.name}</span>
          <span className="text-xs font-semibold text-blue-600">{city.topAttractions.length} Landmarks</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {city.topAttractions.map((attraction, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
              <div className="relative aspect-16/10 overflow-hidden">
                <img src={attraction.image} alt={attraction.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-amber-400 text-[10px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{attraction.rating}</span>
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">{attraction.category}</span>
                <h3 className="font-bold text-slate-900 text-sm">{attraction.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Cuisine & Food Specialties */}
      <div className="bg-amber-50/50 rounded-3xl p-6 sm:p-8 border border-amber-200/60 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-amber-600" />
          <span>Must-Try Local Food in {city.name}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {city.localFoods.map((food, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs space-y-1">
              <h3 className="font-bold text-slate-900 text-sm text-amber-950">{food.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{food.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
