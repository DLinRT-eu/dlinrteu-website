import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GitHubLabel {
  name: string;
  color: string;
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url?: string;
}

export interface GitHubReview {
  state: string;
  user: {
    login: string;
  };
}

export interface PullRequest {
  number: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  updated_at: string;
  user: GitHubUser;
  labels: GitHubLabel[];
  draft: boolean;
  files_changed: number;
  additions: number;
  deletions: number;
  review_status: string;
  reviews: GitHubReview[];
  requested_reviewers?: GitHubUser[];
  head: {
    ref: string;
  };
  base: {
    ref: string;
  };
}

export interface PRMeta {
  count: number;
  repository: string;
  rate_limit: {
    remaining: string | null;
    limit: string | null;
    reset: string | null;
  };
  has_token: boolean;
}

interface GitHubPRResponse {
  success: boolean;
  data?: PullRequest[];
  meta?: PRMeta;
  error?: string;
}

async function fetchPullRequests(): Promise<{ pullRequests: PullRequest[]; meta: PRMeta }> {
  const { data, error } = await supabase.functions.invoke<GitHubPRResponse>('github-pull-requests');

  if (error) {
    throw new Error(error.message || 'Failed to fetch pull requests');
  }

  if (!data?.success) {
    throw new Error(data?.error || 'Unknown error fetching pull requests');
  }

  return {
    pullRequests: data.data || [],
    meta: data.meta || {
      count: 0,
      repository: 'DLinRT-eu/dlinrteu-website',
      rate_limit: { remaining: null, limit: null, reset: null },
      has_token: false,
    },
  };
}

export function useGitHubPullRequests() {
  return useQuery({
    queryKey: ['github-pull-requests'],
    queryFn: fetchPullRequests,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    retry: 2,
  });
}
