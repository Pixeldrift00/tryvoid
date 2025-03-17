
export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  branchId: string;
  parentMessageId: string | null;
};

export type Branch = {
  id: string;
  messages: Message[];
  parentBranchId: string | null;
  parentMessageId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Suggestion = {
  id: string;
  content: string;
  branchId: string | null; // If null, this suggestion hasn't been explored yet
  parentMessageId: string;
};

export type ConversationNode = {
  id: string;
  messageId: string;
  content: string;
  sender: 'user' | 'ai';
  parentId: string | null;
  branchId: string;
  children: ConversationNode[];
};
