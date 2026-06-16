## Goal

Make broadcasts sent from the admin composer look as polished as the Mailchimp `jun2026.html` reference — branded outer frame, real DLinRT logo, "View in browser" link, hero/inline imagery from the newsletter slide deck — while keeping the website palette (Steel Blue `#5090D0`, Dark Slate `#1a1a2e`) and our existing Markdown-driven workflow.

## Visual changes (template)

Update `supabase/functions/_shared/newsletter-render.ts` and its client mirror `src/utils/email/newsletterRender.ts` to render:

1. **Outer canvas**: Steel Blue `#5090D0` background (replaces flat `#f1f5f9`), email content centered in a 660px white card with soft shadow — matches the Mailchimp "blue frame around white sheet" look but with our brand color.
2. **Pre-header bar**: tiny centered "View this email in your browser" link (uses the unsubscribe/archive URL passed in).
3. **Logo header**: replace the text-only header with the real `LogoDLinRT.eu.png` (linked from `https://dlinrt.eu/LogoDLinRT.eu.png` so email clients can load it), 130px wide, centered on white, with a thin Steel Blue divider underneath. Tagline "Deep Learning in Radiotherapy" stays beneath the logo in Dark Slate.
4. **Section blocks**: keep the current per-`## BLOCK` card layout but refine:
   - White background (instead of `#f8fafc`) with a 3px Steel Blue left border for accent.
   - Heading in Dark Slate, 18px, bold.
   - Bullet markers tinted Steel Blue.
   - Links remain Steel Blue underlined.
5. **Inline imagery**: render two full-width slide images from the June 2026 deck inside the body to add color, matching the Mailchimp version's imagery:
   - After BLOCK 2 (Evidence System) → `https://dlinrt.eu/newsletters/2026-06/slide-03.jpg`
   - After BLOCK 4 (Backbone Updates) → `https://dlinrt.eu/newsletters/2026-06/slide-04.jpg`
   - Each wrapped in a link to the full PDF deck.
   - Implementation: extend the Markdown parser so a line of the form `![alt](url)` inside a block (or a dedicated `## IMAGE` section) becomes a responsive `<img style="display:block;width:100%;height:auto;border-radius:6px;">`. Author simply drops the two image references into the existing markdown source.
6. **CTA button**: keep the "Visit DLinRT.eu →" button but restyle as pill-shaped, Steel Blue, white text, with subtle shadow.
7. **Footer**: white background, top divider, smaller muted text, social/contact line ("DLinRT.eu · Deep Learning in Radiotherapy · info@dlinrt.eu"), unsubscribe link.
8. **Typography**: keep system font stack (Helvetica Neue / Arial fallback like Mailchimp). Body 15px / line-height 1.65. All inline styles only (email-safe).

## Markdown changes (`src/data/newsletters/2026-06-second-round-and-evidence.md`)

Add the two image references in-place so the upgraded renderer picks them up automatically:

- Insert after BLOCK 2 body:
  `![Evidence on three axes — DLinRT.eu June 2026 deck](https://dlinrt.eu/newsletters/2026-06/slide-03.jpg)`
- Insert after BLOCK 4 body:
  `![Catalogue backbone — DLinRT.eu June 2026 deck](https://dlinrt.eu/newsletters/2026-06/slide-04.jpg)`

No other newsletter content changes.

## What stays the same

- `src/pages/admin/NewsletterBroadcast.tsx` composer, preview iframe, audience sync, test-send, broadcast send — all unchanged. The live preview will simply render the new look because it imports the client-side renderer.
- Edge function entrypoints (`send-newsletter-broadcast`, `sync-newsletter-audience`) — unchanged.
- Markdown format (`## SUBJECT LINE`, `## PREHEADER`, `## BLOCK N — …`) — unchanged, only adds optional inline `![]()` images and the renderer learns to handle them.

## Files touched

- `supabase/functions/_shared/newsletter-render.ts` — restyled HTML + image parsing
- `src/utils/email/newsletterRender.ts` — kept in sync with the server renderer
- `src/data/newsletters/2026-06-second-round-and-evidence.md` — two `![]()` image lines added

## Verification

- Open `/admin/newsletter-broadcast`, pick the June 2026 draft, confirm the live preview iframe shows the new branded frame, logo, both slide images, and Steel Blue accents.
- Use "Send test to me" to validate rendering in Gmail/Outlook web.
