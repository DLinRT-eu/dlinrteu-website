
export interface Initiative {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string;
  organization: string;
  startDate?: string;
  endDate?: string;
  status: "Active" | "Completed" | "Upcoming";
  /** Challenge concluded but submissions remain open in a post-challenge phase. */
  postChallenge?: boolean;
  /** ISO date (YYYY-MM-DD) on which status, link and claims were last checked. */
  lastVerified?: string;
  tags: string[];
  logoUrl?: string;

  features?: string[];
  dataAccess?: string;
  resultsUrl?: string;
  participationInfo?: string;
  relatedPublications?: {
    title: string;
    url: string;
    authors: string;
    year: string;
  }[];
}
