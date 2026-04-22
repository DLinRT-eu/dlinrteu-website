#!/usr/bin/env node
/**
 * Generates the two ESTRO 2026 flyer PDFs into public/flyers/.
 *
 * Run from project root:
 *   node scripts/generate-estro-flyers.mjs
 *
 * Requires `pdfkit` and `qrcode`:
 *   npm install --no-save pdfkit qrcode
 */
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.resolve(ROOT, "public", "flyers");
const FONT_REG = path.resolve(__dirname, "assets", "Roboto-Regular.ttf");
const FONT_BOLD = path.resolve(__dirname, "assets", "Roboto-Bold.ttf");

// Brand
const PRIMARY = "#5090D0";
const PRIMARY_DARK = "#2E6BA8";
const PRIMARY_DEEP = "#1F4E7E";
const ACCENT = "#1a1a2e";
const MUTED = "#475569";
const SUCCESS = "#16a34a";
const BG_SOFT = "#EAF2FB";
const BG_TINT = "#F5F9FD";

const SITE_URL = "https://dlinrt.eu";
const COMPANY_REG_URL = "https://dlinrt.eu/auth?role=company";
const COMMUNITY_REG_URL = "https://dlinrt.eu/auth";

// A4
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 32;

function registerFonts(doc) {
  doc.registerFont("Body", FONT_REG);
  doc.registerFont("BodyBold", FONT_BOLD);
}

async function qrPng(text, opts = {}) {
  return await QRCode.toBuffer(text, {
    margin: 1,
    width: opts.width ?? 400,
    color: { dark: opts.dark ?? ACCENT, light: opts.light ?? "#ffffff" },
  });
}

// ---------- platform stats ----------

function countProducts() {
  const dir = path.join(ROOT, "src", "data", "products");
  const exclude = new Set(["archived", "examples", "pipeline"]);
  const cats = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !exclude.has(e.name));
  let total = 0;
  for (const c of cats) {
    const files = fs
      .readdirSync(path.join(dir, c.name))
      .filter((f) => f.endsWith(".ts") && f !== "index.ts");
    total += files.length;
  }
  // Add the flat clinical-prediction.ts as one category
  const flat = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
  total += flat.length;
  return { products: total, categories: cats.length + flat.length };
}

