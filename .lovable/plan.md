## Recommendation

Yes — bring it back. The current homepage flow (hero → stats → 3 feature cards → one-line value statement → mailing list → news) is actually quite sparse below the fold, and the task taxonomy gives visitors a concrete, browsable entry point per workflow step. Placing it just before "Stay in the loop" works well: feature cards introduce the *what*, the taxonomy gives the *how to start exploring*, then the newsletter becomes a natural next CTA.

## Implementation

Reuse the existing `src/components/TaskTaxonomy.tsx` (no changes to that file — its colors, icons, and click handler are already correct).

### `src/pages/Index.tsx`

1. Import `TaskTaxonomy` and (lazily) compute category counts from `dataService.getAllProducts()` alongside the existing stats fetch — extend the existing `useEffect` so we only load `DataService` once. Store the counts in state:
   ```ts
   const [taskCounts, setTaskCounts] = useState<{ name: string; count: number }[]>([]);
   ```
   Inside the same async block:
   ```ts
   const counts = new Map<string, number>();
   dataService.getAllProducts().forEach(p => {
     if (p.category) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
   });
   setTaskCounts(Array.from(counts, ([name, count]) => ({ name, count })));
   ```

2. Render a new section between the "Built for clinicians…" value line and the mailing-list card:
   ```tsx
   <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
     <div className="text-center mb-8">
       <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
         Tasks Across the Patient Workflow
       </h2>
       <p className="mt-2 text-slate-600">
         Explore deep-learning solutions grouped by their role in the radiotherapy pathway.
       </p>
     </div>
     <TaskTaxonomy
       categories={taskCounts}
       onCategoryClick={(name) => navigate(`/products?task=${encodeURIComponent(name)}`)}
       filterType="task"
     />
   </section>
   ```
   Add `useNavigate` import (already used elsewhere in the project).

3. Don't render the section while `taskCounts` is empty (keeps the homepage clean on the initial paint and during the redirect for logged-in users).

### Out of scope

- No changes to `TaskTaxonomy.tsx`, the Products page, or the URL-param handling.
- No changes to dark mode, theme toggle, or hero.
