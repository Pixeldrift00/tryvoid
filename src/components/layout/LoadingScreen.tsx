import { VoidLoader } from "@/components/ui/void-loader";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  delay?: number; // Delay before showing loader to prevent flash
  className?: string;
}

export function LoadingScreen({ delay = 200, className }: LoadingScreenProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        "animate-in fade-in duration-300",
        className
      )}
    >
      <VoidLoader size={60} />
    </div>
  );
}