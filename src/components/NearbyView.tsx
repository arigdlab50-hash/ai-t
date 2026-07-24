import React, { useState } from 'react';
import { ActiveTab, NearbyPlace } from '../types';
import { NEARBY_PLACES } from '../data/nearbyPlaces';
import { MapPin, Navigation, Star, Search, Compass, Phone, Clock, ArrowRight } from 'lucide-react';

interface NearbyViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const NearbyView: React.FC<NearbyViewProps> = ({ setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePlace, setActivePlace] = useState<NearbyPlace>(NEARBY_PLACES[0]);

  const categories = ['All', 'Museum', 'Park', 'Restaurant', 'Shopping', 'Historic', 'Cafe'];

  const filteredPlaces = NEARBY_PLACES.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-3">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Map & Nearby Places</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Discover Nearby Attractions & Spots
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Find nearby parks, historic landmarks, top-rated local food restaurants, traditional markets, and museums around Quetta and your destination.
          </p>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-semibold text-xs whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Places List Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Map Visual Mockup */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-4 border border-slate-800 shadow-xl min-h-96 relative flex flex-col justify-between overflow-hidden">
          {/* Map canvas background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

          {/* Interactive Map Pins */}
          <div className="relative w-full h-80 sm:h-96 bg-slate-950/70 rounded-2xl border border-slate-800 overflow-hidden">
            {filteredPlaces.map((place) => {
              const isSelected = activePlace?.id === place.id;
              return (
                <button
                  key={place.id}
                  onClick={() => setActivePlace(place)}
                  style={{ left: `${place.x}%`, top: `${place.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all group ${
                    isSelected ? 'z-30 scale-125' : 'z-10 hover:scale-110'
                  }`}
                >
                  <div
                    className={`p-2 rounded-full shadow-lg flex items-center justify-center ${
                      isSelected
                        ? 'bg-blue-600 text-white ring-4 ring-cyan-400/50'
                        : 'bg-slate-800 text-cyan-400 border border-slate-700'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-md ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-300'
                    }`}
                  >
                    {place.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Map Footer Bar */}
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between px-2">
            <span>Click any map pin to view place details</span>
            <span className="text-cyan-400 font-semibold">{filteredPlaces.length} Spots Located</span>
          </div>
        </div>

        {/* Selected Place Details Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl space-y-4 flex flex-col justify-between">
          {activePlace && (
            <div className="space-y-4">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-slate-200">
                <img src={activePlace.image} alt={activePlace.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-amber-400 text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{activePlace.rating}</span>
                </span>
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                  {activePlace.category}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">{activePlace.name}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{activePlace.address} • {activePlace.distance} away</span>
                </p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{activePlace.description}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Open Hours:</span>
                  <span className="font-bold text-slate-800">{activePlace.openHours}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
