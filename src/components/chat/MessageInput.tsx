
import React, { useState } from 'react';
import { useChatStore } from '@/store/chatStore';
import { SendButton } from '@/components/ui/send-button';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { sendMessage } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setLoading(true);
      await sendMessage(message.trim());
      setMessage('');
      setLoading(false);
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="glass-panel p-2 focus-within:ring-1 focus-within:ring-accent transition duration-300"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent border-0 focus:ring-0 outline-none py-2 px-4 text-void-900 dark:text-void-100 placeholder-void-500 dark:placeholder-void-400"
        />
        <SendButton loading={loading} />
      </div>
    </form>
  );
};

export default MessageInput;
