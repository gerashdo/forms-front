import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  fullscreen?: boolean
  text?: string
}

export const Loading = ({ size = 'md', fullscreen = false, text }: LoadingProps) => {
  const {t} = useTranslation();
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const containerClasses = cn(
    "flex flex-col items-center justify-center space-y-2",
    {
      "fixed inset-0 bg-background/80 backdrop-blur-sm z-50": fullscreen,
      "p-4": !fullscreen
    }
  )

  return (
    <div className={containerClasses} role="status">
      <Loader2 className={cn("animate-spin text-primary text-neutral-950 dark:text-neutral-50", sizeClasses[size])} />
      {text && <p className="text-sm text-neutral-950 dark:text-neutral-50">{text}</p>}
      <span className="sr-only">
        {t("components.loder.loading")}
      </span>
    </div>
  )
}
