// Shared newsletter rendering for edge functions.
// Mirrored client-side at src/utils/email/newsletterRender.ts — keep both in sync.
//
// ─────────────────────────────────────────────────────────────────────────────
// Authoring model — typed blocks
// ─────────────────────────────────────────────────────────────────────────────
// Each `## …` section in the markdown becomes one renderable block. The
// heading drives the block type and accent color:
//
//   ## SUBJECT LINE                  → email subject
//   ## PREHEADER                     → email preview text
//   ## BLOCK 1 — 🟢 Title            → CARD (accent inferred from emoji)
//   ## CARD {accent:violet} — Title  → CARD with explicit accent
//   ## HERO — Title                  → HERO banner (large centered title)
//   ## IMAGE                         → standalone responsive image
//                                      body = `![alt](https://…)`
//   ## CTA — Visit DLinRT            → button block, body = `[Label](url)`
//   ## DIVIDER                       → thin Steel Blue rule
//   ## QUOTE — optional attribution  → italic pulled-quote
//   ## FOOTER                        → ignored (handled by template)
//
// Within a CARD body, an `![alt](url)` paragraph is rendered as an inline
// image and `[Label](url)` on its own line as a secondary CTA button.
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  primary: "#5090D0",
  primaryDark: "#3d75ad",
  text: "#1a1a2e",
  muted: "#6b7280",
  border: "#e5e7eb",
  bg: "#ffffff",
  surface: "#ffffff",
  canvas: "#5090D0",
};

// Dark-mode palette (matches dlinrt.eu dark theme: deep slate canvas + surfaces)
export const BRAND_DARK = {
  primary: "#5090D0",
  text: "#e5e7eb",
  muted: "#9ca3af",
  border: "#2a2a4a",
  bg: "#1f1f3a",
  surface: "#1f1f3a",
  canvas: "#0f0f23",
};

const LOGO_URL = "https://dlinrt.eu/LogoDLinRT.eu.png";

type Accent = "blue" | "green" | "amber" | "violet" | "red" | "slate";

const ACCENTS: Record<Accent, string> = {
  blue: BRAND.primary,
  green: "#16a34a",
  amber: "#d97706",
  violet: "#8b5cf6",
  red: "#dc2626",
  slate: "#475569",
};

const EMOJI_ACCENT: Record<string, Accent> = {
  "🟢": "green",
  "🔵": "blue",
  "🟡": "amber",
  "🟠": "amber",
  "🟣": "violet",
  "🔴": "red",
  "⚫": "slate",
  "⚪": "slate",
};

function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function inline(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, url) => {
      const safe = /^(https?:|mailto:)/i.test(String(url).trim()) ? url : "#";
      return `<a href="${safe}" class="nl-link" style="color:${BRAND.primary};text-decoration:underline;">${text}</a>`;
    })
    .replace(/(^|[\s(])((?:https?:\/\/)[^\s<)]+)/g, (_m, pre, url) =>
      `${pre}<a href="${url}" class="nl-link" style="color:${BRAND.primary};text-decoration:underline;">${url}</a>`
    );
}

// ─── Block model ────────────────────────────────────────────────────────────

type BlockType = "card" | "hero" | "image" | "cta" | "divider" | "quote";

interface Block {
  type: BlockType;
  heading: string;
  body: string;
  accent: Accent;
}

const IMAGE_LINE_RE = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/;
const LINK_LINE_RE = /^\[([^\]]+)\]\(([^)]+)\)\s*$/;

/** Parse `{accent:violet}` (or `{a:violet}`) from a heading; return accent + cleaned heading. */
function extractAccent(heading: string): { accent?: Accent; heading: string } {
  const m = heading.match(/\{\s*a(?:ccent)?\s*:\s*(blue|green|amber|violet|red|slate)\s*\}/i);
  if (!m) return { heading };
  const accent = m[1].toLowerCase() as Accent;
  return { accent, heading: heading.replace(m[0], "").replace(/\s+/g, " ").trim() };
}

