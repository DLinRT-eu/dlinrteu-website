import React from "react";

/**
 * Renders a string, replacing any http(s) URLs with shortened clickable
 * anchors. Hovering the anchor shows the full URL via the native title
 * attribute, so visually long links don't break layout.
 */
interface AutoLinkTextProps {
  text: string;
  /** Max characters to display for the link label (default 48). */
  maxLength?: number;
  className?: string;
}

const URL_RE = /(https?:\/\/[^\s)]+[^\s).,;:!?])/g;

const shorten = (url: string, max: number): string => {
  if (url.length <= max) return url;
  try {
    const u = new URL(url);
    const host = u.host.replace(/^www\./, "");
    const path = u.pathname + (u.search || "");
    const budget = Math.max(8, max - host.length - 3);
    const shortPath =
      path.length > budget ? path.slice(0, Math.max(3, budget - 1)) + "…" : path;
    return host + shortPath;
  } catch {
    return url.slice(0, max - 1) + "…";
  }
};

const AutoLinkText: React.FC<AutoLinkTextProps> = ({ text, maxLength = 48, className }) => {
  const parts = text.split(URL_RE);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              title={part}
              className="text-primary hover:underline break-all"
            >
              {shorten(part, maxLength)}
            </a>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
};

export default AutoLinkText;
