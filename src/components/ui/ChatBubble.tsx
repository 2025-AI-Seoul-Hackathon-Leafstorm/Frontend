import React from 'react';

type Sender = 'bot' | 'user';

interface ChatBubbleProps {
    message: string;
    sender: Sender;
}

function ChatBubble({ message, sender }: ChatBubbleProps) {
    return (
      <div className={`flex ${sender === "bot" ? "justify-start" : "justify-end"} mb-4`}>
        <div className={`max-w-xs p-3 rounded-lg ${sender === "bot" ? "bg-gray-100 text-black" : "bg-blue-500 text-white"}`}>
          {message}
        </div>
      </div>
    );
  }
  
  export default ChatBubble; 