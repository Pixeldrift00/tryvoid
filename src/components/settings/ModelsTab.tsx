import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Edit2, Save, Trash2, Check } from 'lucide-react';
import { useLLMConfig } from '@/store/llmConfig';
import { BaseProvider } from '@/lib/llm/provider';
import AddProviderModal from './AddProviderModal';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function ModelsTab() {
  const { 
    providers, 
    registerProvider, 
    removeProvider, 
    updateProviderConfig, 
    activeProviderId, 
    setActiveProvider 
  } = useLLMConfig();
  
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSaveProvider = useCallback((provider: BaseProvider) => {
    updateProviderConfig(provider.id, provider);
    setEditingProvider(null);
  }, [updateProviderConfig]);

  const handleActivateProvider = useCallback((providerId: string) => {
    setActiveProvider(providerId);
  }, [setActiveProvider]);

  const handleRemoveProvider = useCallback((providerId: string) => {
    if (window.confirm('Are you sure you want to remove this provider?')) {
      removeProvider(providerId);
    }
  }, [removeProvider]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Models & Providers</h2>
          <p className="text-muted-foreground">Configure your AI model providers and API keys</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </div>

      <div className="grid gap-4">
        {Object.values(providers).map((provider) => (
          <Card 
            key={provider.id}
            className={cn(
              "transition-all duration-200",
              provider.id === activeProviderId && "border-accent"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl font-medium">
                  {provider.name}
                </CardTitle>
                {provider.id === activeProviderId && (
                  <Badge variant="success">Active</Badge>
                )}
              </div>
              <div className="flex gap-2">
                {editingProvider === provider.id ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSaveProvider(provider)}
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                ) : (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleActivateProvider(provider.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Set as active provider</TooltipContent>
                    </Tooltip>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingProvider(provider.id)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => handleRemoveProvider(provider.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {editingProvider === provider.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">API Key</label>
                    <Input
                      type="password"
                      value={provider.apiKey}
                      onChange={(e) => updateProviderConfig(provider.id, {
                        ...provider,
                        apiKey: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Base URL</label>
                    <Input
                      value={provider.baseUrl}
                      onChange={(e) => updateProviderConfig(provider.id, {
                        ...provider,
                        baseUrl: e.target.value
                      })}
                      placeholder="https://api.example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Models</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {provider.supportedModels.map((model) => (
                        <div key={model} className="flex items-center bg-secondary rounded-full px-3 py-1">
                          <span className="text-sm">{model}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-4 w-4 p-0"
                            onClick={() => {
                              const newModels = provider.supportedModels.filter(m => m !== model);
                              updateProviderConfig(provider.id, {
                                ...provider,
                                supportedModels: newModels
                              });
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => {/* Add model modal */}}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Model
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {provider.supportedModels.length} models available
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {provider.supportedModels.map((model) => (
                      <Badge key={model} variant="secondary">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <AddProviderModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />
    </div>
  );
}