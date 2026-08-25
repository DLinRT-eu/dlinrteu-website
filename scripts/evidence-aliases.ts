/**
 * Alias registry for the evidence-harvest sweep.
 *
 * Each entry maps a catalogued product id to the strings that must (or must
 * not) appear in a publication for it to count as "this product is named".
 *
 * - aliases:     trade names / spellings that identify the product
 * - require:     at least one of these terms must also appear (topic gate)
 * - exclude:     terms that mark a false positive (other vendors, homonyms)
 * - anatomySplit: for multi-anatomy families, the term that routes a hit to
 *                 the right sibling product
 *
 * The registry is data only — `scripts/evidence-harvest.mjs` consumes it and
 * never writes product files.
 */
export interface ProductAliases {
  id: string;
  aliases: string[];
  require?: string[];
  exclude?: string[];
  anatomySplit?: Record<string, string>;
}

const SCT_TERMS = ["synthetic ct", "pseudo-ct", "pseudo ct", "sct", "mri-only", "mr-only"];

export const EVIDENCE_ALIASES: ProductAliases[] = [
  {
    id: "philips-mrcat-prostate-auto-contouring",
    aliases: ["mrcat", "mr-cat", "magnetic resonance for calculating attenuation"],
    require: SCT_TERMS,
    exclude: ["mriplanner", "mri planner", "spectronic", "syngo"],
    anatomySplit: { prostate: "philips-mrcat-prostate-auto-contouring" },
  },
  {
    id: "philips-mrcat-pelvis",
    aliases: ["mrcat"],
    require: [...SCT_TERMS, "pelvis", "pelvic", "rectal", "cervical"],
    exclude: ["spectronic", "mriplanner"],
  },
  {
    id: "philips-mrcat-brain",
    aliases: ["mrcat"],
    require: ["brain", "glioma", "intracranial", ...SCT_TERMS],
    exclude: ["spectronic", "mriplanner"],
  },
  {
    id: "philips-mrcat-head-and-neck",
    aliases: ["mrcat"],
    require: ["head and neck", "head & neck", "oropharyn", ...SCT_TERMS],
    exclude: ["spectronic", "mriplanner"],
  },
  {
    id: "spectronic-mriplanner",
    aliases: ["mriplanner", "mri planner", "mriplanner", "spectronic medical", "mr-opera", "mr-protect"],
    require: SCT_TERMS,
    exclude: ["mrcat"],
  },
  {
    id: "mr-box-synthetic",
    aliases: ["mr-box", "mrbox", "therapanacea", "art-plan"],
    require: SCT_TERMS,
    exclude: ["cbct"],
  },
  {
    id: "therapanacea-adaptbox",
    aliases: ["adaptbox", "adapt-box", "therapanacea"],
    require: ["cbct", "adaptive", "daily dose"],
  },
  { id: "philips-smartspeed", aliases: ["smartspeed", "smart speed", "compressed sense ai"], require: ["mr", "reconstruction"] },
  { id: "subtle-hd", aliases: ["subtlehd", "subtle hd"], require: ["mri", "mr "] , exclude: ["pet", "ct "] },
  { id: "subtle-aimify", aliases: ["aimify", "ai-mify"], require: ["contrast", "gadolinium", "lesion"] },
  { id: "carina-intcontour", aliases: ["intcontour", "int-contour", "carina"], require: ["contour", "segmentation"] },
  { id: "synaptiq-mediq-rt", aliases: ["mediq rt", "mediq-rt", "synaptiq"], require: ["contour", "segmentation"] },
  { id: "vysioner-vbrain", aliases: ["vbrain", "vysioneer"], require: ["brain metasta", "segmentation"] },
  { id: "wisdom-deep-plan", aliases: ["deepplan", "deep plan", "wisdom tech"], require: ["planning", "vmat", "imrt"] },
  { id: "therapanacea-smartfuse", aliases: ["smartfuse", "smart fuse"], require: ["registration", "propagation", "deformable"] },
  { id: "plan-ai", aliases: ["plan ai", "plan-ai", "predictive planning"], require: ["knowledge-based", "planning"] },
  { id: "pymedix-registration", aliases: ["autofuse", "pymedix"], require: ["registration", "fusion"] },
];

export default EVIDENCE_ALIASES;
