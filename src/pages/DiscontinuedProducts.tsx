import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import dataService from '@/services/DataService';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import UnifiedProductCard from '@/components/common/UnifiedProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProductSearch } from '@/components/grid/ProductSearch';
import { exportProductsToCSV } from '@/utils/exportProducts';

export default function DiscontinuedProducts() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const products = dataService.getDiscontinuedProducts();
  const searched = useProductSearch({ products, searchQuery: query, advancedSearch: true });
  const values = (p: typeof products[number], field: string): string[] => {
    if (field === 'task') return [p.category, ...(p.secondaryCategories ?? [])];
    if (field === 'modality') return Array.isArray(p.modality) ? p.modality : p.modality ? [p.modality] : [];
    if (field === 'anatomy') return p.anatomicalLocation ?? [];
    return p.certification ? [p.certification] : [];
  };
  const filtered = searched.filter(p => Object.entries(filters).every(([field, value]) => value === 'all' || values(p, field).includes(value)));
  return <div className="min-h-screen bg-background text-foreground">
    <SEO title="Discontinued products" description="Historical AI radiotherapy products, with retained specifications, evidence and market-status sources." canonical="https://dlinrt.eu/products/discontinued" />
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-6">
      <Link to="/products" className="inline-flex items-center gap-2 text-primary"><ArrowLeft className="h-4 w-4" />Back to Products</Link>
      <h1 className="text-3xl font-bold">Discontinued products</h1>
      <p className="text-muted-foreground">Historical records of products no longer marketed for new sales. Past clearances and evidence do not establish current availability, support or suitability for clinical use.</p>
      <Input aria-label="Search discontinued products" placeholder="Search historical products or vendors" value={query} onChange={e => setQuery(e.target.value)} />
      <div className="flex flex-wrap gap-3">
        {(['task', 'modality', 'anatomy', 'certification'] as const).map(field => <Select key={field} value={filters[field] ?? 'all'} onValueChange={value => setFilters(previous => ({ ...previous, [field]: value }))}>
          <SelectTrigger aria-label={`Filter by ${field}`} className="w-full sm:w-52"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All {field === 'certification' ? 'historical certifications' : field === 'anatomy' ? 'anatomical regions' : `${field}s`}</SelectItem>
            {[...new Set(products.flatMap(p => values(p, field)))].sort().map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}
          </SelectContent>
        </Select>)}
        <Button variant="outline" onClick={() => { setQuery(''); setFilters({}); }}>Reset filters</Button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3"><p>{filtered.length} historical product{filtered.length === 1 ? '' : 's'}</p><Button variant="outline" disabled={!filtered.length} onClick={() => exportProductsToCSV(filtered)}><Download className="mr-2 h-4 w-4" />Export historical records</Button></div>
      {filtered.length ? <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{filtered.map(p => <UnifiedProductCard key={p.id} product={p} />)}</div> : <p role="status" className="text-muted-foreground">No historical products match these filters.</p>}
    </main><Footer />
  </div>;
}