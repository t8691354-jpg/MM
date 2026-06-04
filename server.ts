import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Named credentials client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// JSON payload parsing support
app.use(express.json({ limit: '25mb' }));

// API 1: AI Diagnostics for Computer/Laptop hardware issues
app.post("/api/ai-diagnose", async (req, res) => {
  const { issue, laptopModel } = req.body;
  if (!issue) {
    return res.status(400).json({ error: "Please enter an issue to analyze / برائے مہربانی اپنا مسئلہ درج کریں" });
  }

  try {
    const systemPrompt = `You are MM Computer's Chief AI Lab technician. Analyze the user's computer issue and return diagnostics in standard JSON.
Ensure text and explanations are highly relevant specifically to Pakistani users (mention prices in PKR, clear Urdu and English language suggestions and auto-generate WhatsApp message for technician). Keep response professional yet friendly.`;

    const userPrompt = `A user has reported this computer hardware issue: "${issue}" ${laptopModel ? `for laptop model: "${laptopModel}"` : ""}.
Help them diagnose it. Make sure instructions, estimations and solutions are realistic for Pakistan's PC/Laptop market.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            repairable: { type: Type.BOOLEAN, description: "Whether this issue is repairable" },
            problemDetected: { type: Type.STRING, description: "Clear explanation of detected problem in simple Urdu/English blend" },
            possibleCauses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Top 3 likely causes"
            },
            diySteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Step-by-step DIY check guidelines"
            },
            estimatedCost: { type: Type.STRING, description: "Estimated repair cost in PKR at MM Computer (e.g. '1,500 - 2,500 PKR' or 'Free Cleanup')" },
            repairTime: { type: Type.STRING, description: "Estimated repair duration (e.g. '45 minutes', 'Same Day', '2 Days')" },
            whatsappSnippet: { type: Type.STRING, description: "Pre-written message to send on WhatsApp to secure a repair slot" }
          },
          required: ["repairable", "problemDetected", "possibleCauses", "diySteps", "estimatedCost", "repairTime", "whatsappSnippet"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("AI Diagnose error:", error);
    res.status(500).json({ 
      error: "AI is currently offline. Please contact on WhatsApp directly.",
      details: error.message 
    });
  }
});

// API 2: AI Hardware Scanner
app.post("/api/ai-hardware-scanner", async (req, res) => {
  const { image } = req.body; // Base64 encoding payload
  if (!image) {
    return res.status(400).json({ error: "No hardware image data uploaded / کوئی تصویر اپ لوڈ نہیں کی گئی" });
  }

  try {
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
    const imagePart = {
      inlineData: {
        mimeType: "image/jpeg",
        data: cleanBase64,
      },
    };

    const userPrompt = {
      text: "Analyze this computer/laptop hardware component. Identify the parts, specs, approximate PKR resale value index in Pakistan today, and give smart upgrade suggestions."
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts: [imagePart, userPrompt] },
      config: {
        systemInstruction: "You are an expert PC hardware scanner. Analyze the image and output structured JSON detailing specification model, matching category, and Pakistani price analytics.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            identifiedName: { type: Type.STRING, description: "Specific identified model name / hardware type" },
            category: { type: Type.STRING, description: "Component category (RAM, GPU, Storage, Motherboard, Charger, Cooler, Laptop)" },
            matchConfidence: { type: Type.INTEGER, description: "Scanned structural match confidence percentage" },
            estimatedUsedValue: { type: Type.STRING, description: "Current estimated used market value index in Pakistani Rupees (PKR)" },
            specs: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Expected specifications or details visible in design"
            },
            upgradeSuggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Actionable upgrade steps or replacement recommendations"
            }
          },
          required: ["identifiedName", "category", "matchConfidence", "estimatedUsedValue", "specs", "upgradeSuggestions"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("AI Scanner error:", error);
    res.status(500).json({ 
      error: "Scanner analysis failed. Try with direct camera angle.",
      details: error.message 
    });
  }
});

async function startServer() {
  // Vite dev & prod middleware configuration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MM Server] v3.0 Online & listening on port ${PORT}`);
  });
}

startServer();
