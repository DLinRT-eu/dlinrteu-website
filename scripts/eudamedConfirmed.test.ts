import { describe, expect, test } from "bun:test";
import registry from "../src/data/eudamed/udiVerified.json";

describe("Editor-confirmed EUDAMED associations", () => {
  test("Brainlab links to the Contouring 5.0 registry record", () => {
    const entry = registry.products["brainlab-elements-rt-seg"][0];
    expect(entry.basicUdi).toBe("4056481ContouringZQ");
    expect(entry.registeredTradeName).toBe("Brainlab Elements Contouring, 5.0");
  });
  test("Eclipse retains Siemens as the registered manufacturer", () => {
    const entry = registry.products["varian-eclipse-ai-contouring"][0];
    expect(entry.primaryDi).toBe("04068151048117");
    expect(entry.manufacturerName).toBe("Siemens Healthcare GmbH");
    expect(entry.manufacturerSrn).toBe("DE-MF-000006122");
  });
  test("Synchrony links only to the CyberKnife platform", () => {
    const entry = registry.products["accuray-synchrony"][0];
    expect(entry.basicUdi).toBe("081137603CyberKnifeTDS7J");
    expect(entry.registeredTradeName).toBe("CyberKnife");
    expect(entry.registrationNote).toContain("does not establish coverage of Radixact");
  });
  test("Mirada retains RTx identity and UDI punctuation", () => {
    const entry = registry.products["mirada-dlc"][0];
    expect(entry.basicUdi).toBe("++B334RTxUW");
    expect(entry.primaryDi).toBe("B334RTX1P100");
    expect(entry.registeredTradeName).toBe("RTx");
  });
});