import { useMemo } from 'react';
import { ProductDetails } from '@/types/productDetails';

export type SortOption = "random" | "name" | "releaseDate" | "lastUpdated" | "company" | "category";

interface UseProductSortingProps {
  products: ProductDetails[];
  sortBy: SortOption;
  ascending: boolean;
}

export const useProductSorting = ({ products, sortBy, ascending }: UseProductSortingProps) => {
  return useMemo(() => {
    if (sortBy === "random") {
      return products;
    }
    
    return [...products].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "company":
          comparison = a.company.localeCompare(b.company);
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        case "releaseDate":
          const aDate = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
          const bDate = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
          comparison = aDate - bDate;
          break;
        case "lastUpdated":
          const aUpdated = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
          const bUpdated = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
          comparison = aUpdated - bUpdated;
          break;
      }
      
      return ascending ? comparison : -comparison;
    });
  }, [products, sortBy, ascending]);
};

function mulberry32(seed: number) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function dateToSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export const useDailyProductShuffle = (products: ProductDetails[]) => {
  const today = new Date().toISOString().slice(0, 10);
  return useMemo(() => {
    const rng = mulberry32(dateToSeed(today));
    const arr = [...products];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [products, today]);
};

/** @deprecated Use useDailyProductShuffle instead */
export const useProductShuffle = useDailyProductShuffle;

/** Generic daily shuffle for any array type */
export const useDailyShuffle = <T,>(items: T[]): T[] => {
  const today = new Date().toISOString().slice(0, 10);
  return useMemo(() => {
    const rng = mulberry32(dateToSeed(today));
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [items, today]);
};