function countCompanies() {
  const dir = path.join(ROOT, "src", "data", "companies");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts");
  let total = 0;
  for (const f of files) {
    const txt = fs.readFileSync(path.join(dir, f), "utf8");
    const matches = txt.match(/^\s*\{\s*$/gm) || [];
    // Fallback: count "id:" entries at column starting with whitespace
    const idMatches = txt.match(/^\s{2,}id:\s*["'`]/gm) || [];
    total += Math.max(idMatches.length, matches.length);
  }
  return total;
}

// ---------- icons (vector) ----------
// Each icon: 60x60 inside a soft tinted square.
function iconBox(doc, x, y, size = 60) {
  doc.roundedRect(x, y, size, size, 10).fill(BG_SOFT);
}

function drawIcon(doc, name, x, y, size = 60) {
  iconBox(doc, x, y, size);
  const cx = x + size / 2;
  const cy = y + size / 2;
  const s = size; // shorthand
  doc.save();
  doc.lineWidth(2.4).strokeColor(PRIMARY_DARK).fillColor(PRIMARY_DARK);

  switch (name) {
    case "tag": {
      // Price-tag shape
      doc
        .moveTo(x + s * 0.18, y + s * 0.36)
        .lineTo(x + s * 0.5, y + s * 0.18)
        .lineTo(x + s * 0.82, y + s * 0.5)
        .lineTo(x + s * 0.5, y + s * 0.82)
        .lineTo(x + s * 0.18, y + s * 0.5)
        .closePath()
        .stroke();
      doc.circle(x + s * 0.36, y + s * 0.4, 2.6).fill();
      break;
    }
    case "doc-check": {
      // Document with check
      doc.roundedRect(x + s * 0.24, y + s * 0.18, s * 0.44, s * 0.6, 3).stroke();
      doc.lineWidth(1.6);
      doc.moveTo(x + s * 0.32, y + s * 0.36).lineTo(x + s * 0.6, y + s * 0.36).stroke();
      doc.moveTo(x + s * 0.32, y + s * 0.46).lineTo(x + s * 0.6, y + s * 0.46).stroke();
      doc.lineWidth(2.6).strokeColor(SUCCESS);
      doc
        .moveTo(x + s * 0.34, y + s * 0.62)
        .lineTo(x + s * 0.44, y + s * 0.7)
        .lineTo(x + s * 0.62, y + s * 0.54)
        .stroke();
      break;
    }
    case "shield": {
      // Shield with check
      doc
        .moveTo(cx, y + s * 0.16)
        .lineTo(x + s * 0.78, y + s * 0.28)
        .lineTo(x + s * 0.78, y + s * 0.54)
        .bezierCurveTo(
          x + s * 0.78,
          y + s * 0.7,
          cx,
          y + s * 0.84,
          cx,
          y + s * 0.84
        )
        .bezierCurveTo(
          cx,
          y + s * 0.84,
          x + s * 0.22,
          y + s * 0.7,
          x + s * 0.22,
          y + s * 0.54
        )
        .lineTo(x + s * 0.22, y + s * 0.28)
        .closePath()
        .stroke();
      doc.lineWidth(2.8).strokeColor(SUCCESS);
      doc
        .moveTo(x + s * 0.34, y + s * 0.5)
        .lineTo(x + s * 0.46, y + s * 0.6)
        .lineTo(x + s * 0.66, y + s * 0.4)
        .stroke();
      break;
    }
    case "eye": {
      doc.lineWidth(2.4);
      doc
        .moveTo(x + s * 0.18, cy)
        .bezierCurveTo(x + s * 0.32, y + s * 0.28, x + s * 0.68, y + s * 0.28, x + s * 0.82, cy)
        .bezierCurveTo(x + s * 0.68, y + s * 0.72, x + s * 0.32, y + s * 0.72, x + s * 0.18, cy)
        .closePath()
        .stroke();
      doc.circle(cx, cy, s * 0.1).stroke();
      doc.circle(cx, cy, s * 0.04).fill();
      break;
    }
    case "search": {
      doc.lineWidth(2.6);
      doc.circle(x + s * 0.42, y + s * 0.42, s * 0.2).stroke();
      doc.moveTo(x + s * 0.58, y + s * 0.58).lineTo(x + s * 0.78, y + s * 0.78).stroke();
      break;
    }
    case "compare": {
      // Two side-by-side bar groups
      doc.lineWidth(0).fillColor(PRIMARY_DARK);
      const g1 = x + s * 0.22;
      const g2 = x + s * 0.54;
      const baseY = y + s * 0.74;
      const heights = [0.22, 0.36, 0.28];
      const heights2 = [0.32, 0.2, 0.4];
      const bw = s * 0.07;
      heights.forEach((h, i) => {
        doc.rect(g1 + i * (bw + 2), baseY - s * h, bw, s * h).fill();
      });
      doc.fillColor(PRIMARY);
      heights2.forEach((h, i) => {
        doc.rect(g2 + i * (bw + 2), baseY - s * h, bw, s * h).fill();
      });
      // baseline
      doc.lineWidth(1.4).strokeColor(PRIMARY_DARK);
      doc.moveTo(x + s * 0.18, baseY + 1).lineTo(x + s * 0.82, baseY + 1).stroke();
      break;
    }
    case "beaker": {
      // Flask
      doc.lineWidth(2.2);
      doc.moveTo(x + s * 0.36, y + s * 0.2).lineTo(x + s * 0.36, y + s * 0.42).stroke();
      doc.moveTo(x + s * 0.64, y + s * 0.2).lineTo(x + s * 0.64, y + s * 0.42).stroke();
      doc
        .moveTo(x + s * 0.3, y + s * 0.2)
        .lineTo(x + s * 0.7, y + s * 0.2)
        .stroke();
      doc
        .moveTo(x + s * 0.36, y + s * 0.42)
        .lineTo(x + s * 0.22, y + s * 0.78)
        .lineTo(x + s * 0.78, y + s * 0.78)
        .lineTo(x + s * 0.64, y + s * 0.42)
        .stroke();
      // liquid
      doc.fillColor(PRIMARY).opacity(0.45);
      doc
        .moveTo(x + s * 0.3, y + s * 0.62)
        .lineTo(x + s * 0.22, y + s * 0.78)
        .lineTo(x + s * 0.78, y + s * 0.78)
        .lineTo(x + s * 0.7, y + s * 0.62)
        .closePath()
        .fill();
      doc.opacity(1);
      break;
    }
    case "ribbon": {
      // Certificate ribbon
      doc.lineWidth(2.2);
      doc.circle(cx, y + s * 0.42, s * 0.18).stroke();
      doc.fillColor(PRIMARY).opacity(0.2);
      doc.circle(cx, y + s * 0.42, s * 0.18).fill();
      doc.opacity(1);
      doc.fillColor(PRIMARY_DARK);
      // ribbon tails
      doc
        .moveTo(cx - s * 0.12, y + s * 0.55)
        .lineTo(cx - s * 0.18, y + s * 0.82)
        .lineTo(cx - s * 0.04, y + s * 0.72)
        .lineTo(cx, y + s * 0.82)
        .lineTo(cx + s * 0.04, y + s * 0.72)
        .lineTo(cx + s * 0.18, y + s * 0.82)
        .lineTo(cx + s * 0.12, y + s * 0.55)
        .stroke();
      // star
      doc.fontSize(10).font("BodyBold").fillColor(PRIMARY_DEEP).text("★", cx - 4, y + s * 0.36);
      break;
    }
    case "megaphone": {
      doc.lineWidth(2.2);
      doc
        .moveTo(x + s * 0.2, y + s * 0.42)
        .lineTo(x + s * 0.5, y + s * 0.28)
        .lineTo(x + s * 0.5, y + s * 0.72)
        .lineTo(x + s * 0.2, y + s * 0.58)
        .closePath()
        .stroke();
      doc.fillColor(PRIMARY).opacity(0.25);
      doc
        .moveTo(x + s * 0.2, y + s * 0.42)
        .lineTo(x + s * 0.5, y + s * 0.28)
        .lineTo(x + s * 0.5, y + s * 0.72)
        .lineTo(x + s * 0.2, y + s * 0.58)
        .closePath()
        .fill();
      doc.opacity(1);
      doc
        .moveTo(x + s * 0.5, y + s * 0.36)
        .lineTo(x + s * 0.78, y + s * 0.28)
        .lineTo(x + s * 0.78, y + s * 0.72)
        .lineTo(x + s * 0.5, y + s * 0.64)
        .closePath()
        .stroke();
      break;
    }
    default:
      doc.circle(cx, cy, s * 0.2).stroke();
  }
  doc.restore();
}

// ---------- sections ----------

function pill(doc, x, y, label, fill, color = "white") {
  const padX = 9;
  doc.font("BodyBold").fontSize(9);
  const w = doc.widthOfString(label) + padX * 2;
  const h = 18;
  doc.roundedRect(x, y, w, h, 9).fill(fill);
  doc.fillColor(color).text(label, x + padX, y + 5);
  return x + w + 6;
}

function heroBand(doc, opts) {
  const H = 230;
  // Background gradient block
  doc.rect(0, 0, PAGE_W, H).fill(PRIMARY_DARK);
  // Diagonal accent
  doc.save();
  doc.fillColor(PRIMARY).opacity(0.55);
  doc.moveTo(0, H - 70).lineTo(PAGE_W, H - 130).lineTo(PAGE_W, H).lineTo(0, H).closePath().fill();
  doc.opacity(1).restore();
  // Subtle deep band on top
  doc.rect(0, 0, PAGE_W, 6).fill(PRIMARY_DEEP);

  // Brand wordmark
  doc.fillColor("white").font("BodyBold").fontSize(22).text("DLinRT.eu", MARGIN, 18);
  doc.font("Body").fontSize(10).fillColor("#DCEBF8").text("Deep Learning in Radiotherapy", MARGIN, 44);

  // ESTRO chip top-right
  doc.font("BodyBold").fontSize(9).fillColor(PRIMARY_DEEP);
  const estroLabel = "ESTRO 2026 · Vienna";
  const estroW = doc.widthOfString(estroLabel) + 18;
  doc.roundedRect(PAGE_W - MARGIN - estroW, 22, estroW, 20, 10).fill("white");
  doc.fillColor(PRIMARY_DEEP).text(estroLabel, PAGE_W - MARGIN - estroW + 9, 28);

  // Title
  doc
    .fillColor("white")
    .font("BodyBold")
    .fontSize(opts.titleSize ?? 26)
    .text(opts.title, MARGIN, 78, { width: PAGE_W - MARGIN * 2 - 130, lineGap: 2 });

  // Subhead
  doc
    .font("Body")
    .fontSize(12)
    .fillColor("#EAF2FB")
    .text(opts.subhead, MARGIN, doc.y + 4, { width: PAGE_W - MARGIN * 2 - 130, lineGap: 2 });

  // Pills
  let py = H - 38;
  let px = MARGIN;
  px = pill(doc, px, py, "100% FREE", SUCCESS);
  px = pill(doc, px, py, "INDEPENDENT", "white", PRIMARY_DEEP);
  px = pill(doc, px, py, "PEER-REVIEWED", PRIMARY_DEEP);
  px = pill(doc, px, py, "VENDOR-NEUTRAL", "white", PRIMARY_DEEP);

  // QR top-right
  const qrSize = 86;
  const qrX = PAGE_W - MARGIN - qrSize;
  const qrY = 64;
  doc.roundedRect(qrX - 6, qrY - 6, qrSize + 12, qrSize + 24, 6).fill("white");
  doc.image(opts.qr, qrX, qrY, { width: qrSize, height: qrSize });
  doc
    .fillColor(PRIMARY_DEEP)
    .font("BodyBold")
    .fontSize(8)
    .text("dlinrt.eu", qrX, qrY + qrSize + 4, { width: qrSize, align: "center" });

  return H;
}

function pictogramRow(doc, y, items) {
  const colW = (PAGE_W - MARGIN * 2) / items.length;
  const iconSize = 56;
  items.forEach((it, i) => {
    const cx = MARGIN + colW * i + colW / 2;
    drawIcon(doc, it.icon, cx - iconSize / 2, y, iconSize);
    doc
      .fillColor(ACCENT)
      .font("BodyBold")
      .fontSize(11)
      .text(it.label, MARGIN + colW * i, y + iconSize + 8, {
        width: colW,
        align: "center",
      });
    doc
      .fillColor(MUTED)
      .font("Body")
      .fontSize(9)
      .text(it.caption, MARGIN + colW * i + 6, y + iconSize + 24, {
        width: colW - 12,
        align: "center",
        lineGap: 1,
      });
  });
  return y + iconSize + 60;
}

function processStrip(doc, y, steps) {
  const H = 96;
  doc.roundedRect(MARGIN, y, PAGE_W - MARGIN * 2, H, 8).fill(BG_TINT);
  doc.fillColor(PRIMARY_DARK).font("BodyBold").fontSize(11).text("How verification works", MARGIN + 14, y + 10);

  const innerY = y + 38;
  const colW = (PAGE_W - MARGIN * 2 - 28) / steps.length;
  // connector line
  doc.lineWidth(2).strokeColor(PRIMARY).opacity(0.4);
  doc
    .moveTo(MARGIN + 28, innerY + 14)
    .lineTo(PAGE_W - MARGIN - 28, innerY + 14)
    .stroke();
  doc.opacity(1);

  steps.forEach((s, i) => {
    const cx = MARGIN + 14 + colW * i + colW / 2;
    doc.circle(cx, innerY + 14, 14).fill(PRIMARY_DARK);
    doc
      .fillColor("white")
      .font("BodyBold")
      .fontSize(11)
      .text(String(i + 1), cx - 4, innerY + 9);
    doc
      .fillColor(ACCENT)
      .font("BodyBold")
      .fontSize(10)
      .text(s.title, MARGIN + 14 + colW * i, innerY + 36, { width: colW, align: "center" });
    doc
      .fillColor(MUTED)
      .font("Body")
      .fontSize(8.5)
      .text(s.caption, MARGIN + 14 + colW * i + 4, innerY + 50, {
        width: colW - 8,
        align: "center",
        lineGap: 1,
      });
  });
  return y + H + 12;
}

function statsStrip(doc, y, stats) {
  const H = 96;
  doc.roundedRect(MARGIN, y, PAGE_W - MARGIN * 2, H, 8).fill(BG_TINT);
  doc.fillColor(PRIMARY_DARK).font("BodyBold").fontSize(11).text("The DLinRT.eu catalogue today", MARGIN + 14, y + 10);

  const colW = (PAGE_W - MARGIN * 2) / stats.length;
  stats.forEach((s, i) => {
    const cx = MARGIN + colW * i + colW / 2;
    doc
      .fillColor(PRIMARY_DEEP)
      .font("BodyBold")
      .fontSize(30)
      .text(s.value, MARGIN + colW * i, y + 32, { width: colW, align: "center" });
    doc
      .fillColor(MUTED)
      .font("Body")
      .fontSize(9)
      .text(s.label, MARGIN + colW * i, y + 70, { width: colW, align: "center" });
  });
  return y + H + 12;
}

function calloutBand(doc, y, tagline, sub) {
  const H = 70;
  doc.rect(0, y, PAGE_W, H).fill(PRIMARY_DEEP);
  // diagonal accent
  doc.save().fillColor(PRIMARY).opacity(0.4);
  doc.moveTo(0, y + H).lineTo(PAGE_W, y).lineTo(PAGE_W, y + 6).lineTo(0, y + H).closePath().fill();
  doc.opacity(1).restore();

  doc
    .fillColor("white")
    .font("BodyBold")
    .fontSize(16)
    .text(tagline, MARGIN, y + 14, { width: PAGE_W - MARGIN * 2, align: "center" });
  doc
    .fillColor("#DCEBF8")
    .font("Body")
    .fontSize(10)
    .text(sub, MARGIN, y + 40, { width: PAGE_W - MARGIN * 2, align: "center" });
  return y + H + 12;
}

function infoBox(doc, y, title, body, accent = PRIMARY_DARK) {
  const H = 78;
  doc.roundedRect(MARGIN, y, PAGE_W - MARGIN * 2, H, 8).fill(BG_SOFT);
  // left accent stripe
  doc.rect(MARGIN, y, 4, H).fill(accent);
  doc
    .fillColor(accent)
    .font("BodyBold")
    .fontSize(11)
    .text(title, MARGIN + 16, y + 12);
  doc
    .fillColor(ACCENT)
    .font("Body")
    .fontSize(9.5)
    .text(body, MARGIN + 16, y + 30, {
      width: PAGE_W - MARGIN * 2 - 32,
      lineGap: 2,
    });
  return y + H + 12;
}

function footerBand(doc, qr, cta, url) {
  const H = 92;
  const y = PAGE_H - H;
  doc.rect(0, y, PAGE_W, H).fill(ACCENT);

  // QR card on right
  const qrSize = 70;
  const qrX = PAGE_W - MARGIN - qrSize;
  const qrY = y + (H - qrSize) / 2;
  doc.roundedRect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10, 6).fill("white");
  doc.image(qr, qrX, qrY, { width: qrSize, height: qrSize });

  // CTA text
  doc
    .fillColor("white")
    .font("BodyBold")
    .fontSize(15)
    .text(cta, MARGIN, y + 22, { width: PAGE_W - MARGIN * 2 - qrSize - 30 });
  doc
    .fillColor("#9DB4D4")
    .font("Body")
    .fontSize(9.5)
    .text(url, MARGIN, y + 44);
  doc
    .fillColor("#6B7C99")
    .font("Body")
    .fontSize(7.5)
    .text(
      "dlinrt.eu · Independent · Vendor-neutral · Non-profit · CC BY 4.0 · Educational use only.",
      MARGIN,
      y + H - 16,
      { width: PAGE_W - MARGIN * 2 - qrSize - 30 }
    );
}

// ---------- flyers ----------

async function buildCompaniesFlyer() {
  const out = path.join(OUT_DIR, "DLinRT_Companies_ESTRO2026.pdf");
  const doc = new PDFDocument({ size: "A4", margin: 0 });
  registerFonts(doc);
  doc.pipe(fs.createWriteStream(out));

  const qrTop = await qrPng(SITE_URL);
  const qrBottom = await qrPng(COMPANY_REG_URL);

  heroBand(doc, {
    title: "Claim your products. Get verified.",
    subhead: "The independent European catalogue of AI in radiotherapy — for manufacturers.",
    qr: qrTop,
  });

  let y = 250;
  y = pictogramRow(doc, y, [
    { icon: "tag", label: "Claim products", caption: "Keep your public info accurate & current." },
    { icon: "doc-check", label: "Showcase evidence", caption: "Clinical, technical, safety, regulatory." },
    { icon: "shield", label: "Get verified", caption: "Independent peer review · certification badge." },
    { icon: "megaphone", label: "Stay visible", caption: "Reach clinicians searching across Europe." },
  ]);

  y = processStrip(doc, y, [
    { title: "Register", caption: "As an official rep for your own products." },
    { title: "Claim & update", caption: "Specs, clearances, evidence." },
    { title: "Independent review", caption: "Checked against public sources." },
    { title: "Verified badge", caption: "Added to your product page." },
  ]);

  y = calloutBand(
    doc,
    y,
    "Independent. Vendor-neutral. Not pay-to-verify.",
    "Non-profit · Free of charge — no fees, ever · No paid placement, no sponsored rankings."
  );

  y = infoBox(
    doc,
    y,
    "Who can register?",
    "Any official representative of the manufacturer — regulatory, product, marketing, or technical lead. One verified rep per company; additional reps can be added after approval. You represent your company, not DLinRT.eu.",
    PRIMARY_DARK
  );

  footerBand(doc, qrBottom, "Scan to register — it's free.", "dlinrt.eu/auth?role=company");
  doc.end();
  await new Promise((r) => doc.on("end", r));
  console.log("✓ wrote", out);
}

async function buildCommunityFlyer() {
  const out = path.join(OUT_DIR, "DLinRT_Community_ESTRO2026.pdf");
  const doc = new PDFDocument({ size: "A4", margin: 0 });
  registerFonts(doc);
  doc.pipe(fs.createWriteStream(out));

  const qrTop = await qrPng(SITE_URL);
  const qrBottom = await qrPng(COMMUNITY_REG_URL);

  heroBand(doc, {
    title: "Find, compare & evaluate AI in radiotherapy.",
    subhead: "The independent European catalogue — for clinicians, physicists & researchers.",
    qr: qrTop,
  });

  let y = 250;
  y = pictogramRow(doc, y, [
    { icon: "search", label: "Search & filter", caption: "By task, anatomy, modality, vendor." },
    { icon: "compare", label: "Compare side-by-side", caption: "Up to 5 products · export PDF / Excel." },
    { icon: "beaker", label: "Inspect evidence", caption: "Rigor (E0–E3) × Impact (I0–I5) framework." },
    { icon: "ribbon", label: "Track regulatory", caption: "CE / FDA / TGA / TFDA · structures · data." },
  ]);

  const { products, categories } = countProducts();
  const companies = countCompanies();
  y = statsStrip(doc, y, [
    { value: `${products}+`, label: "AI products catalogued" },
    { value: `${companies}+`, label: "Manufacturers listed" },
    { value: `${categories}`, label: "Workflow categories" },
    { value: "100%", label: "Free & independent" },
  ]);

  y = calloutBand(
    doc,
    y,
    "Independent. Vendor-neutral. Not pay-to-verify.",
    "Non-profit · Peer-reviewed entries · Open data model & rubric on GitHub · CC BY 4.0."
  );

  y = infoBox(
    doc,
    y,
    "Why create a free account?",
    "Save comparisons, follow products, and receive optional update notifications. Your account is also the entry point if you later want to record clinical experience with a tool you use.",
    PRIMARY_DARK
  );

  footerBand(doc, qrBottom, "Scan to create a free account.", "dlinrt.eu/auth");
  doc.end();
  await new Promise((r) => doc.on("end", r));
  console.log("✓ wrote", out);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  await buildCompaniesFlyer();
  await buildCommunityFlyer();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
