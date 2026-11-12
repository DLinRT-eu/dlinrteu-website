# Mark already-performed reviews as completed

## Findings
Checked every open (pending / in progress) assigned review in the current round ("Q4 2026 - anticipated", assigned 16 Oct 2026) for signs of real work by the assigned reviewer: submitted product edits, review comments, ticked checklist items, and the reviewer pull requests on GitHub.

- **Brainlab Elements RT Segmentation** (S. David): in progress; her product edit was submitted and accepted on 10 Nov 2026. Clearly done, so mark it **completed**.
- **Carina INTContour, Synaptiq Mediq RT** (M. Gooding) and **Quanta QOCA Image Smart RT** (S. David): the reviewer did make edits, but in June 2026, before this round was assigned. Leave as pending and list them in the reply so you can decide.
- Every other open review has no comments, checklist ticks or edits from its assignee. The 4 GitHub pull requests (AlgoMedica, SubtlePET, PyMedix, SubtleHD) and the other accepted edits (Limbus, Philips Precise Position, DeepMets, United uRT) don't match an open review assigned to the same person. No change.

## Change
Set the Brainlab review to completed: status `completed`, `completed_at` set to 10 Nov 2026 (the date the edit was accepted). Then check the round stats update.

## Technical details
- One data update on `product_reviews` id `54e07096-9fb4-4730-8143-b9f07b13e487`. Existing triggers handle `completed_at` and the round stats.
- Read the row back afterwards to confirm.
