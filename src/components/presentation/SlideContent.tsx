import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SlideContentProps {
  slide: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    keyPoints: string[];
    liveLink: string;
    icon: ReactNode;
    stats?: { label: string; value: string }[];
    figureComponent?: ReactNode;
    highlights?: { label: string; value: string; color?: string }[];
  };
  onGoLive: () => void;
}

export function SlideContent({ slide, onGoLive }: SlideContentProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8 pt-20">
      {/* Icon and Title */}
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {slide.icon}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
          {slide.title}
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-3xl mb-8">
        {slide.subtitle}
      </p>

      {/* Stats (if available) */}
      {slide.stats && slide.stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {slide.stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl md:text-3xl text-primary">
                  {stat.value}
                </CardTitle>
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Highlights (alternative to stats - horizontal colored cards) */}
      {slide.highlights && slide.highlights.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {slide.highlights.map((h, index) => (
            <Card key={index} className="text-center min-w-[140px]">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-xl md:text-2xl text-primary">
                  {h.value}
                </CardTitle>
                <CardDescription className="text-xs">{h.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Figure Component (optional inline visual) */}
      {slide.figureComponent && (
        <div className="max-w-3xl w-full mb-8">
          {slide.figureComponent}
        </div>
      )}

      {/* Key Points */}
      <Card className="max-w-2xl w-full mb-8">
        <CardHeader>
          <CardTitle>Key Points</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {slide.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Go Live Button */}
      <Button size="lg" onClick={onGoLive} className="gap-2">
        <ExternalLink className="h-5 w-5" />
        View Live: {slide.liveLink}
      </Button>
    </div>
  );
}
