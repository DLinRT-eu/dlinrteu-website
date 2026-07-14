import { AUTO_CONTOURING_PRODUCTS } from "../src/data/products/auto-contouring/index.ts";
const list = AUTO_CONTOURING_PRODUCTS.filter(p => {
  const e = p.evidenceRigor;
  if (!e || e === "E0") return false;
  const kp = (p as any).keyPapers;
  return !kp || (Array.isArray(kp) && kp.length === 0);
});
console.log(`In-scope: ${list.length} / ${AUTO_CONTOURING_PRODUCTS.length}`);
for (const p of list) {
  console.log(`- ${p.id.padEnd(45)} E=${p.evidenceRigor} I=${p.clinicalImpact} R=${p.adoptionReadiness}  [${p.company}] ${p.name}`);
}
