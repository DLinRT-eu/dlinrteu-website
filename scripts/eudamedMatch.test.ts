import { describe, expect, test } from "bun:test";
import { cleanEmdnCode, isManufacturerSrn, matchUdiRecords } from "../src/utils/eudamedMatch";

describe("EUDAMED trade-name matching", () => {
  test("exact match ignores case, trademarks and trailing spaces", () => {
    const m = matchUdiRecords(["Dose+"], [{ TRADE_NAME: "Dose+ ", BASIC_UDI: "X1" }]);
    expect(m).toHaveLength(1);
    expect(m[0].matchType).toBe("exact");
  });

  test("a longer registered name is only a candidate, never exact", () => {
    const m = matchUdiRecords(["AccuContour"], [{ TRADE_NAME: "AccuContour-Lite", BASIC_UDI: "X2" }]);
    expect(m[0].matchType).toBe("candidate");
  });

  test("unrelated devices are not matched", () => {
    expect(matchUdiRecords(["Monaco"], [{ TRADE_NAME: "Visual Guidance", BASIC_UDI: "X3" }])).toHaveLength(0);
  });

  test("EMDN codes are trimmed and only MF SRNs are accepted", () => {
    expect(cleanEmdnCode(" Z11010180")).toBe("Z11010180");
    expect(isManufacturerSrn("SE-MF-000002125")).toBe(true);
    expect(isManufacturerSrn("SE-IM-000002855")).toBe(false);
  });
});
