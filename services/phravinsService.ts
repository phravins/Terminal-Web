
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client using process.env.API_KEY string directly.
const ai = new GoogleGenAI({ apiKey: process.env.PHRAVINS_API_KEY });

export const getAIResponse = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "You are the DevCLI AI Assistant. DevCLI is a terminal-based development workspace built with Go and Bubble Tea. Keep your answers concise, technical, and formatted for a terminal interface (monospaced, clear headers). Suggest devcli commands when relevant (e.g., 'dev run build').",
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Error: Could not establish connection to the AI neural link. Please try again later.";
  }
};