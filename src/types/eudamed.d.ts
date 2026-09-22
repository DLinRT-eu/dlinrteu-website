/**
 * Public EUDAMED (EU medical device database) registration data.
 *
 * Every field here is copied verbatim from the public EUDAMED REST API via
 * `scripts/eudamed-audit.ts`; nothing is inferred. MDR registration only became
 * mandatory on 2026-05-28, so the absence of a EUDAMED block says nothing about
 * whether a device carries a CE mark.
 */

export interface EudamedCertificateRecord {
  certificateNumber: string;
  /** Notified body SRN / four-digit identifier, e.g. "0197". */
  notifiedBody?: string;
  /** Certificate type as published (e.g. quality-management-system). */
  type?: string;
  validFrom?: string;
  validUntil?: string;
  status?: string;
}

/** Actor (economic operator) registration held against a company. */
export interface EudamedActorRegistration {
  /** Single Registration Number, e.g. "FI-MF-000013082". */
  srn: string;
  /** Legal name as registered in EUDAMED. */
  registeredName?: string;
  /** Registered role, e.g. "Manufacturer" or "Importer". */
  role?: string;
  /** ISO 3166-1 alpha-2 country of registration. */
  country?: string;
  /** Actor status as published, e.g. "active". */
  status?: string;
  certificates?: EudamedCertificateRecord[];
  /** EUDAMED query URL used as the disclosed source. */
  sourceUrl?: string;
  /** ISO date (YYYY-MM-DD) on which EUDAMED was queried. */
  lastVerified?: string;
}

/** Device (UDI-DI) registration held against a product. */
export interface EudamedDeviceRegistration {
  /** Basic UDI-DI as published. */
  basicUdi: string;
  /** Risk class as published, e.g. "class-iia". */
  riskClass?: string;
  /** Trade name as registered, which may differ from our catalogue name. */
  registeredTradeName?: string;
  /** SRN of the registering manufacturer. */
  manufacturerSrn?: string;
  /** EUDAMED query URL used as the disclosed source. */
  sourceUrl?: string;
  /** ISO date (YYYY-MM-DD) on which EUDAMED was queried. */
  lastVerified?: string;
}
