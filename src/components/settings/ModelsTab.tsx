import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Edit2, Save, Trash2 } from 'lucide-react';
import { useLLMConfig } from '@/store/llmConfig';
import { BaseProvider } from '@/lib/llm/provider';

export default function ModelsTab() {
  const { providers, registerProvider, removeProvider, updateProviderConfig } = useLLMConfig();
  const [editingProvider, setEditingProvider] = useState<string | null>(null);

  const handleSaveProvider = (provider: BaseProvider) => {
    updateProviderConfig(provider.id, provider);
    setEditingProvider(null);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Models & Providers</h2>
        <Button variant="outline" size="sm" onClick={() => {/* Add new provider modal */}}>
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </div>

      <div className="grid gap-4">
        {Object.values(providers).map((provider) => (
          <Card key={provider.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">
                {provider.name}
              </CardTitle>
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
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingProvider(provider.id)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => removeProvider(provider.id)}
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
                      <div key={model} className="bg-secondary rounded-full px-3 py-1">
                        <span className="text-sm">{model}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}