/** Detect block type + display heading from raw `## ...` line. */
function classifyHeading(rawHeading: string): { type: BlockType; heading: string; accent: Accent } {
  // Strip explicit accent token first
  const { accent: explicitAccent, heading: stripped } = extractAccent(rawHeading);

  // Look up emoji-based accent if not explicit
  let accent: Accent = explicitAccent ?? "blue";
  if (!explicitAccent) {
    for (const ch of stripped) {
      if (EMOJI_ACCENT[ch]) { accent = EMOJI_ACCENT[ch]; break; }
    }
  }

  // Strip "BLOCK N — " prefix (back-compat)
  const noBlock = stripped.replace(/^BLOCK\s+[\w\d]+\s*[—\-:]\s*/i, "");

  // Match typed prefixes
  const m = noBlock.match(/^(HERO|IMAGE|CTA|DIVIDER|QUOTE|CARD)\b\s*[—\-:]?\s*(.*)$/i);
  if (m) {
    const type = m[1].toLowerCase() as BlockType;
    return { type, heading: m[2].trim(), accent };
  }
  return { type: "card", heading: noBlock, accent };
}

export interface ParsedNewsletter {
  subject: string;
  preheader: string;
  blocksHtml: string;
}

export function parseNewsletterMarkdown(md: string): ParsedNewsletter {
  const cleaned = md.replace(/\r\n/g, "\n").trim();
  const sections = cleaned.split(/\n##\s+/).map((s, i) => (i === 0 ? s.replace(/^##\s+/, "") : s));

  let subject = "";
  let preheader = "";
  const blocks: Block[] = [];

  for (const section of sections) {
    const [headingLine, ...rest] = section.split("\n");
    const rawHeading = (headingLine || "").trim();
    const body = rest.join("\n").trim();

    if (/^SUBJECT LINE/i.test(rawHeading)) { subject = body.split("\n")[0].trim(); continue; }
    if (/^PREHEADER/i.test(rawHeading)) { preheader = body.split("\n")[0].trim(); continue; }
    if (/^FOOTER/i.test(rawHeading)) continue;

    if (!rawHeading && !body) continue;
    const { type, heading, accent } = classifyHeading(rawHeading);
    blocks.push({ type, heading, body, accent });
  }

  const blocksHtml = blocks.map(renderBlock).join("\n");
  return { subject, preheader, blocksHtml };
}

// ─── Block renderers ────────────────────────────────────────────────────────

function renderBlock(b: Block): string {
  switch (b.type) {
    case "hero":    return renderHero(b);
    case "image":   return renderImage(b);
    case "cta":     return renderCta(b);
    case "divider": return renderDivider();
    case "quote":   return renderQuote(b);
    case "card":
    default:        return renderCard(b);
  }
}

function renderCard(b: Block): string {
  const accentColor = ACCENTS[b.accent];
  const heading = escapeHtml(b.heading);
  const parts = b.body
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((para) => {
      const img = para.match(IMAGE_LINE_RE);
      if (img) return imageHtml(img[1], img[2]);
      const link = para.match(LINK_LINE_RE);
      if (link) return buttonHtml(link[1], link[2], accentColor, /*small*/ true);
      const escaped = escapeHtml(para);
      const lines = escaped.split("\n");
      if (lines.every((l) => /^\s*-\s+/.test(l))) {
        const items = lines
          .map((l) => l.replace(/^\s*-\s+/, ""))
          .map((l) =>
            `<li class="nl-li" style="margin:6px 0;padding-left:6px;color:${BRAND.text};">${inline(l)}</li>`
          )
          .join("");
        return `<ul class="nl-ul" style="margin:0 0 14px;padding-left:22px;color:${BRAND.text};font-size:15px;line-height:1.6;list-style:disc;">${items}</ul>`;
      }
      return `<p class="nl-p" style="margin:0 0 14px;color:${BRAND.text};font-size:15px;line-height:1.65;">${inline(
        escaped.replace(/\n/g, "<br/>"),
      )}</p>`;
    })
    .join("\n");

  return `
    <section class="nl-card" style="margin:0 0 22px;padding:20px 22px;background:${BRAND.surface};border:1px solid ${BRAND.border};border-left:4px solid ${accentColor};border-radius:8px;">
      ${heading ? `<h2 class="nl-h2" style="margin:0 0 12px;color:${BRAND.text};font-size:18px;font-weight:700;line-height:1.35;">${heading}</h2>` : ""}
      ${parts}
    </section>
  `;
}

function renderHero(b: Block): string {
  const accentColor = ACCENTS[b.accent];
  const heading = escapeHtml(b.heading);
  const body = b.body
    ? `<p class="nl-p" style="margin:8px 0 0;color:${BRAND.muted};font-size:15px;line-height:1.6;">${inline(escapeHtml(b.body))}</p>`
    : "";
  return `
    <section class="nl-hero" style="margin:0 0 22px;padding:28px 22px;text-align:center;background:${BRAND.surface};border:1px solid ${BRAND.border};border-top:4px solid ${accentColor};border-radius:8px;">
      <h1 class="nl-h1" style="margin:0;color:${BRAND.text};font-size:24px;font-weight:800;line-height:1.25;">${heading}</h1>
      ${body}
    </section>
  `;
}

function renderImage(b: Block): string {
  const m = b.body.match(IMAGE_LINE_RE) || b.body.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  if (!m) return "";
  return imageHtml(m[1], m[2]);
}

function renderCta(b: Block): string {
  const accentColor = ACCENTS[b.accent];
  const m = b.body.match(LINK_LINE_RE) || b.body.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!m) return "";
  return `<div style="text-align:center;margin:8px 0 22px;">${buttonHtml(m[1], m[2], accentColor)}</div>`;
}

