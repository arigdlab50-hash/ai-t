import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '1mb' }));

// Helper: wrap a promise with a timeout
function withTimeout<T>(p: Promise<T>, ms = 30000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`Operation timed out after ${ms} ms`)), ms);
    p.then((v) => {
      clearTimeout(t);
      resolve(v);
    }).catch((err) => {
      clearTimeout(t);
      reject(err);
    });
  });
}

// Initialize Gemini Client (throws if missing key)
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Fail fast with a clear message so deploys without the key don't attempt AI calls
    const msg = 'GEMINI_API_KEY environment variable is not set. Set GEMINI_API_KEY in your environment (or .env for local development).';
    console.error(msg);
    throw new Error(msg);
  }

  return new GoogleGenAI({
    apiKey,
    // keep a conservative user agent for observability
    httpOptions: {
      headers: {
        'User-Agent': 'TravelMateAI/1.0',
      },
    },
  });
};

const SYSTEM_INSTRUCTION = `You are TravelMate AI, a professional travel assistant. Help users plan trips, recommend destinations, explain cities, suggest attractions, local foods, hotels, transportation, and activities. Generate personalized itineraries based on the user's destination, duration, budget, travelers, and interests. Be concise and structured when requested.`;

// Basic health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Small helper to extract text from possible response shapes
function extractTextFromAIResponse(response: any): string | undefined {
  if (!response) return undefined;
  if (typeof response.text === 'string' && response.text.trim()) return response.text;
  // Some client SDKs return output[] / content[]
  if (Array.isArray(response.output) && response.output.length) {
    const first = response.output[0];
    if (first && Array.isArray(first.content)) {
      const part = first.content.find((c: any) => typeof c.text === 'string' && c.text.trim());
      if (part) return part.text;
    }
  }
  // fallback to stringifying the raw object
  try {
    return JSON.stringify(response);
  } catch {
    return undefined;
  }
}

// AI Chat Route
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const ai = getGeminiClient();

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

    // Wrap the AI call with a timeout to avoid hanging requests
    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      }),
      30000
    );

    const reply = extractTextFromAIResponse(response) || 'I am sorry, I could not generate a response at this time.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Chat API Error:', error?.message || error);
    const status = /GEMINI_API_KEY/.test(error?.message || '') ? 500 : 500;
    res.status(status).json({
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

    const prompt = `Create a comprehensive, realistic travel itinerary for ${destination}.
Duration: ${days} days
Budget Level: ${budget || 'Moderate'}
Interests: ${Array.isArray(interests) ? interests.join(', ') : interests || 'General Sightseeing, Food, Culture'}
Travelers: ${travelers || 1} person(s)
Dates/Season: ${dates || 'Upcoming'}`;

    const response = await withTimeout(
      ai.models.generateContent({
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
      }),
      30000
    );

    const text = extractTextFromAIResponse(response);
    if (!text) throw new Error('Empty response from AI model');

    // Try parsing JSON safely; if parsing fails, return the raw text with warning
    try {
      const parsedData = JSON.parse(text);
      res.json(parsedData);
    } catch (parseError) {
      console.warn('Itinerary response wasn\'t strict JSON; returning raw text with parse warning.');
      res.json({ raw: text, warning: 'AI response could not be parsed as JSON; returned raw text.' });
    }
  } catch (error: any) {
    console.error('Itinerary Generator Error:', error?.message || error);
    res.status(500).json({ error: 'Failed to generate itinerary.', details: error?.message });
  }
});

// Dynamic City Guide Endpoint
app.post('/api/city-guide', async (req, res) => {
  try {
    const { cityName } = req.body;
    if (!cityName) return res.status(400).json({ error: 'cityName is required' });

    const ai = getGeminiClient();
    const prompt = `Provide a complete city travel guide for ${cityName}.`;

    const response = await withTimeout(
      ai.models.generateContent({
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
      }),
      30000
    );

    const text = extractTextFromAIResponse(response) || '{}';
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch {
      res.json({ raw: text, warning: 'AI response could not be parsed as JSON; returned raw text.' });
    }
  } catch (error: any) {
    console.error('City Guide Error:', error?.message || error);
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
