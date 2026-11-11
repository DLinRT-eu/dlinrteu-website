import { getExportEudamed } from '@/utils/eudamed';
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
        'EUDAMED Basic UDI-DI': getExportEudamed(product).record?.basicUdi || 'N/A',
        'EUDAMED UDI-DI': getExportEudamed(product).record?.primaryDi || 'N/A',
        'EUDAMED EMDN Code': getExportEudamed(product).record?.emdnCode || 'N/A',
        'EUDAMED Risk Class': getExportEudamed(product).record?.riskClass || 'N/A',
        'EUDAMED Data Source': getExportEudamed(product).source || 'N/A',
        'EUDAMED All Basic UDI-DIs': getExportEudamed(product).all.map((r) => r.basicUdi).join('; ') || 'N/A',
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
