import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is not set.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || 'dummy-key',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const SYSTEM_INSTRUCTION = `You are TravelMate AI, a professional travel assistant.
Help users plan trips, recommend destinations, explain cities, suggest attractions, local foods, hotels, transportation, and activities. Generate personalized itineraries based on the user's destination, budget, travel dates, and interests. Assist with ticket booking by collecting travel details and presenting available options. Respond in a friendly, accurate, and concise manner. If you are unsure of real-time prices or availability, clearly state that live booking data is required. Use markdown formatting with bullet points and bold headers for clarity where appropriate.`;

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Chat Route
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGeminiClient();

    // Prepare contents array incorporating history
    const contents: any[] = [];
    if (Array.isArray(history)) {
      history.forEach((item: { role: string; content: string }) => {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.content }],
        });
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I am sorry, I could not generate a response at this time.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({
      reply: 'I encountered an issue retrieving real-time AI travel recommendations. Please ensure your query is clear or try again shortly.',
      error: error?.message,
    });
  }
});

// AI Trip Planner Endpoint
app.post('/api/generate-itinerary', async (req, res) => {
  try {
    const { destination, days, budget, interests, travelers, dates } = req.body;

    if (!destination || !days) {
      return res.status(400).json({ error: 'Destination and number of days are required.' });
    }

    const ai = getGeminiClient();
    const prompt = `Create a comprehensive, highly realistic travel itinerary for ${destination}.
Duration: ${days} days
Budget Level: ${budget || 'Moderate'}
Interests: ${Array.isArray(interests) ? interests.join(', ') : interests || 'General Sightseeing, Food, Culture'}
Travelers: ${travelers || 1} person(s)
Dates/Season: ${dates || 'Upcoming'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION} Generate structured JSON format with complete details.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            overview: { type: Type.STRING },
            estimatedTotalCost: { type: Type.STRING },
            bestTimeToVisit: { type: Type.STRING },
            weatherSummary: { type: Type.STRING },
            dailyItinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  morning: {
                    type: Type.OBJECT,
                    properties: {
                      activity: { type: Type.STRING },
                      location: { type: Type.STRING },
                      estimatedCost: { type: Type.STRING },
                      tips: { type: Type.STRING },
                    },
                  },
                  afternoon: {
                    type: Type.OBJECT,
                    properties: {
                      activity: { type: Type.STRING },
                      location: { type: Type.STRING },
                      estimatedCost: { type: Type.STRING },
                      tips: { type: Type.STRING },
                    },
                  },
                  evening: {
                    type: Type.OBJECT,
                    properties: {
                      activity: { type: Type.STRING },
                      location: { type: Type.STRING },
                      estimatedCost: { type: Type.STRING },
                      tips: { type: Type.STRING },
                    },
                  },
                  foodRecommendations: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
              },
            },
            transportationTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            packingList: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            localPhrases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phrase: { type: Type.STRING },
                  translation: { type: Type.STRING },
                  usage: { type: Type.STRING },
                },
              },
            },
            safetyTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    const jsonText = response.text;
    if (jsonText) {
      const parsedData = JSON.parse(jsonText);
      res.json(parsedData);
    } else {
      throw new Error('Empty response from AI model');
    }
  } catch (error: any) {
    console.error('Itinerary Generator Error:', error);
    res.status(500).json({ error: 'Failed to generate itinerary.', details: error?.message });
  }
});

// Dynamic City Guide Endpoint
app.post('/api/city-guide', async (req, res) => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      return res.status(400).json({ error: 'cityName is required' });
    }

    const ai = getGeminiClient();
    const prompt = `Provide a complete city travel guide for ${cityName}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            country: { type: Type.STRING },
            tagline: { type: Type.STRING },
            overview: { type: Type.STRING },
            history: { type: Type.STRING },
            bestTimeToVisit: { type: Type.STRING },
            estimatedDailyBudget: { type: Type.STRING },
            weatherSummary: { type: Type.STRING },
            topAttractions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  rating: { type: Type.STRING },
                },
              },
            },
            localFoods: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
              },
            },
            transportation: { type: Type.STRING },
            safetyTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    const data = JSON.parse(response.text || '{}');
    res.json(data);
  } catch (error: any) {
    console.error('City Guide Error:', error);
    res.status(500).json({ error: 'Failed to fetch city guide', details: error?.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
