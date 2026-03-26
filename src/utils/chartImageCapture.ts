import { captureChartById } from '@/hooks/useChartExport';

const CHART_IDS: Record<string, string> = {
  task: 'chart-task',
  location: 'chart-location',
  modality: 'chart-modality',
  company: 'chart-company',
  certification: 'chart-certification',
  evidenceImpact: 'chart-evidence-impact',
  structureType: 'chart-structure-type',
  structure: 'chart-structure',
};

/**
 * Captures all visible dashboard charts as base64 PNG data URLs.
 * Returns a map of chart key to data URL (only for charts found in the DOM).
 */
export async function captureAllDashboardCharts(): Promise<Record<string, string>> {
  const results: Record<string, string> = {};

  const entries = Object.entries(CHART_IDS);
  const captures = await Promise.all(
    entries.map(([key, id]) => captureChartById(id).then(url => ({ key, url })))
  );

  for (const { key, url } of captures) {
    if (url) results[key] = url;
  }

  return results;
}
