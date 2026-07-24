import React, { useState } from 'react';
import { CityData, ActiveTab } from '../types';
import { CITIES_DATA } from '../data/cities';
import {
  MapPin,
  Star,
  Search,
  Sun,
  ShieldCheck,
  Utensils,
  Compass,
  ArrowRight,
  Sparkles,
  Calendar,
  DollarSign,
  ChevronRight,
  Building2,
} from 'lucide-react';

interface CitiesViewProps {
  onSelectCity: (city: CityData) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CitiesView: React.FC<CitiesViewProps> = ({ onSelectCity, setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');

  const countries = ['All', 'Pakistan', 'France', 'UAE', 'Turkey'];

  const filteredCities = CITIES_DATA.filter((city) => {
    const matchesSearch =
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.tagline.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry = filterCountry === 'All' || city.country === filterCountry;

    return matchesSearch && matchesCountry;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Global Destinations Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Explore Cities & Local Culture
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Detailed guides for Quetta, Lahore, Islamabad, Peshawar, Hunza, Skardu, Paris, Dubai, and Istanbul with weather, food, and attractions.
          </p>
        </div>

        {/* Filter bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cities (e.g. Quetta, Paris, Lahore)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 text-white placeholder-slate-400 text-xs font-medium rounded-xl border border-slate-700 focus:border-cyan-400 outline-none"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCountry(c)}
                className={`px-4 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-all ${
                  filterCountry === c
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map((city) => (
          <div
            key={city.id}
            onClick={() => onSelectCity(city)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
          >
            <div className="relative aspect-16/10 overflow-hidden">
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-cyan-300 text-xs font-bold flex items-center gap-1 border border-white/20">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>{city.weather.temp}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600/90 text-white mb-1 inline-block">
                  {city.country}
                </span>
                <h3 className="text-xl font-extrabold tracking-tight">{city.name}</h3>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs font-semibold text-blue-600 italic">"{city.tagline}"</p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {city.overview}
                </p>

                {/* Micro info badges */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-slate-700 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{city.bestTimeToVisit.split('&')[0]}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-slate-700 font-medium">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{city.estimatedDailyBudget}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-amber-500" />
                  <span>{city.localFoods.length} Local Specialties</span>
                </span>

                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
