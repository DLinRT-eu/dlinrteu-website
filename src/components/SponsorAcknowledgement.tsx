import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Props {
  variant?: "compact" | "full";
}

const SponsorAcknowledgement = ({ variant = "compact" }: Props) => {
  const isFull = variant === "full";
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
        <a
          href="https://www.umcutrecht.nl"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
          aria-label="UMC Utrecht website"
        >
          <img
            src="/logos/umc-utrecht.svg"
            alt="UMC Utrecht"
            className="h-16 w-auto"
            loading="lazy"
          />
        </a>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-1">
            With grateful support from UMC Utrecht
          </h3>
          <p className="text-sm text-muted-foreground">
            {isFull
              ? "All operational costs of DLinRT.eu — hosting, domain, and development tooling — are currently covered by UMC Utrecht. Their support keeps this catalogue free, independent, and openly accessible to the radiotherapy community."
              : "UMC Utrecht generously covers the operational costs of DLinRT.eu, allowing us to keep this resource free and openly accessible."}
          </p>
          <a
            href="https://www.umcutrecht.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
          >
            umcutrecht.nl <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default SponsorAcknowledgement;
