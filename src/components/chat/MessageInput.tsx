
import React, { useState } from 'react';
import { useChatStore } from '@/store/chatStore';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="glass-panel p-2 focus-within:ring-1 focus-within:ring-accent transition duration-300"
    >
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent border-0 focus:ring-0 outline-none py-2 px-4 text-void-900 dark:text-void-100 placeholder-void-500 dark:placeholder-void-400"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-2 rounded-full bg-accent text-white disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 hover:bg-accent-dark"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
