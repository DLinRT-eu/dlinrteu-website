import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PresentationSlideProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  backgroundClass?: string;
}

export function PresentationSlide({
  title,
  subtitle,
  children,
  className,
  backgroundClass = "bg-background",
}: PresentationSlideProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[60vh] p-8 rounded-lg",
        backgroundClass,
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mb-8">
          {subtitle}
        </p>
      )}
      {children && (
        <div className="w-full max-w-4xl">
          {children}
        </div>
      )}
    </div>
  );
}
