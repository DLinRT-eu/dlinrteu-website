/**
 * Citation formatting utilities for evidence entries.
 *
 * Evidence items are stored either as plain DOI strings (legacy) or as
 * { type, description, link, ...optional structured fields } objects.
 * This module produces a uniform { authors, year, title, journal, locator, doi }
 * shape for display, preferring structured fields and falling back to a
 * tolerant parser over the legacy free-form `description` string.
 */

export interface RawEvidenceObject {
  type?: string;
  description?: string;
  link?: string;
  level?: string;
  // Optional structured fields (forward-looking; no migration required)
  authors?: string;
  year?: string | number;
  title?: string;
  journal?: string;
  doi?: string;
}

export type RawEvidence = string | RawEvidenceObject;

export interface FormattedCitation {
  type?: string;
  level?: string;
  authors?: string;
  year?: string;
  title?: string;
  journal?: string;
  locator?: string; // e.g. "16(11):5681"
  doi?: string;
  doiUrl?: string;
  link?: string;
  raw?: string;
  parsed: boolean;
}

const DOI_PREFIX_RE = /^(https?:\/\/(?:dx\.)?doi\.org\/)|^doi:\s*/i;

export function extractDoi(input?: string): { doi?: string; doiUrl?: string } {
  if (!input) return {};
  const trimmed = input.trim();
  if (!trimmed) return {};
  const bare = trimmed.replace(DOI_PREFIX_RE, "");
  // A DOI starts with "10." followed by a registrant code.
  if (/^10\.\d{4,9}\/\S+$/i.test(bare)) {
    return { doi: bare, doiUrl: `https://doi.org/${bare}` };
  }
  // Not a DOI link (could be a regular URL).
  return {};
}

/**
 * Parse a legacy free-form description like:
 *   "Bayley et al. Comparison of two auto-contouring systems for H&N OARs
 *    to institutional reference standard. Appl Sci 2026;16(11):5681"
 *
 * Heuristic, tolerant: returns whatever fields it can confidently extract.
 */
export function parseDescription(description?: string): {
  authors?: string;
  year?: string;
  title?: string;
  journal?: string;
  locator?: string;
} {
  if (!description) return {};
  const text = description.trim().replace(/\s+/g, " ");
  if (!text) return {};

  // Split on ". " but keep it simple; titles may contain periods (e.g. "U.S."),
  // so we only take the first split for authors and try to isolate the tail.
  const parts = text.split(/\.\s+/);

  // Authors: first segment if it looks like an author list ("X et al",
  // "Smith J", "Smith et al", "Smith and Jones"). Otherwise leave empty.
  let authors: string | undefined;
  let rest = text;
  if (parts.length >= 2) {
    const candidate = parts[0].trim();
    if (
      /et al\.?$/i.test(candidate) ||
      /^[A-Z][\w'’-]+(?:\s+[A-Z]{1,3})?(?:,\s*[A-Z][\w'’-]+(?:\s+[A-Z]{1,3})?)*$/.test(
        candidate
      ) ||
      candidate.split(" ").length <= 6
    ) {
      authors = candidate.replace(/\.$/, "");
      rest = parts.slice(1).join(". ");
    }
  }

  // Year + locator: pattern "Journal Year;Vol(Iss):Pages" or "Journal Year"
  // Capture the journal as everything between the last sentence boundary
  // and the year token.
  const yearLocatorRe =
    /\.\s*([^.;]+?)\s+((?:19|20)\d{2})(?:\s*[;:]\s*([^.\s][^.]*))?\s*\.?\s*$/;
  let title: string | undefined;
  let journal: string | undefined;
  let year: string | undefined;
  let locator: string | undefined;

  const m = rest.match(yearLocatorRe);
  if (m) {
    journal = m[1].trim();
    year = m[2];
    locator = m[3]?.trim();
    title = rest.slice(0, m.index).trim().replace(/\.$/, "");
  } else {
    // Try a looser match: "... Journal Year"
    const m2 = rest.match(/^(.*?)\.\s*([^.]+?)\s+((?:19|20)\d{2})\b/);
    if (m2) {
      title = m2[1].trim().replace(/\.$/, "");
      journal = m2[2].trim();
      year = m2[3];
    } else {
      // Last resort: pull a 4-digit year anywhere.
      const ym = rest.match(/\b((?:19|20)\d{2})\b/);
      if (ym) year = ym[1];
      title = rest.replace(/\.$/, "");
    }
  }

  return {
    authors,
    year,
    title: title || undefined,
    journal: journal || undefined,
    locator: locator || undefined,
  };
}

export function formatCitation(item: RawEvidence): FormattedCitation {
  // Legacy plain-DOI string
  if (typeof item === "string") {
    const { doi, doiUrl } = extractDoi(item);
    return {
      doi,
      doiUrl,
      link: doi ? doiUrl : item,
      raw: item,
      parsed: false,
    };
  }

  const {
    type,
    level,
    description,
    link,
    authors: sAuthors,
    year: sYear,
    title: sTitle,
    journal: sJournal,
    doi: sDoi,
  } = item;

  // Prefer explicit DOI field, then derive from link
  const fromExplicit = extractDoi(sDoi);
  const fromLink = extractDoi(link);
  const doi = fromExplicit.doi || fromLink.doi;
  const doiUrl = fromExplicit.doiUrl || fromLink.doiUrl;

  const hasStructured = !!(sAuthors || sYear || sTitle || sJournal);
  const parsed = hasStructured ? {} : parseDescription(description);

  return {
    type,
    level,
    authors: sAuthors || parsed.authors,
    year: sYear ? String(sYear) : parsed.year,
    title: sTitle || parsed.title,
    journal: sJournal || parsed.journal,
    locator: parsed.locator,
    doi,
    doiUrl,
    link,
    raw: description,
    parsed: hasStructured || !!(parsed.authors || parsed.year || parsed.journal),
  };
}
