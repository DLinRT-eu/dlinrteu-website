import { CompanyDetails } from "@/types/company";
import { Product } from "@/types/product";

export interface CompanyExportData {
  company: CompanyDetails;
  products: Product[];
  statistics: {
    totalProducts: number;
    categories: string[];
    certifications: {
      ce: number;
      fda: number;
    };
  };
}
