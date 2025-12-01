import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://dlinrt.eu',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Credentials': 'true',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Calculate last month's date range
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    
    const since = lastMonth.toISOString().split('T')[0];
    const until = lastMonthEnd.toISOString().split('T')[0];

    console.log(`Auto-generating changelog for ${since} to ${until}`);

    // Fetch GitHub commits for last month
    const GITHUB_TOKEN = Deno.env.get('GITHUB_TOKEN');
    const owner = 'DLinRT-eu';
    const repo = 'dlinrteu-website';
    
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/commits?since=${since}T00:00:00Z&until=${until}T23:59:59Z&per_page=100`;
    
    const githubHeaders: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Supabase-Functions',
    };
    
    if (GITHUB_TOKEN) {
      githubHeaders['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(githubUrl, { headers: githubHeaders });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const commits = await response.json();
    
    if (!commits || commits.length === 0) {
      console.log('No commits found for last month');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No commits in period',
          period: { since, until },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${commits.length} commits`);

    // Categorize and group commits
    const categorizeCommit = (message: string): string => {
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.startsWith('feat') || lowerMessage.includes('add') || lowerMessage.includes('new')) {
        return 'feature';
      }
      if (lowerMessage.startsWith('fix') || lowerMessage.includes('bug') || lowerMessage.includes('issue')) {
        return 'bugfix';
      }
      if (lowerMessage.startsWith('docs') || lowerMessage.includes('documentation')) {
        return 'documentation';
      }
      if (lowerMessage.includes('security') || lowerMessage.includes('vulnerability')) {
        return 'security';
      }
      return 'improvement';
    };

    const commitsByCategory: Record<string, string[]> = {
      feature: [],
      improvement: [],
      bugfix: [],
      documentation: [],
      security: [],
    };

    commits.forEach((commit: any) => {
      const message = commit.commit.message.split('\n')[0];
      const category = categorizeCommit(message);
      const cleanMessage = message.replace(/^(feat|fix|docs|chore|refactor|style|test|perf|build|ci)(\(.+?\))?:\s*/i, '').trim();
      if (cleanMessage) {
        commitsByCategory[category].push(cleanMessage);
      }
    });

    // Generate summary highlights
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[lastMonth.getMonth()];
    const year = lastMonth.getFullYear();
    
    const totalFeatures = commitsByCategory.feature.length;
    const totalImprovements = commitsByCategory.improvement.length;
    const totalBugfixes = commitsByCategory.bugfix.length;
    const totalDocs = commitsByCategory.documentation.length;
    const totalSecurity = commitsByCategory.security.length;

    // Helper function to generate raw details (fallback)
    const generateRawDetails = () => {
      let raw = `## ${monthName} ${year} Highlights\n\n`;
      
      if (totalFeatures > 0) {
        raw += `### 🚀 New Features\n`;
        commitsByCategory.feature.forEach(item => { raw += `- ${item}\n`; });
        raw += '\n';
      }
      
      if (totalImprovements > 0) {
        raw += `### ✨ Improvements\n`;
        commitsByCategory.improvement.forEach(item => { raw += `- ${item}\n`; });
        raw += '\n';
      }
      
      if (totalBugfixes > 0) {
        raw += `### 🐛 Bug Fixes\n`;
        commitsByCategory.bugfix.forEach(item => { raw += `- ${item}\n`; });
        raw += '\n';
      }
      
      if (totalDocs > 0) {
        raw += `### 📚 Documentation\n`;
        commitsByCategory.documentation.forEach(item => { raw += `- ${item}\n`; });
        raw += '\n';
      }
      
      if (totalSecurity > 0) {
        raw += `### 🔒 Security\n`;
        commitsByCategory.security.forEach(item => { raw += `- ${item}\n`; });
        raw += '\n';
      }
      
      return raw.trim();
    };

    // Try to generate AI-summarized changelog
    let details: string;
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      console.log('No LOVABLE_API_KEY, using raw commits');
      details = generateRawDetails();
    } else {
      try {
        console.log('Generating AI-summarized changelog...');
        
        const prompt = `You are a technical writer creating a changelog for DLinRT.eu (a registry of AI/Deep Learning tools for radiotherapy).

Given these raw git commits grouped by category, create a professional, user-friendly changelog summary:

${JSON.stringify(commitsByCategory, null, 2)}

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
            console.warn('AI rate limited (429), falling back to raw commits');
          } else if (aiResponse.status === 402) {
            console.warn('AI credits exhausted (402), falling back to raw commits');
          } else {
            const errorText = await aiResponse.text();
            console.error(`AI API error (${aiResponse.status}):`, errorText);
          }
          details = generateRawDetails();
        } else {
          const aiData = await aiResponse.json();
          const aiSummary = aiData.choices[0].message.content;
          details = `## ${monthName} ${year} Highlights\n\n${aiSummary}`;
          console.log('Successfully generated AI-summarized changelog');
        }
      } catch (aiError) {
        console.error('AI summarization failed, falling back to raw:', aiError);
        details = generateRawDetails();
      }
    }

    // Determine primary category (most commits)
    const primaryCategory = Object.entries(commitsByCategory)
      .sort((a, b) => b[1].length - a[1].length)[0][0];

    // Generate version and entry ID
    const version = `${year}.${String(lastMonth.getMonth() + 1).padStart(2, '0')}.0`;
    const entryId = `changelog-${year}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
    const title = `${monthName} ${year} Updates`;
    
    const description = `Monthly release including ${totalFeatures} new features, ${totalImprovements} improvements, and ${totalBugfixes} bug fixes`;

    // Check if entry already exists
    const { data: existing } = await supabase
      .from('changelog_entries')
      .select('id, status')
      .eq('entry_id', entryId)
      .single();

    if (existing) {
      console.log('Entry already exists:', entryId, 'with status:', existing.status);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Entry already exists',
          entryId,
          status: existing.status,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert into database with 'published' status (auto-publish)
    const { data: newEntry, error: insertError } = await supabase
      .from('changelog_entries')
      .insert({
        entry_id: entryId,
        version,
        date: until,
        category: primaryCategory,
        title,
        description,
        details: details.trim(),
        status: 'published',
        published_at: new Date().toISOString(),
        auto_generated: true,
        github_data: {
          totalCommits: commits.length,
          period: { since, until },
          commitsByCategory: Object.fromEntries(
            Object.entries(commitsByCategory).map(([k, v]) => [k, v.length])
          ),
        },
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    console.log('Monthly changelog auto-published:', entryId);

    return new Response(
      JSON.stringify({ 
        success: true,
        entry: newEntry,
        message: 'Monthly changelog created and automatically published',
        stats: {
          totalCommits: commits.length,
          features: totalFeatures,
          improvements: totalImprovements,
          bugfixes: totalBugfixes,
          documentation: totalDocs,
          security: totalSecurity,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in auto-generate-monthly-changelog:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500,
      }
    );
  }
});
