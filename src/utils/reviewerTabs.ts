export type ReviewerTab = 'all' | 'pending' | 'in_progress' | 'completed';

/** Pick the first dashboard tab that actually contains reviews. */
export function pickInitialReviewerTab(statuses: string[]): ReviewerTab {
  if (statuses.includes('pending')) return 'pending';
  if (statuses.includes('in_progress')) return 'in_progress';
  return 'all';
}
