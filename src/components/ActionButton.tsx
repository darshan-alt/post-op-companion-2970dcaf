import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function ActionButton({
  icon: Icon,
  title,
  subtitle,
  onClick,
  variant = "primary",
  className,
}: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "w-full h-auto p-6 flex items-center gap-4 text-left transition-all duration-200",
        variant === "primary"
          ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
          : "bg-card hover:bg-accent border-2 border-border text-foreground shadow-sm hover:shadow-md",
        className
      )}
    >
      <div
        className={cn(
          "p-3 rounded-full flex-shrink-0",
          variant === "primary" ? "bg-primary-foreground/20" : "bg-clinical-light"
        )}
      >
        <Icon
          className={cn(
            "h-7 w-7",
            variant === "primary" ? "text-primary-foreground" : "text-clinical"
          )}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p
          className={cn(
            "text-sm truncate",
            variant === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      </div>
    </Button>
  );
}
