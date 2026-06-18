
export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  content?: string; // Markdown content
  linkedinPostUrl?: string; // URL of the corresponding LinkedIn post, once published
}
