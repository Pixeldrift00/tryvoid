import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BaseProvider } from '@/lib/llm/provider';

interface LLMConfigState {
  providers: Record<string, BaseProvider>;
  activeProviderId: string | null;
  registerProvider: (provider: BaseProvider) => void;
  removeProvider: (providerId: string) => void;
  updateProviderConfig: (providerId: string, config: Partial<BaseProvider>) => void;
  setActiveProvider: (providerId: string) => void;
  getLLMService: () => BaseProvider | null;
}

export const useLLMConfig = create<LLMConfigState>()(
  persist(
    (set, get) => ({
      providers: {},
      activeProviderId: null,

      registerProvider: (provider) => {
        set((state) => ({
          providers: { ...state.providers, [provider.id]: provider }
        }));
      },

      removeProvider: (providerId) => {
        set((state) => {
          const { [providerId]: _, ...rest } = state.providers;
          return { providers: rest };
        });
      },

      updateProviderConfig: (providerId, config) => {
        set((state) => ({
          providers: {
            ...state.providers,
            [providerId]: { ...state.providers[providerId], ...config }
          }
        }));
      },

      setActiveProvider: (providerId) => {
        set({ activeProviderId: providerId });
      },

      getLLMService: () => {
        const state = get();
        return state.activeProviderId ? state.providers[state.activeProviderId] : null;
      }
    }),
    {
      name: 'llm-config'
    }
  )
);
