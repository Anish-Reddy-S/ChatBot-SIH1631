import React, { useState, useEffect, useRef, useCallback } from 'react';
import ChatMessageComponent, { BotIcon } from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { ChatMessage, MessageSender } from '../types';
import { initializeGeminiChat, sendMessageToGemini } from '../services/geminiService';
import { INITIAL_BOT_MESSAGE_TEXT, API_KEY_ERROR_MESSAGE, GENERIC_API_ERROR_MESSAGE, CHATBOT_NAME } from '../constants';

// This component now returns the JSX that makes up the chat interface
const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAiInitialized, setIsAiInitialized] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const initCalled = useRef<boolean>(false); // Prevent StrictMode double-invocation

  const addMessage = useCallback((text: string | React.ReactNode, sender: MessageSender) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { id: Date.now().toString() + Math.random().toString(), text, sender, timestamp: new Date() }
    ]);
  }, []);

  // Initialize AI on first render only
  useEffect(() => {
    if (initCalled.current) {
        return;
    }
    initCalled.current = true;
    
    const initAI = () => {
      const success = initializeGeminiChat();
      setIsAiInitialized(success);
      if (success) {
        addMessage(INITIAL_BOT_MESSAGE_TEXT, MessageSender.SYSTEM);
      } else {
        addMessage(API_KEY_ERROR_MESSAGE, MessageSender.SYSTEM);
        setError(API_KEY_ERROR_MESSAGE);
      }
    };
    initAI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addMessage]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (userInput: string) => {
    if (!isAiInitialized) {
      addMessage("The AI assistant is not available. Please check the configuration.", MessageSender.SYSTEM);
      setError("AI not initialized.");
      return;
    }

    addMessage(userInput, MessageSender.USER);
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await sendMessageToGemini(userInput);
      addMessage(aiResponse, MessageSender.AI);
    } catch (err) {
      console.error(err);
      const message = (err instanceof Error && err.message.includes("API Key")) 
                        ? API_KEY_ERROR_MESSAGE
                        : GENERIC_API_ERROR_MESSAGE;
      addMessage(message, MessageSender.SYSTEM);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg) => (
          <ChatMessageComponent key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length-1]?.sender === MessageSender.USER && (
          <div className="flex justify-start mb-4">
            <div className="flex items-end max-w-xl lg:max-w-2xl flex-row">
                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-neutral-200 mr-2">
                    <BotIcon />
                </div>
                <div className="p-3 rounded-lg shadow bg-neutral-200 text-black rounded-bl-none">
                    <p className="text-xs font-semibold mb-1">{CHATBOT_NAME}</p>
                    <div className="animate-pulse flex space-x-1">
                        <div className="h-2 w-2 bg-neutral-500 rounded-full"></div>
                        <div className="h-2 w-2 bg-neutral-500 rounded-full"></div>
                        <div className="h-2 w-2 bg-neutral-500 rounded-full"></div>
                    </div>
                </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>
      {error && !messages.some(msg => msg.text === error && msg.sender === MessageSender.SYSTEM) && (
        <div className="p-2 bg-red-800 text-neutral-100 text-center text-sm">
          {error}
        </div>
      )}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading || !isAiInitialized} />
    </>
  );
};

export default ChatView;
