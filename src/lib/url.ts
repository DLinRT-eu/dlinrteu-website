/**
 * Shared URL helpers for safe linkification and display shortening.
 * Used by AutoLinkText and by components that render bare URLs (e.g. website,
 * data source). Keep behavior identical to the previous inline implementation
 * in AutoLinkText so existing UX is preserved.
 */

export const isSafeHttpUrl = (candidate: string): boolean => {
  try {
    const u = new URL(candidate);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export const shortenUrl = (url: string, max = 48): string => {
  if (!url) return "";
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
