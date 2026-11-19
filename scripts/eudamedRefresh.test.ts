import { describe, expect, test } from "bun:test";
import { diffRegistry, mergeRegistry, nextSnapshotDate } from "../src/utils/eudamedRefresh";

const rec = (basicUdi: string, emdnCode?: string) => ({ basicUdi, emdnCode, sourceUrl: "x", lastVerified: "2026-11-09" });

describe("EUDAMED refresh merge", () => {
  test("company run replaces only that vendor's products", () => {
    const next = mergeRegistry({ a: [rec("A1")], b: [rec("B1")] } as never, { a: [rec("A2")] } as never, ["a"]);
    expect(next.a[0].basicUdi).toBe("A2");
    expect(next.b[0].basicUdi).toBe("B1");
  });
  test("failed company (not refreshed) keeps previous records", () => {
    const next = mergeRegistry({ b: [rec("B1")] } as never, {}, []);
    expect(next.b[0].basicUdi).toBe("B1");
  });
  test("refreshed product without a match is removed", () => {
    expect(mergeRegistry({ a: [rec("A1")] } as never, {}, ["a"]).a).toBeUndefined();
  });
  test("diff reports added, removed and changed", () => {
    const kinds = diffRegistry({ a: [rec("A1")], b: [rec("B1", "Z1")] } as never, { b: [rec("B1", "Z2")], c: [rec("C1")] } as never).map((c) => `${c.productId}:${c.kind}`);
    expect(kinds).toEqual(["a:removed", "b:changed", "c:added"]);
  });
});

describe("nextSnapshotDate", () => {
  test("keeps the previous check date when every device lookup failed", () => {
    expect(nextSnapshotDate(false, "2026-11-09", "2026-11-19")).toBe("2026-11-09");
  });
  test("moves to today when a device lookup succeeded", () => {
    expect(nextSnapshotDate(true, "2026-11-09", "2026-11-19")).toBe("2026-11-19");
  });
});
