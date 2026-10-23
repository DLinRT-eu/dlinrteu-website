import { describe, expect, it } from "bun:test";
import { PAGE_BOTTOM_LIMIT, writeWrappedBullets, writeWrappedField } from "../src/utils/modelCard/exporters/pdfLayout";

const makeDoc = () => {
  const ys: number[] = [];
  let pages = 1;
  const doc = {
    addPage: () => { pages++; return doc; },
    text: (_t: string, _x: number, y: number) => { ys.push(y); return doc; },
    splitTextToSize: (t: string) => t.match(/.{1,40}/g) ?? [""],
    setFont: () => doc,
    setFontSize: () => doc,
    setTextColor: () => doc,
  };
  return { doc: doc as never, ys, pages: () => pages };
};

describe("pdfLayout", () => {
  it("never draws a long field below the page limit and adds pages", () => {
    const { doc, ys, pages } = makeDoc();
    const cursor = { y: 50 };
    writeWrappedField(doc, cursor, "Description", "x".repeat(40 * 150), { margin: 20, contentWidth: 170 });
    expect(Math.max(...ys)).toBeLessThanOrEqual(PAGE_BOTTOM_LIMIT);
    expect(pages()).toBeGreaterThanOrEqual(3);
  });

  it("wraps long bullets within page limits", () => {
    const { doc, ys, pages } = makeDoc();
    const cursor = { y: 260 };
    writeWrappedBullets(doc, cursor, ["y".repeat(400), "z".repeat(400)], 20, 170);
    expect(Math.max(...ys)).toBeLessThanOrEqual(PAGE_BOTTOM_LIMIT);
    expect(pages()).toBe(2);
  });
});

import { groupStructuresByRegion, paletteFor, PALETTE } from "../src/utils/modelCard/exporters/pdfLayout";
import { efficacyBadge } from "../src/utils/modelCard/exporters/pdfSections";
import { getClinicalImpactLevel } from "../src/data/evidence-impact-levels";

describe("pdf evidence visuals", () => {
  it("uses the website's L3 colour and label", () => {
    const b = efficacyBadge("L3")!;
    expect(b.short).toBe("L3");
    expect(b.color).toBe(getClinicalImpactLevel("L3")!.color);
    expect(paletteFor(b.color)).toBe(PALETTE[b.color!]);
    expect(b.text).toContain(getClinicalImpactLevel("L3")!.name);
  });

  it("groups 'Region: Structure' names by region", () => {
    const g = groupStructuresByRegion(["Pelvis: Bladder", "Pelvis: Rectum", "Head & Neck: Brainstem", "Body"]);
    expect(g.map((x) => [x.region, x.items.length])).toEqual([["Pelvis", 2], ["Head & Neck", 1], ["Other", 1]]);
  });
});
