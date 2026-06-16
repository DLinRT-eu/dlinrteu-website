// Shared newsletter rendering for edge functions.
// Mirrors src/utils/email/newsletterRender.ts so client-side preview and
// server-side broadcast HTML stay in sync.

export const BRAND = {
  primary: "#5090D0",
  text: "#1a1a2e",
  muted: "#6b7280",
  border: "#e5e7eb",
  bg: "#ffffff",
  surface: "#f8fafc",
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
    // Markdown links [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, url) => {
      const safe = /^(https?:|mailto:)/i.test(String(url).trim()) ? url : "#";
      return `<a href="${safe}" style="color:${BRAND.primary};text-decoration:underline;">${text}</a>`;
    })
    // Auto-link bare URLs
    .replace(/(^|[\s(])((?:https?:\/\/)[^\s<)]+)/g, (m, pre, url) => {
      return `${pre}<a href="${url}" style="color:${BRAND.primary};text-decoration:underline;">${url}</a>`;
    });
}

/**
 * Parse a Mailchimp-style newsletter markdown into:
 *  - subject (from `## SUBJECT LINE`)
 *  - preheader (from `## PREHEADER`)
 *  - blocks  (each `## BLOCK ...` becomes an HTML section)
 *
 * Falls back gracefully when those sections are missing — treats whole input
 * as a single block.
 */
export interface ParsedNewsletter {
  subject: string;
  preheader: string;
  blocksHtml: string;
}

export function parseNewsletterMarkdown(md: string): ParsedNewsletter {
  // Strip the trailing footer separator section if present
  const cleaned = md.replace(/\r\n/g, "\n").trim();

  const sections = cleaned.split(/\n##\s+/).map((s, i) => (i === 0 ? s.replace(/^##\s+/, "") : s));

  let subject = "";
  let preheader = "";
  const blocks: { heading: string; body: string }[] = [];

  for (const section of sections) {
    const [headingLine, ...rest] = section.split("\n");
    const heading = (headingLine || "").trim();
    const body = rest.join("\n").trim();

    if (/^SUBJECT LINE/i.test(heading)) {
      subject = body.split("\n")[0].trim();
      continue;
    }
    if (/^PREHEADER/i.test(heading)) {
      preheader = body.split("\n")[0].trim();
      continue;
    }
    if (/^FOOTER/i.test(heading)) continue;
    if (/^BLOCK\s/i.test(heading)) {
      // Strip "BLOCK N — " prefix from heading display
      const display = heading.replace(/^BLOCK\s+[\w\d]+\s*[—\-:]\s*/i, "");
      blocks.push({ heading: display, body });
      continue;
    }
    // Untitled section before any BLOCK header — include as a generic block
    if (body) blocks.push({ heading: heading, body });
  }

  const blocksHtml = blocks
    .map(({ heading, body }) => renderBlock(heading, body))
    .join("\n");

  return { subject, preheader, blocksHtml };
}

function renderBlock(heading: string, body: string): string {
  const escapedHeading = escapeHtml(heading);
  const paragraphs = body
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((para) => {
      const escaped = escapeHtml(para);
      const lines = escaped.split("\n");
      // Bullet list?
      if (lines.every((l) => /^\s*-\s+/.test(l))) {
        const items = lines
          .map((l) => l.replace(/^\s*-\s+/, ""))
          .map((l) => `<li style="margin:6px 0;">${inline(l)}</li>`)
          .join("");
        return `<ul style="margin:0 0 14px;padding-left:20px;color:${BRAND.text};font-size:15px;line-height:1.6;">${items}</ul>`;
      }
      return `<p style="margin:0 0 14px;color:${BRAND.text};font-size:15px;line-height:1.65;">${inline(
        escaped.replace(/\n/g, "<br/>"),
      )}</p>`;
    })
    .join("\n");

  return `
    <section style="margin:0 0 28px;padding:20px 22px;background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:8px;">
      <h2 style="margin:0 0 12px;color:${BRAND.text};font-size:18px;line-height:1.35;">${escapedHeading}</h2>
      ${paragraphs}
    </section>
  `;
}

export interface RenderOptions {
  subject: string;
  preheader: string;
  blocksHtml: string;
  /** Unsubscribe URL or merge tag (e.g. `{{RESEND_UNSUBSCRIBE_URL}}`). */
  unsubscribeUrl: string;
}

export function renderNewsletterHtml(opts: RenderOptions): string {
  const { subject, preheader, blocksHtml, unsubscribeUrl } = opts;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${BRAND.text};">
    <div style="display:none;max-height:0;overflow:hidden;color:transparent;">${escapeHtml(preheader)}</div>
    <div style="max-width:640px;margin:0 auto;background:${BRAND.bg};">
      <div style="background:${BRAND.primary};padding:22px 24px;text-align:center;">
        <a href="https://dlinrt.eu" style="color:#ffffff;text-decoration:none;">
          <div style="font-size:22px;font-weight:700;letter-spacing:0.3px;">DLinRT.eu</div>
          <div style="font-size:13px;opacity:0.9;margin-top:2px;">Deep Learning in Radiotherapy</div>
        </a>
      </div>
      <div style="padding:28px 26px;">
        ${blocksHtml}
        <div style="text-align:center;margin:32px 0 8px;">
          <a href="https://dlinrt.eu" style="display:inline-block;background:${BRAND.primary};color:#ffffff;padding:12px 26px;text-decoration:none;border-radius:6px;font-weight:600;">Visit DLinRT.eu →</a>
        </div>
      </div>
      <div style="padding:18px 26px 26px;border-top:1px solid ${BRAND.border};color:${BRAND.muted};font-size:12px;line-height:1.6;text-align:center;">
        <p style="margin:0 0 6px;">You're receiving this email because you subscribed to DLinRT.eu updates.</p>
        <p style="margin:0;">
          <a href="${unsubscribeUrl}" style="color:${BRAND.muted};text-decoration:underline;">Unsubscribe</a>
          &nbsp;·&nbsp;
          <a href="mailto:info@dlinrt.eu" style="color:${BRAND.muted};text-decoration:underline;">Contact</a>
        </p>
      </div>
    </div>
  </body>
</html>`;
}
