# Newsletter Drafts

This folder stores **newsletter drafts** for DLinRT.eu, rendered by the DLinRT email template and broadcast via Resend.

## Naming convention

`YYYY-MM-<slug>.md` — one file per send.

## Structure of each file

Each newsletter is split into discrete blocks parsed by `supabase/functions/_shared/newsletter-render.ts`:

- `## SUBJECT LINE` — email subject.
- `## PREHEADER` — preview text.
- `## BLOCK N — <label>` — one section block. Accent color is inferred from the leading emoji:
  - 🟢 **Green** — product / catalogue updates
  - 🟣 **Violet** — community / reviewers
  - 🔵 **Blue** — platform / backbone
  - 🟡 **Amber** — events / calls to action

Inside blocks, `![alt](url)` becomes a responsive image and a lone `[Label](url)` line becomes a pill button.

## Workflow

1. Edit / create the markdown file in this folder.
2. Open `/admin/newsletter-broadcast` on the website.
3. Pick the draft, tweak subject/preheader/body if needed, review the live preview.
4. Click **Send test from website** to spot-check rendering in your inbox.
5. Click **Push draft to Resend**. The broadcast appears in the Resend dashboard, no email is sent yet.
6. Open the broadcast in Resend → send another test if you like, then **Send to audience** from Resend to ship the final newsletter.

The Resend audience is kept in sync automatically (subscribes/unsubscribes mirror in real time, plus a daily cron reconcile). The "Force full reconcile now" button is only needed if you suspect drift.

## Why store these here

Keeps newsletter copy versioned alongside the codebase, lets reviewers leave comments via PRs, and makes it trivial to reuse blocks across emails and on-site news items.
