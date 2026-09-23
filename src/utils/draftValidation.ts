import { getDistinctStructureNames } from './structureClassification';
import { getAtPath } from './draftBundling';

export type CheckLevel = 'error' | 'warn' | 'ok';

export interface FieldCheck {
  level: CheckLevel;
  message: string;
}

const MODALITIES = ['CT', 'CBCT', 'MRI', 'PET', 'PET/CT', 'SPECT', 'Ultrasound', 'X-ray', 'RTSTRUCT', 'RTPLAN', 'RTDOSE', 'sCT', 'Other'];
const DEPLOYMENTS = ['Cloud', 'On-premise', 'On-premises', 'Hybrid', 'SaaS', 'Local', 'Integrated', 'Edge'];
const CE_CLASSES = ['I', 'Is', 'Im', 'Ir', 'IIa', 'IIb', 'III', 'Class I', 'Class IIa', 'Class IIb', 'Class III'];
const EVIDENCE_PATHS = ['evidenceRigor', 'clinicalImpact', 'adoptionReadiness', 'evidenceLevel', 'keyPapers'];
const CLINICAL_CLAIM = /clinically (validated|proven)|guarantee[sd]?|100\s?% accura/i;
const DATE_RE = /^\d{4}(-\d{2}(-\d{2})?)?$/;
const STRUCTURE_RE = /^[^:]+:\s\S.*$/;

function asStrings(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map(x => (typeof x === 'string' ? x : (x as { name?: string })?.name ?? '')).filter(Boolean);
}

function enumCheck(values: string[], allowed: string[], label: string): FieldCheck[] {
  const bad = values.filter(v => !allowed.some(a => a.toLowerCase() === v.toLowerCase()));
  if (bad.length === 0) return [];
  return [{ level: 'warn', message: `${label}: non-standard value(s) ${bad.join(', ')}` }];
}

function checkStructures(proposed: unknown, current: unknown): FieldCheck[] {
  const names = asStrings(proposed);
  const out: FieldCheck[] = [];
  const badFormat = names.filter(n => !STRUCTURE_RE.test(n));
  if (badFormat.length) {
    out.push({ level: 'error', message: `${badFormat.length} structure(s) not in "Region: Structure Name" form (e.g. ${badFormat.slice(0, 3).join(', ')})` });
  }
  const seen = new Set<string>();
  const dups = names.filter(n => (seen.has(n) ? true : (seen.add(n), false)));
  if (dups.length) out.push({ level: 'warn', message: `${dups.length} duplicate entr(ies): ${[...new Set(dups)].slice(0, 3).join(', ')}` });
  const lower = new Set(names.map(n => n.toLowerCase()));
  const unpaired = names.filter(n => {
    const m = n.match(/^(.*)[_ ]([LR])$/i);
    if (!m) return false;
    const other = `${m[1]}${n.charAt(m[1].length)}${m[2].toUpperCase() === 'L' ? 'R' : 'L'}`;
    return !lower.has(other.toLowerCase());
  });
  if (unpaired.length) out.push({ level: 'warn', message: `${unpaired.length} lateral structure(s) without L/R counterpart (e.g. ${unpaired.slice(0, 3).join(', ')})` });
  const before = getDistinctStructureNames(asStrings(current)).length;
  const after = getDistinctStructureNames(names).length;
  out.push({ level: 'ok', message: `Distinct structures: ${before} → ${after}` });
  return out;
}

function checkDate(value: unknown, label: string): FieldCheck[] {
  if (value === undefined || value === null || value === '') return [];
  if (typeof value !== 'string' || !DATE_RE.test(value)) return [{ level: 'error', message: `${label} must be YYYY, YYYY-MM or YYYY-MM-DD` }];
  if (value > new Date().toISOString().slice(0, 10)) return [{ level: 'warn', message: `${label} is in the future` }];
  return [];
}

/** Checks for one changed field, evaluated against the merged product. */
export function validateField(path: string, proposed: unknown, current: unknown, merged: Record<string, unknown>): FieldCheck[] {
  const checks: FieldCheck[] = [];
  const leaf = path.split('.').pop() ?? path;

  if (EVIDENCE_PATHS.some(p => path === p || path.startsWith(`${p}.`))) {
    checks.push({ level: 'error', message: 'Evidence scores are assigned by DLinRT reviewers, not the vendor' });
  }
  if (leaf === 'supportedStructures') checks.push(...checkStructures(proposed, current));
  if (leaf === 'modality') checks.push(...enumCheck(asStrings(Array.isArray(proposed) ? proposed : [proposed]), MODALITIES, 'Modality'));
  if (leaf === 'deployment') checks.push(...enumCheck(asStrings(proposed), DEPLOYMENTS, 'Deployment'));
  if (leaf === 'class' && path.includes('regulatory')) checks.push(...enumCheck([String(proposed ?? '')], CE_CLASSES, 'Regulatory class'));
  if (leaf === 'outputFormat') {
    const vals = asStrings(proposed);
    const drift = vals.filter(v => /rt\s?struct|rt\s?plan|rt\s?dose/i.test(v) && !/^DICOM-RT(STRUCT|PLAN|DOSE)$/.test(v));
    if (drift.length) checks.push({ level: 'warn', message: `DICOM nomenclature drift: ${drift.join(', ')} (use DICOM-RTSTRUCT/RTPLAN/RTDOSE)` });
  }
  if (/date|Date$/.test(leaf)) checks.push(...checkDate(proposed, leaf));

  if (leaf === 'releaseDate' && typeof proposed === 'string') {
    const clearance = [getAtPath(merged, 'regulatory.fda.decisionDate'), getAtPath(merged, 'regulatory.ce.date')]
      .filter((d): d is string => typeof d === 'string' && DATE_RE.test(d));
    if (clearance.some(d => proposed < d.slice(0, proposed.length))) {
      checks.push({ level: 'warn', message: 'Release date precedes a recorded regulatory clearance date' });
    }
  }

  if (leaf === 'version' && typeof proposed === 'string') {
    const others = ['regulatory.ce.version', 'regulatory.fda.version', 'version']
      .filter(p => p !== path)
      .map(p => getAtPath(merged, p))
      .filter((v): v is string => typeof v === 'string' && v.length > 0);
    if (others.length && !others.includes(proposed)) {
      checks.push({ level: 'warn', message: `Version ${proposed} differs from other recorded versions (${[...new Set(others)].join(', ')}) — confirm which is CE/FDA-cleared` });
    }
  }

  const text = typeof proposed === 'string' ? proposed : JSON.stringify(proposed ?? '');
  if (CLINICAL_CLAIM.test(text)) checks.push({ level: 'error', message: 'Contains a clinical-validation or absolute accuracy claim' });

  const sourceAccess = getAtPath(merged, 'sourceAccess');
  const retrieved = getAtPath(merged, 'sourceRetrievedOn');
  if (sourceAccess === 'vendor-provided' && !retrieved) {
    checks.push({ level: 'warn', message: 'Vendor-provided source needs sourceRetrievedOn (YYYY-MM-DD)' });
  }
  if (!getAtPath(merged, 'source') && !sourceAccess) {
    checks.push({ level: 'warn', message: 'No source disclosed for this product; record where this value comes from' });
  }

  if (checks.every(c => c.level === 'ok')) checks.unshift({ level: 'ok', message: 'No issues found' });
  return checks;
}

export function worstLevel(checks: FieldCheck[]): CheckLevel {
  if (checks.some(c => c.level === 'error')) return 'error';
  if (checks.some(c => c.level === 'warn')) return 'warn';
  return 'ok';
}
