
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { generateNewsJson } from "./scripts/generate-news-json.mjs";

// Regenerates public/news.json from src/data/news.ts so the RSS edge function
// (which cannot import from src/) always serves the full, up-to-date list.
function newsJsonPlugin() {
  let ran = false;
  const run = async () => {
    try {
      const { count } = await generateNewsJson();
      console.log(`[news-json] synced ${count} items to public/news.json`);
    } catch (err) {
      console.error("[news-json] generation failed:", err);
    }
  };
  return {
    name: "dlinrt-news-json",
    async buildStart() {
      if (ran) return;
      ran = true;
      await run();
    },
    async configureServer() {
      await run();
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "7e82abf4-4ab2-47b7-8256-c0abaf5b5420.lovableproject.com",
      "dlinrt.eu",
      "www.dlinrt.eu"
    ],
  },
  plugins: [
    react(),
    newsJsonPlugin(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },
  build: {
    sourcemap: 'hidden',
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
}));
