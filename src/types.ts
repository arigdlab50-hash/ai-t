export type ActiveTab =
  | 'dashboard'
  | 'chat'
  | 'tickets'
  | 'hotels'
  | 'cities'
  | 'city-detail'
  | 'planner'
  | 'nearby'
  | 'trips'
  | 'profile';

export type TicketType = 'flight' | 'bus' | 'train';

export interface TicketOption {
  id: string;
  type: TicketType;
  operator: string;
  operatorLogo?: string;
  number: string;
  from: string;
  fromCode?: string;
  to: string;
  toCode?: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: number;
  currency: string;
  classType: string;
  rating: number;
  seatsLeft: number;
  features: string[];
}

export interface HotelOption {
  id: string;
  name: string;
  city: string;
  country: string;
  image: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  address: string;
  distanceFromCenter: string;
  amenities: string[];
  description: string;
  featured?: boolean;
}

export interface CityData {
  id: string;
  name: string;
  country: string;
  tagline: string;
  image: string;
  gallery: string[];
  overview: string;
  history: string;
  bestTimeToVisit: string;
  estimatedDailyBudget: string;
  weather: {
    temp: string;
    condition: string;
    iconName?: string;
  };
  topAttractions: {
    name: string;
    category: string;
    description: string;
    image: string;
    rating: number;
  }[];
  localFoods: {
    name: string;
    description: string;
    image?: string;
  }[];
  transportation: string;
  hotelsPreview: {
    name: string;
    price: string;
    rating: number;
  }[];
  safetyTips: string[];
}

export interface DailyActivity {
  activity: string;
  location: string;
  estimatedCost: string;
  tips: string;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  morning: DailyActivity;
  afternoon: DailyActivity;
  evening: DailyActivity;
  foodRecommendations: string[];
}

export interface GeneratedItinerary {
  id: string;
  destination: string;
  days: number;
  budget: string;
  overview: string;
  estimatedTotalCost: string;
  bestTimeToVisit: string;
  weatherSummary: string;
  dailyItinerary: DayItinerary[];
  transportationTips: string[];
  packingList: string[];
  localPhrases: {
    phrase: string;
    translation: string;
    usage?: string;
  }[];
  safetyTips: string[];
  createdAt: string;
}

export interface NearbyPlace {
  id: string;
  name: string;
  category: 'Museum' | 'Park' | 'Restaurant' | 'Shopping' | 'Historic' | 'Cafe';
  rating: number;
  reviews: number;
  distance: string;
  address: string;
  image: string;
  description: string;
  x: number; // map coordinate percentage
  y: number; // map coordinate percentage
  lat?: number;
  lng?: number;
  openHours: string;
}

export interface BookedTicket {
  bookingId: string;
  ticket: TicketOption;
  passengerName: string;
  passengerEmail: string;
  seatNumber: string;
  travelDate: string;
  totalPaid: number;
  bookedAt: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface BookedHotel {
  bookingId: string;
  hotel: HotelOption;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  totalPaid: number;
  bookedAt: string;
  status: 'Confirmed' | 'Completed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    action: string;
    payload?: any;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  homeCity?: string;
  passportCountry?: string;
  preferredCurrency: string;
  savedPlacesCount: number;
}
