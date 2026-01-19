import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
  html_url: string;
}

interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  category: 'feature' | 'improvement' | 'bugfix' | 'documentation' | 'security';
  title: string;
  description: string;
  details?: string;
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

function categorizeCommit(message: string): 'feature' | 'improvement' | 'bugfix' | 'documentation' | 'security' {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('feat:') || lowerMessage.includes('feature:') || lowerMessage.includes('add ') || lowerMessage.includes('create ')) {
    return 'feature';
  }
  if (lowerMessage.includes('fix:') || lowerMessage.includes('bug:') || lowerMessage.includes('fixed ') || lowerMessage.includes('resolve')) {
    return 'bugfix';
  }
  if (lowerMessage.includes('docs:') || lowerMessage.includes('documentation') || lowerMessage.includes('readme')) {
    return 'documentation';
  }
  if (lowerMessage.includes('security') || lowerMessage.includes('auth') || lowerMessage.includes('rls') || lowerMessage.includes('vulnerability')) {
    return 'security';
  }
  return 'improvement';
}

function parseCommitMessage(message: string): { title: string; description: string } {
  const lines = message.split('\n').filter(line => line.trim());
  const title = lines[0].replace(/^(feat|fix|docs|chore|refactor|style|test|perf|ci|build|revert)(\(.+?\))?:\s*/i, '').trim();
  const description = lines.slice(1).join(' ').trim() || title;
  
  return { title, description };
}

function generateVersionNumber(date: string, existingVersions: Set<string>): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  
  let version = `${year}.${month}.0`;
  let counter = 0;
  
  while (existingVersions.has(version)) {
    counter++;
    version = `${year}.${month}.${counter}`;
  }
  
  existingVersions.add(version);
  return version;
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

function aggregateCommitMessages(commits: GitHubCommit[]): string[] {
  const messages: string[] = [];
  
  commits.forEach(commit => {
    if (isQualityCommit(commit.commit.message)) {
      const { title } = parseCommitMessage(commit.commit.message);
      if (title && title.length > 5) {
        messages.push(title);
      }
    }
  });
  
  return deduplicateEntries(messages);
}

