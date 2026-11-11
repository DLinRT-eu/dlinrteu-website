import type { ProductDetails } from "@/types/productDetails";
import type { EudamedDeviceRegistration } from "@/types/eudamed";

export type EudamedExportSource = "Registry" | "Manual" | "Registry + manual" | "";

export interface EudamedExportResult {
  record?: EudamedDeviceRegistration;
  all: EudamedDeviceRegistration[];
  source: EudamedExportSource;
  /** Manual Basic UDI-DI that does not match any registry record. */
  mismatch?: string;
}

const fillEmpty = (base: EudamedDeviceRegistration, extra: EudamedDeviceRegistration): EudamedDeviceRegistration => {
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(extra)) {
    if ((out[k] === undefined || out[k] === "") && v !== undefined && v !== "") out[k] = v;
  }
  return out as unknown as EudamedDeviceRegistration;
};

/** Registry-first resolution for downloads: verified registry values win; manual edits only fill gaps. */
export function resolveExportEudamed(
  product: Partial<ProductDetails> | null | undefined,
  registry: Record<string, EudamedDeviceRegistration[]>,
): EudamedExportResult {
  const all = (product?.id && registry[product.id]) || [];
  const ce = product?.regulatory?.ce;
  const manual = ce && typeof ce !== "string" ? ce.eudamed : undefined;
  if (!all.length) return { record: manual, all: [], source: manual ? "Manual" : "" };
  if (!manual) return { record: all[0], all, source: "Registry" };
  const matched = all.find((r) => r.basicUdi === manual.basicUdi);
  const mismatch = manual.basicUdi && !matched ? manual.basicUdi : undefined;
  const primary = matched ?? all[0];
  const record = matched ? fillEmpty(primary, manual) : primary;
  return { record, all, source: matched ? "Registry + manual" : "Registry", mismatch };
}
