import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
  Maximize,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  id: string;
  title: string;
  liveLink: string;
}

interface DemoNavBarProps {
  currentSlide: number;
  totalSlides: number;
  slides: Slide[];
  onPrev: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
  onExit: () => void;
  onGoLive: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  className?: string;
}

export function DemoNavBar({
  currentSlide,
  totalSlides,
  slides,
  onPrev,
  onNext,
  onGoToSlide,
  onExit,
  onGoLive,
  onToggleFullscreen,
  isFullscreen,
  className,
}: DemoNavBarProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left: Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrev}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-1">Prev</span>
          </Button>

          <Select
            value={currentSlide.toString()}
            onValueChange={(value) => onGoToSlide(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                Slide {currentSlide + 1} of {totalSlides}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {slides.map((slide, index) => (
                <SelectItem key={slide.id} value={index.toString()}>
                  {index + 1}. {slide.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
          >
            <span className="sr-only md:not-sr-only md:mr-1">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Center: Timer */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Timer className="h-4 w-4" />
          <span className="font-mono text-sm">{formatTime(elapsedTime)}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" onClick={onGoLive}>
            <ExternalLink className="h-4 w-4 mr-1" />
            Go Live
          </Button>

          <Button variant="ghost" size="sm" onClick={onToggleFullscreen}>
            <Maximize className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={onExit}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  );
}
