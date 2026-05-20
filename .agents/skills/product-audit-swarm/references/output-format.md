# Output Format

The Compiler emits one Markdown block per product into
`/mnt/documents/product-audit-<YYYY-MM-DD>.md` plus rows into two CSVs in
the same directory. Schemas below are exact — downstream tooling depends
on them.

## Per-product Markdown block

```markdown
### <product.id>

- **Name**: <product.name>
- **Company**: <product.company>
- **Category**: <product.category>[ → secondary: a, b]
- **Current scores**: E<X> / I<Y> / R<Z>
- **Last revised**: <YYYY-MM-DD> (<N> days ago)

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | productUrl | error | 404 on HEAD request | Update to current vendor URL or mark archived |
| Evidence | evidenceRigor | info | New multi-centre paper (DOI ...) supports E2 | Re-score to E2; update evidenceRigorNotes |
| ... | ... | ... | ... | ... |

#### Re-scoring proposal

- Proposed: E<X'> / I<Y'> / R<Z'>
- Rationale: <1–3 sentences citing the strongest paper>
- Search date: <YYYY-MM-DD>

#### Sources consulted

- PubMed query "<query>" (YYYY-MM-DD)
- <vendor URL or DOI>
```

If a role had no findings, write a single row `| <Role> | — | info | clean | — |` so reviewers can confirm the role ran. If a role is not applicable (e.g. Structures on a Treatment Planning product), write `n/a — reason`.

## Findings CSV

Path: `/mnt/documents/product-audit-<YYYY-MM-DD>.csv`

Header:

```csv
id,role,severity,field,observation,suggested_fix
```

One row per finding, including the "clean" rows. Escape commas and
newlines per RFC 4180.

## Rescoring CSV

Path: `/mnt/documents/product-audit-<YYYY-MM-DD>-rescoring.csv`

Header:

```csv
id,current_E,current_I,current_R,proposed_E,proposed_I,proposed_R,strongest_paper_doi,search_date,rationale
```

One row per product, even when proposed scores equal current scores
(rationale then explains why the current score is defensible).

## Top-of-report header

The Markdown report starts with a single H1 + summary table:

```markdown
# Product Audit Report — <YYYY-MM-DD>

- Scope: <all | category=<name> | id=<slug>>
- Products in scope: <N>
- Findings: <errors> errors, <warns> warns, <infos> infos
- Rescoring proposals: <N> (<changes> proposed changes)
```

The Compiler MUST NOT include suggested code patches in the Markdown
report — edits are applied in a separate, confirmed pass per the
Minimal Intervention policy.
