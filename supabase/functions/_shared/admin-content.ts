// Bounds admin-authored email text: links may only point to DLinRT-controlled
// or scholarly domains, so the endpoints cannot be used to send arbitrary links.
const ALLOWED_LINK_HOSTS = ["dlinrt.eu", "aiinrt.org", "doi.org"];

const URL_RE = /\b(?:https?:\/\/|www\.)([^\s/<>"')]+)/gi;

const BARE_DOMAIN_RE = /(?<![@\w.\/-])((?:[a-z0-9-]+\.)+(?:com|net|org|io|co|info|biz|xyz|app|dev|link|site|online|top|ru|cn|me|ly|gl|to|cc|tk|click|eu|uk|de|nl|fr|it|us))\b/gi;

export function disallowedLink(text: string | undefined | null): string | null {
  if (!text) return null;
  for (const m of text.matchAll(URL_RE)) {
    const host = m[1].toLowerCase().replace(/^www\./, "").replace(/:\d+$/, "");
    if (!ALLOWED_LINK_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) return m[0];
  }
  // Bare domains (e.g. "evil.example/login") are auto-linked by mail clients.
  for (const m of text.matchAll(BARE_DOMAIN_RE)) {
    const host = m[1].toLowerCase().replace(/^www\./, "");
    if (!ALLOWED_LINK_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) return m[0];
  }
  return null;
}
