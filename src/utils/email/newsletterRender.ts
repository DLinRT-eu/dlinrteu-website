// Shared newsletter rendering for edge functions.
// Mirrors src/utils/email/newsletterRender.ts so client-side preview and
// server-side broadcast HTML stay in sync.

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

const LOGO_URL = "https://dlinrt.eu/LogoDLinRT.eu.png";

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
      return `<a href="${safe}" style="color:${BRAND.primary};text-decoration:underline;">${text}</a>`;
    })
    .replace(/(^|[\s(])((?:https?:\/\/)[^\s<)]+)/g, (_m, pre, url) =>
      `${pre}<a href="${url}" style="color:${BRAND.primary};text-decoration:underline;">${url}</a>`
    );
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
  const blocks: { heading: string; body: string }[] = [];

  for (const section of sections) {
    const [headingLine, ...rest] = section.split("\n");
    const heading = (headingLine || "").trim();
    const body = rest.join("\n").trim();

    if (/^SUBJECT LINE/i.test(heading)) { subject = body.split("\n")[0].trim(); continue; }
    if (/^PREHEADER/i.test(heading)) { preheader = body.split("\n")[0].trim(); continue; }
    if (/^FOOTER/i.test(heading)) continue;
    if (/^BLOCK\s/i.test(heading)) {
      const display = heading.replace(/^BLOCK\s+[\w\d]+\s*[—\-:]\s*/i, "");
      blocks.push({ heading: display, body });
      continue;
    }
    if (body) blocks.push({ heading, body });
  }

  const blocksHtml = blocks.map(({ heading, body }) => renderBlock(heading, body)).join("\n");
  return { subject, preheader, blocksHtml };
}

const IMAGE_LINE_RE = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/;

function renderBlock(heading: string, body: string): string {
  const escapedHeading = escapeHtml(heading);
  const parts = body
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((para) => {
      // Standalone image paragraph
      const img = para.match(IMAGE_LINE_RE);
      if (img) {
        const alt = escapeHtml(img[1]);
        const url = /^https?:\/\//i.test(img[2].trim()) ? img[2].trim() : "";
        if (!url) return "";
        return `
          <div style="margin:18px 0 4px;text-align:center;">
            <img src="${url}" alt="${alt}" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:8px;margin:0 auto;" />
          </div>
        `;
      }
      const escaped = escapeHtml(para);
      const lines = escaped.split("\n");
      if (lines.every((l) => /^\s*-\s+/.test(l))) {
        const items = lines
          .map((l) => l.replace(/^\s*-\s+/, ""))
          .map((l) =>
            `<li style="margin:6px 0;padding-left:6px;color:${BRAND.text};">${inline(l)}</li>`
          )
          .join("");
        return `<ul style="margin:0 0 14px;padding-left:22px;color:${BRAND.text};font-size:15px;line-height:1.6;list-style:disc;">${items}</ul>`;
      }
      return `<p style="margin:0 0 14px;color:${BRAND.text};font-size:15px;line-height:1.65;">${inline(
        escaped.replace(/\n/g, "<br/>"),
      )}</p>`;
    })
    .join("\n");

  return `
    <section style="margin:0 0 22px;padding:20px 22px;background:${BRAND.surface};border:1px solid ${BRAND.border};border-left:4px solid ${BRAND.primary};border-radius:8px;">
      <h2 style="margin:0 0 12px;color:${BRAND.text};font-size:18px;font-weight:700;line-height:1.35;">${escapedHeading}</h2>
      ${parts}
    </section>
  `;
}

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
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.canvas};font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;color:${BRAND.text};">
    <div style="display:none;max-height:0;overflow:hidden;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.canvas};">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="660" cellpadding="0" cellspacing="0" border="0" style="max-width:660px;width:100%;background:${BRAND.bg};border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,0.10);overflow:hidden;">
            <!-- Archive bar -->
            <tr>
              <td align="center" style="padding:18px 24px 0;font-size:12px;color:${BRAND.muted};">
                <a href="${archiveUrl}" style="color:${BRAND.muted};text-decoration:underline;">View this email in your browser</a>
              </td>
            </tr>
            <!-- Logo -->
            <tr>
              <td align="center" style="padding:18px 24px 6px;">
                <a href="https://dlinrt.eu" style="text-decoration:none;color:${BRAND.text};">
                  <img src="${LOGO_URL}" alt="DLinRT.eu" width="140" style="display:block;width:140px;max-width:140px;height:auto;border:0;margin:0 auto;" />
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 24px 14px;">
                <div style="font-size:13px;color:${BRAND.muted};letter-spacing:0.3px;">Deep Learning in Radiotherapy</div>
                <div style="margin:14px auto 0;width:60px;height:3px;background:${BRAND.primary};border-radius:2px;"></div>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:18px 26px 8px;">
                ${blocksHtml}
                <div style="text-align:center;margin:28px 0 10px;">
                  <a href="https://dlinrt.eu" style="display:inline-block;background:${BRAND.primary};color:#ffffff;padding:13px 30px;text-decoration:none;border-radius:999px;font-weight:600;font-size:15px;box-shadow:0 4px 12px rgba(80,144,208,0.35);">Visit DLinRT.eu →</a>
                </div>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:18px 26px 26px;border-top:1px solid ${BRAND.border};color:${BRAND.muted};font-size:12px;line-height:1.6;text-align:center;">
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
