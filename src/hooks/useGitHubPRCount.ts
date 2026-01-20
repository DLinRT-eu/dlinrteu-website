import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { PullRequest, PRMeta } from './useGitHubPullRequests';

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

export function useGitHubPRCount(enabled: boolean = true) {
  return useQuery({
    queryKey: ['github-pull-requests'],
    queryFn: fetchPullRequests,
    staleTime: 5 * 60 * 1000, // 5 minutes - longer for dashboard
    refetchInterval: 10 * 60 * 1000, // 10 minutes - less frequent polling
    enabled,
    retry: 1,
    select: (data) => ({
      count: data.pullRequests.length,
      hasToken: data.meta.has_token,
      rateRemaining: data.meta.rate_limit.remaining,
    }),
  });
}
