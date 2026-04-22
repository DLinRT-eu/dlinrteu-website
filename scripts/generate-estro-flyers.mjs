#!/usr/bin/env node
/**
 * Generates the two ESTRO 2026 flyer PDFs into public/flyers/.
 *
 * Run from project root:
 *   node scripts/generate-estro-flyers.mjs
 *
 * Requires `pdfkit` and `qrcode` to be installed (dev or one-off):
 *   npm install --no-save pdfkit qrcode
 */
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "public", "flyers");
const FONT_REG = path.resolve(__dirname, "assets", "Inter-Regular.ttf");
const FONT_BOLD = path.resolve(__dirname, "assets", "Inter-Bold.ttf");

function registerFonts(doc) {
  doc.registerFont("Body", FONT_REG);
  doc.registerFont("BodyBold", FONT_BOLD);
}

// Brand
const PRIMARY = "#5090D0";
const PRIMARY_DARK = "#2E6BA8";
const ACCENT = "#1a1a2e";
const MUTED = "#475569";
const SUCCESS = "#16a34a";
const BG_SOFT = "#EAF2FB";

const SITE_URL = "https://dlinrt.eu";
const COMPANY_REG_URL = "https://dlinrt.eu/auth?role=company";
const COMMUNITY_REG_URL = "https://dlinrt.eu/auth";

async function qrPng(text) {
  return await QRCode.toBuffer(text, {
    margin: 1,
    width: 300,
    color: { dark: ACCENT, light: "#ffffff" },
  });
}

function header(doc, subtitle) {
  // Top brand bar
  doc.rect(0, 0, doc.page.width, 70).fill(PRIMARY);
  doc.fillColor("white").font("BodyBold").fontSize(26).text("DLinRT.eu", 40, 22);
  doc
    .font("Body")
    .fontSize(11)
    .fillColor("white")
    .text("Deep Learning in Radiotherapy", 40, 50);
  doc
    .font("BodyBold")
    .fontSize(12)
    .fillColor("white")
    .text(subtitle, 0, 30, { align: "right", width: doc.page.width - 40 });
  doc
    .font("Body")
    .fontSize(10)
    .fillColor("white")
    .text("ESTRO 2026 · Vienna", 0, 48, { align: "right", width: doc.page.width - 40 });
}

function pill(doc, x, y, label, fill, color = "white") {
  const padX = 8;
  const padY = 4;
  doc.font("BodyBold").fontSize(9);
  const w = doc.widthOfString(label) + padX * 2;
  const h = 16;
  doc.roundedRect(x, y, w, h, 8).fill(fill);
  doc.fillColor(color).text(label, x + padX, y + padY - 1);
  return x + w + 6;
}

function sectionTitle(doc, text, y) {
  doc.fillColor(PRIMARY_DARK).font("BodyBold").fontSize(14).text(text, 40, y);
  doc
    .moveTo(40, y + 18)
    .lineTo(doc.page.width - 40, y + 18)
    .lineWidth(1)
    .strokeColor(PRIMARY)
    .stroke();
  return y + 26;
}

function bullet(doc, text, y, opts = {}) {
  const x = opts.x ?? 50;
  const width = opts.width ?? doc.page.width - x - 40;
  doc.circle(x, y + 5, 2.2).fill(PRIMARY);
  doc
    .fillColor(ACCENT)
    .font("Body")
    .fontSize(10.5)
    .text(text, x + 10, y, { width, lineGap: 2 });
  return doc.y + 4;
}

function boldBullet(doc, bold, rest, y, opts = {}) {
  const x = opts.x ?? 50;
  const width = opts.width ?? doc.page.width - x - 40;
  doc.circle(x, y + 5, 2.2).fill(PRIMARY);
  doc.fillColor(ACCENT).fontSize(10.5);
  doc.font("BodyBold").text(bold, x + 10, y, { continued: true, width });
  doc.font("Body").text(" " + rest, { width });
  return doc.y + 4;
}

function footer(doc, qrBuffer, qrLabel, qrUrl) {
  const fy = doc.page.height - 110;
  doc
    .moveTo(40, fy)
    .lineTo(doc.page.width - 40, fy)
    .lineWidth(0.5)
    .strokeColor(PRIMARY)
    .stroke();

  // QR right
  const qrSize = 78;
  const qrX = doc.page.width - 40 - qrSize;
  const qrY = fy + 10;
  doc.image(qrBuffer, qrX, qrY, { width: qrSize, height: qrSize });
  doc
    .fillColor(MUTED)
    .font("BodyBold")
    .fontSize(8)
    .text(qrLabel, qrX - 130, qrY + 18, { width: 125, align: "right" });
  doc
    .fillColor(MUTED)
    .font("Body")
    .fontSize(8)
    .text(qrUrl, qrX - 130, qrY + 32, { width: 125, align: "right" });

  // Left footer text
  doc
    .fillColor(ACCENT)
    .font("BodyBold")
    .fontSize(10)
    .text("dlinrt.eu", 40, fy + 14);
  doc
    .fillColor(MUTED)
    .font("Body")
    .fontSize(8.5)
    .text(
      "Independent · Vendor-neutral · Non-profit · Community-driven",
      40,
      fy + 30,
      { width: 280 }
    );
  doc
    .fillColor(MUTED)
    .fontSize(8)
    .text(
      "© DLinRT.eu — content licensed CC BY 4.0. Educational use only; not clinically validated.",
      40,
      fy + 50,
      { width: 280 }
    );
}

