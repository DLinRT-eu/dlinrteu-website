#!/usr/bin/env bun
// Generates the June 2026 newsletter deck:
//   public/newsletters/2026-06/dlinrt-2026-06-update.pptx
//   public/newsletters/2026-06/dlinrt-2026-06-update.pdf
//   public/newsletters/2026-06/slide-01.jpg ... slide-NN.jpg
//
// Run with: bun scripts/generate-newsletter-deck-2026-06.mjs
import pptxgen from "pptxgenjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { ALL_PRODUCTS } from "../src/data/index.ts";
import { COMPANIES } from "../src/data/companies/index.ts";

const OUT_DIR = "public/newsletters/2026-06";
fs.mkdirSync(OUT_DIR, { recursive: true });

const ACCENT = "5090D0";
const TEXT = "1A1A2E";
const MUTED = "6B7280";
const BG = "FFFFFF";
const FONT_H = "Calibri";
const FONT_B = "Calibri";

const SITE_URL = "https://dlinrt.eu";
const LINKEDIN_URL = "https://www.linkedin.com/company/dlinrt-eu/";
const TODAY = "2026-06-16";

const LOGO_PATH = path.join(OUT_DIR, "_assets/dlinrt-logo.png");
const LINKEDIN_PATH = path.join(OUT_DIR, "_assets/linkedin.png");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
const W = 13.333, H = 7.5;

// ---------- Footer on every slide ----------
function addFooter(s, { darkBg = false } = {}) {
  const fy = H - 0.38;
  const color = darkBg ? "CADCFC" : MUTED;
  const linkColor = darkBg ? "FFFFFF" : ACCENT;
  // Logo + site link (left) — keep aspect ratio (logo is ~3.46:1)
  const logoH = 0.28, logoW = 0.28 * 3.46;
  if (fs.existsSync(LOGO_PATH)) {
    s.addImage({
      path: LOGO_PATH, x: 0.3, y: fy + (0.3 - logoH) / 2, w: logoW, h: logoH,
      sizing: { type: "contain", w: logoW, h: logoH },
      hyperlink: { url: SITE_URL, tooltip: "dlinrt.eu" },
    });
  }
  // Date + CC-BY (centre)
  s.addText(
    [
      { text: TODAY + "  ·  ", options: { color } },
      { text: "CC BY 4.0", options: { hyperlink: { url: "https://creativecommons.org/licenses/by/4.0/" }, color: linkColor } },
    ],
    { x: 3.0, y: fy, w: W - 6.0, h: 0.3, fontFace: FONT_B, fontSize: 11, align: "center", valign: "middle" }
  );
  // LinkedIn icon (right)
  if (fs.existsSync(LINKEDIN_PATH)) {
    s.addImage({
      path: LINKEDIN_PATH, x: W - 0.55, y: fy - 0.02, w: 0.32, h: 0.32,
      sizing: { type: "contain", w: 0.32, h: 0.32 },
      hyperlink: { url: LINKEDIN_URL, tooltip: "DLinRT on LinkedIn" },
    });
  }
}

// ---------- Slide 1: Cover ----------
{
  const s = pres.addSlide();
  s.background = { color: TEXT };
  s.addShape("rect", { x: 0, y: H - 0.55, w: W, h: 0.03, fill: { color: ACCENT }, line: { color: ACCENT } });
  s.addText(
    [{ text: "DLinRT.eu", options: { hyperlink: { url: SITE_URL }, color: "FFFFFF" } }],
    { x: 0.6, y: 1.0, w: W - 1.2, h: 1.0, fontFace: FONT_H, fontSize: 60, bold: true }
  );
  s.addText("Second round complete · Evidence on 3 axes · Certification opens", {
    x: 0.6, y: 2.2, w: W - 1.2, h: 1.4, fontFace: FONT_H, fontSize: 32, color: ACCENT, bold: true,
  });
  s.addText(
    "June 2026 update — refreshed catalogue, new evidence system, first certified company, new reviewer, MAIRT @ MICCAI.",
    { x: 0.6, y: 4.0, w: W - 1.2, h: 1.4, fontFace: FONT_B, fontSize: 22, color: "CADCFC" }
  );
  addFooter(s, { darkBg: true });
}

