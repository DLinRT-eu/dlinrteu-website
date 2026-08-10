import { Calendar, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const AIinRTBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-6 md:pt-8">
      <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-cyan-50 shadow-[0_10px_40px_-20px_rgba(80,144,208,0.25)]">
        {/* subtle decorative dots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(80,144,208,0.22) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
            maskImage: "linear-gradient(to left, black 20%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, black 20%, transparent 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-6 md:p-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100/70 px-3 py-1 text-xs font-semibold text-sky-700">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              Save the date
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              DLinRT.eu supports{" "}
              <span className="text-sky-700">AIinRT 2027</span>
            </h2>

            <p className="max-w-2xl text-sm md:text-base text-slate-600 leading-relaxed">
              A peer-reviewed scientific symposium on Artificial Intelligence in Radiation Therapy.
              Join the community on{" "}
              <span className="font-medium text-slate-900">1–2 April 2027</span> at the{" "}
              <span className="font-medium text-slate-900">Princess Máxima Center, Utrecht</span>.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
                1–2 April 2027
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
                Princess Máxima Center, Utrecht
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-3 shrink-0">
            <a
              href="https://aiinrt.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 hover:shadow-md transition-all"
            >
              Visit AIinRT.org
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>

            <Link
              to="/news/aiinrt-2027-support"
              className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-800 transition-colors"
            >
              Read the announcement
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIinRTBanner;
