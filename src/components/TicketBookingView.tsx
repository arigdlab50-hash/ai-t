import React, { useState } from 'react';
import { TicketOption, TicketType, BookedTicket } from '../types';
import { formatCurrency, CURRENCIES, PAYMENT_METHODS } from '../data/currencies';
import {
  Plane,
  Bus,
  Train,
  Calendar,
  Users,
  Search,
  CheckCircle2,
  Filter,
  ArrowRightLeft,
  X,
  QrCode,
  Sparkles,
  CreditCard,
  Wallet,
  Smartphone,
  Building2,
  DollarSign,
} from 'lucide-react';

interface TicketBookingViewProps {
  tickets: TicketOption[];
  onBookTicket: (booking: BookedTicket) => void;
  selectedCurrency?: string;
  onOpenCurrencyModal?: () => void;
}

export const TicketBookingView: React.FC<TicketBookingViewProps> = ({
  tickets,
  onBookTicket,
  selectedCurrency = 'USD',
  onOpenCurrencyModal,
}) => {
  const [selectedType, setSelectedType] = useState<TicketType>('flight');
  const [fromCity, setFromCity] = useState('Quetta');
  const [toCity, setToCity] = useState('Karachi');
  const [departureDate, setDepartureDate] = useState('2026-07-25');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');
  const [filterPriceMax, setFilterPriceMax] = useState(1000);

  // Booking Modal state
  const [activeTicketForModal, setActiveTicketForModal] = useState<TicketOption | null>(null);
  const [passengerName, setPassengerName] = useState('Anabia Ayat');
  const [passengerEmail, setPassengerEmail] = useState('anabiaayat123@gmail.com');
  const [selectedSeat, setSelectedSeat] = useState('14A');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [checkoutCurrency, setCheckoutCurrency] = useState(selectedCurrency);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookedTicket | null>(null);

  const currentCurrency = checkoutCurrency || selectedCurrency;

  const filteredTickets = tickets.filter((t) => {
    if (t.type !== selectedType) return false;
    if (fromCity && !t.from.toLowerCase().includes(fromCity.toLowerCase())) return false;
    if (toCity && !t.to.toLowerCase().includes(toCity.toLowerCase())) return false;
    if (t.price > filterPriceMax) return false;
    return true;
  });

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicketForModal) return;

    setIsProcessingPayment(true);

    setTimeout(() => {
      const totalUSD = activeTicketForModal.price * travelers;
      const newBooking: BookedTicket = {
        bookingId: `TM-${Math.floor(100000 + Math.random() * 900000)}`,
        ticket: activeTicketForModal,
        passengerName,
        passengerEmail,
        seatNumber: selectedSeat,
        travelDate: departureDate || '2026-07-25',
        totalPaid: totalUSD,
        bookedAt: new Date().toLocaleDateString(),
        status: 'Confirmed',
      };

      onBookTicket(newBooking);
      setConfirmedBooking(newBooking);
      setIsProcessingPayment(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Book Flights, Buses & Trains</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Compare live routes, schedules, and fares in all global & local currencies
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="inline-flex p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/60 backdrop-blur-md">
            <button
              onClick={() => setSelectedType('flight')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs transition-all ${
                selectedType === 'flight'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Flights</span>
            </button>

            <button
              onClick={() => setSelectedType('bus')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs transition-all ${
                selectedType === 'bus'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span>Buses</span>
            </button>

            <button
              onClick={() => setSelectedType('train')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs transition-all ${
                selectedType === 'train'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Train className="w-4 h-4" />
              <span>Trains</span>
            </button>
          </div>
        </div>

        {/* Search Form Inputs */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
          {/* From */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase">From</label>
            <input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Origin City (e.g. Quetta)"
              className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Swap button */}
          <div className="hidden lg:flex items-end justify-center pb-1">
            <button
              onClick={handleSwapCities}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
              title="Swap From/To"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase">To</label>
            <input
              type="text"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="Destination City (e.g. Karachi)"
              className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Departure Date */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase">Departure Date</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Travelers & Class */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase">Travelers & Class</label>
            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-slate-700 focus:border-cyan-400 outline-none"
            >
              <option value="Economy">1 Passenger • Economy</option>
              <option value="Business">1 Passenger • Business</option>
              <option value="Executive">2 Passengers • Executive</option>
            </select>
          </div>

          {/* Search CTA */}
          <div className="flex items-end col-span-1 sm:col-span-2 lg:col-span-1">
            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              <span>Search Routes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Available {selectedType.toUpperCase()} Tickets</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
              {filteredTickets.length} Found
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Showing prices in <strong>{CURRENCIES[selectedCurrency]?.name || selectedCurrency}</strong>
          </p>
        </div>

        {/* Filter Slider & Currency Quick Change */}
        <div className="flex flex-wrap items-center gap-3">
          {onOpenCurrencyModal && (
            <button
              onClick={onOpenCurrencyModal}
              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 transition-all flex items-center gap-1.5"
            >
              <span>{CURRENCIES[selectedCurrency]?.flag}</span>
              <span>Currency: {selectedCurrency}</span>
            </button>
          )}

          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-600 font-medium">Max Price: {formatCurrency(filterPriceMax, selectedCurrency)}</span>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={filterPriceMax}
              onChange={(e) => setFilterPriceMax(Number(e.target.value))}
              className="w-24 accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Ticket Cards List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
            <p className="text-sm font-semibold text-slate-700">No tickets matching your filter criteria.</p>
            <p className="text-xs text-slate-500">Try adjusting origin/destination or expanding max price filter.</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              {/* Operator info */}
              <div className="flex items-center gap-4 min-w-48">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-blue-600 text-sm shrink-0">
                  {selectedType === 'flight' && <Plane className="w-6 h-6" />}
                  {selectedType === 'bus' && <Bus className="w-6 h-6" />}
                  {selectedType === 'train' && <Train className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{ticket.operator}</h3>
                  <p className="text-xs text-slate-500 font-medium">{ticket.number} • {ticket.classType}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {ticket.seatsLeft} seats left
                    </span>
                  </div>
                </div>
              </div>

              {/* Timing & Route */}
              <div className="flex items-center gap-6 text-center flex-1 justify-center">
                <div>
                  <p className="text-base font-extrabold text-slate-900">{ticket.departureTime}</p>
                  <p className="text-xs font-semibold text-slate-600">{ticket.from} {ticket.fromCode && `(${ticket.fromCode})`}</p>
                </div>

                <div className="flex flex-col items-center min-w-24">
                  <span className="text-[10px] font-bold text-slate-400">{ticket.duration}</span>
                  <div className="w-full flex items-center my-1">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <div className="flex-1 h-0.5 bg-slate-200 border-t border-dashed border-slate-400" />
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  </div>
                  <span className="text-[10px] font-semibold text-blue-600">{ticket.stops}</span>
                </div>

                <div>
                  <p className="text-base font-extrabold text-slate-900">{ticket.arrivalTime}</p>
                  <p className="text-xs font-semibold text-slate-600">{ticket.to} {ticket.toCode && `(${ticket.toCode})`}</p>
                </div>
              </div>

              {/* Price & Book CTA */}
              <div className="flex items-center md:flex-col justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 text-right">
                <div>
                  <p className="text-xl font-extrabold text-blue-600">
                    {formatCurrency(ticket.price, selectedCurrency)}
                  </p>
                  <p className="text-[10px] text-slate-400">per traveler</p>
                </div>

                <button
                  onClick={() => {
                    setActiveTicketForModal(ticket);
                    setCheckoutCurrency(selectedCurrency);
                    setConfirmedBooking(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all mt-2"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Multi-Currency Booking Modal */}
      {activeTicketForModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveTicketForModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {!confirmedBooking ? (
              <form onSubmit={handleConfirmReservation} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg">Confirm Ticket & Pay</h3>
                      <p className="text-xs text-slate-500">{activeTicketForModal.operator} • {activeTicketForModal.from} ➔ {activeTicketForModal.to}</p>
                    </div>
                  </div>
                </div>

                {/* Currency Selection Dropdown for Checkout */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Payment Currency:</span>
                    <select
                      value={checkoutCurrency}
                      onChange={(e) => setCheckoutCurrency(e.target.value)}
                      className="px-3 py-1 bg-white font-bold text-xs text-blue-700 rounded-xl border border-slate-300 outline-none"
                    >
                      {Object.values(CURRENCIES).map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code} ({c.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200">
                    <span className="text-slate-500">Converted Total ({travelers} pax):</span>
                    <span className="text-base font-extrabold text-blue-600">
                      {formatCurrency(activeTicketForModal.price * travelers, currentCurrency, true)}
                    </span>
                  </div>
                </div>

                {/* Passenger Info Inputs */}
                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Passenger Full Name</label>
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Passenger Email</label>
                    <input
                      type="email"
                      required
                      value={passengerEmail}
                      onChange={(e) => setPassengerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-medium text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                    />
                  </div>
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
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        {pm.id === 'card' && <CreditCard className="w-4 h-4 shrink-0" />}
                        {(pm.id === 'jazzcash' || pm.id === 'easypaisa') && <Smartphone className="w-4 h-4 shrink-0 text-amber-300" />}
                        {pm.id === 'raast' && <Building2 className="w-4 h-4 shrink-0 text-emerald-300" />}
                        {(pm.id === 'paypal' || pm.id === 'applepay' || pm.id === 'mada') && <Wallet className="w-4 h-4 shrink-0 text-cyan-300" />}
                        <div>
                          <p className="font-bold text-xs leading-tight">{pm.name}</p>
                          <p className={`text-[9px] ${selectedPaymentMethod === pm.id ? 'text-slate-200' : 'text-slate-500'}`}>
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
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-lg hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Payment ({currentCurrency})...</span>
                    </>
                  ) : (
                    <span>
                      Pay {formatCurrency(activeTicketForModal.price * travelers, currentCurrency, true)} & Confirm
                    </span>
                  )}
                </button>
              </form>
            ) : (
              /* Success Boarding Pass View */
              <div className="text-center space-y-5">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-xl">Payment Successful!</h3>
                  <p className="text-xs text-slate-500 mt-1">Pass ID: {confirmedBooking.bookingId}</p>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl text-left text-xs space-y-2 border border-slate-800 relative">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Passenger:</span>
                    <span className="font-bold text-white">{confirmedBooking.passengerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Route:</span>
                    <span className="font-bold text-cyan-400">{confirmedBooking.ticket.from} ➔ {confirmedBooking.ticket.to}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Total Paid:</span>
                    <span className="font-bold text-emerald-400">
                      {formatCurrency(confirmedBooking.totalPaid, currentCurrency, true)}
                    </span>
                  </div>

                  {/* QR Code Simulation */}
                  <div className="pt-3 flex items-center justify-center gap-2 text-cyan-400 border-t border-slate-800">
                    <QrCode className="w-12 h-12 text-white" />
                    <span className="text-[10px] text-slate-400">Scan at Terminal / Station Counter</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTicketForModal(null)}
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
