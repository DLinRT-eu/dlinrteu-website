import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "https://dlinrteu-website.lovable.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

interface ProductEditDraft {
  id: string;
  product_id: string;
  draft_data: Record<string, unknown>;
  changed_fields: string[];
  edit_summary: string | null;
  status: string;
  created_by: string;
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const githubToken = Deno.env.get('GITHUB_TOKEN');

    if (!githubToken) {
      return new Response(
        JSON.stringify({ success: false, error: 'GITHUB_TOKEN not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify user is admin
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await userClient.auth.getUser(token);
    
    if (claimsError || !claimsData?.user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.user.id;

    // Use service role for database operations
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user is admin
    const { data: roles, error: roleError } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin');

    if (roleError || !roles || roles.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { draft_id } = await req.json();

    if (!draft_id) {
      return new Response(
        JSON.stringify({ success: false, error: 'draft_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the approved draft
    const { data: draft, error: draftError } = await adminClient
      .from('product_edit_drafts')
      .select('*')
      .eq('id', draft_id)
      .eq('status', 'approved')
      .single();

    if (draftError || !draft) {
      return new Response(
        JSON.stringify({ success: false, error: 'Draft not found or not approved' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const typedDraft = draft as ProductEditDraft;

    // Generate file path based on product category and company
    const filePath = resolveFilePath(typedDraft.draft_data);
    
    // Generate TypeScript code
    const productCode = generateProductCode(typedDraft.draft_data);

    // GitHub repository info
    const owner = 'DLinRT-eu';
    const repo = 'dlinrteu-website';
    const timestamp = Math.floor(Date.now() / 1000);
    const branchName = `visual-edit/${typedDraft.product_id}/${timestamp}`;

    // Get main branch SHA
    const mainBranchRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    if (!mainBranchRes.ok) {
      const error = await mainBranchRes.text();
      console.error('Failed to get main branch:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to access GitHub repository' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const mainBranch = await mainBranchRes.json();
    const mainSha = mainBranch.object.sha;

    // Create new branch
    const createBranchRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: mainSha,
        }),
      }
    );

    if (!createBranchRes.ok) {
      const error = await createBranchRes.text();
      console.error('Failed to create branch:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to create GitHub branch' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get current file SHA
    const fileRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branchName}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    let fileSha: string | undefined;
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      fileSha = fileData.sha;
    }

    // Commit the file
    const commitMessage = typedDraft.edit_summary 
      ? `Visual edit: ${typedDraft.edit_summary}`
      : `Visual edit: Update ${typedDraft.draft_data.name || typedDraft.product_id}`;

    const updateFileRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: btoa(unescape(encodeURIComponent(productCode))),
          branch: branchName,
          ...(fileSha && { sha: fileSha }),
        }),
      }
    );

    if (!updateFileRes.ok) {
      const error = await updateFileRes.text();
      console.error('Failed to commit file:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to commit changes to GitHub' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Pull Request
    const prTitle = typedDraft.edit_summary 
      ? `[Visual Edit] ${typedDraft.edit_summary}`
      : `[Visual Edit] Update ${typedDraft.draft_data.name || typedDraft.product_id}`;

    const prBody = `## Visual Product Edit

**Product:** ${typedDraft.draft_data.name || typedDraft.product_id}
**Changed Fields:** ${typedDraft.changed_fields.join(', ')}

${typedDraft.edit_summary ? `### Summary\n${typedDraft.edit_summary}` : ''}

---
*This PR was automatically generated from the Visual Editor.*`;

    const createPrRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: prTitle,
          body: prBody,
          head: branchName,
          base: 'main',
        }),
      }
    );

    if (!createPrRes.ok) {
      const error = await createPrRes.text();
      console.error('Failed to create PR:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to create Pull Request' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const prData = await createPrRes.json();
    const prUrl = prData.html_url;

    // Update draft status
    const { error: updateError } = await adminClient
      .from('product_edit_drafts')
      .update({
        status: 'applied',
        github_pr_url: prUrl,
        github_synced_at: new Date().toISOString(),
      })
      .eq('id', draft_id);

    if (updateError) {
      console.error('Failed to update draft status:', updateError);
      // PR was created, so we still return success
    }

    return new Response(
      JSON.stringify({
        success: true,
        pr_url: prUrl,
        branch: branchName,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in apply-product-edit:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function resolveFilePath(product: Record<string, unknown>): string {
  const category = String(product.category || '').toLowerCase().replace(/\s+/g, '-');
  const company = String(product.company || '').toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  // Special cases for single-file categories
  if (category === 'clinical-prediction' || category === 'clinical-decision-support') {
    return 'src/data/products/clinical-prediction.ts';
  }
  if (category === 'registration') {
    return 'src/data/products/registration/index.ts';
  }

  // Standard category/company structure
  return `src/data/products/${category}/${company}.ts`;
}

function generateProductCode(product: Record<string, unknown>): string {
  const productName = String(product.name || 'Product').replace(/[^a-zA-Z0-9]/g, '');
  
  const serialized = serializeValue(product, 0);
  
  return `import { ProductDetails } from "@/types/productDetails";

export const ${productName}: ProductDetails = ${serialized};
`;
}

function serializeValue(value: unknown, indent: number): string {
  const spaces = '  '.repeat(indent);
  const childSpaces = '  '.repeat(indent + 1);

  if (value === null || value === undefined) {
    return 'undefined';
  }

  if (typeof value === 'string') {
    // Escape special characters and use template literals for multi-line
    if (value.includes('\n')) {
      return '`' + value.replace(/`/g, '\\`').replace(/\${/g, '\\${') + '`';
    }
    return JSON.stringify(value);
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    
    // Check if it's a simple array of strings
    if (value.every(v => typeof v === 'string')) {
      if (value.length <= 3 && value.every(v => String(v).length < 30)) {
        return `[${value.map(v => JSON.stringify(v)).join(', ')}]`;
      }
      return `[\n${value.map(v => `${childSpaces}${JSON.stringify(v)}`).join(',\n')}\n${spaces}]`;
    }
    
    // Complex array
    const items = value.map(v => `${childSpaces}${serializeValue(v, indent + 1)}`);
    return `[\n${items.join(',\n')}\n${spaces}]`;
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const entries = Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null);
    
    if (entries.length === 0) return '{}';
    
    const props = entries.map(([key, val]) => {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
      return `${childSpaces}${safeKey}: ${serializeValue(val, indent + 1)}`;
    });
    
    return `{\n${props.join(',\n')}\n${spaces}}`;
  }

  return String(value);
}
