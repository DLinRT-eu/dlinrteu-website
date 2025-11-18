import * as XLSX from 'xlsx';
import { CompanyExportData } from './types';

export const exportCompaniesToExcel = (companiesData: CompanyExportData[]) => {
  const workbook = XLSX.utils.book_new();

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

  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  summarySheet['!cols'] = [
    { wch: 20 }, { wch: 30 }, { wch: 12 }, { wch: 30 },
    { wch: 12 }, { wch: 12 }, { wch: 50 }
  ];
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Companies Summary');

  // Sheet 2: All Products by Company
  const productsData: any[] = [];
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

  const productsSheet = XLSX.utils.json_to_sheet(productsData);
  productsSheet['!cols'] = [
    { wch: 20 }, { wch: 25 }, { wch: 20 }, { wch: 15 },
    { wch: 15 }, { wch: 12 }, { wch: 50 }
  ];
  XLSX.utils.book_append_sheet(workbook, productsSheet, 'All Products');

  // Generate and download
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `DLinRT_Companies_${timestamp}.xlsx`;
  XLSX.writeFile(workbook, filename);
};
