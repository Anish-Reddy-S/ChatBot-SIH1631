
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { GEMINI_MODEL_NAME, GEMINI_SYSTEM_INSTRUCTION } from '../constants';

let chatInstance: Chat | null = null;
let initializationAttempted = false;
let apiKeySuccessfullyUsed = false;

const getApiKey = (): string | undefined => {
  // IMPORTANT: To enable AI features, you must add your own Google Gemini API key.
  // 1. Get your key from Google AI Studio: https://aistudio.google.com/app/apikey
  // 2. Replace the placeholder below with your key.
  const apiKey = 'YOUR_API_KEY_HERE'; // <-- Add your API key here

  if (apiKey === 'YOUR_API_KEY_HERE' || !apiKey) {
    console.error("API Key not provided. Please follow the setup instructions in README.md.");
    return undefined;
  }
  return apiKey;
};

export const initializeGeminiChat = (): boolean => {
  if (initializationAttempted) {
    return apiKeySuccessfullyUsed;
  }
  initializationAttempted = true;

  const apiKey = getApiKey();
  if (!apiKey) {
    apiKeySuccessfullyUsed = false;
    return false;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    chatInstance = ai.chats.create({
      model: GEMINI_MODEL_NAME,
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
      }
    });
    console.log("Gemini AI Chat initialized successfully.");
    apiKeySuccessfullyUsed = true;
  } catch (error) {
    console.error("Failed to initialize Gemini AI Chat:", error);
    chatInstance = null; // Ensure chatInstance is null on failure
    apiKeySuccessfullyUsed = false;
  }
  return apiKeySuccessfullyUsed;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!initializationAttempted) {
    // This typically should be called once at app startup
    // but as a fallback, attempt initialization.
    initializeGeminiChat();
  }

  if (!apiKeySuccessfullyUsed || !chatInstance) {
    const errorMessage = apiKeySuccessfullyUsed 
      ? "Gemini chat instance is not available despite successful API key usage."
      : "AI service is not available. API Key might be missing or initialization failed.";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  try {
    const response: GenerateContentResponse = await chatInstance.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    // You could add more specific error handling based on error types from @google/genai if available
    throw new Error("Failed to get response from AI service. Please try again.");
  }
};
