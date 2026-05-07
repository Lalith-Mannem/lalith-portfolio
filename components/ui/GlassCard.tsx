import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className,
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl",
        hover &&
          "transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]",
        className
      )}
    >
      {children}
    </div>
  );
}
