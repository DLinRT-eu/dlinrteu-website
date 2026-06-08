// Shared helpers used by the admin bulk-email composer for live preview.
// Must match the rendering used in supabase/functions/send-bulk-representative-email/index.ts

export interface PreviewVars {
  first_name: string;
  last_name: string;
  full_name: string;
  company_name: string;
  company_url: string;
  rep_position: string;
  sender_name: string;
  today: string;
}

export const SITE_URL = "https://dlinrt.eu";
const INFO_EMAIL = "info@dlinrt.eu";

export function substitute(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => vars[key] ?? "");
}

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
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #5090D0;">$1</a>');
}

export function markdownToHtml(md: string): string {
  const escaped = escapeHtml(md);
  const blocks = escaped.split(/\n{2,}/).map((block) => {
    const lines = block.split("\n");
    const isList = lines.every((l) => /^\s*-\s+/.test(l));
    if (isList) {
      const items = lines
        .map((l) => l.replace(/^\s*-\s+/, ""))
        .map((l) => `<li style="margin: 4px 0;">${inline(l)}</li>`)
        .join("");
      return `<ul style="margin: 0 0 16px; padding-left: 20px; color: #374151; font-size: 15px;">${items}</ul>`;
    }
    return `<p style="font-size: 15px; color: #374151; margin: 0 0 16px; line-height: 1.6;">${inline(
      block.replace(/\n/g, "<br/>")
    )}</p>`;
  });
  return blocks.join("\n");
}

export function buildPreviewHtml(opts: {
  bodyMarkdown: string;
  companyName: string;
  companyUrl: string;
  vars: Record<string, string>;
}): string {
  const personalized = substitute(opts.bodyMarkdown, opts.vars);
  const bodyHtml = markdownToHtml(personalized);
  const safeCompany = escapeHtml(opts.companyName);
  return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #1a1a2e; max-width: 600px; margin: 0 auto; background: #ffffff;">
    <div style="background: #5090D0; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">DLinRT.eu</h1>
      <p style="color: #e6f0fa; margin: 6px 0 0; font-size: 14px;">Deep Learning in Radiotherapy</p>
    </div>
    <div style="background: #ffffff; padding: 28px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
      ${bodyHtml}
      <div style="text-align: center; margin: 28px 0;">
        <a href="${opts.companyUrl}" style="display: inline-block; background: #5090D0; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">View ${safeCompany} on DLinRT.eu →</a>
      </div>
      <p style="color: #6b7280; font-size: 13px; word-break: break-all;">Or open: <a href="${opts.companyUrl}" style="color: #5090D0;">${opts.companyUrl}</a></p>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">
        <p style="margin: 0 0 6px;">You receive this email as a verified DLinRT.eu company representative for ${safeCompany}.</p>
        <p style="margin: 0;">Questions? Reply to this email or contact <a href="mailto:${INFO_EMAIL}" style="color: #5090D0;">${INFO_EMAIL}</a>.</p>
      </div>
    </div>
  </div>`;
}

export const AVAILABLE_TOKENS: { token: string; description: string }[] = [
  { token: "{{first_name}}", description: "Representative's first name" },
  { token: "{{last_name}}", description: "Representative's last name" },
  { token: "{{full_name}}", description: "Full name" },
  { token: "{{company_name}}", description: "Company name" },
  { token: "{{company_url}}", description: "Link to the company's catalogue page" },
  { token: "{{rep_position}}", description: "Representative's position" },
  { token: "{{sender_name}}", description: "Your email (admin sending)" },
  { token: "{{today}}", description: "Today's date (YYYY-MM-DD)" },
];
