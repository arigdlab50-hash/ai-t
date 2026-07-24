import React, { useState } from 'react';
import { HotelOption, BookedHotel } from '../types';
import { formatCurrency, CURRENCIES, PAYMENT_METHODS } from '../data/currencies';
import {
  Building2,
  MapPin,
  Star,
  Search,
  CheckCircle2,
  X,
  Sparkles,
  Wifi,
  Coffee,
  Check,
  CreditCard,
  Smartphone,
  Wallet,
  Filter,
} from 'lucide-react';

interface HotelBookingViewProps {
  hotels: HotelOption[];
  onBookHotel: (booking: BookedHotel) => void;
  selectedCurrency?: string;
  onOpenCurrencyModal?: () => void;
}

export const HotelBookingView: React.FC<HotelBookingViewProps> = ({
  hotels,
  onBookHotel,
  selectedCurrency = 'USD',
  onOpenCurrencyModal,
}) => {
  const [searchCity, setSearchCity] = useState('');
  const [checkIn, setCheckIn] = useState('2026-08-01');
  const [checkOut, setCheckOut] = useState('2026-08-04');
  const [guests, setGuests] = useState(2);
  const [maxBudget, setMaxBudget] = useState(500);

  // Selected hotel for modal
  const [activeHotel, setActiveHotel] = useState<HotelOption | null>(null);
  const [guestName, setGuestName] = useState('Anabia Ayat');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [checkoutCurrency, setCheckoutCurrency] = useState(selectedCurrency);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookedHotel | null>(null);

  const currentCurrency = checkoutCurrency || selectedCurrency;

  const filteredHotels = hotels.filter((h) => {
    if (searchCity && !h.city.toLowerCase().includes(searchCity.toLowerCase()) && !h.country.toLowerCase().includes(searchCity.toLowerCase())) {
      return false;
    }
    if (h.pricePerNight > maxBudget) return false;
    return true;
  });

  const handleReserveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeHotel) return;

    setIsProcessingPayment(true);

    setTimeout(() => {
      const nights = 3;
      const totalUSD = activeHotel.pricePerNight * nights;
      const newBooking: BookedHotel = {
        bookingId: `TH-${Math.floor(100000 + Math.random() * 900000)}`,
        hotel: activeHotel,
        guestName,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guestsCount: guests,
        totalPaid: totalUSD,
        bookedAt: new Date().toLocaleDateString(),
        status: 'Confirmed',
      };

      onBookHotel(newBooking);
      setConfirmedBooking(newBooking);
      setIsProcessingPayment(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Find & Reserve Luxury & Budget Hotels</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Curated hotels in Quetta, Lahore, Islamabad, Hunza, Skardu, Paris, Dubai & Istanbul
            </p>
          </div>

          {onOpenCurrencyModal && (
            <button
              onClick={onOpenCurrencyModal}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <span>{CURRENCIES[selectedCurrency]?.flag}</span>
              <span>Currency: {selectedCurrency}</span>
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* City */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase">City or Country</label>
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="e.g. Quetta, Lahore, Paris"
              className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Check in */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase">Check-In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Check out */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase">Check-Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Guests & Budget */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase">Guests & Max Nightly</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-16 px-2.5 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 outline-none"
              />
              <input
                type="number"
                min="20"
                max="1000"
                step="10"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="flex-1 px-3 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 outline-none"
              />
            </div>
          </div>

          {/* Search CTA */}
          <div className="flex items-end col-span-1 sm:col-span-2 lg:col-span-1">
            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              <span>Search Hotels</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-16/10 overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-extrabold flex items-center gap-1 shadow-md border border-white/20">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{hotel.rating}</span>
                <span className="text-slate-300 text-[10px]">({hotel.reviewCount})</span>
              </div>

              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md">
                {hotel.city}, {hotel.country}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{hotel.name}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{hotel.address}</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">{hotel.distanceFromCenter}</p>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {hotel.description}
                </p>

                {/* Amenity Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-slate-900">
                    {formatCurrency(hotel.pricePerNight, selectedCurrency)}
                  </span>
                  <span className="text-xs text-slate-500"> / night</span>
                </div>

                <button
                  onClick={() => {
                    setActiveHotel(hotel);
                    setCheckoutCurrency(selectedCurrency);
                    setConfirmedBooking(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  Reserve Room
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hotel Reservation Modal */}
      {activeHotel && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveHotel(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {!confirmedBooking ? (
              <form onSubmit={handleReserveRoom} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Hotel Reservation</h3>
                    <p className="text-xs text-slate-500">{activeHotel.name} ({activeHotel.city})</p>
                  </div>
                </div>

                {/* Currency Selection Dropdown for Hotel */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Payment Currency:</span>
                    <select
                      value={checkoutCurrency}
                      onChange={(e) => setCheckoutCurrency(e.target.value)}
                      className="px-3 py-1 bg-white font-bold text-xs text-indigo-700 rounded-xl border border-slate-300 outline-none"
                    >
                      {Object.values(CURRENCIES).map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code} ({c.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200">
                    <span className="text-slate-500">Total Stay Price (3 Nights):</span>
                    <span className="text-base font-extrabold text-indigo-700">
                      {formatCurrency(activeHotel.pricePerNight * 3, currentCurrency, true)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Guest Name</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>

                {/* Multi-Currency Payment Method Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Select Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENT_METHODS.filter(
                      (pm) =>
                        pm.supportedCurrencies.length === 0 ||
                        pm.supportedCurrencies.includes(currentCurrency)
                    ).map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setSelectedPaymentMethod(pm.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          selectedPaymentMethod === pm.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        {pm.id === 'card' && <CreditCard className="w-4 h-4 shrink-0" />}
                        {(pm.id === 'jazzcash' || pm.id === 'easypaisa') && <Smartphone className="w-4 h-4 shrink-0 text-amber-300" />}
                        {pm.id === 'raast' && <Building2 className="w-4 h-4 shrink-0 text-emerald-300" />}
                        {(pm.id === 'paypal' || pm.id === 'applepay' || pm.id === 'mada') && <Wallet className="w-4 h-4 shrink-0 text-cyan-300" />}
                        <div>
                          <p className="font-bold text-xs leading-tight">{pm.name}</p>
                          <p className={`text-[9px] ${selectedPaymentMethod === pm.id ? 'text-slate-100' : 'text-slate-500'}`}>
                            Instant Payment
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg hover:from-indigo-500 hover:to-cyan-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Payment ({currentCurrency})...</span>
                    </>
                  ) : (
                    <span>
                      Pay {formatCurrency(activeHotel.pricePerNight * 3, currentCurrency, true)} & Confirm
                    </span>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-5">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-xl">Hotel Room Reserved!</h3>
                  <p className="text-xs text-slate-500 mt-1">Confirmation ID: {confirmedBooking.bookingId}</p>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl text-left text-xs space-y-2 border border-slate-800">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Guest:</span>
                    <span className="font-bold text-white">{confirmedBooking.guestName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Hotel:</span>
                    <span className="font-bold text-indigo-300">{confirmedBooking.hotel.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Paid:</span>
                    <span className="font-bold text-emerald-400">
                      {formatCurrency(confirmedBooking.totalPaid, currentCurrency, true)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveHotel(null)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
