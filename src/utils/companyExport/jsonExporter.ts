import { CompanyExportData } from './types';

export const exportCompaniesToJSON = (companiesData: CompanyExportData[]) => {
  const exportData = {
    exportMetadata: {
      exportDate: new Date().toISOString(),
      exportVersion: '2.0',
      totalCompanies: companiesData.length,
      totalProducts: companiesData.reduce((sum, c) => sum + c.statistics.totalProducts, 0),
      source: 'DLinRT.eu Database'
    },
    companies: companiesData.map(({ company, products, statistics }) => ({
      id: company.id,
      name: company.name,
      website: company.website,
      logoUrl: company.logoUrl,
      description: company.description,
      statistics,
      products: products.map(product => ({
        // Basic Information
        id: product.id,
        name: product.name,
        company: product.company,
        category: product.category,
        description: product.description,
        version: product.version,
        releaseDate: product.releaseDate,
        lastUpdated: product.lastUpdated,
        lastRevised: product.lastRevised,
        
        // URLs
        website: product.website,
        productUrl: product.productUrl,
        companyUrl: product.companyUrl,
        githubUrl: product.githubUrl,
        logoUrl: product.logoUrl,
        
        // Features
        features: product.features || [],
        keyFeatures: product.keyFeatures || [],
        
        // Clinical Scope
        anatomicalLocation: product.anatomicalLocation || [],
        modality: product.modality,
        subspeciality: product.subspeciality,
        diseaseTargeted: product.diseaseTargeted || [],
        supportedStructures: product.supportedStructures || [],
        
        // Technical Details
        technicalSpecifications: product.technicalSpecifications || null,
        technology: product.technology || null,
        
        // Regulatory Information
        regulatory: product.regulatory || null,
        
        // Market Information
        market: product.market || null,
        pricing: product.pricing || null,
        
        // Clinical Evidence
        clinicalEvidence: product.clinicalEvidence || null,
        evidence: product.evidence || [],
        limitations: product.limitations || [],
        
        // Guidelines Compliance
        guidelines: product.guidelines || [],
        
        // Developer/OEM Information
        developedBy: product.developedBy || null
      }))
    }))
  };

  const jsonContent = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  const timestamp = new Date().toISOString().split('T')[0];
  a.setAttribute('download', `DLinRT_Companies_${timestamp}.json`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
