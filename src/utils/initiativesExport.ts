/**
 * Extended initiatives exporters: Excel workbook and schema.org JSON-LD.
 */
import type { Initiative } from "@/types/initiative";
import { exportToExcelSimple } from "@/utils/excelExport";

export async function exportInitiativesToExcel(
  initiatives: Initiative[],
  filename = "dlinrt-initiatives"
): Promise<void> {
  const rows = initiatives.map((i) => ({
    ID: i.id,
    Name: i.name,
    Organization: i.organization,
    Category: i.category,
    Status: i.status,
    Description: i.description,
    "Start date": i.startDate ?? "",
    "End date": i.endDate ?? "",
    Tags: i.tags?.join(", ") ?? "",
    Website: i.website ?? "",
  }));
  const safe = filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`;
  await exportToExcelSimple(rows, safe, "Initiatives");
}

/**
 * Schema.org JSON-LD export.
 *
 * Each initiative is mapped to either Dataset (datasets), ResearchProject
 * (challenges, model zoos), or SoftwareApplication (LLM platforms) so the
 * file is consumable by search engines and dataset registries.
 */
export function exportInitiativesToJsonLd(
  initiatives: Initiative[],
  filename = "dlinrt-initiatives-jsonld"
): void {
  const graph = initiatives.map((i) => {
    const base = {
      "@id": `https://dlinrt.eu/initiatives#${i.id}`,
      name: i.name,
      description: i.description,
      url: i.website,
      provider: i.organization
        ? { "@type": "Organization", name: i.organization }
        : undefined,
      keywords: i.tags?.join(", "),
      startDate: i.startDate,
      endDate: i.endDate,
    };
    let type = "CreativeWork";
    if (i.category === "dataset") type = "Dataset";
    else if (i.category === "challenge" || i.category === "modelZoo")
      type = "ResearchProject";
    else if (i.category === "llmPlatform") type = "SoftwareApplication";
    return { "@type": type, ...base };
  });

  const doc = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  const json = JSON.stringify(doc, null, 2);
  const blob = new Blob([json], { type: "application/ld+json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const safe = filename.endsWith(".jsonld") ? filename : `${filename}.jsonld`;
  a.href = url;
  a.download = safe;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
