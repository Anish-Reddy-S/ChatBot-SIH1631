# CampusAssist AI Chatbot

CampusAssist is an AI-powered chatbot designed to assist students with their campus-related inquiries. It can provide information about admissions, courses, events, student services, and more.

This project is built with React, TypeScript, and Tailwind CSS, and it uses the Google Gemini for its conversational AI capabilities.

To run this application, you must configure your Google Gemini API key.

### Configuration

1.  **Get a Gemini API Key**: If you don't have one, you can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  **Add the API Key to the project**:
    -   Open the file `services/geminiService.ts`.
    -   Find the `getApiKey` function.
    -   Replace the placeholder text `'YOUR_API_KEY_HERE'` with your actual API key.

    ```typescript
    // In services/geminiService.ts
    const getApiKey = (): string | undefined => {
      // ...
      const apiKey = 'YOUR_API_KEY_HERE'; // <-- Add your API key here
      // ...
    };
    ```
