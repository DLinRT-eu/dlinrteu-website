

# Plan: Revise Product Regulatory Data

## Summary of Required Updates

Based on FDA 510(k) database research and official sources, the following products need updates:

| Product | Issue | Required Fix |
|---------|-------|--------------|
| **PixelShine** | Intended use statement is summarized | Update to official FDA wording |
| **Medical SwiftMR** | Incorrect name format, anatomical location incomplete | Fix name to "SwiftMR", expand to "All body parts" per FDA |
| **uCS-AI** | Missing FDA clearance details, unverified version | Add FDA K number if available or mark as CE-only, remove unverified version |
| **AiCE CT** | Intended use not from FDA statement | Update with verified intended use |

---

## 1. PixelShine (AlgoMedica)

### Current vs. FDA-Verified Data

| Field | Current Value | FDA-Verified (K161625) |
|-------|---------------|------------------------|
| Intended Use | "Intended for use in de-noising CT datasets to improve image quality at reduced radiation dose to support clinical interpretation." | "The AlgoMedica PixelShine System is intended for networking, communication, processing and enhancement of CT images in DICOM format. It is specifically indicated for assisting professional radiologists and specialists in reaching their own diagnosis. The device processing is not effective for lesion, mass or abnormalities of sizes less than 3.0 mm. The AlgoMedica PixelShine is not intended for use with or for diagnostic interpretation of mammography images." |
| Version | Not specified | Leave empty (no official version documented) |

### Changes Required
- Update `intendedUseStatement` with official FDA text from K161625
- Remove `version` field (none documented)

---

## 2. SwiftMR (AIRS Medical)

### Current vs. FDA-Verified Data

| Field | Current Value | FDA-Verified (K230854) |
|-------|---------------|------------------------|
| Name | "Medical SwiftMR" | "SwiftMR" |
| Anatomical Location | ["Brain", "Spine"] | "All body parts" |
| Intended Use | "Intended for enhancing magnetic resonance images to improve image quality through noise reduction and detail enhancement to support clinical interpretation." | "SwiftMR is a stand-alone software solution intended to be used for acceptance, enhancement and transfer of all body parts MR images in DICOM format. It can be used for noise reduction and increasing image sharpness for MR images. SwiftMR is not intended for use on mobile devices." |
| Version | "2.1" | Leave empty (not in FDA documentation) |

### Changes Required
- Change `name` from "Medical SwiftMR" to "SwiftMR"
- Update `anatomicalLocation` to ["Whole body"] per FDA "all body parts" indication
- Update `intendedUseStatement` with official FDA text
- Remove `version` field (unverified)
- Add evidence entry with FDA 510(k) document link

---

## 3. uCS-AI (United Imaging)

### Current vs. Verified Data

| Field | Current Value | Issue |
|-------|---------------|-------|
| FDA clearance | "Cleared as part of United Imaging uRT radiotherapy system clearances" | No standalone K number found |
| Version | "1.2" | Unverified |
| Intended Use | Generic statement | Not from official FDA source |

### Research Finding
No standalone FDA 510(k) clearance was found for uCS-AI as a separate product. It appears to be cleared only as an integrated feature within United Imaging's radiotherapy systems (e.g., uRT-linac). The product has CE marking under MDR.

### Changes Required
- Remove unverified `version` field
- Clarify FDA status as "Part of system clearance" with specific system reference
- Keep CE MDR certification as primary regulatory status
- Fix syntax issue (empty line at line 60)
- Update intended use to reflect integrated system use

---

## 4. AiCE CT (Canon Medical Systems)

### Current vs. FDA-Verified Data

| Field | Current Value | FDA-Verified (K181862) |
|-------|---------------|------------------------|
| Intended Use | "Intended for use in CT image reconstruction to enhance image quality and/or reduce radiation dose while maintaining diagnostic confidence." | From FDA K181862: "The Aquilion ONE / GENESIS Edition is intended to produce cross-sectional images of the body by computer reconstruction of X-ray transmission data. AiCE is the deep learning-based reconstruction option that provides noise reduction while preserving image texture." |
| Version | "2.0" | Not verified in FDA docs |

### Note on K181862
K181862 is the clearance for the Aquilion ONE / GENESIS Edition CT system, of which AiCE is a reconstruction option. The intended use in FDA documentation refers to the system rather than AiCE specifically. The current statement is acceptable as a summary but should note this is for the integrated feature.

### Changes Required
- Remove unverified `version` field
- Add note to FDA section clarifying AiCE is an integrated reconstruction option
- Keep current intended use (reasonable summary for the feature)

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/data/products/image-enhancement/algomedica.ts` | Update intended use statement |
| `src/data/products/image-enhancement/airs-medical.ts` | Change name, anatomical location, intended use, remove version |
| `src/data/products/image-enhancement/united-imaging.ts` | Remove version, fix syntax, clarify FDA status |
| `src/data/products/reconstruction/canon.ts` | Remove version, add FDA notes |

---

## Technical Details

### PixelShine (algomedica.ts)
```text
Line 56-57: Update intendedUseStatement to:
"The AlgoMedica PixelShine System is intended for networking, communication, processing and enhancement of CT images in DICOM format. It is specifically indicated for assisting professional radiologists and specialists in reaching their own diagnosis. The device processing is not effective for lesion, mass or abnormalities of sizes less than 3.0 mm. The AlgoMedica PixelShine is not intended for use with or for diagnostic interpretation of mammography images."

Add evidence entry with FDA 510(k) link:
link: "https://www.accessdata.fda.gov/cdrh_docs/pdf16/K161625.pdf"
```

### SwiftMR (airs-medical.ts)
```text
Line 7: Change name to "SwiftMR"
Line 16: Change anatomicalLocation to ["Whole body"]
Line 20: Remove version field
Line 57: Update intendedUseStatement to:
"SwiftMR is a stand-alone software solution intended to be used for acceptance, enhancement and transfer of all body parts MR images in DICOM format. It can be used for noise reduction and increasing image sharpness for MR images. SwiftMR is not intended for use on mobile devices."

Add evidence entry:
{
  type: "FDA 510(k) Summary",
  description: "FDA 510(k) clearance documentation for SwiftMR",
  link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230854.pdf"
}
```

### uCS-AI (united-imaging.ts)
```text
Line 21: Remove version field
Lines 49-54: Update FDA section:
fda: {
  status: "Part of system clearance",
  class: "Class II",
  type: "510(k)",
  notes: "uCS-AI is cleared as an integrated feature of United Imaging uRT radiotherapy systems. No standalone 510(k) clearance exists for uCS-AI as a separate device."
}

Line 55: Update intendedUseStatement to reflect integrated system use
Line 60: Remove empty line in market object
```

### AiCE CT (canon.ts)
```text
Line 21: Remove version field
Lines 49-57: Add notes field to FDA section:
notes: "K181862 is the 510(k) clearance for the Aquilion ONE / GENESIS Edition CT system. AiCE is the deep learning reconstruction option within this system."
```

---

## Summary of Changes

| Product | Name Change | Anatomical | Version | Intended Use | FDA Status |
|---------|-------------|------------|---------|--------------|------------|
| PixelShine | No | No | Keep empty | Updated to FDA | Verified K161625 |
| SwiftMR | "Medical SwiftMR" → "SwiftMR" | Brain/Spine → Whole body | Remove 2.1 | Updated to FDA | Verified K230854 |
| uCS-AI | No | No | Remove 1.2 | Clarified | Part of system |
| AiCE CT | No | No | Remove 2.0 | Minor clarification | Verified K181862 |

