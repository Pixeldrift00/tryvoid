export interface ProviderRequestConfig {
  model: string;
  messages: Array<{role: string; content: string}>;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  stop?: string[];
}

export interface ProviderInterface {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  defaultModel: string;
  supportedModels: string[];
  messageRoleMap: {
    system: string;
    user: string;
    assistant: string;
  };
  
  // Required methods
  formatRequest: (config: ProviderRequestConfig) => any;
  parseResponse: (response: any) => string;
  parseStreamChunk: (chunk: any) => string | null;
  
  // Optional methods with defaults
  validateResponse?: (response: any) => boolean;
  getTokenCount?: (text: string) => number;
}

export class BaseProvider implements ProviderInterface {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  defaultModel: string;
  supportedModels: string[];
  messageRoleMap: {
    system: string;
    user: string;
    assistant: string;
  };

  constructor(config: {
    id: string;
    name: string;
    baseUrl: string;
    apiKey: string;
    defaultModel: string;
    supportedModels: string[];
    messageRoleMap: {
      system: string;
      user: string;
      assistant: string;
    };
  }) {
    Object.assign(this, config);
  }

  formatRequest(config: ProviderRequestConfig): any {
    const mappedMessages = config.messages.map(msg => ({
      role: this.messageRoleMap[msg.role as keyof typeof this.messageRoleMap] || msg.role,
      content: msg.content
    }));

    return {
      model: config.model,
      messages: mappedMessages,
      temperature: config.temperature,
      max_tokens: config.maxTokens,
      stream: config.stream,
      stop: config.stop
    };
  }

  parseResponse(response: any): string {
    throw new Error('parseResponse must be implemented');
  }

  parseStreamChunk(chunk: any): string | null {
    throw new Error('parseStreamChunk must be implemented');
  }

  validateResponse(response: any): boolean {
    return true;
  }

  getTokenCount(text: string): number {
    // Simple estimation - can be overridden with provider-specific implementation
    return Math.ceil(text.length / 4);
  }
}