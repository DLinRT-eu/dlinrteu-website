
import { ProductDetails } from "@/types/productDetails";

import { PHILIPS_SMARTDOSE_PRODUCTS } from "./philips-smartdose";
import { GE_PRODUCTS } from "./ge-healthcare";
import { SIEMENS_PRODUCTS } from "./siemens";
import { AIRS_MEDICAL_PRODUCTS } from "./airs-medical";
import { UNITED_IMAGING_PRODUCTS } from "./united-imaging";
import { SUBTLE_MEDICAL_PRODUCTS } from "./subtle-medical";
import { SUBTLE_MEDICAL_GAD_PRODUCTS } from "./subtle-medical-gad";
import { ALGOMEDICA_PRODUCTS } from "./algomedica";
import { CLARIPI_PRODUCTS } from "./claripi";


export const IMAGE_ENHANCEMENT_PRODUCTS: ProductDetails[] = [
  
  ...PHILIPS_SMARTDOSE_PRODUCTS,
  ...GE_PRODUCTS,
  ...SIEMENS_PRODUCTS,
  ...AIRS_MEDICAL_PRODUCTS,
  ...UNITED_IMAGING_PRODUCTS,
  ...SUBTLE_MEDICAL_PRODUCTS,
  ...SUBTLE_MEDICAL_GAD_PRODUCTS,
  ...ALGOMEDICA_PRODUCTS,
  ...CLARIPI_PRODUCTS,
];
