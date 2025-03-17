import { BaseProvider, ProviderRequestConfig } from '../provider';

export class SambaNovaProvider extends BaseProvider {
  constructor(config: {
    apiKey: string;
    baseUrl?: string;
  }) {
    super({
      id: 'sambanova',
      name: 'SambaNova',
      baseUrl: config.baseUrl || 'https://api.sambanova.ai/v1/completions',
      apiKey: config.apiKey,
      defaultModel: 'Meta-Llama-3.3-70B-Instruct',
      supportedModels: ['DeepSeek-R1-Distill-Llama-70B', 'Meta-Llama-3.3-70B-Instruct'],
      messageRoleMap: {
        system: 'system',
        user: 'user',
        assistant: 'assistant'
      }
    });
  }

  parseResponse(response: any): string {
    return response.choices[0].message.content;
  }

  parseStreamChunk(chunk: any): string | null {
    if (chunk.choices?.[0]?.delta?.content) {
      return chunk.choices[0].delta.content;
    }
    return null;
  }
}