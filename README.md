# TravelMate AI ✈️🌍

[![Deployed URL](https://img.shields.io/badge/Live_App-https%3A%2F%2Fai--t--seven.vercel.app%2F-blue?style=for-the-badge&logo=vercel)](https://ai-t-seven.vercel.app/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-API-8E44AD?style=for-the-badge&logo=google)](https://ai.google.dev/)

**TravelMate AI** is an all-in-one, AI-powered travel planning, booking, and navigation platform. Designed for modern global travelers, TravelMate AI combines intelligent day-by-day itinerary generation using the **Google Gemini API**, instant multi-currency price conversion, seamless booking flows for flights, buses, trains, and hotels, and instant payment integration for global and local payment gateways.

🌐 **Live Application:** [https://ai-t-seven.vercel.app/](https://ai-t-seven.vercel.app/)

---

## ✨ Key Features

### 1. 🤖 AI-Powered Itinerary Generator
- Generates custom day-by-day travel itineraries based on your destination, trip duration, travel style (Budget, Luxury, Adventure, Culture, Family), and specific preferences.
- Powered by Google Gemini AI with intelligent fallbacks to ensure instant response times.
- Includes estimated budgets, packing lists, weather recommendations, and essential local safety tips.

### 2. 💱 Multi-Currency Pricing Engine
- Supports live currency conversion across major global and regional currencies:
  - **PKR (Pakistani Rupee - Rs)**
  - **USD (US Dollar - $)**
  - **EUR (Euro - €)**
  - **GBP (British Pound - £)**
  - **AED (UAE Dirham)**
  - **SAR (Saudi Riyal)**
  - **CAD, AUD, JPY, INR, CNY, TRY**
- Instant currency toggle accessible from the top header bar and booking checkouts.

### 3. 💳 Multi-Currency & Localized Payment Gateways
- Integrated checkout flows supporting both international and popular South Asian / GCC payment options:
  - **Credit / Debit Cards** (Visa, MasterCard, Amex, UnionPay)
  - **JazzCash Mobile Wallet** (Pakistan)
  - **EasyPaisa Wallet** (Pakistan)
  - **Raast Instant Bank Transfer** (0% fee IBAN/Raast ID transfer)
  - **PayPal**
  - **Apple Pay / Google Pay**
  - **Mada / STC Pay** (Saudi Arabia & GCC region)

### 4. 🎟️ Flight, Bus & Train Booking
- Search, filter, and compare routes across domestic and international transit options.
- Filter by route, price, and operator.
- Instant seat selection (Window, Aisle, Front Row) and instant digital boarding pass generation with active QR codes.

### 5. 🏨 Luxury & Budget Hotel Reservations
- Browse handpicked hotels in popular cities including **Quetta, Lahore, Islamabad, Hunza, Skardu, Paris, Dubai, and Istanbul**.
- Real-time amenity previews (Wi-Fi, Free Breakfast, Swimming Pool, Spa, Airport Shuttle).
- Quick check-in/check-out reservation system with instant confirmation passes.

### 6. 🗺️ City Guides & Nearby Explorer
- Detailed destination breakdown with top attractions, local food recommendations, best visiting months, and safety tips.
- Nearby Explorer to locate top restaurants, historical landmarks, transit hubs, and emergency medical services relative to your location.

### 7. 🎒 Unified Trip Management ("My Trips")
- Access all confirmed flight passes, train tickets, and hotel vouchers in one organized dashboard.
- Digital QR code boarding passes ready for offline viewing and travel verification.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with Lucide React icons
- **Animations:** Motion (Framer Motion)
- **AI Integration:** `@google/genai` (Google Gemini API)
- **Deployment:** Vercel / Cloud Run containers

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/travelmate-ai.git
   cd travelmate-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 📱 Application Preview

- **Live URL:** [https://ai-t-seven.vercel.app/](https://ai-t-seven.vercel.app/)
- **Mobile Responsive:** Optimized for mobile phones, tablets, and desktop screens.

---

## 📄 License

This project is licensed under the MIT License.