function renderDivider(): string {
  return `<hr class="nl-hr" style="margin:18px 0 22px;border:0;border-top:2px solid ${BRAND.primary};opacity:0.5;" />`;
}

function renderQuote(b: Block): string {
  const accentColor = ACCENTS[b.accent];
  const head = b.heading ? `<div class="nl-muted" style="margin-top:8px;color:${BRAND.muted};font-size:13px;">— ${escapeHtml(b.heading)}</div>` : "";
  return `
    <blockquote class="nl-quote" style="margin:0 0 22px;padding:16px 20px;background:${BRAND.surface};border-left:4px solid ${accentColor};border-radius:6px;color:${BRAND.text};font-style:italic;font-size:15px;line-height:1.6;">
      ${inline(escapeHtml(b.body))}
      ${head}
    </blockquote>
  `;
}

// ─── Inline primitives ──────────────────────────────────────────────────────

function imageHtml(alt: string, rawUrl: string): string {
  const url = /^https?:\/\//i.test(rawUrl.trim()) ? rawUrl.trim() : "";
  if (!url) return "";
  return `
    <div style="margin:14px 0 6px;text-align:center;">
      <img src="${url}" alt="${escapeHtml(alt)}" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:8px;margin:0 auto;" />
    </div>
  `;
}

function buttonHtml(label: string, rawUrl: string, color: string, small = false): string {
  const url = /^(https?:|mailto:)/i.test(rawUrl.trim()) ? rawUrl.trim() : "#";
  const pad = small ? "10px 22px" : "13px 30px";
  const fs = small ? "14px" : "15px";
  return `<a href="${url}" class="nl-btn" style="display:inline-block;background:${color};color:#ffffff;padding:${pad};text-decoration:none;border-radius:999px;font-weight:600;font-size:${fs};box-shadow:0 4px 12px rgba(80,144,208,0.25);">${escapeHtml(label)}</a>`;
}

// ─── Shell ──────────────────────────────────────────────────────────────────

export interface RenderOptions {
  subject: string;
  preheader: string;
  blocksHtml: string;
  unsubscribeUrl: string;
  archiveUrl?: string;
}

