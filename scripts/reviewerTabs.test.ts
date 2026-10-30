import { describe, expect, it } from "bun:test";
import { pickInitialReviewerTab } from "../src/utils/reviewerTabs";

describe("pickInitialReviewerTab", () => {
  it("opens on In Progress when there are no pending reviews", () => {
    expect(pickInitialReviewerTab(["in_progress", "completed", "completed"])).toBe("in_progress");
  });
  it("opens on Pending when pending reviews exist", () => {
    expect(pickInitialReviewerTab(["completed", "pending"])).toBe("pending");
  });
  it("opens on All when only completed reviews exist", () => {
    expect(pickInitialReviewerTab(["completed"])).toBe("all");
  });
});
