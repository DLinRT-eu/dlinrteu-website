# Clarify the Research Software inclusion rule

The Research Software section on /initiatives gets a longer note under its heading, stating that only community-curated resources are listed, that DLinRT does not take requests about individual software packages or their versions, and that software owners should approach RS4RT instead.

## Wording

The section description becomes (one paragraph, same styling as the other sections):

```text
Curated collections of open-source research software for radiotherapy. Only
community-curated resources are included — we do not accept requests about
individual packages or software versions; contact RS4RT to have your software
included in its catalogue. These are research tools, not medical devices —
inclusion does not imply regulatory clearance or clinical validation.
```

## Change

- `src/components/initiatives/InitiativesCategorySections.tsx`: replace the `description` string on the `Research Software` `CategorySection`. No other prop, file or component changes; the RS4RT card, its buttons and the category filters stay as they are.

## Verification

- Typecheck, then load /initiatives in the browser and read the heading area: the three-part note renders on one block with no layout overflow, and the RS4RT card below it is unchanged.
