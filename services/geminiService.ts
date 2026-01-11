
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getVisaAssistance = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are "Aria", a travel support consultant for a private India e-Visa assistance portal. 
        Your goal is to help users understand the requirements for Indian Visas.
        Keep answers professional, concise, and helpful. 
        Ensure you clarify that this is a private assistance portal helping with e-Tourist, e-Business, and e-Medical visa processing.
        Help users with application steps, document requirements, and common travel questions.`,
      },
    });
    return response.text || "I'm sorry, I couldn't process that. Please try again or contact our support team.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The assistant is currently unavailable. Please refer to our FAQ section or contact helpdesk.";
  }
};
