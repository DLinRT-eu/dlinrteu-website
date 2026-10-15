import { describe, expect, test } from 'bun:test';
import { THERAPANACEA_APPLICATIONS, THERAPANACEA_SEGMENTATION, THERAPANACEA_ADAPTIVE, THERAPANACEA_HISTORICAL_PRODUCTS } from '../src/data/products/therapanaceaApplications';
import { PRODUCT_ALIASES, resolveProductId } from '../src/utils/productAliases';
import { ANNOTATE_ALL_STRUCTURES, MRBOX_ALL_STRUCTURES, BRACHYBOX_PELVIS_MR, ADAPTBOX_ALL_STRUCTURES } from '../src/data/products/auto-contouring/therapanacea-structures';
import { computeProductEvidenceScore } from '../src/utils/evidenceScoring';
import { normalizeProductEfficacy } from '../src/utils/normalizeEfficacy';
import { createSearchFilter } from '../src/utils/commonFilters';
import { AUTO_CONTOURING_PRODUCTS } from '../src/data/products/auto-contouring';
import { IMAGE_SYNTHESIS_PRODUCTS } from '../src/data/products/image-synthesis';
import { REGISTRATION_PRODUCTS } from '../src/data/products/registration';
import { PLATFORM_PRODUCTS } from '../src/data/products/platform';
import { TREATMENT_PLANNING_PRODUCTS } from '../src/data/products/treatment-planning';

describe('TheraPanacea application consolidation', () => {
  test('exactly three applications replace the former eight active entries', () => {
    expect(THERAPANACEA_APPLICATIONS.map(p => p.id)).toEqual([
      'therapanacea-art-plan-segmentation', 'therapanacea-art-plan-planning', 'therapanacea-art-plan-adaptive',
    ]);
    expect(new Set(THERAPANACEA_APPLICATIONS.map(p => p.id)).size).toBe(3);
    const active = [...AUTO_CONTOURING_PRODUCTS, ...IMAGE_SYNTHESIS_PRODUCTS, ...REGISTRATION_PRODUCTS, ...PLATFORM_PRODUCTS, ...TREATMENT_PLANNING_PRODUCTS].filter(p => p.company === 'Therapanacea');
    expect(active.map(p => p.id).sort()).toEqual(THERAPANACEA_APPLICATIONS.map(p => p.id).sort());
  });
  test('all former and pipeline IDs resolve to a current application', () => {
    expect(Object.keys(PRODUCT_ALIASES).length).toBe(11);
    for (const [oldId, currentId] of Object.entries(PRODUCT_ALIASES)) {
      expect(resolveProductId(oldId)).toBe(currentId);
      expect(THERAPANACEA_APPLICATIONS.some(p => p.id === currentId)).toBe(true);
      expect(THERAPANACEA_HISTORICAL_PRODUCTS.some(p => p.id === oldId)).toBe(true);
    }
    expect(resolveProductId('raysearch-raystation')).toBe('raysearch-raystation');
  });
  test('MR, CT and brachytherapy structures are retained without CBCT contamination', () => {
    expect(THERAPANACEA_SEGMENTATION.supportedStructures).toEqual([...new Set([...ANNOTATE_ALL_STRUCTURES, ...MRBOX_ALL_STRUCTURES, ...BRACHYBOX_PELVIS_MR])]);
    expect(THERAPANACEA_ADAPTIVE.supportedStructures).toEqual(ADAPTBOX_ALL_STRUCTURES);
    expect(THERAPANACEA_SEGMENTATION.functionEvidence?.find(f => f.id === 'mr-synthetic-ct')?.product.supportedStructures).toEqual(MRBOX_ALL_STRUCTURES);
  });
  test('MESCAL remains MR evidence and is not attributed to CBCT synthesis', () => {
    const doi = '10.1016/j.radonc.2026.111530';
    expect(THERAPANACEA_ADAPTIVE.keyPapers?.some(p => p.doi === doi)).toBe(false);
    expect(THERAPANACEA_SEGMENTATION.functionEvidence?.find(f => f.id === 'mr-synthetic-ct')?.product.keyPapers?.some(p => p.doi === doi)).toBe(true);
  });
  test('unvalidated tumour and brachy functions do not inherit CT evidence', () => {
    const product = normalizeProductEfficacy(THERAPANACEA_SEGMENTATION);
    const tumour = product.functionEvidence?.find(f => f.id === 'tumour')?.product;
    const brachy = product.functionEvidence?.find(f => f.id === 'brachytherapy')?.product;
    expect(tumour?.evidenceRigor).toBe('E0');
    expect(tumour?.clinicalImpact).toBe('L1c');
    expect(brachy?.evidenceRigor).toBe('E0');
    expect(brachy?.clinicalImpact).toBe('L2');
    expect(computeProductEvidenceScore(product).rigor).toBe('E2');
    expect(computeProductEvidenceScore(product).impact).toBe('L3');
    expect(product.functionEvidence?.find(f => f.id === 'mr-synthetic-ct')?.product.categoryEvidence?.['Auto-Contouring']?.evidenceRigor).toBe('E0');
  });
  test('former names remain searchable', () => {
    for (const name of ['Annotate', 'TumorBox', 'BrachyBox', 'MR-Box', 'SmartFuse']) {
      expect(createSearchFilter(name)(THERAPANACEA_SEGMENTATION)).toBe(true);
    }
  });
  test('adaptive contouring and registration do not inherit synthesis evidence', () => {
    const product = normalizeProductEfficacy(THERAPANACEA_ADAPTIVE);
    expect(product.categoryEvidence?.['Auto-Contouring']?.evidenceRigor).toBe('E0');
    expect(product.categoryEvidence?.['Registration']?.evidenceRigor).toBe('E0');
    expect(product.categoryEvidence?.['Image Synthesis']?.evidenceRigor).toBe('E2');
  });
});