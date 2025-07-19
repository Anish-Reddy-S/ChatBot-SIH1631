export const APP_TITLE = "CampusAssist";
export const CHATBOT_NAME = "CampusAssist";

export const INITIAL_BOT_MESSAGE_TEXT: string = `Welcome! I am CampusAssist, your AI guide for campus life. Ask me anything about courses, events, or student services. How can I help you today?`;

export const GEMINI_SYSTEM_INSTRUCTION = `You are CampusAssist, a friendly and knowledgeable AI virtual assistant for students.
Your purpose is to provide helpful information about campus life, including courses, admissions, events, student services, and general knowledge.
Be polite, professional, and approachable.
Provide concise, accurate, and short answers. Use markdown formatting for clarity (e.g., bullet points) when necessary.
Do not refer to yourself as a large language model. You are CampusAssist.
`;

export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";

export const API_KEY_ERROR_MESSAGE = "The AI service is unavailable. This may be due to a missing API key. Please follow the setup instructions in README.md to add your Google Gemini API key.";
export const GENERIC_API_ERROR_MESSAGE = "Sorry, I encountered an error while trying to reach the AI service. Please try again later.";
export const INITIALIZATION_ERROR_MESSAGE = "Failed to initialize the AI assistant. Please check your configuration and network.";