export function renderNewsletterHtml(opts: RenderOptions): string {
  const { subject, preheader, blocksHtml, unsubscribeUrl } = opts;
  const archiveUrl = opts.archiveUrl || "https://dlinrt.eu/news";

  // Dark-mode CSS — applies in clients that respect prefers-color-scheme
  // (Apple Mail, iOS Mail, Outlook.com web, Thunderbird). Gmail strips
  // @media — light remains the fallback, which already matches the brand.
  const darkCss = `
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    @media (prefers-color-scheme: dark) {
      body, .nl-canvas { background:${BRAND_DARK.canvas} !important; }
      .nl-shell { background:${BRAND_DARK.bg} !important; box-shadow:0 6px 24px rgba(0,0,0,0.5) !important; }
      .nl-archive, .nl-archive a, .nl-tagline, .nl-footer, .nl-footer a, .nl-muted { color:${BRAND_DARK.muted} !important; }
      .nl-card, .nl-hero, .nl-quote { background:${BRAND_DARK.surface} !important; border-color:${BRAND_DARK.border} !important; }
      .nl-h1, .nl-h2, .nl-p, .nl-li, .nl-quote { color:${BRAND_DARK.text} !important; }
      .nl-divider-row td { border-color:${BRAND_DARK.border} !important; }
      .nl-footer-row td { border-color:${BRAND_DARK.border} !important; }
      .nl-link { color:${BRAND_DARK.primary} !important; }
      .nl-logo { filter: brightness(0) invert(1); }
    }
  `.replace(/\s+/g, " ").trim();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>${escapeHtml(subject)}</title>
    <style>${darkCss}</style>
  </head>
  <body class="nl-canvas" style="margin:0;padding:0;background:${BRAND.canvas};font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;color:${BRAND.text};">
    <div style="display:none;max-height:0;overflow:hidden;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="nl-canvas" style="background:${BRAND.canvas};">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="660" cellpadding="0" cellspacing="0" border="0" class="nl-shell" style="max-width:660px;width:100%;background:${BRAND.bg};border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,0.10);overflow:hidden;">
            <tr>
              <td align="center" class="nl-archive" style="padding:18px 24px 0;font-size:12px;color:${BRAND.muted};">
                <a href="${archiveUrl}" style="color:${BRAND.muted};text-decoration:underline;">View this email in your browser</a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:18px 24px 6px;">
                <a href="https://dlinrt.eu" style="text-decoration:none;color:${BRAND.text};">
                  <img class="nl-logo" src="${LOGO_URL}" alt="DLinRT.eu" width="140" style="display:block;width:140px;max-width:140px;height:auto;border:0;margin:0 auto;" />
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 24px 14px;">
                <div class="nl-tagline" style="font-size:13px;color:${BRAND.muted};letter-spacing:0.3px;">Deep Learning in Radiotherapy</div>
                <div style="margin:14px auto 0;width:60px;height:3px;background:${BRAND.primary};border-radius:2px;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 26px 8px;">
                ${blocksHtml}
                <div style="text-align:center;margin:28px 0 10px;">
                  <a href="https://dlinrt.eu" class="nl-btn" style="display:inline-block;background:${BRAND.primary};color:#ffffff;padding:13px 30px;text-decoration:none;border-radius:999px;font-weight:600;font-size:15px;box-shadow:0 4px 12px rgba(80,144,208,0.35);">Visit DLinRT.eu →</a>
                </div>
              </td>
            </tr>
            <tr class="nl-footer-row">
              <td class="nl-footer" style="padding:18px 26px 26px;border-top:1px solid ${BRAND.border};color:${BRAND.muted};font-size:12px;line-height:1.6;text-align:center;">
                <p style="margin:0 0 6px;">DLinRT.eu · Deep Learning in Radiotherapy · <a href="mailto:info@dlinrt.eu" style="color:${BRAND.muted};text-decoration:underline;">info@dlinrt.eu</a></p>
                <p style="margin:0 0 6px;">You're receiving this email because you subscribed to DLinRT.eu updates.</p>
                <p style="margin:0;">
                  <a href="${unsubscribeUrl}" style="color:${BRAND.muted};text-decoration:underline;">Unsubscribe</a>
                  &nbsp;·&nbsp;
                  <a href="${archiveUrl}" style="color:${BRAND.muted};text-decoration:underline;">View in browser</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
