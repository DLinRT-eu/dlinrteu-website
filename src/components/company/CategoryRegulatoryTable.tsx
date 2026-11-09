import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import type { ProductDetails } from "@/types/productDetails";
import { getProductRegulatorySummary, type ProductRegulatorySummary } from "@/utils/companyRegulatory";

interface CategoryRegulatoryTableProps {
  products: ProductDetails[];
}

const EudamedCell = ({ e }: { e: ProductRegulatorySummary["eudamed"] }) => {
  if (e.kind === "none") return <span className="text-muted-foreground">No verified match</span>;
  return (
    <div className="space-y-0.5">
      <div>
        {e.kind === "exact" ? "Exact match" : "Editor-confirmed"}
        {e.tradeName ? ` · ${e.tradeName}` : ""}
        {e.sourceUrl && (
          <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex text-primary" aria-label="EUDAMED record">
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
      {e.basicUdi && <div className="font-mono text-[11px] break-all">UDI-DI {e.basicUdi}</div>}
      {(e.emdnCode || e.riskClass) && (
        <div className="text-xs text-muted-foreground">{[e.emdnCode && `EMDN ${e.emdnCode}`, e.riskClass].filter(Boolean).join(" · ")}</div>
      )}
    </div>
  );
};

/** Per-category CE / FDA / EUDAMED overview shown above the product cards on company pages. */
const CategoryRegulatoryTable = ({ products }: CategoryRegulatoryTableProps) => {
  const rows = products.map(getProductRegulatorySummary);
  return (
    <div className="mb-4 rounded-lg border bg-card text-sm">
      <div className="hidden grid-cols-[1.2fr_1fr_1fr_1.6fr] gap-3 border-b bg-muted/50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:grid">
        <span>Product</span><span>CE</span><span>FDA</span><span>EUDAMED</span>
      </div>
      {rows.map((r) => (
        <div key={r.id} className="grid grid-cols-1 gap-1 border-b px-3 py-2 last:border-b-0 md:grid-cols-[1.2fr_1fr_1fr_1.6fr] md:gap-3">
          <Link to={`/product/${r.id}`} className="font-medium text-primary hover:underline">{r.name}</Link>
          <div><span className="text-xs text-muted-foreground md:hidden">CE: </span><span className={r.ce.present ? "" : "text-muted-foreground"}>{r.ce.label}</span></div>
          <div>
            <span className="text-xs text-muted-foreground md:hidden">FDA: </span>
            <span className={r.fda.present ? "" : "text-muted-foreground"}>{r.fda.label}</span>
            {r.fda.date && <span className="text-xs text-muted-foreground"> · {r.fda.date}</span>}
          </div>
          <div><span className="text-xs text-muted-foreground md:hidden">EUDAMED: </span><EudamedCell e={r.eudamed} /></div>
        </div>
      ))}
    </div>
  );
};

export default CategoryRegulatoryTable;
