# AutoContour: make the page count match the vendor's 523 models

## Issue (confirmed)
The AutoContour page lists the v2.8 structures under Radformation's 17 site groups. The same model shows up in several groups (for example the heart under Thorax and Breast), so the page's summary badges count 607 entries. The feature line on the same page says 523 distinct models. The dashboard shows a third number: 470 distinct names, because it merges CT and MR models that share a name.

## Fix
1. On product pages, the summary badges count each distinct model once: the same name with the same modality counts once, whatever group it's in. The full grouped list stays as it is, so every site still shows its complete list.
2. Add a short line under the badges when duplicates are removed, e.g. "607 entries across site groups; 523 distinct models". This applies to every vendor with repeated entries, but only changes the numbers for products that list the same model in more than one group.
3. Leave the dashboard counting by name (470). The source note already explains this. It's a site-wide rule you set before.

## Risks
- Other vendors whose lists repeat a model across regions will show lower badge totals on their pages. I'll print a before/after list for every product and report each change.
- Modality has to be read from each entry. If an AutoContour entry doesn't carry its modality in a form the counter can read, I'll add that modality to the data from the extraction worksheet rather than guess it.

## Checks
Typecheck, validate:evidence, and open the AutoContour page to confirm the badges total 523.
