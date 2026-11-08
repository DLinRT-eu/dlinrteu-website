import { describe, expect, test } from "bun:test";
import {
  ELEKTA_MONACO_STRUCTURES,
  MONACO_FEMALE_PELVIS_INTACT,
  MONACO_FEMALE_PELVIS_HYST,
  MONACO_MALE_PELVIS,
  MONACO_HEAD_NECK,
} from "../src/data/products/auto-contouring/elekta-monaco-structures";
import { countStructureTypes } from "../src/utils/structureClassification";

describe("Monaco model-specific structure lists", () => {
  test("retains four separate model groups in the catalogue string format", () => {
    const groups = new Set(ELEKTA_MONACO_STRUCTURES.map(name => name.split(":")[0]));
    expect([...groups]).toEqual([
      "Female Pelvis Intact (MR)",
      "Female Pelvis Hysterectomy (MR)",
      "Male Pelvis (MR)",
      "Head & Neck (MR)",
    ]);
    expect(MONACO_FEMALE_PELVIS_INTACT).toHaveLength(15);
    expect(MONACO_FEMALE_PELVIS_HYST).toHaveLength(14);
    expect(MONACO_MALE_PELVIS).toHaveLength(13);
    expect(MONACO_HEAD_NECK).toHaveLength(38);
    expect(ELEKTA_MONACO_STRUCTURES).toHaveLength(80);
  });

  test("keeps model-specific outputs without cross-model contamination", () => {
    expect(MONACO_FEMALE_PELVIS_INTACT).toContain("Female Pelvis Intact (MR): Uterocervix");
    expect(MONACO_FEMALE_PELVIS_HYST.some(name => name.endsWith(": Uterocervix"))).toBe(false);
    expect(MONACO_MALE_PELVIS).toContain("Male Pelvis (MR): Prostate");
    expect(MONACO_HEAD_NECK).toContain("Head & Neck (MR): Brainstem");
    expect(countStructureTypes(ELEKTA_MONACO_STRUCTURES)).toMatchObject({
      OARs: 80, Targets: 0, Elective: 0, total: 80,
    });
  });
});