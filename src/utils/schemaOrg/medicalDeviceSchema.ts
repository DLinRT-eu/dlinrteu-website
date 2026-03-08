/**
 * Schema.org MedicalDevice JSON-LD Generator
 * 
 * Generates structured data markup for product pages to improve
 * SEO and discoverability via Google, Bing, and linked data consumers.
 * Uses Schema.org MedicalDevice type with Product fallback properties.
 */

import { ProductDetails } from "@/types/productDetails";

export interface MedicalDeviceSchema {
  "@context": "https://schema.org";
  "@type": string[];
  name: string;
  description?: string;
  manufacturer?: {
    "@type": "Organization";
    name: string;
    url?: string;
  };
  category?: string;
  version?: string;
  url?: string;
  releaseDate?: string;
  additionalProperty?: Array<{
    "@type": "PropertyValue";
    name: string;
    value: string;
  }>;
  isAccessibleForFree?: boolean;
}

/**
 * Generate Schema.org JSON-LD for a product detail page.
 * Uses both MedicalDevice and Product types for maximum compatibility.
 */
export function generateMedicalDeviceSchema(product: ProductDetails): MedicalDeviceSchema {
  const schema: MedicalDeviceSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalDevice", "Product"],
    name: product.name,
    description: product.description,
  };

  // Manufacturer
  if (product.company) {
    schema.manufacturer = {
      "@type": "Organization",
      name: product.company,
      url: product.companyUrl || undefined,
    };
  }

  // Category
  if (product.category) {
    schema.category = product.category;
  }

  // Version
  if (product.version) {
    schema.version = product.version;
  }

  // Product URL
  if (product.productUrl) {
    schema.url = product.productUrl;
  }

  // Release date
  if (product.releaseDate) {
    schema.releaseDate = product.releaseDate;
  }

  // Additional structured properties
  const additionalProps: Array<{ "@type": "PropertyValue"; name: string; value: string }> = [];

  // Modality
  const modality = Array.isArray(product.modality) ? product.modality.join(", ") : product.modality;
  if (modality) {
    additionalProps.push({ "@type": "PropertyValue", name: "Imaging Modality", value: modality });
  }

  // Regulatory CE
  if (product.regulatory?.ce?.status) {
    let ceValue = product.regulatory.ce.status;
    if (product.regulatory.ce.class) ceValue += ` (Class ${product.regulatory.ce.class})`;
    additionalProps.push({ "@type": "PropertyValue", name: "CE Marking", value: ceValue });
  }

  // Regulatory FDA
  if (product.regulatory?.fda) {
    const fda = typeof product.regulatory.fda === 'string' ? product.regulatory.fda :
      `${product.regulatory.fda.status}${product.regulatory.fda.clearanceNumber ? ` (${product.regulatory.fda.clearanceNumber})` : ''}`;
    additionalProps.push({ "@type": "PropertyValue", name: "FDA Status", value: fda });
  }

  // Evidence classification
  if (product.evidenceRigor) {
    additionalProps.push({
      "@type": "PropertyValue",
      name: "Evidence Rigor",
      value: product.evidenceRigor,
    });
  }

  if (product.clinicalImpact) {
    additionalProps.push({
      "@type": "PropertyValue",
      name: "Clinical Impact",
      value: product.clinicalImpact,
    });
  }

  // Anatomy
  const anatomy = product.anatomicalLocation || product.anatomy;
  if (anatomy && anatomy.length > 0) {
    additionalProps.push({
      "@type": "PropertyValue",
      name: "Anatomical Location",
      value: anatomy.join(", "),
    });
  }

  if (additionalProps.length > 0) {
    schema.additionalProperty = additionalProps;
  }

  return schema;
}
