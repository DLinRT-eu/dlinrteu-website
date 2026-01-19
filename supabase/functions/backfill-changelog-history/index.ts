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
  if (lowerMessage.includes('feat') || lowerMessage.includes('add ') || lowerMessage.includes('new ') || lowerMessage.includes('create ')) {
    return 'feature';
  } else if (lowerMessage.includes('fix') || lowerMessage.includes('bug') || lowerMessage.includes('resolve')) {
    return 'bugfix';
  } else if (lowerMessage.includes('doc') || lowerMessage.includes('readme')) {
    return 'documentation';
  } else if (lowerMessage.includes('security') || lowerMessage.includes('auth') || lowerMessage.includes('rls')) {
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
  
  const featureThemes = extractThemes(categorized.feature || []);
  const improvementThemes = extractThemes(categorized.improvement || []);
  
  if (featureThemes.length > 0) {
    highlights.push(`new ${featureThemes.slice(0, 2).join(' and ')} features`);
  }
  if (improvementThemes.length > 0) {
    highlights.push(`enhanced ${improvementThemes.slice(0, 2).join(' and ')} capabilities`);
  }
  if ((categorized.bugfix || []).length > 3) {
    highlights.push('stability improvements');
  }
  if ((categorized.security || []).length > 0) {
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

    console.log('Starting changelog backfill from October 2025...');

    const githubToken = Deno.env.get('REPO_TOKEN');
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Supabase-Function',
    };
    
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }

    const startDate = new Date('2025-10-01T00:00:00Z');
    
    const repoUrl = `https://api.github.com/repos/DLinRT-eu/dlinrteu-website/commits?since=${startDate.toISOString()}&per_page=100`;
    console.log('Fetching commits from October 2025 to present...');
    
    const repoResponse = await fetch(repoUrl, { headers });
    
    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status}`);
    }

    const allCommits: GitHubCommit[] = await repoResponse.json();
    
    // Filter to quality commits only
    const commits = allCommits.filter(c => isQualityCommit(c.commit.message));
    console.log(`Fetched ${allCommits.length} commits, ${commits.length} quality commits`);

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
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

    for (const [monthKey, monthCommits] of commitsByMonth.entries()) {
      const [year, month] = monthKey.split('-');
      const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
      const entryDate = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;
      
      // Categorize commits
      const categorized: Record<string, string[]> = {
        feature: [],
        bugfix: [],
        security: [],
        improvement: [],
        documentation: [],
      };

      monthCommits.forEach(commit => {
        const category = categorizeCommit(commit.commit.message);
        const title = commit.commit.message.split('\n')[0]
          .replace(/^(feat|fix|docs|chore|refactor|style|test|perf|build|ci)(\(.+?\))?:\s*/i, '')
          .trim()
          .substring(0, 100);
        if (title && title.length > 5) {
          categorized[category].push(title);
        }
      });

      // Deduplicate each category
      Object.keys(categorized).forEach(cat => {
        categorized[cat] = deduplicateEntries(categorized[cat]);
      });

      // Generate raw details (fallback)
      const generateRawDetails = () => {
        let raw = '';
        
        if (categorized.feature.length > 0) {
          raw += `### 🚀 New Features\n`;
          categorized.feature.slice(0, 10).forEach(item => { raw += `- ${item}\n`; });
          raw += '\n';
        }
        if (categorized.improvement.length > 0) {
          raw += `### ✨ Improvements\n`;
          categorized.improvement.slice(0, 10).forEach(item => { raw += `- ${item}\n`; });
          raw += '\n';
        }
        if (categorized.bugfix.length > 0) {
          raw += `### 🐛 Bug Fixes\n`;
          categorized.bugfix.slice(0, 8).forEach(item => { raw += `- ${item}\n`; });
          raw += '\n';
        }
        if (categorized.documentation.length > 0) {
          raw += `### 📚 Documentation\n`;
          categorized.documentation.slice(0, 5).forEach(item => { raw += `- ${item}\n`; });
          raw += '\n';
        }
        if (categorized.security.length > 0) {
          raw += `### 🔒 Security\n`;
          categorized.security.slice(0, 5).forEach(item => { raw += `- ${item}\n`; });
          raw += '\n';
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
          
          const prompt = `You are a senior technical writer creating a changelog for DLinRT.eu, the authoritative European registry of AI/Deep Learning tools for radiotherapy.

Your audience: Medical physicists, radiation oncologists, and healthcare IT professionals.

**Your Task**: Transform these raw git commits into an engaging, professional changelog.

Raw commits by category:
${JSON.stringify(categorized, null, 2)}

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

      const monthName = monthNames[parseInt(month) - 1];
      const version = `${year}.${month}.0`;

      const entryId = `${monthKey}-backfill`;
      const title = `${monthName} ${year} Release`;
      const description = generateSmartDescription(categorized, monthName, parseInt(year));

      // Check if entry already exists
      const { data: existing } = await supabase
        .from('changelog_entries')
        .select('id')
        .eq('entry_id', entryId)
        .single();

      if (!existing) {
        const { error: insertError } = await supabase
          .from('changelog_entries')
          .insert({
            entry_id: entryId,
            version,
            date: entryDate,
            category: 'feature',
            title,
            description,
            details,
            status: 'published',
            published_at: new Date().toISOString(),
            auto_generated: true,
            github_data: {
              totalCommits: monthCommits.length,
              filteredOut: allCommits.filter(c => {
                const d = new Date(c.commit.author.date);
                const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                return k === monthKey && !isQualityCommit(c.commit.message);
              }).length,
              commitsByCategory: Object.fromEntries(
                Object.entries(categorized).map(([k, v]) => [k, v.length])
              ),
            },
          });

        if (insertError) {
          console.error(`Error inserting entry for ${monthKey}:`, insertError);
        } else {
          entriesCreated.push({ month: monthKey, version, commits: monthCommits.length, title });
          console.log(`Created changelog entry for ${monthKey}`);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Backfill complete. Created ${entriesCreated.length} changelog entries.`,
        entries: entriesCreated,
        stats: {
          totalCommits: commits.length,
          filteredOut: allCommits.length - commits.length,
        },
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
