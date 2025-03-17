import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLLMConfig } from "@/store/llmConfig";
import { SambaNovaProvider } from "@/lib/llm/providers/sambanova";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const PROVIDER_TYPES = {
  sambanova: {
    name: "SambaNova",
    create: (config: any) => new SambaNovaProvider(config),
    description: "High-performance AI models optimized for enterprise use",
    defaultBaseUrl: "https://api.sambanova.ai/v1/completions",
    requiredFields: ["apiKey"],
  },
  // Add other providers here as needed
} as const;

interface AddProviderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddProviderModal({ open, onOpenChange }: AddProviderModalProps) {
  const { registerProvider } = useLLMConfig();
  const [providerType, setProviderType] = useState<keyof typeof PROVIDER_TYPES | "">("");
  const [config, setConfig] = useState({
    apiKey: "",
    baseUrl: "",
    name: "",
  });
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setProviderType("");
    setConfig({
      apiKey: "",
      baseUrl: "",
      name: "",
    });
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    try {
      setError(null);

      if (!providerType) {
        setError("Please select a provider type");
        return;
      }

      const providerConfig = PROVIDER_TYPES[providerType];
      
      // Validate required fields
      for (const field of providerConfig.requiredFields) {
        if (!config[field as keyof typeof config]) {
          setError(`${field} is required`);
          return;
        }
      }

      // Create and register the provider
      const provider = providerConfig.create({
        apiKey: config.apiKey,
        baseUrl: config.baseUrl || providerConfig.defaultBaseUrl,
        name: config.name || providerConfig.name,
      });

      registerProvider(provider);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add provider");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Provider</DialogTitle>
          <DialogDescription>
            Configure a new AI model provider for your application.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Provider Type</Label>
            <Select
              value={providerType}
              onValueChange={(value: keyof typeof PROVIDER_TYPES) => {
                setProviderType(value);
                setConfig(prev => ({
                  ...prev,
                  baseUrl: PROVIDER_TYPES[value].defaultBaseUrl,
                }));
              }}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PROVIDER_TYPES).map(([key, provider]) => (
                  <SelectItem key={key} value={key}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {providerType && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="name">Provider Name (Optional)</Label>
                <Input
                  id="name"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  placeholder={PROVIDER_TYPES[providerType].name}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={config.apiKey}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                  placeholder="Enter your API key"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="baseUrl">Base URL (Optional)</Label>
                <Input
                  id="baseUrl"
                  value={config.baseUrl}
                  onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                  placeholder={PROVIDER_TYPES[providerType].defaultBaseUrl}
                />
              </div>

              <Alert variant="info" className="mt-2">
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  {PROVIDER_TYPES[providerType].description}
                </AlertDescription>
              </Alert>
            </>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Provider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}