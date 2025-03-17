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
        "rounded-full w-10 h-10 p-0 flex items-center justify-center",
        loading && "cursor-not-allowed",
        className
      )}
      disabled={loading}
    >
      {loading ? (
        <VoidLoader size={24} className="scale-75" />
      ) : (
        <LoaderPinwheel className="h-5 w-5" />
      )}
    </Button>
  );
}