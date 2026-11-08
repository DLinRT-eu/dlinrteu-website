/**
 * Minimal OpenAlex client for DOI look-ups (https://openalex.org).
 *
 * Single-work look-ups need no API key. A free key raises the daily budget
 * and is only needed for bulk/cursor paging, which this helper does not do.
 * Results are metadata only: they prefill fields that a reviewer still checks.
 */

export interface OpenAlexWorkSummary {
  doi: string;
  title?: string;
  /** "Surname1 I, Surname2 I, Surname3 I, et al." (Vancouver-style, max 3). */
  authors?: string;
  year?: string;
  journal?: string;
  /** Best open-access location, if OpenAlex knows one. */
  oaUrl?: string;
  openAlexId?: string;
  /** Work type as reported by OpenAlex (article, review, preprint, ...). */
  type?: string;
}

/** Strip resolver prefixes ("https://doi.org/", "doi:") and whitespace; lower-case. */
export const normalizeDoi = (raw: string | undefined | null): string | null => {
  if (!raw) return null;
  const doi = raw
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
    .replace(/^doi:\s*/i, "")
    .trim()
    .toLowerCase();
  return /^10\.\d{4,9}\/\S+$/.test(doi) ? doi : null;
};

const vancouverName = (displayName: string): string => {
  const parts = displayName.trim().split(/\s+/);
  if (parts.length < 2) return displayName.trim();
  const surname = parts[parts.length - 1];
  const initials = parts
    .slice(0, -1)
    .map((p) => p.replace(/[^A-Za-zÀ-ÿ]/g, "").charAt(0).toUpperCase())
    .join("");
  return `${surname} ${initials}`;
};

/** Convert an OpenAlex work object into the fields the catalogue stores. */
export const summarizeOpenAlexWork = (work: any, doi: string): OpenAlexWorkSummary => {
  const names: string[] = Array.isArray(work?.authorships)
    ? work.authorships
        .map((a: any) => a?.author?.display_name)
        .filter((n: unknown): n is string => typeof n === "string" && n.length > 0)
    : [];
  const authors =
    names.length === 0
      ? undefined
      : names.slice(0, 3).map(vancouverName).join(", ") + (names.length > 3 ? ", et al." : "");
  return {
    doi,
    title: work?.title ?? work?.display_name ?? undefined,
    authors,
    year: work?.publication_year ? String(work.publication_year) : undefined,
    journal: work?.primary_location?.source?.display_name ?? undefined,
    oaUrl: work?.open_access?.oa_url ?? work?.best_oa_location?.pdf_url ?? undefined,
    openAlexId: work?.id ?? undefined,
    type: work?.type ?? undefined,
  };
};

/**
 * Look up one DOI. Returns null when OpenAlex has no record (HTTP 404);
 * throws on other errors so the UI can report them.
 */
export const fetchOpenAlexWorkByDoi = async (
  rawDoi: string,
  signal?: AbortSignal,
): Promise<OpenAlexWorkSummary | null> => {
  const doi = normalizeDoi(rawDoi);
  if (!doi) throw new Error("Not a valid DOI (expected 10.xxxx/...)");
  const url = `https://api.openalex.org/works/doi:${encodeURIComponent(doi)}`;
  const res = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (res.status === 404) return null;
  if (res.status === 429) throw new Error("OpenAlex rate limit reached — try again in a moment");
  if (!res.ok) throw new Error(`OpenAlex returned HTTP ${res.status}`);
  return summarizeOpenAlexWork(await res.json(), doi);
};
