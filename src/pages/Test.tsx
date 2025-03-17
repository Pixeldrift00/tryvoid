import { useState } from "react";
import { SendButton } from "@/components/ui/send-button";
import { Button } from "@/components/ui/button";
import { VoidLoader } from "@/components/ui/void-loader";

export default function Test() {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-8 bg-background p-4 flex-wrap">
      <div className="flex flex-col items-center gap-2">
        <SendButton loading={loading} onClick={toggleLoading} />
        <span className="text-sm text-muted-foreground">Send Button</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <VoidLoader size={45} color="hsl(var(--accent))" />
        <span className="text-sm text-muted-foreground">Accent Loader</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <VoidLoader size={45} color="hsl(var(--primary))" />
        <span className="text-sm text-muted-foreground">Primary Loader</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button onClick={toggleLoading}>Toggle Loading</Button>
        <span className="text-sm text-muted-foreground">Test Button</span>
      </div>
    </div>
  );
}