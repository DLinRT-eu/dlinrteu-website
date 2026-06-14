import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// The news manifest is generated at build time by scripts/generate-news-json.mjs
// from src/data/news.ts and published as a static asset on dlinrt.eu.
// This keeps the RSS feed automatically in sync with every news item added to
// the site, without requiring the edge function to import from src/.
const NEWS_JSON_URLS = [
  "https://dlinrt.eu/news.json",
  "https://www.dlinrt.eu/news.json",
  "https://dlinrteu-website.lovable.app/news.json",
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  content?: string;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toRFC822(dateString: string, fallback: string): string {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return fallback;
  return d.toUTCString();
}

async function loadNews(): Promise<NewsItem[]> {
  for (const url of NEWS_JSON_URLS) {
    try {
      const res = await fetch(url, { headers: { "cache-control": "no-cache" } });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data as NewsItem[];
    } catch (err) {
      console.error(`[rss-feed] failed to fetch ${url}:`, err);
    }
  }
  return [];
}

function generateRSSFeed(items: NewsItem[]): string {
  const baseUrl = "https://dlinrt.eu";
  const buildDate = new Date().toUTCString();

  const sorted = [...items].sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
  });

  const rssItems = sorted
    .map((item) => {
      const pubDate = toRFC822(item.date, buildDate);
      const guid = `${baseUrl}/news/${item.id}`;
      return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${guid}</link>
      <description>${escapeXml(item.summary)}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${guid}</guid>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Deep Learning in Radiotherapy News</title>
    <link>${baseUrl}</link>
    <description>Latest developments and announcements in deep learning for radiotherapy</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/functions/v1/rss-feed" rel="self" type="application/rss+xml"/>
    <managingEditor>info@dlinrt.eu (DLinRT Team)</managingEditor>
    <webMaster>info@dlinrt.eu (DLinRT Team)</webMaster>
    <category>Medical Technology</category>
    <category>Artificial Intelligence</category>
    <category>Radiotherapy</category>${rssItems}
  </channel>
</rss>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const items = await loadNews();
    const rssXml = generateRSSFeed(items);

    return new Response(rssXml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/rss+xml; charset=utf-8",
        // Short cache so newly published items propagate quickly.
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Error generating RSS feed", {
      status: 500,
      headers: corsHeaders,
    });
  }
});