// ---------- Slide 2: Cumulative product timeline ----------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addText(
    [{ text: "Cumulative products in the catalogue", options: { hyperlink: { url: SITE_URL + "/products" }, color: TEXT } }],
    { x: 0.6, y: 0.4, w: W - 1.2, h: 0.7, fontFace: FONT_H, fontSize: 30, bold: true }
  );
  s.addText("Based on declared product release dates · n = " + ALL_PRODUCTS.length + " products total", {
    x: 0.6, y: 1.05, w: W - 1.2, h: 0.4, fontFace: FONT_B, fontSize: 14, color: MUTED,
  });

  const years = ALL_PRODUCTS
    .map((p) => {
      const d = p.releaseDate;
      if (!d) return null;
      const m = String(d).match(/^(\d{4})/);
      return m ? parseInt(m[1], 10) : null;
    })
    .filter((y) => y && y >= 2010 && y <= 2026);
  const minY = Math.min(...years), maxY = Math.max(...years);
  const counts = {};
  for (let y = minY; y <= maxY; y++) counts[y] = 0;
  years.forEach((y) => counts[y]++);
  let cum = 0;
  const labels = [], values = [];
  for (let y = minY; y <= maxY; y++) {
    cum += counts[y];
    labels.push(String(y));
    values.push(cum);
  }
  s.addChart(pres.ChartType.area, [{ name: "Cumulative products", labels, values }], {
    x: 0.6, y: 1.6, w: W - 1.2, h: 5.0,
    chartColors: [ACCENT],
    showLegend: false, showTitle: false,
    catAxisLabelFontSize: 14, catAxisLabelColor: TEXT,
    valAxisLabelFontSize: 14, valAxisLabelColor: TEXT,
    lineDataSymbol: "circle",
  });
  addFooter(s);
}

// ---------- Slide 3: Primary category pie ----------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addText(
    [{ text: "Products by primary category", options: { hyperlink: { url: SITE_URL + "/products" }, color: TEXT } }],
    { x: 0.6, y: 0.4, w: W - 1.2, h: 0.7, fontFace: FONT_H, fontSize: 30, bold: true }
  );
  s.addText("n = " + ALL_PRODUCTS.length + " products · primary category only · click a category to browse", {
    x: 0.6, y: 1.05, w: W - 1.2, h: 0.4, fontFace: FONT_B, fontSize: 14, color: MUTED,
  });

  const cats = {};
  ALL_PRODUCTS.forEach((p) => { cats[p.category] = (cats[p.category] || 0) + 1; });
  const entries = Object.entries(cats).sort((a, b) => b[1] - a[1]);
  const palette = ["5090D0", "1A1A2E", "7DB9E8", "F59E0B", "10B981", "EF4444", "8B5CF6", "0EA5E9", "EC4899", "64748B"];

  s.addChart(
    pres.ChartType.doughnut,
    [{ name: "Category", labels: entries.map(([k]) => k), values: entries.map(([, v]) => v) }],
    {
      x: 0.6, y: 1.5, w: 7.5, h: 5.2,
      chartColors: palette.slice(0, entries.length),
      showLegend: true, legendPos: "r", legendFontSize: 14, legendColor: TEXT,
      showPercent: true, dataLabelColor: "FFFFFF", dataLabelFontSize: 12, dataLabelFontBold: true,
      holeSize: 55,
    }
  );
  // Sidebar list with hyperlinked category names
  const slug = (k) => k.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  let ly = 1.6;
  entries.forEach(([k, v]) => {
    s.addText(
      [
        { text: k, options: { hyperlink: { url: `${SITE_URL}/products?category=${encodeURIComponent(k)}` }, color: ACCENT, bold: true } },
        { text: `: ${v}`, options: { color: TEXT } },
      ],
      { x: 8.6, y: ly, w: 4.2, h: 0.35, fontFace: FONT_B, fontSize: 15 }
    );
    ly += 0.42;
  });
  addFooter(s);
}

