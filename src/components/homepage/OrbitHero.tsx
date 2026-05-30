import { useNavigate } from "react-router-dom";
import { Search, Sparkles, ShieldCheck, Globe2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TASK_COLORS, getTaskColor } from "@/utils/chartColors";

interface Planet {
  task: keyof typeof TASK_COLORS;
  /** position on the ellipse in degrees (0 = right, 90 = bottom) */
  angle: number;
  /** which ring: 0 inner, 1 outer */
  ring: 0 | 1;
}

const PLANETS: Planet[] = [
  { task: "Auto-Contouring",     angle: -115, ring: 1 },
  { task: "Treatment Planning",  angle: -45,  ring: 1 },
  { task: "Image Synthesis",     angle: 20,   ring: 1 },
  { task: "Performance Monitor", angle: 70,   ring: 1 },
  { task: "Reconstruction",      angle: 105,  ring: 0 },
  { task: "Registration",        angle: 165,  ring: 0 },
  { task: "Clinical Prediction", angle: -150, ring: 0 },
];

const CATEGORY_TAGS = [
  "Auto-Contouring",
  "Treatment Planning",
  "Image Synthesis",
  "Reconstruction",
  "Performance Monitor",
];

const QUICK_SUGGESTIONS = ["Auto-Contouring", "Image Synthesis", "Clinical Prediction", "Performance Monitor"];

/** Mix a hex color toward white by amount 0..1, returning an rgb() string. */
const lighten = (hex: string, amount: number): string => {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
};

