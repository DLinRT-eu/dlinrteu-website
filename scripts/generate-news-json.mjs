// Generates public/news.json from src/data/news.ts so the RSS edge function
// (which cannot import from src/) always has the full, up-to-date news list.
//
// Used both standalone (`node scripts/generate-news-json.mjs`) and from the
// Vite plugin in vite.config.ts.
import { build } from "esbuild";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

export async function generateNewsJson() {
  const entry = path.join(projectRoot, "src/data/news.ts");
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "dlinrt-news-"));
  const outfile = path.join(tmpDir, "news.mjs");

  await build({
    entryPoints: [entry],
    bundle: true,
    format: "esm",
    platform: "neutral",
    target: "es2020",
    outfile,
    logLevel: "silent",
    alias: { "@": path.join(projectRoot, "src") },
    // News files only import the NewsItem TYPE from "@/types/news",
    // which esbuild strips automatically.
  });

  const mod = await import(pathToFileURL(outfile).href);
  const items = mod.NEWS_ITEMS ?? [];

  const outPath = path.join(projectRoot, "public/news.json");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(items, null, 2) + "\n", "utf8");

  await fs.rm(tmpDir, { recursive: true, force: true });
  return { count: items.length, outPath };
}

// Run directly: `node scripts/generate-news-json.mjs`
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateNewsJson()
    .then(({ count, outPath }) => {
      console.log(`[news-json] wrote ${count} items -> ${path.relative(projectRoot, outPath)}`);
    })
    .catch((err) => {
      console.error("[news-json] failed:", err);
      process.exit(1);
    });
}
