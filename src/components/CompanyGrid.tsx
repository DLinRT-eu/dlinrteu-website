import { CompanyDetails } from "@/types/company";
import { Product } from "@/types/product";
import { useDailyShuffle } from "@/hooks/useProductSorting";

interface ExtendedCompanyDetails extends CompanyDetails {
  products: Product[];
  productCount: number;
}

interface CompanyGridProps {
  companies: ExtendedCompanyDetails[];
}

const CompanyGrid = ({ companies }: CompanyGridProps) => {
  const shuffledCompanies = useDailyShuffle(companies);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shuffledCompanies.map((company) => (
        <div key={company.id} className="company-card">
          {/* Render company details */}
          <h3>{company.name}</h3>
          <p>{company.description}</p>
          <span>Products: {company.productCount}</span>
        </div>
      ))}
    </div>
  );
};

export default CompanyGrid;