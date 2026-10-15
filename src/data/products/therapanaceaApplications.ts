import type { ProductDetails } from '@/types/productDetails';
import { Annotate, TumorBox } from './auto-contouring/therapanacea';
import { THERAPANACEA_BRACHYBOX_PRODUCTS } from './auto-contouring/therapanacea-brachybox';
import { THERAPANACEA_MRBOX_PRODUCTS } from './image-synthesis/therapanacea';
import { THERAPANACEA_ADAPTBOX_PRODUCTS } from './image-synthesis/therapanacea-adaptbox';
import { THERAPANACEA_SMARTFUSE_PRODUCTS } from './registration/therapanacea';
import { THERAPANACEA_PLANNING_PRODUCTS } from './treatment-planning/therapanacea';
import { computeProductEvidenceScore } from '@/utils/evidenceScoring';
import { THERAPANACEA_PLATFORM_PRODUCTS } from './platform/therapanacea-artplan';

const SOURCE_URL = 'https://therapanacea.com/products';
const TECHNICAL_URL = 'https://therapanacea.com/technical-information-2';
const RETRIEVED_ON = '2026-10-15';

function application(base: ProductDetails, id: string, name: string): ProductDetails {
  return {
    ...base, id, name, version: '3.2.1', lastUpdated: RETRIEVED_ON, lastRevised: RETRIEVED_ON,
    productUrl: SOURCE_URL, website: SOURCE_URL,
    githubUrl: 'https://github.com/DLinRT-eu/dlinrteu-website/blob/main/src/data/products/therapanaceaApplications.ts',
    partOf: { name: 'ART-Plan', version: '3.2.1', relationship: 'Application', productUrl: SOURCE_URL },
    source: `Current application naming: ${SOURCE_URL} (retrieved ${RETRIEVED_ON}); Legal device ART-Plan+ v3.2.1, UDI (01)03770019940020(8012) v3.2.1(11)260724: ${TECHNICAL_URL} (retrieved ${RETRIEVED_ON}); ${base.source ?? ''}`,
    regulatory: {
      ...base.regulatory,
      intendedUseStatement: `${base.regulatory?.intendedUseStatement ?? ''} Current technical information identifies the legal device as ART-Plan+ v3.2.1; the public commercial presentation is ART-Plan. FDA K253091 concerns ART-Plan+ v3.1.0, not a separate clearance for v3.2.1. Source: ${TECHNICAL_URL}, retrieved ${RETRIEVED_ON}.`,
    },
  };
}

function history(product: ProductDetails, functionName: string): NonNullable<ProductDetails['nameHistory']>[number] {
  return {
    name: product.name, productId: product.id, function: functionName,
    version: product.version, sourceUrl: SOURCE_URL, retrievedOn: RETRIEVED_ON,
    notes: 'Former DLinRT module label; now represented by function within the ART-Plan application. This is catalogue regrouping, not a confirmed vendor device merger. Historical names also appear in the structure brochure, publications or technical information.',
  };
}

