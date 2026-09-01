# TravelMate AI ✈️🌍

[![Deployed URL](https://img.shields.io/badge/Live_App-https%3A%2F%2Fai--t--seven.vercel.app%2F-blue?style=for-the-badge&logo=vercel)](https://ai-t-seven.vercel.app/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-API-8E44AD?style=for-the-badge&logo=google)](https://ai.google.dev/)

**TravelMate AI** is an all-in-one, AI-powered travel planning, booking, and navigation platform. Designed for modern global travelers, TravelMate AI combines intelligent day-by-day itinerary generation, multi-currency pricing, and prototype booking flows to showcase an end-to-end UX.

🌐 **Live Application:** [https://ai-t-seven.vercel.app/](https://ai-t-seven.vercel.app/)

---

## ✨ Key Features

### 1. 🤖 AI-Powered Itinerary Generator
- Generates custom day-by-day travel itineraries based on your destination, trip duration, travel style (Budget, Luxury, Adventure, Culture, Family), and specific preferences.
- Powered by Google Gemini AI with intelligent fallbacks to ensure instant response times.
- Includes estimated budgets, packing lists, weather recommendations, and essential local safety tips.

### 2. 💱 Multi-Currency Pricing Engine
- Supports live currency conversion across major global and regional currencies.
- Instant currency toggle accessible from the top header bar and booking checkouts.

### 3. 💳 Multi-Currency & Localized Payment Gateways (Prototype)
- The repository includes UI flows for multiple payment methods, but these are prototyped/simulated by default. See the "Booking & Payment flows" note below before relying on them for real transactions.

### 4. 🎟️ Flight, Bus & Train Booking (Prototype)
- Search, filter, and compare routes across domestic and international transit options. Booking flows are implemented as UX prototypes and must be backed by real provider APIs to become production-ready.

### 5. 🏨 Hotel Reservations (Prototype)
- Browse hotels and view reservation flows. Confirmations and digital passes are simulated unless connected to live provider APIs.

---

## Note about Booking & Payment flows

Important: The current repository includes UI flows for booking and payment checkouts intended as a prototype/demo. These flows are simulated and do not process real payments unless you integrate a payment gateway (Stripe, PayPal, etc.) and supply live credentials.

If you plan to accept real payments:
- Never commit API keys or secret credentials to source control.
- Use server-side payment integrations and provider SDKs; keep secrets in environment variables.
- Update the documentation to clearly state which payment providers are configured and how to obtain test keys.

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
   git clone https://github.com/arigdlab50-hash/ai-t.git
   cd ai-t
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and set the GEMINI_API_KEY value:
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
