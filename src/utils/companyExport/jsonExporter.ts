import { CompanyExportData } from './types';

export const exportCompaniesToJSON = (companiesData: CompanyExportData[]) => {
  const exportData = {
    exportMetadata: {
      exportDate: new Date().toISOString(),
      exportVersion: '1.0',
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
        id: product.id,
        name: product.name,
        category: product.category,
        description: product.description,
        releaseDate: product.releaseDate,
        regulatory: product.regulatory,
        website: product.website,
        logoUrl: product.logoUrl
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