// ---------- Slide 4: Company logos wall ----------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addText(
    [{ text: "Companies in the DLinRT.eu catalogue", options: { hyperlink: { url: SITE_URL + "/companies" }, color: TEXT } }],
    { x: 0.6, y: 0.3, w: W - 1.2, h: 0.6, fontFace: FONT_H, fontSize: 26, bold: true }
  );
  s.addText(COMPANIES.length + " active companies · click any logo to open its page", {
    x: 0.6, y: 0.85, w: W - 1.2, h: 0.35, fontFace: FONT_B, fontSize: 13, color: MUTED,
  });

  const cols = 7;
  const rows = Math.ceil(COMPANIES.length / cols);
  const gridX = 0.4, gridY = 1.3;
  const gridW = W - 0.8, gridH = H - gridY - 0.7; // leave room for footer
  const cellW = gridW / cols, cellH = gridH / rows;
  const pad = 0.12;
  const logoW = cellW - pad * 2;
  const logoH = cellH - pad * 2 - 0.3;

  const SVG_CACHE = path.join(OUT_DIR, "_logo-cache");
  COMPANIES.forEach((c, i) => {
    const r = Math.floor(i / cols), col = i % cols;
    const x = gridX + col * cellW, y = gridY + r * cellH;
    const companyUrl = `${SITE_URL}/companies/${c.id || c.slug || encodeURIComponent(c.name)}`;
    let placed = false;
    let logoPath = c.logoUrl ? path.join("public", c.logoUrl.replace(/^\//, "")) : null;
    if (logoPath && logoPath.endsWith(".svg")) {
      const cached = path.join(SVG_CACHE, path.basename(logoPath).replace(/\.svg$/, ".png"));
      logoPath = fs.existsSync(cached) ? cached : null;
    }
    if (logoPath && fs.existsSync(logoPath)) {
      try {
        s.addImage({
          path: logoPath, x: x + pad, y: y + pad, w: logoW, h: logoH,
          sizing: { type: "contain", w: logoW, h: logoH },
          hyperlink: { url: companyUrl, tooltip: c.name },
        });
        placed = true;
      } catch {}
    }
    if (!placed) {
      s.addShape("rect", { x: x + pad, y: y + pad, w: logoW, h: logoH, fill: { color: "F3F4F6" }, line: { color: "E5E7EB" } });
    }
    s.addText(
      [{ text: c.name, options: { hyperlink: { url: companyUrl }, color: TEXT } }],
      { x: x + pad, y: y + pad + logoH, w: logoW, h: 0.28, fontFace: FONT_B, fontSize: 9, align: "center", valign: "middle" }
    );
  });
  addFooter(s);
}

// ---------- Slide 5: Support, Transparency & People ----------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addShape("rect", { x: 0, y: 0, w: 0.25, h: H, fill: { color: ACCENT }, line: { color: ACCENT } });
  s.addText(
    [{ text: "Support, Transparency & People", options: { hyperlink: { url: SITE_URL + "/transparency" }, color: TEXT } }],
    { x: 0.7, y: 0.35, w: W - 1.4, h: 0.7, fontFace: FONT_H, fontSize: 30, bold: true }
  );

  s.addText("UMC Utrecht backs the platform", {
    x: 0.7, y: 1.15, w: W - 1.4, h: 0.45, fontFace: FONT_H, fontSize: 20, bold: true, color: ACCENT,
  });
  s.addText(
    "Through the Radiotherapy Medical Physics Traineeship, UMC Utrecht has agreed to cover the running costs of DLinRT.eu — safeguarding the independence and continuity of the initiative. A huge thank you to the Radiotherapy Department for this support.",
    { x: 0.7, y: 1.6, w: W - 1.4, h: 1.4, fontFace: FONT_B, fontSize: 16, color: TEXT, paraSpaceAfter: 6 }
  );

  s.addText("Running costs, in the open", {
    x: 0.7, y: 3.05, w: W - 1.4, h: 0.45, fontFace: FONT_H, fontSize: 20, bold: true, color: ACCENT,
  });
  s.addText(
    [
      { text: "We publish our running costs and keep them up to date at ", options: { color: TEXT } },
      { text: "dlinrt.eu/transparency", options: { hyperlink: { url: SITE_URL + "/transparency" }, color: ACCENT, bold: true } },
      { text: ".", options: { color: TEXT } },
    ],
    { x: 0.7, y: 3.5, w: W - 1.4, h: 0.5, fontFace: FONT_B, fontSize: 16 }
  );

  s.addText("Welcome Szabolcs David · thanks to all 12 reviewers", {
    x: 0.7, y: 4.1, w: W - 1.4, h: 0.45, fontFace: FONT_H, fontSize: 20, bold: true, color: ACCENT,
  });
  s.addText(
    [
      { text: "A warm welcome to Szabolcs David, who joins the reviewer team. Huge thanks to all 12 reviewers keeping the catalogue trustworthy — full list on the ", options: { color: TEXT } },
      { text: "About page", options: { hyperlink: { url: SITE_URL + "/about" }, color: ACCENT, bold: true } },
      { text: ".", options: { color: TEXT } },
    ],
    { x: 0.7, y: 4.55, w: W - 1.4, h: 0.9, fontFace: FONT_B, fontSize: 16 }
  );

  s.addText("Errare humanum est", {
    x: 0.7, y: 5.55, w: W - 1.4, h: 0.45, fontFace: FONT_H, fontSize: 20, bold: true, italic: true, color: ACCENT,
  });
  s.addText(
    [
      { text: "We strive for accuracy and, alongside the AI tooling, we still value human revision. If you spot an imprecision or error, please ", options: { color: TEXT } },
      { text: "reach out", options: { hyperlink: { url: SITE_URL + "/support" }, color: ACCENT, bold: true } },
      { text: " — we will take action.", options: { color: TEXT } },
    ],
    { x: 0.7, y: 6.0, w: W - 1.4, h: 0.8, fontFace: FONT_B, fontSize: 16 }
  );
  addFooter(s);
}

