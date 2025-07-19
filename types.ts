import React from 'react';

export enum MessageSender {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system',
}

export interface ChatMessage {
  id: string;
  text: string | React.ReactNode;
  sender: MessageSender;
  timestamp: Date;
}

export enum View {
  CHAT = 'chat',
  FAQ = 'faq',
  ABOUT = 'about',
}
