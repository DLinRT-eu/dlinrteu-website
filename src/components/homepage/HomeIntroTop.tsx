import { ShieldCheck, Globe2 } from "lucide-react";

const HomeIntroTop = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-14 pb-4 md:pt-20 md:pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200/80 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Independent catalogue · Updated weekly
            <span className="mx-1 text-slate-500" aria-hidden="true">|</span>
            <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
            Peer-reviewed
            <span className="mx-1 text-slate-500" aria-hidden="true">|</span>
            <Globe2 className="h-3.5 w-3.5 text-sky-600" />
            European focus
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mt-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
            Deep Learning in{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#5090D0] via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                Radiotherapy
              </span>
              <svg
                aria-hidden="true"
                className="absolute -bottom-2 left-0 w-full"
                height="10"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M2,7 Q50,1 100,5 T198,4"
                  fill="none"
                  stroke="url(#home-intro-underline)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="home-intro-underline" x1="0" x2="1">
                    <stop offset="0" stopColor="#5090D0" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#5090D0" />
                    <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            : Product Catalogue
          </h1>
          <p className="mt-5 text-lg md:text-xl text-slate-600">
            Find deep-learning-based solutions and QA monitoring tools for radiotherapy available for the European market, and beyond.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeIntroTop;
