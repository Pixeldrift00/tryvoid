
import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SuggestionCarousel from '../suggestions/SuggestionCarousel';
import { useChatStore } from '@/store/chatStore';

const ChatContainer: React.FC = () => {
  const { branches, activeBranchId, suggestions } = useChatStore();
  const activeBranch = branches.find(b => b.id === activeBranchId);
  
  return (
    <div className="flex flex-col h-full px-4 max-w-4xl mx-auto">
      <div className="flex-1 overflow-hidden pb-4">
        <MessageList messages={activeBranch?.messages || []} />
      </div>
      
      <div className="mb-4">
        <SuggestionCarousel suggestions={suggestions} />
      </div>
      
      <div className="w-full">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
