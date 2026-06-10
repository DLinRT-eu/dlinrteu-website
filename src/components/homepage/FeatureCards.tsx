import { Link } from "react-router-dom";
import { Package, Building2, ShieldCheck, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    to: "/products",
    icon: Package,
    title: "Discover DL Products",
    description:
      "Explore deep learning solutions across the radiotherapy workflow — from image reconstruction and auto-contouring to treatment planning and clinical prediction.",
    cta: "Browse products",
    tint: "from-sky-100 to-cyan-100 text-sky-600",
  },
  {
    to: "/companies",
    icon: Building2,
    title: "Explore Companies",
    description:
      "Find innovative companies advancing AI in radiotherapy. View company profiles, technologies, and market offerings.",
    cta: "View companies",
    tint: "from-teal-100 to-emerald-100 text-teal-600",
  },
  {
    to: "/resources-compliance",
    icon: ShieldCheck,
    title: "Resources & Compliance",
    description:
      "Access regulatory guidance, compliance checklists, and standards to support safe and effective AI deployment in clinical radiotherapy.",
    cta: "Explore resources",
    tint: "from-violet-100 to-indigo-100 text-violet-600",
  },
];

const FeatureCards = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((f) => (
          <Link
            key={f.title}
            to={f.to}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.15)] hover:shadow-[0_20px_50px_-20px_rgba(80,144,208,0.35)] hover:-translate-y-0.5 transition-all"
          >
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${f.tint} flex items-center justify-center mb-5`}>
              <f.icon className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">{f.title}</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.description}</p>
            <div className="mt-5 inline-flex items-center text-sm font-medium text-sky-600 group-hover:text-sky-700">
              {f.cta}
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