async function buildCompaniesFlyer() {
  const out = path.join(OUT_DIR, "DLinRT_Companies_ESTRO2026.pdf");
  const doc = new PDFDocument({ size: "A4", margin: 40 });
  registerFonts(doc);
  doc.pipe(fs.createWriteStream(out));

  const qrTop = await qrPng(SITE_URL);
  const qrBottom = await qrPng(COMPANY_REG_URL);

  header(doc, "For Industry & Manufacturers");

  // Title block
  let y = 90;
  doc
    .fillColor(ACCENT)
    .font("BodyBold")
    .fontSize(22)
    .text("Claim your products. Get verified.", 40, y, { width: 380 });
  y = doc.y + 4;
  doc
    .fillColor(PRIMARY_DARK)
    .font("BodyBold")
    .fontSize(12)
    .text("Independent. Vendor-neutral. Not pay-to-verify.", 40, y, { width: 380 });
  y = doc.y + 8;

  // Pills
  let px = 40;
  px = pill(doc, px, y, "100% FREE", SUCCESS);
  px = pill(doc, px, y, "INDEPENDENT", PRIMARY_DARK);
  px = pill(doc, px, y, "PEER-REVIEWED", ACCENT);
  y += 26;

  // Top-right small QR (site)
  doc.image(qrTop, doc.page.width - 110, 86, { width: 70, height: 70 });
  doc
    .fillColor(MUTED)
    .font("Body")
    .fontSize(7.5)
    .text("Visit dlinrt.eu", doc.page.width - 110, 158, { width: 70, align: "center" });

  // Intro
  doc.fillColor(ACCENT).font("Body").fontSize(10.5);
  doc.text(
    "DLinRT.eu is the ",
    40,
    y,
    { continued: true, width: doc.page.width - 80, lineGap: 2 }
  );
  doc.font("BodyBold").fillColor(PRIMARY_DARK).text("independent European platform", { continued: true });
  doc
    .font("Body")
    .fillColor(ACCENT)
    .text(
      " cataloguing AI / deep-learning products used in radiotherapy. We are non-profit, vendor-neutral, and never charge vendors for inclusion or verification.",
      { width: doc.page.width - 80, lineGap: 2 }
    );
  y = doc.y + 10;

  // Why register
  y = sectionTitle(doc, "Why register as a manufacturer", y);
  y = boldBullet(doc, "Claim your products", "and keep their public information accurate, current, and complete.", y);
  y = boldBullet(
    doc,
    "Showcase the evidence base of your product",
    "(clinical, technical, safety, regulatory) — required for review anyway.",
    y
  );
  y = boldBullet(doc, "Get a verified certification badge", "after independent peer review of your product page.", y);
  y = boldBullet(doc, "Reach clinicians and researchers", "across Europe and beyond who use DLinRT.eu to compare AI tools.", y);
  y = boldBullet(doc, "Stay visible", "via search, comparison, and category pages without paying for placement.", y);

  // How it works
  y += 6;
  y = sectionTitle(doc, "How verification works", y);
  y = boldBullet(doc, "1. Register", "as an official company representative for your own products on the platform — you represent your company, not DLinRT.eu.", y);
  y = boldBullet(doc, "2. Claim & update", "your product entries with accurate specs, regulatory clearances, and supporting evidence.", y);
  y = boldBullet(doc, "3. Independent review", "by our reviewer team checks information against public sources.", y);
  y = boldBullet(doc, "4. Verified badge", "is added to your product page once review is complete.", y);

  // Eligibility / cost callout box
  y += 6;
  const boxY = y;
  doc.roundedRect(40, boxY, doc.page.width - 80, 78, 6).fill(BG_SOFT);
  doc
    .fillColor(PRIMARY_DARK)
    .font("BodyBold")
    .fontSize(11)
    .text("Eligibility & cost", 50, boxY + 8);
  doc
    .fillColor(ACCENT)
    .font("Body")
    .fontSize(9.5)
    .text(
      "Eligible: any official representative of the manufacturer (regulatory, product, marketing, or technical lead). One verified rep per company; additional reps can be added after approval.",
      50,
      boxY + 24,
      { width: doc.page.width - 100, lineGap: 2 }
    );
  doc
    .fillColor(SUCCESS)
    .font("BodyBold")
    .fontSize(10)
    .text("Free of charge — no fees, ever. No paid tiers, no sponsored placement.", 50, boxY + 60, {
      width: doc.page.width - 100,
    });
  y = boxY + 90;

  footer(doc, qrBottom, "Register as a company rep", "dlinrt.eu/auth");
  doc.end();
  await new Promise((r) => doc.on("end", r));
  console.log("✓ wrote", out);
}

