import { VoidLoader } from "@/components/ui/void-loader";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-colors">
      <VoidLoader size={60} />
    </div>
  );
}