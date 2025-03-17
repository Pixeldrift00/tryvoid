import { Button } from "@/components/ui/button";
import { VoidLoader } from "@/components/ui/void-loader";
import { LoaderPinwheel } from "lucide-react";
import { cn } from "@/lib/utils";

interface SendButtonProps {
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SendButton({ loading, onClick, className }: SendButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "rounded-full w-8 h-8 p-4 flex items-center justify-center relative",
        loading && "cursor-not-allowed",
        className
      )}
      disabled={loading}
    >
      {loading ? (
        <VoidLoader size={24} className="absolute inset-0 m-auto dark:bg-void-900" />
      ) : (
        <LoaderPinwheel className="h-6 w-6" />
      )}
    </Button>
  );
}