function segmentation(): ProductDetails {
  const mr = THERAPANACEA_MRBOX_PRODUCTS[0];
  const brachy = THERAPANACEA_BRACHYBOX_PRODUCTS[0];
  const fusion = THERAPANACEA_SMARTFUSE_PRODUCTS[0];
  if (!mr || !brachy || !fusion) throw new Error('Missing TheraPanacea historical module');
  const functions = [
    { id: 'ct-contouring', label: 'CT OAR & lymph-node segmentation (Annotate)', product: Annotate },
    { id: 'tumour', label: 'MR tumour segmentation (TumorBox)', product: TumorBox },
    { id: 'brachytherapy', label: 'MR brachytherapy segmentation (BrachyBox)', product: brachy },
    { id: 'mr-synthetic-ct', label: 'MR synthetic CT & OAR segmentation (MR-Box)', product: mr },
    { id: 'registration', label: 'Image registration & contour propagation (SmartFuse)', product: fusion },
  ];
  const product = application(Annotate, 'therapanacea-art-plan-segmentation', 'ART-Plan Segmentation');
  product.description = 'ART-Plan application for CT/MR organs-at-risk, lymph-node and tumour segmentation, MR brachytherapy contouring, MR-to-synthetic-CT generation, and image fusion. Former module names and function-specific evidence are retained below.';
  product.secondaryCategories = ['Image Synthesis', 'Registration'];
  product.modality = ['CT', 'MRI', 'PET', 'CBCT', '4D-CT'];
  product.anatomicalLocation = [...new Set(functions.flatMap(f => f.product.anatomicalLocation ?? []))];
  product.features = ['CT/MR OAR and lymph-node segmentation', 'MR GBM and multiple-metastasis tumour segmentation', 'MR brachytherapy OAR segmentation', 'MR-to-synthetic-CT generation', 'Multi-modality rigid and deformable image fusion'];
  product.keyFeatures = product.features;
  product.technicalSpecifications = {
    population: 'Adult patients undergoing radiotherapy', input: ['CT', 'MRI', 'PET', 'CBCT', '4D-CT'],
    inputFormat: ['DICOM', 'DICOM-RTSTRUCT'], output: ['Structure sets', 'MR-derived synthetic CT', 'Registrations and propagated contours'],
    outputFormat: ['DICOM', 'DICOM-RTSTRUCT'],
  };
  product.functionEvidence = functions;
  product.nameHistory = functions.map(f => history(f.product, f.label));
  product.nameHistory.push({ name: 'ART-Plan+', productId: 'therapanacea-art-plan', function: 'Legal platform name retained in regulatory documentation', version: '3.2.1', sourceUrl: TECHNICAL_URL, retrievedOn: RETRIEVED_ON, notes: 'The former standalone DLinRT platform record is now represented by the three application records. ART-Plan+ remains the legal device name, not an obsolete clearance.' });
  product.priorVersions = product.nameHistory.map(h => ({ name: h.name, productId: h.productId, notes: h.function }));
  product.supportedStructures = [...new Set([Annotate, mr, brachy].flatMap(p => (p.supportedStructures ?? []).map(s => typeof s === 'string' ? s : s.name)))];
  product.structuresProvenance = { source: 'TheraPanacea structure brochure v3.2.0 (ART-BRO-AN-07EU)', sourceAccess: 'public', sourceRetrievedOn: RETRIEVED_ON, sourceUrl: 'https://d2oi0h5pbjc5wm.cloudfront.net/product/products-structures-brochure.pdf', notes: 'Combined CT, MR and MR-brachytherapy lists from the v3.2.0 brochure; model prefixes retain modality and anatomy. No CBCT synthetic-CT structures are included here; those belong to ART-Plan Adaptive. No itemised tumour list is published. Structure contents are preserved from the previously verified module records; software v3.2.1 does not imply a new structure-library revision.' };
  product.keyPapers = functions.flatMap(f => (f.product.keyPapers ?? []).map(p => ({ ...p, appliesToCategory: f.product.category })));
  product.categoryEvidence = {
    'Auto-Contouring': { evidenceRigor: Annotate.evidenceRigor, clinicalImpact: Annotate.clinicalImpact, adoptionReadiness: Annotate.adoptionReadiness, notes: 'CT, tumour and brachytherapy evidence is separated further by function below. MR-Box OAR contouring has no standalone published validation; MR synthesis evidence must not be applied to it.' },
    'Image Synthesis': { ...mr.categoryEvidence?.['Image Synthesis'], trainingData: mr.trainingData, evaluationData: mr.evaluationData, limitations: mr.limitations },
    'Registration': { usesAI: true, evidenceRigor: fusion.evidenceRigor, clinicalImpact: fusion.clinicalImpact, adoptionReadiness: fusion.adoptionReadiness, trainingData: fusion.trainingData, evaluationData: fusion.evaluationData, limitations: fusion.limitations },
  };
  const score = computeProductEvidenceScore(product);
  product.evidenceRigor = score.rigor; product.clinicalImpact = score.impact;
  product.efficacyProvisional = score.impactProvisional;
  product.evidenceRigorNotes = 'Application scores are maxima across attributable papers, not validation of every function. Refer to function-specific evidence below.';
  product.clinicalImpactNotes = product.evidenceRigorNotes;
  product.limitations = ['Different functions have different evidence and regulatory scopes; a score for one function must not be interpreted as validation of all functions.', 'SmartFuse has no independently identified function-specific FDA clearance; the application certification summary must not be read as clearance of every registration function.', 'Structure models are modality-locked; CT, MR and MR-brachytherapy lists are not interchangeable across imaging modalities.', 'MR synthetic CT is distinct from CBCT synthetic CT in ART-Plan Adaptive.', 'Not all models are available in all markets. All generated images, contours and registrations require professional verification.', 'Tumour and brachytherapy functions retain their limited public evidence; see function-specific limitations.'];
  return product;
}

function planning(): ProductDetails {
  const base = THERAPANACEA_PLANNING_PRODUCTS[0];
  if (!base) throw new Error('Missing SmartPlan');
  const product = application(base, 'therapanacea-art-plan-planning', 'ART-Plan Planning');
  product.description = 'ART-Plan automatic treatment-planning application, previously catalogued as SmartPlan. Generates plans for supported prostate prescriptions for dose calculation, review and approval in the user’s TPS; FDA anatomy and prescription restrictions remain applicable.';
  product.nameHistory = [history(base, 'Automatic treatment planning')];
  product.functionEvidence = [{ id: 'planning', label: 'Automatic treatment planning (SmartPlan)', product: base }];
  product.priorVersions = [{ name: base.name, productId: base.id, notes: 'Former module label' }];
  return product;
}

