import { describe, expect, test } from "bun:test";
import { getProductForStoredRecord } from "../src/data";

describe("old review-assignment product names", () => {
  test("SmartDose CT Enhancement opens Precise Image", () => {
    expect(getProductForStoredRecord("philips-smartdose-ct-enhancement")?.id).toBe("philips-precise-image");
  });
  test("Philips Auto-Contouring opens MRCAT Prostate + Auto-Contouring", () => {
    expect(getProductForStoredRecord("philips-auto-contouring")?.id).toBe("philips-mrcat-prostate-auto-contouring");
  });
  test("aimify opens AiMIFY", () => {
    expect(getProductForStoredRecord("aimify")?.id).toBe("subtle-aimify");
  });
  test("historical TheraPanacea IDs keep their own record", () => {
    expect(getProductForStoredRecord("therapanacea-smartplan")?.id).toBe("therapanacea-smartplan");
  });
});
