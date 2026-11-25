import { describe, expect, test } from "bun:test";
import { countVerified, latestVerifications, resolveCertificationStatus } from "../src/utils/certificationStatus";

const rec = (hash: string | null, at = "2026-06-01T00:00:00Z") => ({ product_id: "p", verified_at: at, content_hash: hash });

describe("certification status", () => {
  test("matching hash is valid", () => expect(resolveCertificationStatus(rec("abc"), "abc")).toBe("valid"));
  test("changed hash is outdated", () => expect(resolveCertificationStatus(rec("abc"), "xyz")).toBe("outdated"));
  test("legacy row revised after certification is outdated", () =>
    expect(resolveCertificationStatus(rec(null), null, "2026-07-01")).toBe("outdated"));
  test("legacy row revised before certification is valid", () =>
    expect(resolveCertificationStatus(rec(null), null, "2026-05-01")).toBe("valid"));
  test("latest certification wins", () => {
    const m = latestVerifications([rec("a", "2026-01-01T00:00:00Z"), rec("b", "2026-03-01T00:00:00Z")]);
    expect(m.get("p")?.content_hash).toBe("b");
  });
  test("counts only valid and outdated of given products", () => {
    const v = new Map([["a", { verifiedAt: "x", status: "valid" as const }], ["b", { verifiedAt: "x", status: "outdated" as const }], ["c", { verifiedAt: "x", status: "valid" as const }]]);
    expect(countVerified(["a", "b", "d"], v)).toEqual({ valid: 1, outdated: 1 });
  });
});
