
export interface CompanyDetails {
  id: string;
  name: string;
  description: string;
  website?: string;
  logoUrl?: string;
  productIds: string[];
  category?: string; // Adding an optional category field
  primaryTask?: string; // Main task area (e.g., "Auto-Contouring")
  secondaryTasks?: string[]; // Additional task areas
}
