import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useLLMConfig } from "@/store/llmConfig";
import { SambaNovaProvider } from "@/lib/llm/providers/sambanova";

const PROVIDER_TYPES = {
  sambanova: {
    name: "SambaNova",
    create: (config: any) => new SambaNovaProvider(config)
  }
  // Add other providers here
};

export default function AddProviderModal() {
  const { registerProvider } = useLLMConfig();
  const [open, setOpen] = useState(false);
  const [providerType, setProviderType] = useState<keyof typeof PROVIDER_TYPES | "">("");
  const [config, setConfig] = useState({
    apiKey: "",
    baseUrl: ""
  });

  const handleSubmit = () => {
    if (!providerType) return;
    
    const provider = PROVIDER_TYPES[providerType].create(config);
    registerProvider(provider);
    setOpen(false);
    setConfig({ apiKey: "", baseUrl: "" });
    setProviderType("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Provider</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Provider</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Provider Type</label>
            <Select value={providerType} onValueChange={setProviderType}>
              <SelectTrigger>
                <SelectValue placeholder="Select provider type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PROVIDER_TYPES).map(([key, { name }]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">API Key</label>
            <Input
              type="password"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Base URL (Optional)</label>
            <Input
              value={config.baseUrl}
              onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">Add Provider</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}