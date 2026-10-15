import { describe, expect, test } from 'bun:test';
import { ALL_PRODUCTS } from '../src/data';
import dataService from '../src/services/DataService';
import { isDiscontinuedProduct } from '../src/utils/productLifecycle';
import { getEvidenceMatrixProducts } from '../src/utils/evidenceMatrix';
import { buildProductsCsv } from '../src/utils/exportProducts';

describe('public historical market lifecycle', () => {
  test('DLC Expert is historical and is excluded from current listings and all filter paths', () => {
    expect(dataService.getDiscontinuedProducts().map(p => p.id)).toContain('mirada-dlc');
    expect(dataService.getAllProducts().some(p => p.id === 'mirada-dlc')).toBe(false);
    expect(dataService.getProductsByCategory('Auto-Contouring').some(p => p.id === 'mirada-dlc')).toBe(false);
    expect(dataService.filterProducts({ tasks: [], modalities: [], locations: [], certifications: ['pipeline'] }).some(p => p.id === 'mirada-dlc')).toBe(false);
    expect(dataService.getTotalProductCount()).toBe(new Set([...dataService.getAllProducts(), ...dataService.getPipelineProducts()].map(p => p.id)).size);
  });
  test('historical product IDs and vendor history remain publicly retrievable', () => {
    expect(dataService.getProductById('mirada-dlc')?.name).toBe('DLC Expert');
    const vendor = dataService.getAllCompaniesWithProducts().find(c => c.productIds.includes('mirada-dlc'));
    expect(vendor).toBeDefined();
    if (!vendor) throw new Error('Missing Mirada company');
    expect(dataService.getDiscontinuedProductsByCompany(vendor.id).map(p => p.id)).toContain('mirada-dlc');
    expect(dataService.getProductsByCompany(vendor.id).some(p => p.id === 'mirada-dlc')).toBe(false);
    expect(dataService.getActiveCompanies().some(c => c.id === vendor.id)).toBe(false);
  });
  test('GE remains unconfirmed and its distinct CT/MR records stay in current listings', () => {
    expect(dataService.getProductById('ge-auto-segmentation')?.market?.status?.verification).toBe('unconfirmed');
    for (const id of ['ge-auto-segmentation', 'ge-mr-contour-dl']) expect(dataService.getAllProducts().some(p => p.id === id)).toBe(true);
    expect(dataService.getDiscontinuedProducts().some(p => p.id === 'ge-auto-segmentation')).toBe(false);
  });
  test('discontinuation does not mutate stored evidence and excludes the historical product from dashboard sets', () => {
    const historical = ALL_PRODUCTS.find(p => p.id === 'mirada-dlc');
    if (!historical) throw new Error('Missing DLC Expert');
    expect([historical.evidenceRigor, historical.clinicalImpact, historical.adoptionReadiness]).toEqual(['E2', 'L3', 'R3']);
    expect(getEvidenceMatrixProducts([historical])).toEqual([]);
    expect(isDiscontinuedProduct({ ...historical, market: { status: { verification: 'unconfirmed', event: 'availability-review', reason: 'Pending', source: 'Report', sourceAccess: 'restricted', sourceRetrievedOn: '2026-10-15' } } })).toBe(false);
  });
  test('historical CSV retains lifecycle provenance and sourced successor', () => {
    const historical = dataService.getProductById('mirada-dlc');
    if (!historical) throw new Error('Missing DLC Expert');
    const csv = buildProductsCsv([{ ...historical, supersededBy: 'test-successor' }]);
    expect(csv).toContain('end-of-sales');
    expect(csv).toContain('2026-10-15');
    expect(csv).toContain('test-successor');
    expect(csv).toContain(historical.market?.status?.sourceUrl ?? 'MISSING SOURCE');
  });
  test('excluded duplicate archives are not reintroduced and pipeline products remain separate', () => {
    expect(dataService.getProductById('ge-dlip-ct')).toBeUndefined();
    expect(dataService.getPipelineProducts().length).toBeGreaterThan(0);
    expect(dataService.getPipelineProducts().some(isDiscontinuedProduct)).toBe(false);
  });
});