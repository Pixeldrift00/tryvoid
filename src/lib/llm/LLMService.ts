import { LLMConfig, LLMResponse, StreamingOptions } from './types';
import { ProviderInterface, ProviderRequestConfig } from './provider';

export class LLMService {
  private config: LLMConfig;
  private provider: ProviderInterface;

  constructor(config: LLMConfig, provider: ProviderInterface) {
    this.config = config;
    this.provider = provider;
  }

  async complete(
    messages: Array<{role: string; content: string}>,
    options: {
      streaming?: StreamingOptions;
      temperature?: number;
      maxTokens?: number;
      stop?: string[];
    } = {}
  ): Promise<LLMResponse> {
    const requestConfig: ProviderRequestConfig = {
      model: this.config.model,
      messages,
      temperature: options.temperature ?? this.config.temperature ?? 0.7,
      maxTokens: options.maxTokens ?? this.config.maxTokens,
      stream: options.streaming?.enabled ?? false,
      stop: options.stop,
    };

    try {
      const formattedRequest = this.provider.formatRequest(requestConfig);
      
      if (options.streaming?.enabled) {
        return this.handleStreamingRequest(formattedRequest, options.streaming);
      }

      const response = await fetch(this.provider.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.provider.apiKey}`,
        },
        body: JSON.stringify(formattedRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!this.provider.validateResponse(data)) {
        throw new Error('Invalid response from provider');
      }

      const content = this.provider.parseResponse(data);
      
      return {
        content,
        usage: {
          promptTokens: this.provider.getTokenCount(messages.map(m => m.content).join('')),
          completionTokens: this.provider.getTokenCount(content),
          totalTokens: 0, // Will be calculated after
        },
      };
    } catch (error) {
      console.error('LLM request failed:', error);
      throw error;
    }
  }

  private async handleStreamingRequest(
    formattedRequest: any,
    streamingOptions: StreamingOptions
  ): Promise<LLMResponse> {
    const response = await fetch(this.provider.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.provider.apiKey}`,
      },
      body: JSON.stringify({ ...formattedRequest, stream: true }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';

    try {
      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const token = this.provider.parseStreamChunk(chunk);
        
        if (token) {
          fullContent += token;
          streamingOptions.onToken?.(token);
        }
      }

      streamingOptions.onComplete?.(fullContent);

      return {
        content: fullContent,
        usage: {
          promptTokens: 0,
          completionTokens: this.provider.getTokenCount(fullContent),
          totalTokens: 0,
        },
      };
    } catch (error) {
      streamingOptions.onError?.(error as Error);
      throw error;
    }
  }
}
