import { ExternalLink } from "lucide-react";
import type { EudamedActorRegistration } from "@/types/eudamed";

interface EudamedRegistrationProps {
  eudamed: EudamedActorRegistration;
}

/** Public EUDAMED actor registration, shown only when verified against the EUDAMED API. */
const EudamedRegistration = ({ eudamed }: EudamedRegistrationProps) => (
  <div className="border rounded-lg p-4 bg-white mb-8">
    <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        EUDAMED registration
      </h2>
      {eudamed.sourceUrl && (
        <a
          href={eudamed.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00A6D6] hover:text-[#00A6D6]/80 inline-flex items-center gap-1 text-xs"
        >
          Public record <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-1 text-sm">
      <div>
        <dt className="text-gray-500 text-xs">Registered name</dt>
        <dd>{eudamed.registeredName}</dd>
      </div>
      <div>
        <dt className="text-gray-500 text-xs">SRN</dt>
        <dd className="font-mono text-xs">{eudamed.srn}</dd>
      </div>
      <div>
        <dt className="text-gray-500 text-xs">Role / country</dt>
        <dd>
          {eudamed.role}
          {eudamed.country ? ` · ${eudamed.country}` : ""}
        </dd>
      </div>
    </dl>

    {eudamed.certificates && eudamed.certificates.length > 0 && (
      <div className="mt-3 border-t pt-3">
        <p className="text-xs text-gray-500 mb-1">Certificates</p>
        <ul className="space-y-1 text-xs text-gray-700">
          {eudamed.certificates.map((cert) => (
            <li key={`${cert.certificateNumber}-${cert.notifiedBody ?? ""}`}>
              <span className="font-mono">{cert.certificateNumber}</span>
              {cert.notifiedBody && <span> · Notified Body {cert.notifiedBody}</span>}
              {cert.type && <span> · {cert.type}</span>}
              {cert.validUntil && <span> · valid until {cert.validUntil}</span>}
              {cert.status && <span> · {cert.status}</span>}
            </li>
          ))}
        </ul>
      </div>
    )}

    {eudamed.lastVerified && (
      <p className="text-xs text-gray-400 mt-3">Checked {eudamed.lastVerified}</p>
    )}
  </div>
);

export default EudamedRegistration;
