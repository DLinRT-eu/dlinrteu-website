#!/usr/bin/env bun
// Generates the June 2026 newsletter deck:
//   public/newsletters/2026-06/dlinrt-2026-06-update.pptx
//   public/newsletters/2026-06/dlinrt-2026-06-update.pdf
//   public/newsletters/2026-06/slide-01.jpg ... slide-05.jpg
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

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
const W = 13.333, H = 7.5;

// ---------- Slide 1: Cover ----------
{
  const s = pres.addSlide();
  s.background = { color: TEXT };
  s.addShape("rect", { x: 0, y: H - 0.18, w: W, h: 0.18, fill: { color: ACCENT }, line: { color: ACCENT } });
  s.addText("DLinRT.eu", { x: 0.6, y: 1.0, w: W - 1.2, h: 1.0, fontFace: FONT_H, fontSize: 60, bold: true, color: "FFFFFF" });
  s.addText("Second round complete · Evidence on 3 axes · Certification opens", {
    x: 0.6, y: 2.2, w: W - 1.2, h: 1.4, fontFace: FONT_H, fontSize: 32, color: ACCENT, bold: true,
  });
  s.addText(
    "June 2026 update — refreshed catalogue, new evidence system, first certified company, new reviewer, MAIRT @ MICCAI.",
    { x: 0.6, y: 4.0, w: W - 1.2, h: 1.4, fontFace: FONT_B, fontSize: 22, color: "CADCFC" }
  );
  s.addText("dlinrt.eu  ·  2026-06-16", { x: 0.6, y: H - 0.9, w: W - 1.2, h: 0.4, fontFace: FONT_B, fontSize: 14, color: "CADCFC" });
}

// ---------- Slide 2: Cumulative product timeline ----------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addText("Cumulative products in the catalogue", { x: 0.6, y: 0.4, w: W - 1.2, h: 0.7, fontFace: FONT_H, fontSize: 30, bold: true, color: TEXT });
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
    x: 0.6, y: 1.6, w: W - 1.2, h: 5.4,
    chartColors: [ACCENT],
    showLegend: false,
    showTitle: false,
    catAxisLabelFontSize: 14, catAxisLabelColor: TEXT,
    valAxisLabelFontSize: 14, valAxisLabelColor: TEXT,
    lineDataSymbol: "circle",
  });
}

// ---------- Slide 3: Primary category pie ----------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addText("Products by primary category", { x: 0.6, y: 0.4, w: W - 1.2, h: 0.7, fontFace: FONT_H, fontSize: 30, bold: true, color: TEXT });
  s.addText("n = " + ALL_PRODUCTS.length + " products · primary category only", { x: 0.6, y: 1.05, w: W - 1.2, h: 0.4, fontFace: FONT_B, fontSize: 14, color: MUTED });

  const cats = {};
  ALL_PRODUCTS.forEach((p) => { cats[p.category] = (cats[p.category] || 0) + 1; });
  const entries = Object.entries(cats).sort((a, b) => b[1] - a[1]);
  const palette = ["5090D0", "1A1A2E", "7DB9E8", "F59E0B", "10B981", "EF4444", "8B5CF6", "0EA5E9", "EC4899", "64748B"];

  s.addChart(
    pres.ChartType.doughnut,
    [{ name: "Category", labels: entries.map(([k]) => k), values: entries.map(([, v]) => v) }],
    {
      x: 0.6, y: 1.5, w: 7.5, h: 5.6,
      chartColors: palette.slice(0, entries.length),
      showLegend: true, legendPos: "r", legendFontSize: 14, legendColor: TEXT,
      showPercent: true, dataLabelColor: "FFFFFF", dataLabelFontSize: 12, dataLabelFontBold: true,
      holeSize: 55,
    }
  );
  // Sidebar list with counts
  const list = entries.map(([k, v]) => `${k}: ${v}`).join("\n");
  s.addText(list, { x: 8.6, y: 1.6, w: 4.2, h: 5.4, fontFace: FONT_B, fontSize: 16, color: TEXT, lineSpacingMultiple: 1.4 });
}