async function buildCommunityFlyer() {
  const out = path.join(OUT_DIR, "DLinRT_Community_ESTRO2026.pdf");
  const doc = new PDFDocument({ size: "A4", margin: 40 });
  registerFonts(doc);
  doc.pipe(fs.createWriteStream(out));

  const qrTop = await qrPng(SITE_URL);
  const qrBottom = await qrPng(COMMUNITY_REG_URL);

  header(doc, "For Clinicians & Researchers");

  let y = 90;
  doc
    .fillColor(ACCENT)
    .font("BodyBold")
    .fontSize(22)
    .text("Find, compare & evaluate AI in radiotherapy.", 40, y, { width: 380 });
  y = doc.y + 4;
  doc
    .fillColor(PRIMARY_DARK)
    .font("BodyBold")
    .fontSize(12)
    .text("Independent. Vendor-neutral. Not pay-to-verify.", 40, y, { width: 380 });
  y = doc.y + 8;

  let px = 40;
  px = pill(doc, px, y, "100% FREE", SUCCESS);
  px = pill(doc, px, y, "INDEPENDENT", PRIMARY_DARK);
  px = pill(doc, px, y, "PEER-REVIEWED", ACCENT);
  y += 26;

  doc.image(qrTop, doc.page.width - 110, 86, { width: 70, height: 70 });
  doc
    .fillColor(MUTED)
    .font("Body")
    .fontSize(7.5)
    .text("Visit dlinrt.eu", doc.page.width - 110, 158, { width: 70, align: "center" });

  doc.fillColor(ACCENT).font("Body").fontSize(10.5);
  doc.text("DLinRT.eu is the ", 40, y, { continued: true, width: doc.page.width - 80, lineGap: 2 });
  doc.font("BodyBold").fillColor(PRIMARY_DARK).text("independent European platform", { continued: true });
  doc
    .font("Body")
    .fillColor(ACCENT)
    .text(
      " cataloguing AI / deep-learning products used across the radiotherapy workflow — from auto-contouring to treatment planning, image enhancement, and QA.",
      { width: doc.page.width - 80, lineGap: 2 }
    );
  y = doc.y + 10;

  y = sectionTitle(doc, "What you can do on DLinRT.eu", y);
  y = boldBullet(doc, "Search & filter", "AI products by task, anatomy, modality, vendor, and regulatory clearance.", y);
  y = boldBullet(doc, "Compare side-by-side", "up to 5 products with exportable PDF / Excel / CSV reports.", y);
  y = boldBullet(doc, "Inspect the evidence base", "with our dual-axis Evidence Rigor (E0–E3) × Clinical Impact (I0–I5) framework.", y);
  y = boldBullet(doc, "Track regulatory status", "(CE / FDA / TGA / TFDA), training data provenance, and supported structures.", y);
  y = boldBullet(doc, "Stay informed", "via the changelog and optional email digests for new products and updates.", y);

  y += 6;
  y = sectionTitle(doc, "How we keep it trustworthy", y);
  y = boldBullet(doc, "Peer-reviewed entries", "verified against public sources by an independent reviewer team.", y);
  y = boldBullet(doc, "Verified badges", "indicate products reviewed and confirmed by both DLinRT and the manufacturer.", y);
  y = boldBullet(doc, "Open & transparent", "— content licensed CC BY 4.0; data model and review rubric public on GitHub.", y);
  y = boldBullet(doc, "No vendor influence", "— non-profit, no paid placements, no sponsored rankings.", y);

  y += 6;
  const boxY = y;
  doc.roundedRect(40, boxY, doc.page.width - 80, 64, 6).fill(BG_SOFT);
  doc
    .fillColor(PRIMARY_DARK)
    .font("BodyBold")
    .fontSize(11)
    .text("Used by clinicians and researchers across Europe and beyond.", 50, boxY + 10, {
      width: doc.page.width - 100,
    });
  doc
    .fillColor(ACCENT)
    .font("Body")
    .fontSize(9.5)
    .text(
      "Create a free account to save comparisons, follow products, and receive update notifications. Your account is also the entry point if you later want to record clinical experience with a tool you use.",
      50,
      boxY + 30,
      { width: doc.page.width - 100, lineGap: 2 }
    );
  y = boxY + 76;

  footer(doc, qrBottom, "Create a free account", "dlinrt.eu/auth");
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