function adaptive(): ProductDetails {
  const base = THERAPANACEA_ADAPTBOX_PRODUCTS[0];
  if (!base) throw new Error('Missing AdaptBox');
  const product = application(base, 'therapanacea-art-plan-adaptive', 'ART-Plan Adaptive');
  product.description = 'ART-Plan offline adaptive application, previously catalogued as AdaptBox. Generates CBCT-derived synthetic/augmented CT, delineates OARs, propagates target contours and compares reconstructed dose to support monitoring and offline replanning assessment.';
  product.secondaryCategories = ['Auto-Contouring', 'Registration'];
  product.nameHistory = [history(base, 'CBCT synthetic CT and offline adaptive assessment')];
  product.priorVersions = [{ name: base.name, productId: base.id, notes: 'Former module label, still used in a current vendor testimonial' }];
  product.keyPapers = base.keyPapers?.filter(p => p.doi !== '10.1016/j.radonc.2026.111530');
  product.evidence = base.evidence?.filter(e => typeof e === 'string' || !e.link?.includes('10.1016/j.radonc.2026.111530')) as ProductDetails['evidence'];
  product.evaluationData = {
    ...base.evaluationData,
    description: 'Vendor-associated prostate dose-reconstruction study and vendor-associated multicentre CBCT synthetic-CT study. These publications do not establish independent validation of every adaptive function.',
    studyDesign: 'Vendor-associated retrospective prostate workflow study and multicentre synthetic-CT evaluation',
    source: 'Prunaretty et al., Cancers 2026 and Frontiers in Oncology 2026; per-paper affiliation and endpoint assessment retained below.',
    sourceUrl: 'https://doi.org/10.3390/cancers18111826',
  };
  product.categoryEvidence = {
    ...base.categoryEvidence,
    'Image Synthesis': {
      ...base.categoryEvidence?.['Image Synthesis'],
      notes: 'CBCT-to-synthetic-CT and daily dose-reconstruction evidence is attributable to AdaptBox. Both listed studies involve the vendor. MRI-only MESCAL is retained solely with the MR synthetic-CT function in Segmentation.',
      evaluationData: product.evaluationData,
      evidenceRigorNotes: 'E2 is supported by the vendor-associated multicentre Frontiers in Oncology study; the single-centre Cancers workflow study is E1. Evidence is not independent validation of every anatomy or function.',
    },
    'Registration': {
      usesAI: true, evidenceRigor: 'E0', clinicalImpact: 'L1c', efficacyProvisional: true,
      notes: 'Target propagation and deformable registration are included in the adaptive workflow, but no standalone function-specific assessment is assigned from the synthesis papers.',
      evaluationData: { description: 'No separately assessed registration validation retained in this record.', source: 'ART-Plan+ technical information, retrieved 2026-10-15', sourceUrl: TECHNICAL_URL },
    },
  };
  product.evidenceRigorNotes = product.categoryEvidence['Image Synthesis']?.evidenceRigorNotes;
  product.clinicalImpactNotes = 'Listed studies measure image/dosimetric and daily dose-reconstruction endpoints (L2), not patient-outcome or socioeconomic efficacy.';
  product.functionEvidence = [{ id: 'cbct-synthetic-ct', label: 'CBCT synthetic CT & offline adaptive workflow (AdaptBox)', product: { ...product, id: base.id, name: base.name, functionEvidence: undefined } }];
  product.structuresProvenance = { source: 'TheraPanacea structure brochure v3.2.0 (ART-BRO-AN-07EU)', sourceAccess: 'public', sourceRetrievedOn: RETRIEVED_ON, ...base.structuresProvenance, sourceUrl: 'https://d2oi0h5pbjc5wm.cloudfront.net/product/products-structures-brochure.pdf' };
  const score = computeProductEvidenceScore(product);
  product.evidenceRigor = score.rigor; product.clinicalImpact = score.impact; product.efficacyProvisional = score.impactProvisional;
  return product;
}

export const THERAPANACEA_SEGMENTATION = segmentation();
export const THERAPANACEA_PLANNING = planning();
export const THERAPANACEA_ADAPTIVE = adaptive();
export const THERAPANACEA_APPLICATIONS = [THERAPANACEA_SEGMENTATION, THERAPANACEA_PLANNING, THERAPANACEA_ADAPTIVE];

/** Historical reviews and drafts retain their exact original module scope and ID. */
export const THERAPANACEA_HISTORICAL_PRODUCTS: ProductDetails[] = [
  Annotate, TumorBox, ...THERAPANACEA_BRACHYBOX_PRODUCTS, ...THERAPANACEA_MRBOX_PRODUCTS,
  ...THERAPANACEA_ADAPTBOX_PRODUCTS, ...THERAPANACEA_SMARTFUSE_PRODUCTS,
  ...THERAPANACEA_PLANNING_PRODUCTS, ...THERAPANACEA_PLATFORM_PRODUCTS,
  ...[TumorBox, ...THERAPANACEA_BRACHYBOX_PRODUCTS, ...THERAPANACEA_PLANNING_PRODUCTS].map(p => ({ ...p, id: `${p.id}-pipeline` })),
];
