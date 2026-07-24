import React from 'react';
import { ActiveTab, BookedTicket, BookedHotel } from '../types';
import { formatCurrency } from '../data/currencies';
import { Ticket, Building2, Calendar, QrCode, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface TripsViewProps {
  bookedTickets: BookedTicket[];
  bookedHotels: BookedHotel[];
  setActiveTab: (tab: ActiveTab) => void;
  selectedCurrency?: string;
}

export const TripsView: React.FC<TripsViewProps> = ({
  bookedTickets,
  bookedHotels,
  setActiveTab,
  selectedCurrency = 'USD',
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">My Saved Trips & Travel Passes</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Access your confirmed flight, bus, train tickets, hotel reservations, and saved itineraries.
        </p>
      </div>

      {/* Booked Tickets Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Ticket className="w-5 h-5 text-blue-600" />
          <span>Confirmed Travel Tickets ({bookedTickets.length})</span>
        </h2>

        {bookedTickets.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/80 space-y-3">
            <p className="text-sm font-semibold text-slate-700">No travel tickets booked yet.</p>
            <button
              onClick={() => setActiveTab('tickets')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Book Flights, Buses or Trains</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookedTickets.map((b) => (
              <div key={b.bookingId} className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3 shadow-md relative">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-cyan-400">Pass ID: {b.bookingId}</span>
                    <h3 className="font-extrabold text-base text-white">{b.ticket.operator} ({b.ticket.type.toUpperCase()})</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Passenger:</span>
                    <span className="font-bold text-slate-200">{b.passengerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Seat:</span>
                    <span className="font-bold text-slate-200">{b.seatNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Route:</span>
                    <span className="font-bold text-cyan-300">{b.ticket.from} ➔ {b.ticket.to}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Travel Date:</span>
                    <span className="font-bold text-slate-200">{b.travelDate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Paid: <strong className="text-white">{formatCurrency(b.totalPaid, selectedCurrency, true)}</strong>
                  </span>
                  <div className="flex items-center gap-1 text-cyan-400 font-bold text-[10px]">
                    <QrCode className="w-4 h-4" />
                    <span>Boarding Pass Active</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booked Hotels Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-600" />
          <span>Hotel Reservations ({bookedHotels.length})</span>
        </h2>

        {bookedHotels.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/80 space-y-3">
            <p className="text-sm font-semibold text-slate-700">No hotel reservations booked yet.</p>
            <button
              onClick={() => setActiveTab('hotels')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Explore Hotels</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookedHotels.map((h) => (
              <div key={h.bookingId} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-indigo-600">ID: {h.bookingId}</span>
                    <h3 className="font-extrabold text-base text-slate-900">{h.hotel.name}</h3>
                    <p className="text-xs text-slate-500">{h.hotel.city}, {h.hotel.country}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    {h.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Guest Name:</span>
                    <span className="font-bold text-slate-800">{h.guestName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Stay Dates:</span>
                    <span className="font-bold text-slate-800">{h.checkInDate} to {h.checkOutDate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Total Paid: <strong className="text-indigo-600 font-extrabold">{formatCurrency(h.totalPaid, selectedCurrency, true)}</strong>
                  </span>
                  <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Room Confirmed</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