const OrbitHero = () => {
  const navigate = useNavigate();

  const handleSearch = (q: string) => {
    if (q.trim()) navigate(`/products?search=${encodeURIComponent(q.trim())}`);
  };

  const goToTask = (tag: string) => navigate(`/products?task=${encodeURIComponent(tag)}`);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* ── Background layers ─────────────────────────────────────────── */}
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(80,144,208,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 35%, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 35%, black 40%, transparent 80%)",
        }}
      />
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[640px] w-[1200px] rounded-full bg-gradient-to-br from-sky-200/40 via-cyan-100/30 to-transparent blur-3xl" />
        <div className="absolute top-40 left-10 h-72 w-72 rounded-full bg-purple-200/25 blur-3xl" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-teal-200/25 blur-3xl" />
      </div>
      {/* Bottom fade to white */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-12 md:pt-20 md:pb-20">
        {/* Trust pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200/80 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Independent catalogue · Updated weekly
            <span className="mx-1 text-slate-300">|</span>
            <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
            Peer-reviewed
            <span className="mx-1 text-slate-300">|</span>
            <Globe2 className="h-3.5 w-3.5 text-sky-600" />
            European focus
          </div>
        </div>

        {/* Headline */}
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
                  stroke="url(#underline)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="underline" x1="0" x2="1">
                    <stop offset="0" stopColor="#5090D0" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#5090D0" />
                    <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-slate-600">
            Find deep-learning-based solutions and QA monitoring tools for radiotherapy available for the European market.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-2xl mx-auto">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-200/60 via-cyan-200/60 to-violet-200/60 blur-md opacity-70" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search 79+ products, companies, or features..."
                className="pl-12 pr-28 h-14 rounded-full bg-white border-slate-200 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] focus-visible:ring-sky-400"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <kbd className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-mono text-slate-500">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Quick suggestions */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            <span className="text-slate-400">Try:</span>
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

        {/* ── Orbit visualization ─────────────────────────────────────── */}
        <div className="relative mx-auto mt-12 md:mt-16 aspect-[16/10] max-w-5xl" style={{ containerType: "size" }}>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="orbitGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(80,144,208,0.18)" />
                <stop offset="100%" stopColor="rgba(80,144,208,0)" />
              </radialGradient>
              <linearGradient id="ringStroke" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#5090D0" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#5090D0" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#5090D0" stopOpacity="0.05" />
              </linearGradient>
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(80,144,208,0.35)" />
                <stop offset="60%" stopColor="rgba(80,144,208,0.08)" />
                <stop offset="100%" stopColor="rgba(80,144,208,0)" />
              </radialGradient>
            </defs>

            {/* halo */}
            <ellipse cx="500" cy="300" rx="480" ry="200" fill="url(#orbitGlow)" />

            {/* outer ring */}
            <ellipse
              id="outer-orbit"
              cx="500" cy="300" rx="460" ry="180"
              fill="none"
              stroke="url(#ringStroke)"
              strokeWidth="1.2"
              strokeDasharray="2 7"
              className="orbit-spin-slow"
              style={{ transformOrigin: "500px 300px" }}
            />
            {/* inner ring */}
            <ellipse
              id="inner-orbit"
              cx="500" cy="300" rx="320" ry="120"
              fill="none"
              stroke="url(#ringStroke)"
              strokeWidth="1.2"
              strokeDasharray="2 7"
              className="orbit-spin-rev"
              style={{ transformOrigin: "500px 300px" }}
            />
            {/* mid faint ring */}
            <ellipse
              cx="500" cy="300" rx="390" ry="150"
              fill="none"
              stroke="rgba(80,144,208,0.18)"
              strokeWidth="1"
              strokeDasharray="1 9"
            />

            {/* concentric core rings */}
            <circle cx="500" cy="300" r="135" fill="url(#coreGlow)" />
            <circle cx="500" cy="300" r="95"  fill="none" stroke="rgba(80,144,208,0.25)" strokeWidth="1" strokeDasharray="2 6" />
            <circle cx="500" cy="300" r="115" fill="none" stroke="rgba(80,144,208,0.15)" strokeWidth="1" strokeDasharray="2 6" />

            {/* radar sweep */}
            <g style={{ transformOrigin: "500px 300px" }} className="radar-sweep">
              <path
                d="M500 300 L500 165 A135 135 0 0 1 615 240 Z"
                fill="url(#coreGlow)"
                opacity="0.55"
              />
            </g>

            {/* traveling satellites along the orbits — taxonomy colors */}
            <circle r="3.5" fill={TASK_COLORS["Auto-Contouring"]}>
              <animateMotion dur="18s" repeatCount="indefinite"
                path="M 960 300 A 460 180 0 1 1 40 300 A 460 180 0 1 1 960 300" />
            </circle>
            <circle r="2.5" fill={TASK_COLORS["Image Synthesis"]}>
              <animateMotion dur="14s" repeatCount="indefinite" begin="-6s"
                path="M 820 300 A 320 120 0 1 0 180 300 A 320 120 0 1 0 820 300" />
            </circle>
            <circle r="2" fill={TASK_COLORS["Reconstruction"]}>
              <animateMotion dur="22s" repeatCount="indefinite" begin="-3s"
                path="M 960 300 A 460 180 0 1 1 40 300 A 460 180 0 1 1 960 300" />
            </circle>


            {/* twinkling background stars */}
            <g fill="#5090D0">
              <circle cx="80"  cy="100" r="1.5" opacity="0.7"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="3s" repeatCount="indefinite" /></circle>
              <circle cx="930" cy="120" r="1.5" opacity="0.5"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="4s" repeatCount="indefinite" /></circle>
              <circle cx="120" cy="500" r="1.2" opacity="0.6"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="3.5s" repeatCount="indefinite" /></circle>
              <circle cx="880" cy="490" r="1.2" opacity="0.6"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.8s" repeatCount="indefinite" /></circle>
              <circle cx="500" cy="60"  r="1.2" opacity="0.5"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="4.5s" repeatCount="indefinite" /></circle>
            </g>
          </svg>

          {/* ── Floating info chips ─────────────────────────────────── */}
          <div className="absolute top-3 left-3 hidden md:flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur px-3 py-2 ring-1 ring-slate-200/80 shadow-sm">
            <Sparkles className="h-4 w-4 text-sky-500" />
            <div className="text-[11px] leading-tight">
              <div className="font-semibold text-slate-800">Live ecosystem</div>
              <div className="text-slate-500">41+ companies tracked</div>
            </div>
          </div>
          <div className="absolute top-3 right-3 hidden md:flex flex-col items-end gap-1 rounded-xl bg-white/80 backdrop-blur px-3 py-2 ring-1 ring-slate-200/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              CE · FDA · TGA
            </div>
            <div className="text-[10px] text-slate-400 font-mono">regulatory data tracked</div>
          </div>

          {/* Central DLinRT.eu logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              {/* pulse rings */}
              <span className="absolute inset-0 rounded-full ring-1 ring-sky-300/50 animate-[corePulse_3s_ease-out_infinite]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-sky-300/30 animate-[corePulse_3s_ease-out_1s_infinite]" />
              <div className="absolute inset-0 rounded-full bg-sky-300/40 blur-2xl scale-150" aria-hidden="true" />
              <div className="relative flex items-center justify-center h-36 w-36 md:h-48 md:w-48 drop-shadow-[0_20px_30px_rgba(80,144,208,0.45)]">
                <img
                  src="/LogoDLinRT.eu.png"
                  alt="DLinRT.eu"
                  className="h-full w-full object-contain"
                  style={{ borderRadius: "18%" }}
                />
              </div>
              {/* tiny meta label */}
              <div className="mt-3 text-center text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                The hub
              </div>
            </div>
          </div>

          {/* Planets — slowly orbiting around the center, colored by taxonomy task */}
          {PLANETS.map((p) => {
            const isOuter = p.ring === 1;
            const duration = isOuter ? 140 : 110; // seconds, slow & elegant
            // negative delay positions planet at its starting angle on the shared keyframe
            const norm = ((p.angle % 360) + 360) % 360;
            const delay = -(norm / 360) * duration;
            const color = getTaskColor(p.task);
            const highlight = lighten(color, 0.55);
            return (
              <div
                key={p.angle}
                className="absolute left-1/2 top-1/2 group cursor-default"
                style={{
                  animation: `${isOuter ? "orbit-outer" : "orbit-inner"} ${duration}s linear ${delay}s infinite`,
                  willChange: "transform",
                }}
                title={p.task}
              >
                <span
                  className="relative block h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_4px_14px_-4px_rgba(15,23,42,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_24px_-6px_rgba(80,144,208,0.5)]"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${highlight}, ${color} 70%)` }}
                  aria-hidden="true"
                >
                  <span className="absolute inset-0 rounded-full bg-white/20 mix-blend-overlay" />
                  <span className="absolute top-1 left-1.5 h-2.5 w-2.5 rounded-full bg-white/80 blur-[1px]" />
                  <span className="absolute -inset-1 rounded-full ring-1 ring-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            );
          })}
        </div>


        {/* Category tag rail */}
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {CATEGORY_TAGS.map((t) => (
            <button
              key={t}
              onClick={() => goToTask(t)}
              className="group inline-flex items-center gap-1.5 rounded-full bg-white/70 backdrop-blur px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80 hover:text-sky-700 hover:ring-sky-300 hover:bg-white transition"
            >
              <span
                className="h-2 w-2 rounded-full ring-1 ring-white/60 transition-transform group-hover:scale-125"
                style={{ backgroundColor: getTaskColor(t) }}
              />
              {t}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        ${(() => {
          const build = (name: string, rx: number, ry: number) => {
            const steps = 60;
            let css = `@keyframes ${name}{`;
            for (let i = 0; i <= steps; i++) {
              const f = i / steps;
              const a = f * 2 * Math.PI;
              const tx = rx * Math.cos(a);
              const ty = ry * Math.sin(a);
              css += `${(f * 100).toFixed(3)}%{transform:translate(${tx.toFixed(2)}cqw, ${ty.toFixed(2)}cqh);}`;
            }
            return css + "}";
          };
          return build("orbit-outer", 46, 32) + build("orbit-inner", 32, 20);
        })()}
        @keyframes corePulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        @keyframes orbit-spin {
          to { transform: rotate(360deg); }
        }
        .orbit-spin-slow { animation: orbit-spin 90s linear infinite; }
        .orbit-spin-rev  { animation: orbit-spin 70s linear infinite reverse; }
        @keyframes radar {
          to { transform: rotate(360deg); }
        }
        .radar-sweep { animation: radar 12s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .orbit-spin-slow,.orbit-spin-rev,.radar-sweep { animation: none; }
          [style*="orbit-outer"],[style*="orbit-inner"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default OrbitHero;