// ---------- Slide 4: Company logos wall ----------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addText("Companies in the DLinRT.eu catalogue", { x: 0.6, y: 0.3, w: W - 1.2, h: 0.6, fontFace: FONT_H, fontSize: 26, bold: true, color: TEXT });
  s.addText(COMPANIES.length + " active companies", { x: 0.6, y: 0.85, w: W - 1.2, h: 0.35, fontFace: FONT_B, fontSize: 13, color: MUTED });

  const cols = 7;
  const rows = Math.ceil(COMPANIES.length / cols);
  const gridX = 0.4, gridY = 1.3;
  const gridW = W - 0.8, gridH = H - gridY - 0.3;
  const cellW = gridW / cols, cellH = gridH / rows;
  const pad = 0.12;
  const logoW = cellW - pad * 2;
  const logoH = cellH - pad * 2 - 0.3; // reserve 0.3 for name

  const SVG_CACHE = path.join(OUT_DIR, "_logo-cache");
  COMPANIES.forEach((c, i) => {
    const r = Math.floor(i / cols), col = i % cols;
    const x = gridX + col * cellW, y = gridY + r * cellH;
    let placed = false;
    let logoPath = c.logoUrl ? path.join("public", c.logoUrl.replace(/^\//, "")) : null;
    if (logoPath && logoPath.endsWith(".svg")) {
      const cached = path.join(SVG_CACHE, path.basename(logoPath).replace(/\.svg$/, ".png"));
      if (fs.existsSync(cached)) logoPath = cached;
      else logoPath = null;
    }
    if (logoPath && fs.existsSync(logoPath)) {
      try {
        s.addImage({ path: logoPath, x: x + pad, y: y + pad, w: logoW, h: logoH, sizing: { type: "contain", w: logoW, h: logoH } });
        placed = true;
      } catch {}
    }
    if (!placed) {
      s.addShape("rect", { x: x + pad, y: y + pad, w: logoW, h: logoH, fill: { color: "F3F4F6" }, line: { color: "E5E7EB" } });
    }
    s.addText(c.name, {
      x: x + pad, y: y + pad + logoH, w: logoW, h: 0.28,
      fontFace: FONT_B, fontSize: 9, color: TEXT, align: "center", valign: "middle",
    });
  });
}

// ---------- Slide 5: Support & Transparency ----------
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addShape("rect", { x: 0, y: 0, w: 0.25, h: H, fill: { color: ACCENT }, line: { color: ACCENT } });
  s.addText("Support & Transparency", { x: 0.7, y: 0.4, w: W - 1.4, h: 0.8, fontFace: FONT_H, fontSize: 32, bold: true, color: TEXT });

  s.addText("UMC Utrecht backs the platform", {
    x: 0.7, y: 1.4, w: W - 1.4, h: 0.5, fontFace: FONT_H, fontSize: 22, bold: true, color: ACCENT,
  });
  s.addText(
    "Through the Radiotherapy Medical Physics Traineeship, UMC Utrecht has agreed to cover the running costs of DLinRT.eu — safeguarding the independence and continuity of the initiative. A huge thank you to the Radiotherapy Department for this support.",
    { x: 0.7, y: 1.9, w: W - 1.4, h: 1.6, fontFace: FONT_B, fontSize: 18, color: TEXT, paraSpaceAfter: 6 }
  );

  s.addText("Running costs, in the open", {
    x: 0.7, y: 3.7, w: W - 1.4, h: 0.5, fontFace: FONT_H, fontSize: 22, bold: true, color: ACCENT,
  });
  s.addText(
    "We publish our running costs and will keep them up to date at dlinrt.eu/transparency.",
    { x: 0.7, y: 4.2, w: W - 1.4, h: 0.8, fontFace: FONT_B, fontSize: 18, color: TEXT }
  );

  s.addText("Errare humanum est", {
    x: 0.7, y: 5.3, w: W - 1.4, h: 0.5, fontFace: FONT_H, fontSize: 22, bold: true, italic: true, color: ACCENT,
  });
  s.addText(
    "We strive for accuracy and, alongside the AI tooling, we still value human revision. If you spot an imprecision or error, please reach out — we will take action.",
    { x: 0.7, y: 5.8, w: W - 1.4, h: 1.2, fontFace: FONT_B, fontSize: 18, color: TEXT }
  );
}

// ---------- Slide 6: What's next ----------
{
  const s = pres.addSlide();
  s.background = { color: TEXT };
  s.addShape("rect", { x: 0, y: 0, w: 0.25, h: H, fill: { color: ACCENT }, line: { color: ACCENT } });
  s.addText("What's next", { x: 0.7, y: 0.4, w: W - 1.4, h: 0.8, fontFace: FONT_H, fontSize: 36, bold: true, color: "FFFFFF" });

  const items = [
    { h: "Certification round opens", b: "Manufacturers can now certify their product listings. Synaptiq — first certified, two CE-marked products. Congratulations." },
    { h: "MAIRT @ MICCAI · Oct 1, 2026", b: "First fully dedicated radiotherapy satellite event at MICCAI, Strasbourg. miart-workshop.github.io" },
    { h: "Next review round · Nov 1 → Dec 15, 2026", b: "We are looking for more reviewers — many hands make the workload lighter." },
    { h: "Welcome Szabolcs David", b: "New reviewer on board. Thanks to all 12 reviewers — full list on dlinrt.eu/about." },
  ];
  items.forEach((it, i) => {
    const y = 1.5 + i * 1.35;
    s.addText(it.h, { x: 0.7, y, w: W - 1.4, h: 0.45, fontFace: FONT_H, fontSize: 20, bold: true, color: ACCENT });
    s.addText(it.b, { x: 0.7, y: y + 0.45, w: W - 1.4, h: 0.75, fontFace: FONT_B, fontSize: 16, color: "CADCFC" });
  });
}

const pptxPath = path.join(OUT_DIR, "dlinrt-2026-06-update.pptx");
await pres.writeFile({ fileName: pptxPath });
console.log("Wrote", pptxPath);

// Convert to PDF + per-slide JPEGs
try {
  execSync(`soffice --headless --convert-to pdf --outdir ${OUT_DIR} ${pptxPath}`, { stdio: "inherit" });
  const pdfPath = path.join(OUT_DIR, "dlinrt-2026-06-update.pdf");
  execSync(`pdftoppm -jpeg -r 120 ${pdfPath} ${path.join(OUT_DIR, "slide")}`, { stdio: "inherit" });
  // Normalize to zero-padded slide-0N.jpg
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
