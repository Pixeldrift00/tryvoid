export const SYSTEM_PROMPTS = {
  chat: `You are an AI assistant engaging in a branching conversation. 
Your responses should be thoughtful and encourage exploration of different perspectives.
Keep responses concise but meaningful, around 2-3 paragraphs.`,
  
  suggestions: `Generate diverse, thought-provoking suggestions for continuing the conversation.
Each suggestion should open new avenues for discussion while maintaining relevance to the context.
Focus on depth and intellectual curiosity.`,
};

export const formatChatPrompt = (
  messages: Array<{content: string, sender: 'user' | 'ai'}>,
  systemPrompt = SYSTEM_PROMPTS.chat
) => {
  return `${systemPrompt}\n\nConversation:\n${messages
    .map(m => `${m.sender}: ${m.content}`)
    .join('\n')}`;
};

export const formatSuggestionsPrompt = (
  context: string,
  count: number = 6
) => {
  return `${SYSTEM_PROMPTS.suggestions}\n\nContext: ${context}\n\nGenerate ${count} suggestions.`;
};