function generateMonthlySummaries(commitsByMonth: Map<string, GitHubCommit[]>): ChangelogEntry[] {
  const summaries: ChangelogEntry[] = [];
  const sortedMonths = Array.from(commitsByMonth.keys()).sort().reverse();
  
  sortedMonths.forEach((monthKey) => {
    const monthCommits = commitsByMonth.get(monthKey)!;
    const [year, month] = monthKey.split('-');
    
    // Filter to quality commits only
    const qualityCommits = monthCommits.filter(c => isQualityCommit(c.commit.message));
    
    const categoryCommits: Record<string, GitHubCommit[]> = {
      feature: [],
      improvement: [],
      bugfix: [],
      documentation: [],
      security: [],
    };
    
    qualityCommits.forEach(commit => {
      const category = categorizeCommit(commit.commit.message);
      categoryCommits[category].push(commit);
    });
    
    // Generate details with categorized changes
    let details = '';
    
    if (categoryCommits.feature.length > 0) {
      details += `### 🚀 New Features\n`;
      aggregateCommitMessages(categoryCommits.feature).slice(0, 10).forEach(msg => {
        details += `- ${msg}\n`;
      });
      details += '\n';
    }
    
    if (categoryCommits.improvement.length > 0) {
      details += `### ✨ Improvements\n`;
      aggregateCommitMessages(categoryCommits.improvement).slice(0, 10).forEach(msg => {
        details += `- ${msg}\n`;
      });
      details += '\n';
    }
    
    if (categoryCommits.bugfix.length > 0) {
      details += `### 🐛 Bug Fixes\n`;
      aggregateCommitMessages(categoryCommits.bugfix).slice(0, 8).forEach(msg => {
        details += `- ${msg}\n`;
      });
      details += '\n';
    }
    
    if (categoryCommits.documentation.length > 0) {
      details += `### 📚 Documentation\n`;
      aggregateCommitMessages(categoryCommits.documentation).slice(0, 5).forEach(msg => {
        details += `- ${msg}\n`;
      });
      details += '\n';
    }
    
    if (categoryCommits.security.length > 0) {
      details += `### 🔒 Security\n`;
      aggregateCommitMessages(categoryCommits.security).slice(0, 5).forEach(msg => {
        details += `- ${msg}\n`;
      });
      details += '\n';
    }
    
    // Get month name
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[parseInt(month) - 1];
    
    // Generate smart description
    const categorizedMessages: Record<string, string[]> = {};
    Object.entries(categoryCommits).forEach(([cat, commits]) => {
      categorizedMessages[cat] = aggregateCommitMessages(commits);
    });
    
    const description = generateSmartDescription(categorizedMessages, monthName, parseInt(year));
    
    // Last day of month
    const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
    const date = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;
    
    summaries.push({
      id: `changelog-summary-${year}-${month}`,
      version: `${year}.${month}.0`,
      date,
      category: 'improvement',
      title: `${monthName} ${year} Release`,
      description,
      details: details.trim(),
    });
  });
  
  return summaries;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { owner, repo, since } = await req.json();

    if (!owner || !repo) {
      throw new Error('Repository owner and name are required');
    }

    console.log(`Fetching commits from ${owner}/${repo} since ${since || 'beginning'}`);

    let apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`;
    if (since) {
      apiUrl += `&since=${since}`;
    }

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Lovable-Changelog-Generator',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      throw new Error(`GitHub API error: ${response.status} ${errorText}`);
    }

    const allCommits: GitHubCommit[] = await response.json();
    
    // Filter to quality commits
    const commits = allCommits.filter(c => isQualityCommit(c.commit.message));
    console.log(`Fetched ${allCommits.length} commits, ${commits.length} quality commits`);

    // Group commits by month
    const commitsByMonth: Map<string, GitHubCommit[]> = new Map();
    
    commits.forEach(commit => {
      const date = new Date(commit.commit.author.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!commitsByMonth.has(monthKey)) {
        commitsByMonth.set(monthKey, []);
      }
      commitsByMonth.get(monthKey)!.push(commit);
    });

    console.log(`Grouped into ${commitsByMonth.size} months`);

    // Generate changelog entries
    const changelogEntries: ChangelogEntry[] = [];
    const existingVersions = new Set<string>();
    let entryCounter = 1;

    const sortedMonths = Array.from(commitsByMonth.keys()).sort().reverse();

    sortedMonths.forEach(monthKey => {
      const monthCommits = commitsByMonth.get(monthKey)!;
      
      const commitsByCategory: Map<string, GitHubCommit[]> = new Map();
      
      monthCommits.forEach(commit => {
        const category = categorizeCommit(commit.commit.message);
        if (!commitsByCategory.has(category)) {
          commitsByCategory.set(category, []);
        }
        commitsByCategory.get(category)!.push(commit);
      });

      commitsByCategory.forEach((categoryCommits, category) => {
        categoryCommits.forEach(commit => {
          const { title, description } = parseCommitMessage(commit.commit.message);
          const date = new Date(commit.commit.author.date);
          const version = generateVersionNumber(commit.commit.author.date, existingVersions);
          
          changelogEntries.push({
            id: `changelog-auto-${String(entryCounter).padStart(3, '0')}`,
            version,
            date: date.toISOString().split('T')[0],
            category: category as any,
            title,
            description,
            details: `Commit: ${commit.sha.substring(0, 7)} by ${commit.commit.author.name}\n\n${commit.html_url}`,
          });
          
          entryCounter++;
        });
      });
    });

    console.log(`Generated ${changelogEntries.length} changelog entries`);

    const monthlySummaries = generateMonthlySummaries(commitsByMonth);
    console.log(`Generated ${monthlySummaries.length} monthly summaries`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        entries: changelogEntries,
        summaries: monthlySummaries,
        totalCommits: commits.length,
        filteredOut: allCommits.length - commits.length,
        monthsProcessed: commitsByMonth.size,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error generating changelog:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