// ---------- Slide 6: What's next ----------
{
  const s = pres.addSlide();
  s.background = { color: TEXT };
  s.addShape("rect", { x: 0, y: 0, w: 0.25, h: H, fill: { color: ACCENT }, line: { color: ACCENT } });
  s.addText("What's next", { x: 0.7, y: 0.4, w: W - 1.4, h: 0.8, fontFace: FONT_H, fontSize: 36, bold: true, color: "FFFFFF" });

  const items = [
    {
      h: "Certification round opens",
      url: SITE_URL + "/companies",
      body: [
        { text: "Manufacturers can now certify their product listings. ", options: { color: "CADCFC" } },
        { text: "Synaptiq", options: { hyperlink: { url: SITE_URL + "/companies/synaptiq" }, color: "FFFFFF", bold: true } },
        { text: " — first certified, two CE-marked products. Congratulations.", options: { color: "CADCFC" } },
      ],
    },
    {
      h: "MAIRT @ MICCAI · Oct 1, 2026",
      url: "https://miart-workshop.github.io/",
      body: [
        { text: "First fully dedicated radiotherapy satellite event at MICCAI, Strasbourg. ", options: { color: "CADCFC" } },
        { text: "miart-workshop.github.io", options: { hyperlink: { url: "https://miart-workshop.github.io/" }, color: "FFFFFF", bold: true } },
      ],
    },
    {
      h: "Next review round · Nov 1 → Dec 15, 2026",
      url: SITE_URL + "/support",
      body: [
        { text: "We are looking for more reviewers — many hands make the workload lighter. ", options: { color: "CADCFC" } },
        { text: "Get in touch", options: { hyperlink: { url: SITE_URL + "/support" }, color: "FFFFFF", bold: true } },
        { text: ".", options: { color: "CADCFC" } },
      ],
    },
    {
      h: "3-axis evidence system live",
      url: SITE_URL + "/dashboard",
      body: [
        { text: "Browse the Evidence Matrix to see how the catalogue distributes across rigor (E0–E3) and impact (I0–I5): ", options: { color: "CADCFC" } },
        { text: "dlinrt.eu/dashboard", options: { hyperlink: { url: SITE_URL + "/dashboard" }, color: "FFFFFF", bold: true } },
        { text: ".", options: { color: "CADCFC" } },
      ],
    },
  ];
  items.forEach((it, i) => {
    const y = 1.5 + i * 1.25;
    s.addText(
      [{ text: it.h, options: { hyperlink: { url: it.url }, color: ACCENT, bold: true } }],
      { x: 0.7, y, w: W - 1.4, h: 0.45, fontFace: FONT_H, fontSize: 20 }
    );
    s.addText(it.body, {
      x: 0.7, y: y + 0.45, w: W - 1.4, h: 0.7, fontFace: FONT_B, fontSize: 15,
    });
  });
  addFooter(s, { darkBg: true });
}

const pptxPath = path.join(OUT_DIR, "dlinrt-2026-06-update.pptx");
await pres.writeFile({ fileName: pptxPath });
console.log("Wrote", pptxPath);

// Convert to PDF + per-slide JPEGs
try {
  // Clean any old slide-*.jpg
  fs.readdirSync(OUT_DIR).filter((f) => /^slide-\d+\.jpg$/.test(f)).forEach((f) => fs.unlinkSync(path.join(OUT_DIR, f)));
  execSync(`soffice --headless --convert-to pdf --outdir ${OUT_DIR} ${pptxPath}`, { stdio: "inherit" });
  const pdfPath = path.join(OUT_DIR, "dlinrt-2026-06-update.pdf");
  execSync(`pdftoppm -jpeg -r 120 ${pdfPath} ${path.join(OUT_DIR, "slide")}`, { stdio: "inherit" });
  fs.readdirSync(OUT_DIR)
    .filter((f) => /^slide-\d+\.jpg$/.test(f))
    .forEach((f) => {
      const n = parseInt(f.match(/^slide-(\d+)\.jpg$/)[1], 10);
      const padded = `slide-${String(n).padStart(2, "0")}.jpg`;
      if (f !== padded) fs.renameSync(path.join(OUT_DIR, f), path.join(OUT_DIR, padded));
    });
  console.log("Wrote PDF + slide-*.jpg in", OUT_DIR);
} catch (e) {
  console.error("PDF/JPEG conversion failed:", e.message);
}
