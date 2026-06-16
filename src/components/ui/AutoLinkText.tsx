import React from "react";
import { isSafeHttpUrl, shortenUrl } from "@/lib/url";

/**
 * Renders a string, replacing only validated http(s) URLs with shortened
 * clickable anchors. Non-URL text (including bare domains, file paths, or
 * "www." without a scheme) is rendered verbatim. Hovering the anchor shows
 * the full URL via the native title attribute so long links don't break
 * layout.
 */
interface AutoLinkTextProps {
  text: string;
  /** Max characters to display for the link label (default 48). */
  maxLength?: number;
  className?: string;
}

// Match only explicit http(s) schemes. Trailing punctuation is stripped below.
const URL_RE = /(https?:\/\/[^\s<>"']+)/gi;
const TRAILING_PUNCT_RE = /[.,;:!?)\]}>]+$/;

const AutoLinkText: React.FC<AutoLinkTextProps> = ({ text, maxLength = 48, className }) => {
  if (!text) return null;
  const parts = text.split(URL_RE);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          // Split trailing punctuation off so it doesn't become part of the link.
          const trailingMatch = part.match(TRAILING_PUNCT_RE);
          const trailing = trailingMatch ? trailingMatch[0] : "";
          const url = trailing ? part.slice(0, part.length - trailing.length) : part;
          if (!isSafeHttpUrl(url)) {
            return <React.Fragment key={i}>{part}</React.Fragment>;
          }
          return (
            <React.Fragment key={i}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={url}
                className="text-primary hover:underline break-all"
              >
                {shorten(url, maxLength)}
              </a>
              {trailing}
            </React.Fragment>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
};

export default AutoLinkText;
