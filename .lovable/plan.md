# Correct challenge statuses on the Initiatives page

## Changes (Initiatives data, challenge list)
- **HECKTOR 2025** — Active → Completed. Participation text: "5th edition held at MICCAI 2025; challenge completed".
- **AAPM GDP-HMM 2025** — Active → Completed. Participation text: "Held for the AAPM 2025 Annual Meeting; challenge completed".
- **DoseRAD2026** — Active → Completed. Participation text: "Training/validation phase ran 10 Apr–31 Aug 2026; submissions closed".
- **COBRA2026** — stays Active. Participation text updated: "Training phase running; validation phase opens 1 Dec 2026; final submissions 15 Feb 2027".
- All four get `lastVerified: 2026-11-24`.
- End dates: added only where the challenge website states one (re-checked while building); otherwise left empty rather than guessed.
- If a website shows a post-challenge submission phase still open, mark `postChallenge: true` as done for PANTHER.

## Check
Open the Initiatives page and confirm only COBRA2026 shows as Active among these four.
