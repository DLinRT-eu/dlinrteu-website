import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import dataService from "@/services/DataService";
import { calculateProductContentHash } from "@/utils/productHash";
import {
  latestVerifications,
  resolveCertificationStatus,
  type ProductVerification,
  type VerificationRecord,
} from "@/utils/certificationStatus";

const EMPTY = new Map<string, ProductVerification>();

async function fetchVerifications(): Promise<Map<string, ProductVerification>> {
  // Public RPC exposes only product id, date and hash for certified products.
  const { data, error } = await (supabase.rpc as unknown as (fn: string) => Promise<{ data: VerificationRecord[] | null; error: unknown }>)(
    "get_public_product_verifications",
  );
  if (error || !data) return EMPTY;

  const latest = latestVerifications(data as VerificationRecord[]);
  const result = new Map<string, ProductVerification>();
  for (const [productId, record] of latest) {
    const product = dataService.getProductById(productId);
    if (!product) continue;
    const hash = record.content_hash ? await calculateProductContentHash(product) : null;
    result.set(productId, {
      verifiedAt: record.verified_at,
      status: resolveCertificationStatus(record, hash, product.lastRevised),
    });
  }
  return result;
}

export function useProductVerifications(): Map<string, ProductVerification> {
  const { data } = useQuery({
    queryKey: ["product-verifications"],
    queryFn: fetchVerifications,
    staleTime: 5 * 60 * 1000,
  });
  return data ?? EMPTY;
}
