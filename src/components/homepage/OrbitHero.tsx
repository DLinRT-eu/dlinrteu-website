import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Planet {
  name: string;
  gradient: string;
  // Position on the ellipse, in degrees. 0 = right, 90 = bottom.
  angle: number;
  // Which orbit ring (0 inner, 1 outer)
  ring: 0 | 1;
}

const PLANETS: Planet[] = [
  { name: "RaySearch",      gradient: "from-sky-400 to-indigo-500",   angle: -110, ring: 1 },
  { name: "Varian",         gradient: "from-cyan-400 to-blue-600",    angle: -50,  ring: 1 },
  { name: "Mirada Medical", gradient: "from-teal-400 to-cyan-600",    angle: 10,   ring: 1 },
  { name: "MVision AI",     gradient: "from-violet-400 to-purple-600",angle: 55,   ring: 1 },
  { name: "Limbus AI",      gradient: "from-blue-400 to-sky-600",     angle: 95,   ring: 0 },
  { name: "Elekta",         gradient: "from-indigo-400 to-blue-600",  angle: 150,  ring: 0 },
  { name: "C-RAD",          gradient: "from-orange-400 to-rose-500",  angle: -160, ring: 0 },
];

const OrbitHero = () => {
  const navigate = useNavigate();

  const handleSearch = (q: string) => {
    if (q.trim()) navigate(`/products?search=${encodeURIComponent(q.trim())}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white">
      {/* soft ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full bg-gradient-to-br from-sky-200/50 via-cyan-100/40 to-transparent blur-3xl" />
        <div className="absolute top-40 left-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-12 md:pt-24 md:pb-20">
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
            Deep Learning in Radiotherapy
          </h1>
          <p className="mt-5 text-lg md:text-xl text-slate-600">
            Find deep-learning-based solutions and QA monitoring tools for radiotherapy available for the European market.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search for products, companies, or features..."
              className="pl-12 h-14 rounded-full bg-white border-slate-200 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] focus-visible:ring-sky-400"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Orbit visualization */}
        <div className="relative mx-auto mt-14 md:mt-20 aspect-[16/10] max-w-5xl">
          {/* Orbit rings */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="orbitGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(80,144,208,0.20)" />
                <stop offset="100%" stopColor="rgba(80,144,208,0)" />
              </radialGradient>
            </defs>
            <ellipse cx="500" cy="300" rx="480" ry="200" fill="url(#orbitGlow)" />
            <ellipse cx="500" cy="300" rx="460" ry="180" fill="none"
              stroke="rgba(80,144,208,0.35)" strokeWidth="1" strokeDasharray="3 6" />
            <ellipse cx="500" cy="300" rx="320" ry="120" fill="none"
              stroke="rgba(80,144,208,0.45)" strokeWidth="1" strokeDasharray="3 6" />
            {/* drifting dots */}
            <circle cx="960" cy="300" r="4" fill="#5090D0" opacity="0.7" />
            <circle cx="40" cy="300" r="3" fill="#22d3ee" opacity="0.7" />
            <circle cx="820" cy="180" r="3" fill="#a78bfa" opacity="0.7" />
            <circle cx="180" cy="430" r="3" fill="#5090D0" opacity="0.6" />
          </svg>

          {/* Central DLinRT.eu node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-sky-300/40 blur-2xl scale-150" aria-hidden="true" />
              <div className="relative px-8 py-5 rounded-full bg-gradient-to-br from-[#5090D0] to-[#3b6fa8] text-white font-bold text-2xl md:text-3xl shadow-[0_20px_50px_-15px_rgba(80,144,208,0.6)] ring-1 ring-white/40">
                DLinRT.eu
              </div>
            </div>
          </div>

          {/* Planets */}
          {PLANETS.map((p) => {
            // Position on the ellipse
            const rx = p.ring === 0 ? 32 : 46; // % of width
            const ry = p.ring === 0 ? 20 : 32; // % of height
            const rad = (p.angle * Math.PI) / 180;
            const left = 50 + rx * Math.cos(rad);
            const top = 50 + ry * Math.sin(rad);
            const delay = (p.angle % 7) * 0.2;
            return (
              <div
                key={p.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-default"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animation: `orbit-float 6s ease-in-out ${delay}s infinite`,
                }}
              >
                <div className="flex items-center gap-2.5 rounded-full bg-white/90 backdrop-blur-md pl-1.5 pr-4 py-1.5 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70 transition-all duration-300 group-hover:shadow-[0_12px_30px_-8px_rgba(80,144,208,0.45)] group-hover:-translate-y-0.5 group-hover:ring-sky-300">
                  <span
                    className={`relative h-9 w-9 rounded-full bg-gradient-to-br ${p.gradient} shadow-inner`}
                    aria-hidden="true"
                  >
                    <span className="absolute inset-0 rounded-full bg-white/30 mix-blend-overlay" />
                    <span className="absolute top-1 left-1.5 h-2.5 w-2.5 rounded-full bg-white/70 blur-[1px]" />
                  </span>
                  <span className="text-sm font-medium text-slate-800 whitespace-nowrap">
                    {p.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes orbit-float {
          0%,100% { transform: translate(-50%, -50%) translateY(0); }
          50%     { transform: translate(-50%, -50%) translateY(-6px); }
        }
      `}</style>
    </section>
  );
};

export default OrbitHero;
