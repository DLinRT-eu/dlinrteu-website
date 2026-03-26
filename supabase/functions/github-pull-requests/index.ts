import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  let allowedOrigin = ALLOWED_ORIGINS[0];
  if (origin) {
    if (ALLOWED_ORIGINS.includes(origin) || /^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin)) {
      allowedOrigin = origin;
    }
  }
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

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
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the caller
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify admin role
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    const { data: adminRole } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!adminRole) {
      return new Response(
        JSON.stringify({ error: 'Access denied: admin role required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const owner = 'DLinRT-eu';
    const repo = 'dlinrteu-website';
    
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
      console.error('GitHub API error:', await prsResponse.text());
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch pull requests from GitHub' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const pullRequests: GitHubPullRequest[] = await prsResponse.json();
    
    // Fetch additional details for each PR
    const prsWithDetails: PRWithDetails[] = await Promise.all(
      pullRequests.map(async (pr) => {
        try {
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
          
          const reviewsResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}/reviews`,
            { headers }
          );
          
          let reviews: GitHubReview[] = [];
          let reviewStatus = 'pending';
          
          if (reviewsResponse.ok) {
            reviews = await reviewsResponse.json();
            
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
      JSON.stringify({ success: false, error: 'Internal server error' }),
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
