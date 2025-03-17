
import React from 'react';
import { Message as MessageType } from '@/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface MessageProps {
  message: MessageType;
  animate?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, animate = false }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start",
        animate && "animate-fade-in"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] rounded-2xl p-4",
          isUser
            ? "bg-accent text-white rounded-tr-sm"
            : "glass-panel rounded-tl-sm"
        )}
      >
        <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        <div 
          className={cn(
            "text-xs mt-1",
            isUser ? "text-white/70" : "text-void-500 dark:text-void-400"
          )}
        >
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </div>
      </div>
    </div>
  );
};

export default Message;
