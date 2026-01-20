import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GitHubPullRequest {
  number: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
  draft: boolean;
  mergeable_state?: string;
  requested_reviewers?: Array<{
    login: string;
    avatar_url: string;
  }>;
  head: {
    ref: string;
  };
  base: {
    ref: string;
  };
}

interface GitHubReview {
  state: string;
  user: {
    login: string;
  };
}

interface PRWithDetails extends GitHubPullRequest {
  files_changed: number;
  additions: number;
  deletions: number;
  review_status: string;
  reviews: GitHubReview[];
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const owner = 'DLinRT-eu';
    const repo = 'dlinrteu-website';
    
    // Optional GitHub token for higher rate limits
    const githubToken = Deno.env.get('GITHUB_TOKEN');
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'DLinRT-Admin-Dashboard',
    };
    
    if (githubToken) {
      headers['Authorization'] = `Bearer ${githubToken}`;
    }

    // Fetch open pull requests
    const prsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&per_page=50`,
      { headers }
    );

    if (!prsResponse.ok) {
      const errorText = await prsResponse.text();
      console.error('GitHub API error:', errorText);
      throw new Error(`GitHub API error: ${prsResponse.status} - ${errorText}`);
    }

    const pullRequests: GitHubPullRequest[] = await prsResponse.json();
    
    // Fetch additional details for each PR (files changed, reviews)
    const prsWithDetails: PRWithDetails[] = await Promise.all(
      pullRequests.map(async (pr) => {
        try {
          // Fetch PR details for file changes
          const detailsResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}`,
            { headers }
          );
          
          let filesChanged = 0;
          let additions = 0;
          let deletions = 0;
          
          if (detailsResponse.ok) {
            const details = await detailsResponse.json();
            filesChanged = details.changed_files || 0;
            additions = details.additions || 0;
            deletions = details.deletions || 0;
          }
          
          // Fetch reviews
          const reviewsResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}/reviews`,
            { headers }
          );
          
          let reviews: GitHubReview[] = [];
          let reviewStatus = 'pending';
          
          if (reviewsResponse.ok) {
            reviews = await reviewsResponse.json();
            
            // Determine overall review status
            const latestReviews = new Map<string, string>();
            reviews.forEach((review: GitHubReview) => {
              if (review.state !== 'COMMENTED') {
                latestReviews.set(review.user.login, review.state);
              }
            });
            
            const states = Array.from(latestReviews.values());
            if (states.includes('CHANGES_REQUESTED')) {
              reviewStatus = 'changes_requested';
            } else if (states.includes('APPROVED')) {
              reviewStatus = 'approved';
            } else if (reviews.length > 0) {
              reviewStatus = 'reviewed';
            }
          }
          
          return {
            ...pr,
            files_changed: filesChanged,
            additions,
            deletions,
            review_status: reviewStatus,
            reviews,
          };
        } catch (error) {
          console.error(`Error fetching details for PR #${pr.number}:`, error);
          return {
            ...pr,
            files_changed: 0,
            additions: 0,
            deletions: 0,
            review_status: 'unknown',
            reviews: [],
          };
        }
      })
    );

    // Get rate limit info
    const rateLimit = {
      remaining: prsResponse.headers.get('X-RateLimit-Remaining'),
      limit: prsResponse.headers.get('X-RateLimit-Limit'),
      reset: prsResponse.headers.get('X-RateLimit-Reset'),
    };

    return new Response(
      JSON.stringify({
        success: true,
        data: prsWithDetails,
        meta: {
          count: prsWithDetails.length,
          repository: `${owner}/${repo}`,
          rate_limit: rateLimit,
          has_token: !!githubToken,
        },
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to fetch pull requests',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
