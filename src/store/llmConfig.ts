import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProviderConfig, LLMConfig } from '@/lib/llm/types';
import { LLMService } from '@/lib/llm/LLMService';
import { BaseProvider } from '@/lib/llm/provider';

interface LLMConfigState {
  providers: Record<string, BaseProvider>;
  activeProviderId: string;
  registerProvider: (provider: BaseProvider) => void;
  removeProvider: (providerId: string) => void;
  setActiveProvider: (providerId: string) => void;
  updateProviderConfig: (providerId: string, config: Partial<BaseProvider>) => void;
  getLLMService: () => LLMService;
}

export const useLLMConfig = create<LLMConfigState>()(
  persist(
    (set, get) => ({
      providers: {},
      activeProviderId: '',

      registerProvider: (provider) => {
        set((state) => ({
          providers: {
            ...state.providers,
            [provider.id]: provider,
          },
          // Set as active if it's the first provider
          activeProviderId: state.activeProviderId || provider.id,
        }));
      },

      removeProvider: (providerId) => {
        set((state) => {
          const { [providerId]: removed, ...remaining } = state.providers;
          return {
            providers: remaining,
            // Reset active provider if removed
            activeProviderId: state.activeProviderId === providerId
              ? Object.keys(remaining)[0] || ''
              : state.activeProviderId,
          };
        });
      },

      setActiveProvider: (providerId) => {
        set({ activeProviderId: providerId });
      },

      updateProviderConfig: (providerId, config) => {
        set((state) => ({
          providers: {
            ...state.providers,
            [providerId]: {
              ...state.providers[providerId],
              ...config,
            },
          },
        }));
      },

      getLLMService: () => {
        const state = get();
        const provider = state.providers[state.activeProviderId];
        
        if (!provider) {
          throw new Error('No active provider configured');
        }

        const config: LLMConfig = {
          provider: provider.id,
          model: provider.defaultModel,
          apiKey: provider.apiKey,
          baseUrl: provider.baseUrl,
        };

        return new LLMService(config, provider);
      },
    }),
    {
      name: 'llm-config',
      partialize: (state) => ({
        providers: Object.fromEntries(
          Object.entries(state.providers).map(([id, provider]) => [
            id,
            {
              id: provider.id,
              apiKey: provider.apiKey,
              baseUrl: provider.baseUrl,
            },
          ])
        ),
        activeProviderId: state.activeProviderId,
      }),
    }
  )
);
