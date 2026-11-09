import { describe, expect, test } from "bun:test";
import { ALL_PRODUCTS } from "../src/data";
import { getProductEudamed } from "../src/utils/eudamed";
import { getCompanyRegulatoryCounts, getProductRegulatorySummary } from "../src/utils/companyRegulatory";

describe("company regulatory overview", () => {
  test("EUDAMED count equals products with a registry record", () => {
    const expected = ALL_PRODUCTS.filter((p) => getProductEudamed(p)).length;
    expect(getCompanyRegulatoryCounts(ALL_PRODUCTS).eudamed).toBe(expected);
  });

  test("records with a registration note are labelled editor-confirmed", () => {
    const p = ALL_PRODUCTS.find((x) => getProductEudamed(x)?.registrationNote)!;
    expect(getProductRegulatorySummary(p).eudamed.kind).toBe("editor-confirmed");
  });

  test("products without registry record show no match", () => {
    const p = ALL_PRODUCTS.find((x) => !getProductEudamed(x))!;
    expect(getProductRegulatorySummary(p).eudamed.kind).toBe("none");
  });

  test("FDA-cleared product shows its clearance number", () => {
    const p = ALL_PRODUCTS.find((x) => typeof x.regulatory?.fda === "object" && x.regulatory.fda.clearanceNumber && !/not|cdss/i.test(x.regulatory.fda.status))!;
    expect(getProductRegulatorySummary(p).fda.label).toBe((p.regulatory!.fda as { clearanceNumber: string }).clearanceNumber);
  });
});
