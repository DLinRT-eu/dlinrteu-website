import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProductDetails } from '@/types/productDetails';

interface RevisionDateRecord {
  product_id: string;
  last_revised_at: string;
  last_revised_by: string | null;
  revision_source: string;
}

interface MergedRevisionDate {
  productId: string;
  lastRevised: string;
  source: 'database' | 'file';
  revisedBy?: string | null;
}

// Fetch revision dates from the database
const fetchDatabaseRevisionDates = async (): Promise<RevisionDateRecord[]> => {
  const { data, error } = await supabase
    .from('product_revision_dates')
    .select('product_id, last_revised_at, last_revised_by, revision_source');

  if (error) {
    console.error('Error fetching revision dates:', error);
    return [];
  }

  return data || [];
};

// Compare two dates and return the more recent one
const getMostRecentDate = (date1: string | undefined, date2: string | undefined): string => {
  if (!date1 && !date2) return new Date().toISOString().split('T')[0];
  if (!date1) return date2!;
  if (!date2) return date1;

  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return d1 >= d2 ? date1 : date2;
};

// Hook to get merged revision dates
export const useProductRevisionDates = () => {
  return useQuery({
    queryKey: ['product-revision-dates'],
    queryFn: fetchDatabaseRevisionDates,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get the most recent revision date for a specific product
export const useMergedRevisionDate = (product: ProductDetails): MergedRevisionDate => {
  const { data: dbDates } = useProductRevisionDates();

  const fileDate = product.lastRevised;
  const dbRecord = dbDates?.find(r => r.product_id === product.id);
  const dbDate = dbRecord?.last_revised_at?.split('T')[0];

  // Determine which date is more recent
  if (!dbDate) {
    return {
      productId: product.id as string,
      lastRevised: fileDate || '2000-01-01',
      source: 'file',
    };
  }

  if (!fileDate) {
    return {
      productId: product.id as string,
      lastRevised: dbDate,
      source: 'database',
      revisedBy: dbRecord?.last_revised_by,
    };
  }

  const mostRecent = getMostRecentDate(fileDate, dbDate);
  const isFromDb = mostRecent === dbDate;

  return {
    productId: product.id as string,
    lastRevised: mostRecent,
    source: isFromDb ? 'database' : 'file',
    revisedBy: isFromDb ? dbRecord?.last_revised_by : undefined,
  };
};

// Utility function to merge revision dates for a list of products
export const mergeRevisionDates = (
  products: ProductDetails[],
  dbDates: RevisionDateRecord[] | undefined
): Map<string, MergedRevisionDate> => {
  const result = new Map<string, MergedRevisionDate>();

  for (const product of products) {
    const fileDate = product.lastRevised;
    const dbRecord = dbDates?.find(r => r.product_id === product.id);
    const dbDate = dbRecord?.last_revised_at?.split('T')[0];

    if (!dbDate) {
      result.set(product.id as string, {
        productId: product.id as string,
        lastRevised: fileDate || '2000-01-01',
        source: 'file',
      });
      continue;
    }

    if (!fileDate) {
      result.set(product.id as string, {
        productId: product.id as string,
        lastRevised: dbDate,
        source: 'database',
        revisedBy: dbRecord?.last_revised_by,
      });
      continue;
    }

    const mostRecent = getMostRecentDate(fileDate, dbDate);
    const isFromDb = mostRecent === dbDate;

    result.set(product.id as string, {
      productId: product.id as string,
      lastRevised: mostRecent,
      source: isFromDb ? 'database' : 'file',
      revisedBy: isFromDb ? dbRecord?.last_revised_by : undefined,
    });
  }

  return result;
};

// Get days since revision using merged date
export const getDaysSinceRevisionMerged = (lastRevised: string): number => {
  const revisionDate = new Date(lastRevised);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - revisionDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
