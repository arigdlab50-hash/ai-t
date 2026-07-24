import React from 'react';
import { ActiveTab, CityData, TicketOption, HotelOption } from '../types';
import { HeroSection } from './HeroSection';
import { CITIES_DATA } from '../data/cities';
import { formatCurrency } from '../data/currencies';
import {
  Sparkles,
  Plane,
  Bus,
  Train,
  Building2,
  MapPin,
  ArrowRight,
  ShieldAlert,
  Sun,
  Star,
  Compass,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

interface DashboardViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectCity: (city: CityData) => void;
  onQuickPrompt: (promptText: string) => void;
  tickets: TicketOption[];
  hotels: HotelOption[];
  selectedCurrency?: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveTab,
  onSelectCity,
  onQuickPrompt,
  tickets,
  hotels,
  selectedCurrency = 'USD',
}) => {
  return (
    <div className="space-y-8">
      {/* Main Hero Banner */}
      <HeroSection setActiveTab={setActiveTab} onQuickPrompt={onQuickPrompt} />

      {/* Quick Booking Shortcuts Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-600" />
            <span>Quick Services</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Instant AI-backed bookings</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5">
          <button
            onClick={() => setActiveTab('tickets')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plane className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-900 text-sm">Book Flights</p>
            <p className="text-xs text-slate-500 mt-0.5">Domestic & Global</p>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Bus className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-900 text-sm">Book Buses</p>
            <p className="text-xs text-slate-500 mt-0.5">Luxury Intercity</p>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Train className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-900 text-sm">Book Trains</p>
            <p className="text-xs text-slate-500 mt-0.5">Express Lines</p>
          </button>

          <button
            onClick={() => setActiveTab('hotels')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-900 text-sm">Find Hotels</p>
            <p className="text-xs text-slate-500 mt-0.5">Budget & Luxury</p>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className="col-span-2 sm:col-span-4 lg:col-span-1 p-4 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="font-bold text-white text-sm">AI Trip Planner</p>
            <p className="text-xs text-cyan-100 mt-0.5">Custom Itinerary</p>
          </button>
        </div>
      </div>

      {/* Popular Cities Featured Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Featured Destinations</h2>
            <p className="text-xs text-slate-500">Popular Pakistani & global cities curated with AI guides</p>
          </div>

          <button
            onClick={() => setActiveTab('cities')}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View All Cities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CITIES_DATA.slice(0, 4).map((city) => (
            <div
              key={city.id}
              onClick={() => onSelectCity(city)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                  {city.country}
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                  <Sun className="w-3 h-3" />
                  <span>{city.weather.temp}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-extrabold text-lg leading-snug">{city.name}</h3>
                  <p className="text-xs text-slate-200 line-clamp-1">{city.tagline}</p>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Daily Budget:</span>
                  <span className="font-bold text-blue-600">{city.estimatedDailyBudget}</span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button className="w-full py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-semibold text-xs border border-slate-200/80 transition-colors flex items-center justify-center gap-1">
                    <span>Explore Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Deals & AI Recommendations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Flight Deals */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Plane className="w-4 h-4 text-blue-600" />
              <span>Recommended Flights</span>
            </h3>
            <button
              onClick={() => setActiveTab('tickets')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              See all
            </button>
          </div>

          <div className="space-y-3">
            {tickets.filter((t) => t.type === 'flight').slice(0, 2).map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setActiveTab('tickets')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/60 hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">{ticket.operator}</p>
                  <p className="text-xs text-slate-500">{ticket.from} ➔ {ticket.to}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{ticket.departureTime} • {ticket.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-blue-600 text-sm">
                    {formatCurrency(ticket.price, selectedCurrency)}
                  </p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Direct
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Hotel Recommendations */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>Top Hotel Picks</span>
            </h3>
            <button
              onClick={() => setActiveTab('hotels')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              See all
            </button>
          </div>

          <div className="space-y-3">
            {hotels.slice(0, 2).map((hotel) => (
              <div
                key={hotel.id}
                onClick={() => setActiveTab('hotels')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/60 hover:border-indigo-200 transition-all cursor-pointer flex gap-3 items-center"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{hotel.name}</p>
                  <p className="text-[11px] text-slate-500">{hotel.city}, {hotel.country}</p>
                  <div className="flex items-center gap-1 mt-0.5 text-[10px] text-amber-600 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-slate-900 text-xs">
                    {formatCurrency(hotel.pricePerNight, selectedCurrency)}
                  </p>
                  <p className="text-[10px] text-slate-400">/ night</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Travel Assistant Prompt Callout */}
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-2xl p-5 border border-blue-800/50 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-bold mb-2">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Ask AI Anything</span>
            </div>
            <h3 className="text-base font-bold text-white">Need custom travel advice?</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Ask about local food in Peshawar, 3-day itinerary in Quetta, or train timings to Lahore.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('chat')}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-xs text-white shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Open AI Travel Chat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
