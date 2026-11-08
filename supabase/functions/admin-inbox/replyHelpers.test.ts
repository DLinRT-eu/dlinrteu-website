import { describe, expect, it } from "bun:test";
import { isAddressedToInbox, replySubject, threadHeaders, validateReply } from "./replyHelpers";

const id = "e2b6d792-de00-4806-b250-618254eacee9";

describe("admin inbox reply rules", () => {
  it("only shows mail addressed to info@dlinrt.eu", () => {
    expect(isAddressedToInbox(["Info <INFO@dlinrt.eu>"])).toBe(true);
    expect(isAddressedToInbox(["reviewer@dlinrt.eu"])).toBe(false);
  });
  it("prefixes Re: once", () => {
    expect(replySubject("Hello")).toBe("Re: Hello");
    expect(replySubject("RE: Hello")).toBe("RE: Hello");
  });
  it("threads replies on the original message id", () => {
    expect(threadHeaders("<a@x>", "<z@x>")).toEqual({ "In-Reply-To": "<a@x>", References: "<z@x> <a@x>" });
  });
  it("rejects bodies over 20,000 characters and header injection", () => {
    expect(typeof validateReply({ id, to: ["a@b.co"], subject: "Re", body: "x".repeat(20001) })).toBe("string");
    expect(typeof validateReply({ id, to: ["a@b.co"], subject: "Re\nBcc: x", body: "hi" })).toBe("string");
  });
  it("rejects more than 20 recipients", () => {
    const to = Array.from({ length: 21 }, (_, i) => `u${i}@b.co`);
    expect(typeof validateReply({ id, to, subject: "Re", body: "hi" })).toBe("string");
  });
});
