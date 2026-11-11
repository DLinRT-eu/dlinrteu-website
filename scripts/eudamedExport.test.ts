import { describe, expect, test } from "bun:test";
import { resolveExportEudamed } from "../src/utils/eudamedExport";

const reg = {
  p: [
    { basicUdi: "A1", primaryDi: "D1", emdnCode: "Z1", lastVerified: "2026-11-09" },
    { basicUdi: "B2", primaryDi: "D2" },
  ],
} as never;
const prod = (eudamed?: object) => ({ id: "p", regulatory: { ce: { status: "Certified", eudamed } } }) as never;

describe("registry-first EUDAMED export", () => {
  test("registry overrides conflicting manual value", () => {
    const r = resolveExportEudamed(prod({ basicUdi: "A1", emdnCode: "OLD", riskClass: "class-iia" }), reg);
    expect(r.record?.emdnCode).toBe("Z1");
    expect(r.record?.riskClass).toBe("class-iia");
    expect(r.source).toBe("Registry + manual");
  });
  test("manual used when no registry match", () => {
    const r = resolveExportEudamed({ ...(prod({ basicUdi: "M" }) as object), id: "q" } as never, reg);
    expect(r.record?.basicUdi).toBe("M");
    expect(r.source).toBe("Manual");
  });
  test("stale manual Basic UDI-DI is flagged and registry wins", () => {
    const r = resolveExportEudamed(prod({ basicUdi: "STALE" }), reg);
    expect(r.mismatch).toBe("STALE");
    expect(r.record?.basicUdi).toBe("A1");
    expect(r.source).toBe("Registry");
  });
  test("all registry matches listed", () => {
    expect(resolveExportEudamed(prod(), reg).all.map((x) => x.basicUdi)).toEqual(["A1", "B2"]);
  });
});
