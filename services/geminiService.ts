import { GoogleGenAI } from "@google/genai";

// Fix: Use the mandatory initialization format with process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getRealEstateAdvice(prompt: string): Promise<string> {
  try {
    // Fix: Call generateContent directly using the ai.models interface and specified gemini-3-flash-preview model
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are HomeQuest AI, a helpful and professional real estate assistant. You specialize in property valuation, home buying tips, market trends, and relocation advice. Keep answers concise and user-friendly.",
        temperature: 0.7,
      }
    });
    // Fix: Correctly access the extracted string output using the .text property
    return response.text || "I'm sorry, I couldn't process that request at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to HomeQuest AI. Please check your connection.";
  }
}

export async function generatePropertyDescription(title: string, features: string): Promise<string> {
  const prompt = `Generate a compelling real estate description for a property titled "${title}" with these features: ${features}. Make it sound professional yet inviting.`;
  return getRealEstateAdvice(prompt);
}
