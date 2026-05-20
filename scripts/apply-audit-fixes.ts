#!/usr/bin/env bun
/**
 * Apply mechanical fixes from the 2026-05-20 product audit.
 * - Normalize regulatory.ce.status & regulatory.fda.status string values
 * - Set structuresUnavailable on 6 specific Auto-Contouring products
 * - Set monitorsAIProducts on 2 QA monitors
 * - Replace manteia-acculearning category "Model Training" -> "Platform"
 * - Bump lastRevised on every modified file to today
 * No semantic content changes, no transparency / evidence edits.
 */
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src/data/products";
const TODAY = "2026-05-20";
const SKIP_DIRS = new Set(["archived", "examples"]);

const CE_MAP: Record<string, string> = {
  "CE Marked": "cleared",
  "Certified": "cleared",
  "Approved": "cleared",
  "MDR Exempt": "not_applicable",
  "MDR exempt": "not_applicable",
  "Not Available": "not_applicable",
  "Not specified": "not_applicable",
  "Not certified": "not_applicable",
  "Pending": "under_review",
  "Not yet certified - Investigation use only": "under_review",
  "CE Marked (Historical - Product Discontinued)": "withdrawn",
};

const FDA_MAP: Record<string, string> = {
  "510(k) Cleared": "510k_cleared",
  "510(k) Cleared (via integrated components)": "510k_cleared",
  "510(k) Cleared (Historical - Product Discontinued)": "withdrawn",
  "Not applicable": "not_applicable",
  "Not specified": "not_applicable",
  "Part of system clearance": "not_applicable",
  "Not cleared in US (per ESTRO 2026 European debut)": "not_approved",
  "Not yet cleared - Investigation use only": "pending",
  "Pending Approval": "pending",
};

const STRUCT_UNAVAILABLE_IDS = new Set([
  "mirada-dlc",
  "brainlab-elements-ai-tumor-seg",
  "ge-mr-contour-dl",
  "medmind-rt-mind-ai",
  "varian-ethos-ai-segmentation",
  "quanta-qoca-image-smart-rt",
]);

const MONITOR_IDS = new Set(["ptw-aqualis", "mvision-verify"]);

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue;
      yield* walk(p);
    } else if (entry.endsWith(".ts") && entry !== "index.ts") {
      yield p;
    }
  }
}

/** Replace status: "OLD" inside a `ce: { ... }` or `fda: { ... }` block. */
function normalizeRegBlock(src: string, key: "ce" | "fda", map: Record<string, string>): { out: string; changes: number } {
  let changes = 0;
  // Find every `<key>: {` and rewrite status inside its balanced block.
  const re = new RegExp(`\\b${key}\\s*:\\s*\\{`, "g");
  let out = "";
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const start = m.index + m[0].length;
    // find matching closing brace
    let depth = 1, j = start;
    while (j < src.length && depth > 0) {
      const c = src[j];
      if (c === "{") depth++;
      else if (c === "}") depth--;
      if (depth === 0) break;
      j++;
    }
    const block = src.slice(start, j);
    const newBlock = block.replace(/status\s*:\s*"([^"]+)"/g, (full, val) => {
      if (map[val]) { changes++; return `status: "${map[val]}"`; }
      return full;
    });
    if (newBlock !== block) {
      out += src.slice(i, start) + newBlock;
      i = j;
    }
  }
  out += src.slice(i);
  return { out, changes };
}

function bumpLastRevised(src: string): string {
  if (/lastRevised\s*:/.test(src)) {
    return src.replace(/lastRevised\s*:\s*"[^"]*"/, `lastRevised: "${TODAY}"`);
  }
  // Insert after lastUpdated if present.
  if (/lastUpdated\s*:/.test(src)) {
    return src.replace(/(lastUpdated\s*:\s*"[^"]*",?)/, `$1\n    lastRevised: "${TODAY}",`);
  }
  return src;
}

function extractIds(src: string): string[] {
  const ids: string[] = [];
  const re = /\bid\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) ids.push(m[1]);
  return ids;
}

let totalFiles = 0, modifiedFiles = 0, ceFixes = 0, fdaFixes = 0, structFixes = 0, monitorFixes = 0, catFixes = 0;
const modifiedList: string[] = [];

for (const file of walk(ROOT)) {
  totalFiles++;
  const orig = readFileSync(file, "utf8");
  let src = orig;

  const ce = normalizeRegBlock(src, "ce", CE_MAP);
  src = ce.out; ceFixes += ce.changes;
  const fda = normalizeRegBlock(src, "fda", FDA_MAP);
  src = fda.out; fdaFixes += fda.changes;

  const ids = extractIds(src);

  // structuresUnavailable
  for (const id of ids) {
    if (STRUCT_UNAVAILABLE_IDS.has(id) && !/structuresUnavailable\s*:/.test(src)) {
      // Insert structuresUnavailable: true near supportedStructures or before features
      if (/supportedStructures\s*:\s*\[\s*\]/.test(src)) {
        src = src.replace(/(supportedStructures\s*:\s*\[\s*\],?)/, `$1\n    structuresUnavailable: true,`);
      } else if (/features\s*:/.test(src)) {
        src = src.replace(/(\s*)(features\s*:)/, `$1structuresUnavailable: true,$1$2`);
      }
      structFixes++;
    }
  }

  // monitorsAIProducts
  for (const id of ids) {
    if (MONITOR_IDS.has(id) && !/monitorsAIProducts\s*:/.test(src)) {
      src = src.replace(/(usesAI\s*:\s*false\s*,)/, `$1\n    monitorsAIProducts: true,`);
      monitorFixes++;
    }
  }

  // manteia category
  if (ids.includes("manteia-acculearning")) {
    const before = src;
    src = src.replace(/category\s*:\s*"Model Training"/, `category: "Platform"`);
    if (src !== before) catFixes++;
  }

  if (src !== orig) {
    src = bumpLastRevised(src);
    writeFileSync(file, src);
    modifiedFiles++;
    modifiedList.push(file);
  }
}

console.log(JSON.stringify({
  totalFiles, modifiedFiles, ceFixes, fdaFixes, structFixes, monitorFixes, catFixes,
  modifiedList,
}, null, 2));
