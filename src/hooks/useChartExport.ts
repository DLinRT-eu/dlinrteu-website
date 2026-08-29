import { useRef, useCallback } from 'react';

/**
 * Serializes an SVG element (plus surrounding background) to a PNG data URL via canvas.
 */
async function svgToDataUrl(svgEl: SVGSVGElement, bgColor = '#ffffff'): Promise<string> {
  const { width, height } = svgEl.getBoundingClientRect();
  const clone = svgEl.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('width', String(width));
  clone.setAttribute('height', String(height));
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  // Inline computed styles for faithful reproduction
  const allOriginal = svgEl.querySelectorAll('*');
  const allCloned = clone.querySelectorAll('*');
  allOriginal.forEach((orig, i) => {
    const cs = window.getComputedStyle(orig);
    const el = allCloned[i] as SVGElement | HTMLElement;
    if (el && el.style) {
      el.style.cssText = cs.cssText;
    }
  });

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = 2; // retina
      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d')!;
      ctx.scale(scale, scale);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

/**
 * Captures the full chart container (including titles, HTML legends, etc.) as a PNG.
 * html2canvas is used first because Recharts renders legends as HTML next to the
 * SVG plot; the SVG-only path stays as a fallback.
 */
async function containerToDataUrl(container: HTMLElement, bgColor = '#ffffff'): Promise<string> {
  const svgs = Array.from(container.querySelectorAll('svg')) as SVGSVGElement[];
  const renderable = svgs.filter(svg => {
    const { width, height } = svg.getBoundingClientRect();
    return width > 0 && height > 0;
  });
  const rect = container.getBoundingClientRect();
  // Some dashboard charts (e.g. the evidence/impact matrix) are pure HTML grids,
  // so an SVG is not required — only a container with real dimensions.
  if (renderable.length === 0 && (rect.width === 0 || rect.height === 0)) {
    throw new Error('Chart container has no renderable content');
  }

  try {
    const { default: html2canvas } = await import('html2canvas');
    const canvas = await html2canvas(container, {
      backgroundColor: bgColor,
      scale: 2,
      logging: false,
      useCORS: true,
    });
    if (canvas.width > 0 && canvas.height > 0) {
      return canvas.toDataURL('image/png');
    }
  } catch (e) {
    console.warn('html2canvas capture failed, falling back to SVG capture:', e);
  }

  if (renderable.length === 0) throw new Error('No renderable SVG found in container');
  return svgToDataUrl(renderable[0], bgColor);
}


export function useChartExport(chartId?: string) {
  const chartRef = useRef<HTMLDivElement>(null);

  const getChartDataUrl = useCallback(async (): Promise<string | null> => {
    const el = chartRef.current ?? (chartId ? document.getElementById(chartId) : null);
    if (!el) return null;
    try {
      return await containerToDataUrl(el as HTMLElement);
    } catch (e) {
      console.warn('Chart export failed:', e);
      return null;
    }
  }, [chartId]);

  const exportToPng = useCallback(async (filename = 'chart') => {
    const dataUrl = await getChartDataUrl();
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${filename}.png`;
    a.click();
  }, [getChartDataUrl]);

  return { chartRef, exportToPng, getChartDataUrl };
}

/**
 * Captures a chart by its DOM id attribute.
 */
export async function captureChartById(id: string): Promise<string | null> {
  const el = document.getElementById(id);
  if (!el) return null;
  try {
    return await containerToDataUrl(el);
  } catch (e) {
    console.warn(`Failed to capture chart ${id}:`, e);
    return null;
  }
}
