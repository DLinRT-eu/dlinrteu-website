# Newsletter Drafts

This folder stores **Mailchimp-ready newsletter drafts** for DLinRT.eu.

## Naming convention

`YYYY-MM-<slug>.md` — one file per send.

## Structure of each file

Each newsletter is split into discrete copy-paste blocks aligned with Mailchimp content sections:

- `## SUBJECT LINE` — paste into Mailchimp campaign subject.
- `## PREHEADER` — paste into preview text.
- `## BLOCK N — <label>` — one block per Mailchimp content row. Each block has a heading and a short body with inline links, following the project color-coded convention:
  - 🟢 **Green** — product / catalogue updates
  - 🟣 **Violet** — community / reviewers
  - 🔵 **Blue** — platform / backbone
  - 🟡 **Amber** — events / calls to action

## How to use

1. Open the relevant `.md` file.
2. In Mailchimp, create a new campaign and paste the subject + preheader.
3. For each block, add a Text content block in the template and paste the block body. Mailchimp preserves inline links and bold/italic from markdown rendered in the visual editor (use "Paste from rich text" if available).
4. Attach assets from `public/newsletters/<period>/` (deck PDF, slide images, logos) as needed.

## Why store these here

Keeps newsletter copy versioned alongside the codebase, lets reviewers leave comments via PRs, and makes it trivial to reuse blocks across emails and on-site news items.
