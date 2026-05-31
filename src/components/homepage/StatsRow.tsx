import { Link } from "react-router-dom";
import { Package, Building2, ClipboardCheck } from "lucide-react";

interface StatsRowProps {
  productCount: number;
  companyCount: number;
}

const StatsRow = ({ productCount, companyCount }: StatsRowProps) => {
  const stats = [
    {
      to: "/products",
      icon: Package,
      value: productCount > 0 ? `${productCount}` : "—",
      label: "Products",
      sub: "DL solutions & QA tools",
      tint: "from-sky-100 to-cyan-100 text-sky-600",
    },
    {
      to: "/companies",
      icon: Building2,
      value: companyCount > 0 ? `${companyCount}+` : "—",
      label: "Companies featured",
      sub: "Innovators in radiotherapy AI",
      tint: "from-teal-100 to-emerald-100 text-teal-600",
    },
    {
      to: "/resources-compliance",
      icon: ClipboardCheck,
      value: "20+",
      label: "Compliance resources",
      sub: "Guidance, checklists & standards",
      tint: "from-violet-100 to-indigo-100 text-violet-600",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-6 md:pt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 rounded-2xl bg-white border border-slate-200/80 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.15)] divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="flex items-center gap-5 p-6 md:p-7 hover:bg-slate-50/60 transition-colors rounded-2xl"
          >
            <div className={`shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br ${s.tint} flex items-center justify-center`}>
              <s.icon className="h-7 w-7" />
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 leading-none">{s.value}</div>
              <div className="mt-1.5 text-sm font-medium text-slate-700">{s.label}</div>
              <div className="text-xs text-slate-500">{s.sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default StatsRow;
