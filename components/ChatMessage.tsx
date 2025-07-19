import React from 'react';
import { ChatMessage as ChatMessageType, MessageSender } from '../types';
import { CHATBOT_NAME } from '../constants';

interface ChatMessageProps {
  message: ChatMessageType;
}

const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);

export const BotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
      <path d="M12 2.25L1 7.5l11 5.25 11-5.25L12 2.25Z" />
      <path d="M1 7.5v7.625c0 .385.233.737.594.883l9.812 4.098a1.5 1.5 0 0 0 1.188 0l9.812-4.098c.36-.146.594-.5.594-.883V7.5l-11 5.25L1 7.5Z" />
    </svg>
);


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.USER;
  const isAI = message.sender === MessageSender.AI;
  const isSystem = message.sender === MessageSender.SYSTEM;

  const messageContainerClasses = isUser 
    ? 'justify-end' 
    : 'justify-start';
  
  const messageBubbleClasses = isUser
    ? 'bg-blue-600 text-white rounded-br-none' // User message: Blue background, white text
    : isAI 
      ? 'bg-neutral-200 text-black rounded-bl-none' // AI message: Light gray background, black text
      : 'bg-neutral-100 text-black border border-neutral-300 rounded-lg text-sm'; // System message: Very light gray, black text

  const senderName = isUser ? 'You' : CHATBOT_NAME;

  // Basic markdown to HTML conversion for bold, italics, and lists
  const formatText = (text: string | React.ReactNode): React.ReactNode => {
    if (typeof text !== 'string') return text;

    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>')       // Italics
      .replace(/^- (.*$)/gm, '<li>$1</li>');      // Unordered list items

    if (html.includes('<li>')) {
      html = `<ul>${html}</ul>`.replace(/<\/li>\n?<ul>/g, '</li><li>').replace(/<\/ul>\n?<li>/g, '</li></ul><ul><li>'); // Wrap list items
    }
    
    // Replace newline characters with <br /> tags, except within list structures
    if (!html.includes('<ul>')) {
        html = html.replace(/\n/g, '<br />');
    }

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };


  return (
    <div className={`flex ${messageContainerClasses} mb-4`}>
      <div className={`flex items-end max-w-xl lg:max-w-2xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isSystem && (
          <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-600 ml-2' : 'bg-neutral-200 mr-2'}`}>
            {isUser ? <UserIcon /> : <BotIcon />}
          </div>
        )}
        <div className={`p-3 rounded-lg shadow ${messageBubbleClasses}`}>
          {!isSystem && <p className="text-xs font-semibold mb-1">{senderName}</p>}
          <div className="prose prose-sm max-w-none">{formatText(message.text)}</div>
          <p className="text-xs mt-2 opacity-75 text-right">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;