import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "emerald" | "outline" | "purple";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-white/5 text-slate-300 border border-white/10": variant === "default",
          "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20":
            variant === "accent",
          "bg-purple-500/10 text-purple-400 border border-purple-500/20":
            variant === "purple",
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20":
            variant === "emerald",
          "border border-white/20 text-slate-400 bg-transparent": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
