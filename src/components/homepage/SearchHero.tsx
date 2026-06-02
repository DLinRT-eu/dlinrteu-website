import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const QUICK_SUGGESTIONS = ["Auto-Contouring", "Image Synthesis", "Clinical Prediction", "Performance Monitor"];

const SearchHero = () => {
  const navigate = useNavigate();

  const handleSearch = (q: string) => {
    if (q.trim()) navigate(`/products?search=${encodeURIComponent(q.trim())}`);
  };

  const goToTask = (tag: string) => navigate(`/products?task=${encodeURIComponent(tag)}`);

  return (
    <section className="relative bg-white pt-10 md:pt-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="relative mt-2 max-w-2xl mx-auto">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-200/60 via-cyan-200/60 to-violet-200/60 blur-md opacity-70" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600" aria-hidden="true" />
              <Input
                aria-label="Search products, companies, or features"
                placeholder="Search products, companies, or features..."
                className="pl-12 pr-28 h-14 rounded-full bg-white border-slate-200 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] focus-visible:ring-sky-400"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <kbd className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-mono text-slate-500">
                Ctrl+K
              </kbd>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            <span className="text-slate-600">Try:</span>
            {QUICK_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => goToTask(s)}
                className="rounded-full border border-slate-200 bg-white/70 px-2.5 py-1 text-slate-600 hover:border-sky-300 hover:text-sky-700 hover:bg-white transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchHero;
