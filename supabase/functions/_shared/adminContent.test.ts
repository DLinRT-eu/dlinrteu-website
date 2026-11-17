import { describe, expect, it } from "bun:test";
import { disallowedLink } from "./admin-content";

describe("admin email content bound", () => {
  it("allows DLinRT and DOI links", () => {
    expect(disallowedLink("See https://dlinrt.eu/products and https://doi.org/10.1/x or www.dlinrt.eu")).toBeNull();
  });
  it("rejects other links", () => {
    expect(disallowedLink("Click https://evil.example/login")).toBe("https://evil.example");
    expect(disallowedLink("https://dlinrt.eu.evil.com")).toBe("https://dlinrt.eu.evil.com");
  });
  it("rejects bare non-allowed domains but not emails or allowed hosts", () => {
    expect(disallowedLink("Visit evil.com/login")).toBe("evil.com");
    expect(disallowedLink("Write to info@dlinrt.eu or see dlinrt.eu")).toBeNull();
  });
});
