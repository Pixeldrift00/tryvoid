export interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'custom';
  model: string;
  apiKey: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface StreamingOptions {
  enabled: boolean;
  onToken?: (token: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
}

export interface ProviderConfig {
  openai?: {
    apiKey: string;
    models: string[];
    baseUrl?: string;
  };
  anthropic?: {
    apiKey: string;
    models: string[];
    baseUrl?: string;
  };
  custom?: {
    apiKey: string;
    models: string[];
    baseUrl: string;
  };
}