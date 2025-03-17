import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 40 }: LogoProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        className="text-primary dark:text-accent"
      >
        {/* SVG content from void-logo.svg */}
      </svg>
    </div>
  );
}