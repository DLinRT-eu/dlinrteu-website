import { describe, expect, test } from "bun:test";
import { ALL_PRODUCTS } from "../src/data";
import { buildProductsCsv } from "../src/utils/exportProducts";
import { getProductEudamed, getVerifiedUdiRecords } from "../src/utils/eudamed";
import { getEudamedExportFields } from "../src/utils/modelCard/exporters/registryFields";

const registryOnly = ALL_PRODUCTS.find((p) => getVerifiedUdiRecords(p.id).length && !(p.regulatory?.ce as { eudamed?: unknown } | undefined)?.eudamed)!;
const withNote = ALL_PRODUCTS.find((p) => getProductEudamed(p)?.registrationNote)!;

describe("EUDAMED in exports", () => {
  test("registry-only product exports its Basic UDI-DI in the catalogue CSV", () => {
    expect(registryOnly).toBeDefined();
    const csv = buildProductsCsv([registryOnly]);
    expect(csv).toContain("EUDAMED EMDN Code");
    expect(csv).toContain(getProductEudamed(registryOnly)!.basicUdi);
  });
  test("platform/related-entity note is carried into model-card fields", () => {
    expect(withNote).toBeDefined();
    const note = getEudamedExportFields(withNote).find((f) => f.label === "EUDAMED Registration Note");
    expect(note?.value).toBe(getProductEudamed(withNote)!.registrationNote);
  });
});
