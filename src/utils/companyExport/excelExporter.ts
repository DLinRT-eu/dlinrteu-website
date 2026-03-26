import { exportToExcelMultiSheet } from '../excelExport';
import { CompanyExportData } from './types';

export const exportCompaniesToExcel = async (companiesData: CompanyExportData[]) => {
  // Sheet 1: Companies Summary
  const summaryData = companiesData.map(({ company, products, statistics }) => ({
    'Company Name': company.name,
    'Website': company.website,
    'Total Products': statistics.totalProducts,
    'Categories': statistics.categories.join(', '),
    'CE Certified': statistics.certifications.ce,
    'FDA Cleared': statistics.certifications.fda,
    'Description': company.description,
  }));

  // Sheet 2: All Products by Company
  const productsData: Record<string, any>[] = [];
  companiesData.forEach(({ company, products }) => {
    products.forEach((product, index) => {
      productsData.push({
        'Company': index === 0 ? company.name : '',
        'Product': product.name,
        'Category': product.category,
        'CE Status': product.regulatory?.ce?.status || 'N/A',
        'FDA Status': typeof product.regulatory?.fda === 'string' 
          ? product.regulatory.fda 
          : product.regulatory?.fda?.status || 'N/A',
        'Release Date': product.releaseDate || 'N/A',
        'Description': product.description,
      });
    });
  });

  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `DLinRT_Companies_${timestamp}.xlsx`;
  
  await exportToExcelMultiSheet([
    { name: 'Companies Summary', data: summaryData, columnWidths: [20, 30, 12, 30, 12, 12, 50] },
    { name: 'All Products', data: productsData, columnWidths: [20, 25, 20, 15, 15, 12, 50] }
  ], filename);
};
