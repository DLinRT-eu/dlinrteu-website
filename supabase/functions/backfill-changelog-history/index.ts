import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://dlinrt.eu',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Credentials': 'true',
};

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

function categorizeCommit(message: string): string {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('feat') || lowerMessage.includes('add') || lowerMessage.includes('new')) {
    return 'feature';
  } else if (lowerMessage.includes('fix') || lowerMessage.includes('bug')) {
    return 'bugfix';
  } else if (lowerMessage.includes('doc') || lowerMessage.includes('readme')) {
    return 'documentation';
  } else if (lowerMessage.includes('security') || lowerMessage.includes('auth')) {
    return 'security';
  }
  return 'improvement';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user is admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!roles) {
      throw new Error('Admin access required');
    }

    console.log('Starting changelog backfill from April 2025...');

    const githubToken = Deno.env.get('REPO_TOKEN');
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Supabase-Function',
    };
    
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }

    // Fetch from old repository (April - September 2025)
    const oldRepoStartDate = new Date('2025-04-01T00:00:00Z');
    const oldRepoEndDate = new Date('2025-10-01T00:00:00Z');
    
    const oldRepoUrl = `https://api.github.com/repos/DLinRT-eu/website/commits?since=${oldRepoStartDate.toISOString()}&until=${oldRepoEndDate.toISOString()}&per_page=100`;
    console.log('Fetching commits from old repository (April-September 2025)...');
    
    const oldRepoResponse = await fetch(oldRepoUrl, { headers });
    const oldRepoCommits: GitHubCommit[] = oldRepoResponse.ok ? await oldRepoResponse.json() : [];
    console.log(`Fetched ${oldRepoCommits.length} commits from old repository`);

    // Fetch from new repository (October 2025 - now)
    const newRepoStartDate = new Date('2025-10-01T00:00:00Z');
    
    const newRepoUrl = `https://api.github.com/repos/DLinRT-eu/dlinrteu-website/commits?since=${newRepoStartDate.toISOString()}&per_page=100`;
    console.log('Fetching commits from new repository (October 2025-present)...');
    
    const newRepoResponse = await fetch(newRepoUrl, { headers });
    
    if (!newRepoResponse.ok) {
      throw new Error(`GitHub API error: ${newRepoResponse.status}`);
    }

    const newRepoCommits: GitHubCommit[] = await newRepoResponse.json();
    console.log(`Fetched ${newRepoCommits.length} commits from new repository`);

    // Merge all commits
    const commits: GitHubCommit[] = [...oldRepoCommits, ...newRepoCommits];
    console.log(`Total commits from both repositories: ${commits.length}`);

    // Group commits by month
    const commitsByMonth = new Map<string, GitHubCommit[]>();
    
    commits.forEach(commit => {
      const date = new Date(commit.commit.author.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!commitsByMonth.has(monthKey)) {
        commitsByMonth.set(monthKey, []);
      }
      commitsByMonth.get(monthKey)!.push(commit);
    });

    const entriesCreated = [];

    // Create changelog entries for each month
    for (const [monthKey, monthCommits] of commitsByMonth.entries()) {
      const [year, month] = monthKey.split('-');
      const entryDate = `${year}-${month}-01`;
      
      // Categorize commits
      const categorized = {
        feature: [] as string[],
        bugfix: [] as string[],
        security: [] as string[],
        improvement: [] as string[],
        documentation: [] as string[],
      };

      monthCommits.forEach(commit => {
        const category = categorizeCommit(commit.commit.message);
        const title = commit.commit.message.split('\n')[0].substring(0, 100);
        categorized[category as keyof typeof categorized].push(title);
      });

      // Helper function to generate raw details (fallback)
      const generateRawDetails = () => {
        let raw = '';
        for (const [category, items] of Object.entries(categorized)) {
          if (items.length > 0) {
            raw += `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
            items.forEach(item => { raw += `- ${item}\n`; });
            raw += '\n';
          }
        }
        return raw.trim();
      };

      // Try to generate AI-summarized changelog
      let details: string;
      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

      if (!LOVABLE_API_KEY) {
        console.log(`No LOVABLE_API_KEY for ${monthKey}, using raw commits`);
        details = generateRawDetails();
      } else {
        try {
          console.log(`Generating AI-summarized changelog for ${monthKey}...`);
          
          const prompt = `You are a technical writer creating a changelog for DLinRT.eu (a registry of AI/Deep Learning tools for radiotherapy).

Given these raw git commits grouped by category, create a professional, user-friendly changelog summary:

${JSON.stringify(categorized, null, 2)}

Guidelines:
- Write in clear, non-technical language when possible
- Group related commits into single meaningful entries
- Focus on user-facing changes and benefits
- Use action verbs (Added, Improved, Fixed, Updated)
- Keep each bullet point concise (1-2 sentences max)
- Remove duplicate or redundant entries
- Ignore internal refactoring unless it affects users
- Format as markdown with emoji headers

Output format:
### 🚀 New Features
- **Feature Name**: Brief description of what it does and why it matters

### ✨ Improvements  
- **Improvement Name**: What was improved and the benefit

### 🐛 Bug Fixes
- Fixed [issue description]

### 📚 Documentation
- Updated/Added [documentation description]

### 🔒 Security
- [Security improvement description]

Only include categories that have commits. Be concise but informative.`;

          const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${LOVABLE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: [
                { role: 'system', content: 'You are a professional technical writer specializing in software changelogs.' },
                { role: 'user', content: prompt }
              ],
            }),
          });

          if (!aiResponse.ok) {
            if (aiResponse.status === 429) {
              console.warn(`AI rate limited (429) for ${monthKey}, falling back to raw commits`);
            } else if (aiResponse.status === 402) {
              console.warn(`AI credits exhausted (402) for ${monthKey}, falling back to raw commits`);
            } else {
              const errorText = await aiResponse.text();
              console.error(`AI API error (${aiResponse.status}) for ${monthKey}:`, errorText);
            }
            details = generateRawDetails();
          } else {
            const aiData = await aiResponse.json();
            details = aiData.choices[0].message.content;
            console.log(`Successfully generated AI-summarized changelog for ${monthKey}`);
          }
        } catch (aiError) {
          console.error(`AI summarization failed for ${monthKey}, falling back to raw:`, aiError);
          details = generateRawDetails();
        }
      }

      // Generate version number
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const version = `${monthNames[parseInt(month) - 1]} ${year}`;

      const entryId = `${monthKey}-backfill`;
      const title = `${version} Updates`;
      const description = `${monthCommits.length} changes this month`;

      // Check if entry already exists
      const { data: existing } = await supabase
        .from('changelog_entries')
        .select('id')
        .eq('id', entryId)
        .single();

      if (!existing) {
        const { error: insertError } = await supabase
          .from('changelog_entries')
          .insert({
            id: entryId,
            version,
            date: entryDate,
            category: 'feature',
            title,
            description,
            details,
            status: 'published',
            published_at: new Date().toISOString(),
          });

        if (insertError) {
          console.error(`Error inserting entry for ${monthKey}:`, insertError);
        } else {
          entriesCreated.push({ month: monthKey, version, commits: monthCommits.length });
          console.log(`Created changelog entry for ${monthKey}`);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Backfill complete. Created ${entriesCreated.length} changelog entries.`,
        entries: entriesCreated,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in backfill-changelog-history:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
