import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "https://dlinrteu-website.lovable.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) ||
    origin.endsWith('.lovable.app') ||
    origin.endsWith('.lovableproject.com')
  );
  const allowedOrigin = isAllowed ? origin! : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

const OWNER = 'DLinRT-eu';
const REPO = 'dlinrteu-website';

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const json = (status: number, body: Record<string, unknown>) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) return json(401, { ok: false, error: 'Unauthorized' });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const githubToken = Deno.env.get('GITHUB_TOKEN');

    // Verify admin
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: claims, error: claimsErr } = await userClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );
    if (claimsErr || !claims?.user) return json(401, { ok: false, error: 'Invalid token' });

    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: roles } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', claims.user.id)
      .eq('role', 'admin');
    if (!roles || roles.length === 0) return json(403, { ok: false, error: 'Admin access required' });

    if (!githubToken) {
      return json(200, {
        ok: false,
        stage: 'token',
        error: 'GITHUB_TOKEN secret is not configured.',
        repo: `${OWNER}/${REPO}`,
      });
    }

    // 1. Read repo to get scoped permissions
    const repoRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'dlinrt-edge-fn',
      },
    });
    const repoBody = await repoRes.text();
    if (!repoRes.ok) {
      return json(200, {
        ok: false,
        stage: 'repo_read',
        status: repoRes.status,
        error: `Cannot read ${OWNER}/${REPO}. Token may be invalid, expired, or lack metadata:read.`,
        detail: repoBody.slice(0, 400),
        repo: `${OWNER}/${REPO}`,
      });
    }
    const repo = JSON.parse(repoBody);
    const permissions = repo.permissions ?? {};

    // 2. Read main branch ref (contents:read smoke test)
    const refRes = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/git/refs/heads/main`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'dlinrt-edge-fn',
        },
      }
    );
    const refOk = refRes.ok;

    // 3. Active write probe: create then delete a throwaway ref.
    let writeOk = false;
    let writeStage: string | undefined;
    let writeStatus: number | undefined;
    let writeDetail: string | undefined;

    if (refOk) {
      const ref = await refRes.json();
      const probeBranch = `dlinrt-access-probe/${Date.now()}`;
      const createRes = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/git/refs`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'User-Agent': 'dlinrt-edge-fn',
          },
          body: JSON.stringify({ ref: `refs/heads/${probeBranch}`, sha: ref.object.sha }),
        }
      );

      if (createRes.ok) {
        writeOk = true;
        // Cleanup: best effort
        await fetch(
          `https://api.github.com/repos/${OWNER}/${REPO}/git/refs/heads/${probeBranch}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: 'application/vnd.github+json',
              'User-Agent': 'dlinrt-edge-fn',
            },
          }
        );
      } else {
        writeStage = 'create_branch';
        writeStatus = createRes.status;
        writeDetail = (await createRes.text()).slice(0, 400);
      }
    }

    return json(200, {
      ok: writeOk,
      repo: `${OWNER}/${REPO}`,
      checks: {
        repoRead: { ok: true, fullName: repo.full_name, private: repo.private },
        permissions, // { admin, push, pull, maintain, triage } from GitHub
        branchRead: { ok: refOk },
        branchWrite: writeOk
          ? { ok: true }
          : { ok: false, stage: writeStage, status: writeStatus, detail: writeDetail },
      },
    });
  } catch (err) {
    console.error('test-github-access error:', err);
    return json(500, { ok: false, error: 'Internal server error' });
  }
});
