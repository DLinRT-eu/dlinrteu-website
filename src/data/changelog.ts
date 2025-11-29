export type ChangelogCategory = 'feature' | 'improvement' | 'bugfix' | 'documentation' | 'security';

export interface ChangelogEntry {
  id: string;
  version: string;
  date: string; // YYYY-MM-DD format
  category: ChangelogCategory;
  title: string;
  description: string;
  details?: string; // Optional detailed markdown
  links?: {
    text: string;
    url: string;
  }[];
  author?: string;
}

export const changelogData: ChangelogEntry[] = [];

export const getChangelogByVersion = (version: string): ChangelogEntry[] => {
  return changelogData.filter(entry => entry.version === version);
};

export const getChangelogByCategory = (category: ChangelogCategory): ChangelogEntry[] => {
  return changelogData.filter(entry => entry.category === category);
};

export const getLatestChanges = (limit: number = 5): ChangelogEntry[] => {
  return changelogData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getAllVersions = (): string[] => {
  return [...new Set(changelogData.map(entry => entry.version))]
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
};

export const getCategoryLabel = (category: ChangelogCategory): string => {
  const labels: Record<ChangelogCategory, string> = {
    feature: 'New Feature',
    improvement: 'Improvement',
    bugfix: 'Bug Fix',
    documentation: 'Documentation',
    security: 'Security',
  };
  return labels[category];
};

export const getCategoryColor = (category: ChangelogCategory): string => {
  const colors: Record<ChangelogCategory, string> = {
    feature: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    improvement: 'bg-green-500/10 text-green-700 border-green-500/20',
    bugfix: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    documentation: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
    security: 'bg-red-500/10 text-red-700 border-red-500/20',
  };
  return colors[category];
};
