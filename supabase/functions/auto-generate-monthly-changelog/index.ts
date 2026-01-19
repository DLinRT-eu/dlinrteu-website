import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://dlinrt.eu',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cron-secret',
  'Access-Control-Allow-Credentials': 'true',
};

// Patterns to filter out low-quality commit messages
const IGNORED_PATTERNS = [
  /^changes$/i,
  /^code edited in lovable/i,
  /^merge pull request/i,
  /^merge branch/i,
  /^update \w+\.(ts|tsx|js|jsx|css|json)$/i,
  /^wip$/i,
  /^temp$/i,
  /^test$/i,
  /^minor$/i,
  /^cleanup$/i,
  /^typo$/i,
];

function isQualityCommit(message: string): boolean {
  const firstLine = message.split('\n')[0].trim();
  if (firstLine.length < 8) return false;
  return !IGNORED_PATTERNS.some(pattern => pattern.test(firstLine));
}

function categorizeCommit(message: string): string {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.startsWith('feat') || lowerMessage.includes('add ') || lowerMessage.includes('new ') || lowerMessage.includes('create ')) {
    return 'feature';
  }
  if (lowerMessage.startsWith('fix') || lowerMessage.includes('bug') || lowerMessage.includes('issue') || lowerMessage.includes('resolve')) {
    return 'bugfix';
  }
  if (lowerMessage.startsWith('docs') || lowerMessage.includes('documentation') || lowerMessage.includes('readme')) {
    return 'documentation';
  }
  if (lowerMessage.includes('security') || lowerMessage.includes('vulnerability') || lowerMessage.includes('auth') || lowerMessage.includes('rls')) {
    return 'security';
  }
  return 'improvement';
}

function deduplicateEntries(entries: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  
  entries.forEach(entry => {
    const normalized = entry.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 40);
    
    if (!seen.has(normalized) && normalized.length > 5) {
      seen.add(normalized);
      unique.push(entry);
    }
  });
  
  return unique;
}

function extractThemes(items: string[]): string[] {
  const themes = new Map<string, number>();
  const keywords = [
    'reviewer', 'admin', 'product', 'company', 'authentication', 
    'dashboard', 'export', 'security', 'search', 'filter', 'report',
    'workflow', 'notification', 'validation', 'integration', 'performance'
  ];
  
  items.forEach(item => {
    keywords.forEach(keyword => {
      if (item.toLowerCase().includes(keyword)) {
        themes.set(keyword, (themes.get(keyword) || 0) + 1);
      }
    });
  });
  
  return Array.from(themes.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([theme]) => theme);
}

