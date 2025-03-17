
import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { Message as MessageType } from '@/types';

interface MessageListProps {
  messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  return (
    <div className="flex flex-col space-y-4 py-4 overflow-y-auto scrollbar-thin h-full">
      {messages.map((message, index) => (
        <Message 
          key={message.id} 
          message={message} 
          animate={index === messages.length - 1}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
