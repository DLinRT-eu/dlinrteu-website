/**
 * Export manifest generator.
 *
 * A manifest is a small README + machine-readable JSON sidecar that ships
 * with rich exports (ZIP bundles, multi-file exports). It tells consumers:
 *   - what the export contains
 *   - which schema/version was used
 *   - where to find canonical documentation
 *   - that the data is provided "as is" for informational use
 */

export interface ManifestFileEntry {
  /** File path inside the bundle, e.g. "products.csv" */
  path: string;
  /** Short human description */
  description: string;
  /** Optional schema reference (URL or schema name) */
  schema?: string;
}

export interface ExportManifest {
  schemaVersion: "1.0";
  generator: "DLinRT.eu";
  generatorVersion: string;
  generatedAt: string;
  source: string;
  license: string;
  disclaimer: string;
  recordCount?: number;
  files: ManifestFileEntry[];
}

const GENERATOR_VERSION = "1.0.0";

export const buildManifest = (
  files: ManifestFileEntry[],
  recordCount?: number
): ExportManifest => ({
  schemaVersion: "1.0",
  generator: "DLinRT.eu",
  generatorVersion: GENERATOR_VERSION,
  generatedAt: new Date().toISOString(),
  source: "https://dlinrt.eu",
  license:
    "Catalog content © DLinRT.eu contributors. Provided for informational and research use; verify against the manufacturer's official documentation before clinical decisions.",
  disclaimer:
    "DLinRT.eu is an independent, peer-reviewed reference. Regulatory clearance details, evidence ratings, and HTA mappings are informational and NOT a substitute for official regulatory or HTA documentation.",
  recordCount,
  files,
});

export const renderManifestReadme = (manifest: ExportManifest): string => {
  const fileLines = manifest.files
    .map(
      (f) =>
        `- \`${f.path}\` — ${f.description}${f.schema ? ` (schema: ${f.schema})` : ""}`
    )
    .join("\n");
  return `# DLinRT.eu Data Export

Generated: ${manifest.generatedAt}
Source: ${manifest.source}
${manifest.recordCount !== undefined ? `Records: ${manifest.recordCount}\n` : ""}
## Contents

${fileLines}

## License

${manifest.license}

## Disclaimer

${manifest.disclaimer}

## Citation

Please cite as: "DLinRT.eu — Deep Learning in Radiotherapy catalog, ${manifest.generatedAt.slice(0, 10)} (https://dlinrt.eu)".
`;
};
