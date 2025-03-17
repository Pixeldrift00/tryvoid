import { cn } from "@/lib/utils";

interface VoidLoaderProps {
  size?: number;
  className?: string;
}

export function VoidLoader({ size = 45, className }: VoidLoaderProps) {
  return (
    <div
      className={cn(
        "relative transition-colors",
        "dark:--uib-color-white --uib-color-black",
        className
      )}
      style={{
        height: size,
        width: size,
      }}
    >
      <div className="absolute inset-0" />
    </div>
  );
}