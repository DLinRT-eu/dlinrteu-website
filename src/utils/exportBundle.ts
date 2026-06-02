/**
 * ZIP bundle export for products: CSV + JSON + FHIR + manifest + README.
 *
 * Combines all primary machine-readable outputs into a single download so
 * researchers can grab the full dataset in one click.
 */
import JSZip from "jszip";
import type { ProductDetails } from "@/types/productDetails";
import type { CompanyDetails } from "@/types/company";
import { buildProductsCsv } from "@/utils/exportProducts";
import { exportToFHIR } from "@/utils/fhir";
import { buildManifest, renderManifestReadme } from "@/utils/exportManifest";

export interface BundleExportOptions {
  filename?: string;
  companies?: CompanyDetails[];
}

export async function downloadProductsBundle(
  products: ProductDetails[],
  options: BundleExportOptions = {}
): Promise<void> {
  const { filename = "dlinrt-products-bundle", companies = [] } = options;
  const zip = new JSZip();

  const csv = buildProductsCsv(products);
  const json = JSON.stringify(products, null, 2);
  const fhirResult = exportToFHIR(products, companies, {});
  const fhirJson = JSON.stringify(fhirResult.bundle, null, 2);

  const manifest = buildManifest(
    [
      {
        path: "products.csv",
        description: "Catalogue export, RFC 4180 CSV with ~110 columns.",
        schema: "public/schemas/dlinrt-csv-fields.md",
      },
      {
        path: "products.json",
        description: "Catalogue export, raw JSON matching ProductDetails.",
        schema: "public/schemas/dlinrt-model-card-schema.json",
      },
      {
        path: "products-fhir.json",
        description: "HL7 FHIR R4 Bundle (Device + Organization resources).",
        schema: "https://hl7.org/fhir/R4/bundle.html",
      },
      {
        path: "fhir-warnings.json",
        description: "Warnings raised during FHIR transformation (may be empty).",
      },
      {
        path: "manifest.json",
        description: "Machine-readable manifest of this export.",
      },
      {
        path: "README.md",
        description: "Human-readable description of this export.",
      },
    ],
    products.length
  );

  zip.file("products.csv", csv);
  zip.file("products.json", json);
  zip.file("products-fhir.json", fhirJson);
  zip.file(
    "fhir-warnings.json",
    JSON.stringify(
      { count: fhirResult.warnings.length, warnings: fhirResult.warnings },
      null,
      2
    )
  );
  zip.file("manifest.json", JSON.stringify(manifest, null, 2));
  zip.file("README.md", renderManifestReadme(manifest));

  const blob = await zip.generateAsync({ type: "blob" });
  const safeName = filename.endsWith(".zip") ? filename : `${filename}.zip`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = safeName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
