import React from "react";
import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink } from "lucide-react";
import { formatCitation, type RawEvidence } from "@/lib/formatCitation";

interface EvidenceCitationProps {
  item: RawEvidence;
}

/**
 * Renders a single evidence entry in a uniform citation layout:
 *   [Type]  [Level]
 *   Authors (Year). Title. *Journal* locator.
 *   doi.org/<DOI>
 *
 * Falls back gracefully when fields are missing or unparseable.
 */
const EvidenceCitation: React.FC<EvidenceCitationProps> = ({ item }) => {
  const c = formatCitation(item);

  const headerBadges = (
    <div className="flex items-center gap-2 flex-wrap">
      {c.type && (
        <Badge variant="outline" className="text-xs">
          {c.type}
        </Badge>
      )}
      {c.level && (
        <Badge variant="secondary" className="text-xs">
          Level {c.level}
        </Badge>
      )}
    </div>
  );

  const hasStructured = !!(c.authors || c.year || c.title || c.journal);

  return (
    <div className="pl-3 py-2 border-l-2 border-primary/20 space-y-1.5">
      {(c.type || c.level) && headerBadges}

      {hasStructured ? (
        <p className="text-sm leading-relaxed">
          {c.authors && <span className="font-medium">{c.authors}</span>}
          {c.year && <span> ({c.year})</span>}
          {(c.authors || c.year) && c.title ? ". " : c.title ? "" : ""}
          {c.title && <span>{c.title}</span>}
          {c.title && (c.journal || c.locator) ? ". " : ""}
          {c.journal && <em className="not-italic sm:italic">{c.journal}</em>}
          {c.locator && <span> {c.locator}</span>}
          {(c.journal || c.locator) ? "." : ""}
        </p>
      ) : (
        c.raw && <p className="text-sm text-muted-foreground">{c.raw}</p>
      )}

      {c.doiUrl ? (
        <a
          href={c.doiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline"
        >
          <FileText className="h-3.5 w-3.5" />
          doi.org/{c.doi}
        </a>
      ) : c.link ? (
        <a
          href={c.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View source
        </a>
      ) : null}
    </div>
  );
};

export default EvidenceCitation;