function generateSmartDescription(categorized: Record<string, string[]>, monthName: string, year: number): string {
  const highlights: string[] = [];
  
  const featureThemes = extractThemes(categorized.feature);
  const improvementThemes = extractThemes(categorized.improvement);
  
  if (featureThemes.length > 0) {
    highlights.push(`new ${featureThemes.slice(0, 2).join(' and ')} features`);
  }
  if (improvementThemes.length > 0) {
    highlights.push(`enhanced ${improvementThemes.slice(0, 2).join(' and ')} capabilities`);
  }
  if (categorized.bugfix.length > 3) {
    highlights.push('stability improvements');
  }
  if (categorized.security.length > 0) {
    highlights.push('security enhancements');
  }
  
  return highlights.length > 0 
    ? `${monthName} ${year} release featuring ${highlights.join(', ')}.`
    : `${monthName} ${year} platform updates and improvements.`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    const cronSecret = req.headers.get('x-cron-secret');
    const expectedCronSecret = Deno.env.get('CRON_SECRET');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let isAuthorized = false;

    if (cronSecret && expectedCronSecret && cronSecret === expectedCronSecret) {
      console.log('Authenticated via cron secret');
      isAuthorized = true;
    }

    if (!isAuthorized && authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);

      if (authError || !user) {
        console.error('JWT validation failed:', authError?.message);
        return new Response(
          JSON.stringify({ error: 'Invalid authentication token' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        );
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin');

      if (roles && roles.length > 0) {
        console.log('Authenticated as admin:', user.email);
        isAuthorized = true;
      } else {
        console.error('User is not an admin:', user.email);
        return new Response(
          JSON.stringify({ error: 'Admin access required' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
        );
      }
    }

    if (!isAuthorized) {
      console.error('No valid authentication provided');
      return new Response(
        JSON.stringify({ error: 'Authentication required. Provide admin JWT or cron secret.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    
    const since = lastMonth.toISOString().split('T')[0];
    const until = lastMonthEnd.toISOString().split('T')[0];

    console.log(`Auto-generating changelog for ${since} to ${until}`);

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

    const allCommits = await response.json();
    
    if (!allCommits || allCommits.length === 0) {
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

    // Filter to quality commits only
    const commits = allCommits.filter((commit: any) => isQualityCommit(commit.commit.message));
    console.log(`Found ${allCommits.length} total commits, ${commits.length} quality commits`);

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
      if (cleanMessage && cleanMessage.length > 5) {
        commitsByCategory[category].push(cleanMessage);
      }
    });

    // Deduplicate entries in each category
    Object.keys(commitsByCategory).forEach(category => {
      commitsByCategory[category] = deduplicateEntries(commitsByCategory[category]);
    });

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[lastMonth.getMonth()];
    const year = lastMonth.getFullYear();
    
    const totalFeatures = commitsByCategory.feature.length;
    const totalImprovements = commitsByCategory.improvement.length;
    const totalBugfixes = commitsByCategory.bugfix.length;
    const totalDocs = commitsByCategory.documentation.length;
    const totalSecurity = commitsByCategory.security.length;

    const generateRawDetails = () => {
      let raw = `## ${monthName} ${year} Highlights\n\n`;
      
      if (totalFeatures > 0) {
        raw += `### 🚀 New Features\n`;
        commitsByCategory.feature.slice(0, 10).forEach(item => { raw += `- ${item}\n`; });
        raw += '\n';
      }
      
      if (totalImprovements > 0) {
        raw += `### ✨ Improvements\n`;
        commitsByCategory.improvement.slice(0, 10).forEach(item => { raw += `- ${item}\n`; });
        raw += '\n';
      }
      
      if (totalBugfixes > 0) {
        raw += `### 🐛 Bug Fixes\n`;
        commitsByCategory.bugfix.slice(0, 8).forEach(item => { raw += `- ${item}\n`; });
        raw += '\n';
      }
      
      if (totalDocs > 0) {
        raw += `### 📚 Documentation\n`;
        commitsByCategory.documentation.slice(0, 5).forEach(item => { raw += `- ${item}\n`; });
        raw += '\n';
      }
      
      if (totalSecurity > 0) {
        raw += `### 🔒 Security\n`;
        commitsByCategory.security.slice(0, 5).forEach(item => { raw += `- ${item}\n`; });
        raw += '\n';
      }
      
      return raw.trim();
    };

    let details: string;
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      console.log('No LOVABLE_API_KEY, using raw commits');
      details = generateRawDetails();
    } else {
      try {
        console.log('Generating AI-summarized changelog...');
        
        const prompt = `You are a senior technical writer creating a changelog for DLinRT.eu, the authoritative European registry of AI/Deep Learning tools for radiotherapy.

Your audience: Medical physicists, radiation oncologists, and healthcare IT professionals.

**Your Task**: Transform these raw git commits into an engaging, professional changelog.

Raw commits by category:
${JSON.stringify(commitsByCategory, null, 2)}

**Writing Guidelines**:
1. **Lead with impact**: Start each bullet with the user benefit, not the technical change
2. **Be specific**: Instead of "Improved performance", say "Product search now loads faster with optimized queries"
3. **Group related changes**: Combine similar commits into one meaningful entry
4. **Use active voice**: "Added dark mode support" not "Dark mode support was added"
5. **Skip internal changes**: Ignore refactoring, code cleanup, dependency updates
6. **Highlight key features**: Use bold (**Feature Name**:) for important new capabilities

**Tone**: Professional, authoritative, but accessible. Avoid jargon when possible.

**Format**:
## 🚀 New Features
- **Feature Name**: Clear description of what it does and why users should care

## ✨ Improvements
- **Area Improved**: Specific improvement and the benefit to users

## 🐛 Bug Fixes
- Fixed: Specific issue that was resolved

## 🔒 Security
- Enhanced: Security improvement description

**Important**:
- Maximum 8 bullets per category (group related items)
- Each bullet should be 1-2 sentences maximum
- Only include categories with meaningful changes
- Do NOT include generic entries like "Various improvements" or "Bug fixes"
- Do NOT include entries that just say "Changes" or "Updates"`;

        const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'system', content: 'You are a professional technical writer specializing in software changelogs for medical technology platforms. You write clear, user-focused release notes.' },
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

    const primaryCategory = Object.entries(commitsByCategory)
      .sort((a, b) => b[1].length - a[1].length)[0][0];

    const version = `${year}.${String(lastMonth.getMonth() + 1).padStart(2, '0')}.0`;
    const entryId = `changelog-${year}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
    const title = `${monthName} ${year} Release`;
    
    const description = generateSmartDescription(commitsByCategory, monthName, year);

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
          filteredOut: allCommits.length - commits.length,
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
          filteredOut: allCommits.length - commits.length,
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
