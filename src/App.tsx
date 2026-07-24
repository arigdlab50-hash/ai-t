import React, { useState } from 'react';
import {
  ActiveTab,
  CityData,
  TicketOption,
  HotelOption,
  BookedTicket,
  BookedHotel,
  UserProfile,
} from './types';
import { INITIAL_TICKETS, INITIAL_HOTELS } from './data/ticketsAndHotels';
import { CITIES_DATA } from './data/cities';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { AIChatView } from './components/AIChatView';
import { TicketBookingView } from './components/TicketBookingView';
import { HotelBookingView } from './components/HotelBookingView';
import { CitiesView } from './components/CitiesView';
import { CityDetailView } from './components/CityDetailView';
import { PlannerView } from './components/PlannerView';
import { NearbyView } from './components/NearbyView';
import { TripsView } from './components/TripsView';
import { ProfileView } from './components/ProfileView';
import { CurrencySelectorModal } from './components/CurrencySelectorModal';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [initialChatPrompt, setInitialChatPrompt] = useState<string | undefined>(undefined);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState<boolean>(false);

  // App State collections
  const [tickets] = useState<TicketOption[]>(INITIAL_TICKETS);
  const [hotels] = useState<HotelOption[]>(INITIAL_HOTELS);
  const [bookedTickets, setBookedTickets] = useState<BookedTicket[]>([
    {
      bookingId: 'TM-894102',
      ticket: INITIAL_TICKETS[0],
      passengerName: 'Anabia Ayat',
      passengerEmail: 'anabiaayat123@gmail.com',
      seatNumber: '14A',
      travelDate: '2026-07-25',
      totalPaid: 120,
      bookedAt: '2026-07-20',
      status: 'Confirmed',
    },
  ]);
  const [bookedHotels, setBookedHotels] = useState<BookedHotel[]>([
    {
      bookingId: 'TH-391054',
      hotel: INITIAL_HOTELS[0],
      guestName: 'Anabia Ayat',
      checkInDate: '2026-08-01',
      checkOutDate: '2026-08-04',
      guestsCount: 2,
      totalPaid: 255,
      bookedAt: '2026-07-21',
      status: 'Confirmed',
    },
  ]);

  const [userProfile] = useState<UserProfile>({
    name: 'Anabia Ayat',
    email: 'anabiaayat123@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    preferredCurrency: selectedCurrency,
    passportCountry: 'Pakistan',
    savedPlacesCount: 4,
  });

  const handleSelectCity = (city: CityData) => {
    setSelectedCity(city);
    setActiveTab('city-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickPrompt = (promptText: string) => {
    setInitialChatPrompt(promptText);
    setActiveTab('chat');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setInitialChatPrompt(searchQuery);
    setActiveTab('chat');
  };

  const handleBookTicket = (booking: BookedTicket) => {
    setBookedTickets((prev) => [booking, ...prev]);
  };

  const handleBookHotel = (booking: BookedHotel) => {
    setBookedHotels((prev) => [booking, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col antialiased">
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          savedCount={bookedTickets.length + bookedHotels.length}
        />

        {/* Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            selectedCurrency={selectedCurrency}
            onOpenCurrencyModal={() => setIsCurrencyModalOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardView
                setActiveTab={setActiveTab}
                onSelectCity={handleSelectCity}
                onQuickPrompt={handleQuickPrompt}
                tickets={tickets}
                hotels={hotels}
                selectedCurrency={selectedCurrency}
              />
            )}

            {activeTab === 'chat' && (
              <AIChatView
                setActiveTab={setActiveTab}
                initialPrompt={initialChatPrompt}
                onClearInitialPrompt={() => setInitialChatPrompt(undefined)}
              />
            )}

            {activeTab === 'tickets' && (
              <TicketBookingView
                tickets={tickets}
                onBookTicket={handleBookTicket}
                selectedCurrency={selectedCurrency}
                onOpenCurrencyModal={() => setIsCurrencyModalOpen(true)}
              />
            )}

            {activeTab === 'hotels' && (
              <HotelBookingView
                hotels={hotels}
                onBookHotel={handleBookHotel}
                selectedCurrency={selectedCurrency}
                onOpenCurrencyModal={() => setIsCurrencyModalOpen(true)}
              />
            )}

            {activeTab === 'cities' && (
              <CitiesView onSelectCity={handleSelectCity} setActiveTab={setActiveTab} />
            )}

            {activeTab === 'city-detail' && selectedCity && (
              <CityDetailView
                city={selectedCity}
                onBack={() => setActiveTab('cities')}
                setActiveTab={setActiveTab}
                onAskAIAboutCity={(cityName) => {
                  handleQuickPrompt(`Tell me more about attractions and travel tips for ${cityName}`);
                }}
              />
            )}

            {activeTab === 'planner' && <PlannerView setActiveTab={setActiveTab} />}

            {activeTab === 'nearby' && <NearbyView setActiveTab={setActiveTab} />}

            {activeTab === 'trips' && (
              <TripsView
                bookedTickets={bookedTickets}
                bookedHotels={bookedHotels}
                setActiveTab={setActiveTab}
                selectedCurrency={selectedCurrency}
              />
            )}

            {activeTab === 'profile' && <ProfileView profile={{ ...userProfile, preferredCurrency: selectedCurrency }} />}
          </main>

          {/* Footer containing official brand logo */}
          <footer className="bg-slate-900 text-white border-t border-slate-800 mt-12 py-10 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-lg overflow-hidden shrink-0">
                  <img src="/logo.jpg" alt="TravelMate AI Logo" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">TravelMate <span className="text-cyan-400">AI</span></h3>
                  <p className="text-xs text-slate-400 font-medium">Plan Smart. Travel Easy. • AI Travel Assistant</p>
                </div>
              </div>

              <div className="text-xs text-slate-400 text-center md:text-right space-y-1">
                <p>© 2026 TravelMate AI. All rights reserved.</p>
                <p>Designed for seamless travel planning across Quetta, Pakistan, and worldwide destinations.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Currency Selector Modal */}
      <CurrencySelectorModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={(code) => setSelectedCurrency(code)}
      />

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 border border-slate-200 shadow-sm overflow-hidden shrink-0">
                <img src="/logo.jpg" alt="TravelMate AI" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Sign In to TravelMate AI</h3>
                <p className="text-xs text-slate-500">Access saved passes, hotel reservations & custom plans</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-900 space-y-1">
              <p className="font-bold">Signed in as {userProfile.name}</p>
              <p className="text-blue-700">{userProfile.email}</p>
            </div>

            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-md"
            >
              Continue as {userProfile.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
