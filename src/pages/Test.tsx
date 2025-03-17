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
    <div className="flex min-h-screen items-center justify-center gap-4 bg-background p-4">
      <SendButton loading={loading} onClick={toggleLoading} />
      <VoidLoader size={45} />
      <Button onClick={toggleLoading}>Toggle Loading</Button>
    </div>
  );
}