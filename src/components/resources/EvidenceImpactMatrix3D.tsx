import React, { useMemo } from "react";
import {
  EVIDENCE_RIGOR_LEVELS,
  CLINICAL_IMPACT_LEVELS,
  IMPLEMENTATION_BURDEN_LEVELS,
} from "@/data/evidence-impact-levels";
import dataService from "@/services/DataService";
import type { ProductDetails } from "@/types/productDetails";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Isometric 3D view of the Evidence × Impact × Implementation-Burden matrix.
 *
 * Axes:
 *  - X (depth, →↗) : Clinical Impact      I0…I5
 *  - Y (depth, →↖) : Evidence Rigor       E0…E3
 *  - Z (vertical)  : Implementation Burden Z0…Z5  (stacked bars)
 *
 * Each (E,I,Z) bucket with ≥1 product is drawn as one isometric cube whose
 * height encodes the product count. Empty cells render as a flat floor tile.
 */

interface EvidenceImpactMatrix3DProps {
  products?: ProductDetails[];
}

// Burden tier hex palette (matches green→rose ramp used elsewhere).
const Z_COLORS: Record<string, string> = {
  Z0: "#16a34a", // green-600
  Z1: "#0d9488", // teal-600
  Z2: "#eab308", // yellow-500
  Z3: "#f97316", // orange-500
  Z4: "#ef4444", // red-500
  Z5: "#e11d48", // rose-600
};

// Geometry constants (SVG units).
const TILE = 70;                       // base tile side in iso world units
const COS30 = Math.cos(Math.PI / 6);   // ≈ 0.866
const SIN30 = Math.sin(Math.PI / 6);   // 0.5
const UNIT_HEIGHT = 22;                // pixel height per product count
const MIN_BAR = 14;                    // min bar height when count = 1

const RIGOR = EVIDENCE_RIGOR_LEVELS;                 // E0..E3
const IMPACT = CLINICAL_IMPACT_LEVELS;               // I0..I5
const BURDEN = IMPLEMENTATION_BURDEN_LEVELS;         // Z0..Z5

interface Bucket {
  rigor: string;
  impact: string;
  burden: string;
  count: number;
}

const project = (gx: number, gy: number, gz: number) => ({
  x: (gx - gy) * TILE * COS30,
  y: (gx + gy) * TILE * SIN30 - gz,
});

const EvidenceImpactMatrix3D: React.FC = () => {
  // Aggregate product counts by (E, I, Z).
  const buckets = useMemo<Map<string, Bucket>>(() => {
    const map = new Map<string, Bucket>();
    const products = dataService.getAllProducts();
    for (const p of products) {
      const e = p.evidenceRigor;
      const i = p.clinicalImpact;
      const z = p.implementationBurden;
      if (!e || !i || !z) continue;
      const key = `${e}-${i}-${z}`;
      const existing = map.get(key);
      if (existing) existing.count += 1;
      else map.set(key, { rigor: e, impact: i, burden: z, count: 1 });
    }
    return map;
  }, []);

  const totalClassified = useMemo(
    () => Array.from(buckets.values()).reduce((s, b) => s + b.count, 0),
    [buckets]
  );

  // Bounds for viewBox.
  const cols = IMPACT.length;
  const rows = RIGOR.length;
  const corners = [
    project(0, 0, 0),
    project(cols, 0, 0),
    project(0, rows, 0),
    project(cols, rows, 0),
  ];
  // Account for tallest possible stack (all 6 burden levels at max count).
  const maxCount = Math.max(1, ...Array.from(buckets.values()).map((b) => b.count));
  const maxStackHeight = BURDEN.length * (maxCount * UNIT_HEIGHT + 4);
  const minX = Math.min(...corners.map((c) => c.x)) - TILE;
  const maxX = Math.max(...corners.map((c) => c.x)) + TILE;
  const minY = Math.min(...corners.map((c) => c.y)) - maxStackHeight - TILE;
  const maxY = Math.max(...corners.map((c) => c.y)) + TILE;
  const vbW = maxX - minX;
  const vbH = maxY - minY;

  // Build draw list: floor tiles first, then cubes (back-to-front for painters' algorithm).
  type DrawItem =
    | { kind: "tile"; gx: number; gy: number; rigor: string; impact: string; total: number }
    | { kind: "cube"; gx: number; gy: number; gzBase: number; height: number; bucket: Bucket };

  const items: DrawItem[] = [];

  for (let ri = 0; ri < rows; ri++) {
    for (let ci = 0; ci < cols; ci++) {
      const rigor = RIGOR[ri].level;
      const impact = IMPACT[ci].level;
      let total = 0;
      for (const b of buckets.values()) {
        if (b.rigor === rigor && b.impact === impact) total += b.count;
      }
      items.push({ kind: "tile", gx: ci, gy: ri, rigor, impact, total });

      // Stack cubes Z0 (bottom) → Z5 (top).
      let gzCursor = 0;
      for (const z of BURDEN) {
        const key = `${rigor}-${impact}-${z.level}`;
        const b = buckets.get(key);
        if (!b) continue;
        const h = Math.max(MIN_BAR, b.count * UNIT_HEIGHT);
        items.push({
          kind: "cube",
          gx: ci,
          gy: ri,
          gzBase: gzCursor,
          height: h,
          bucket: b,
        });
        gzCursor += h + 2;
      }
    }
  }

  // Sort: tiles first (already in order), cubes by depth (back to front).
  // Back-most cell has smallest gx + gy. Higher z drawn last within a column.
  const cubes = items.filter((i) => i.kind === "cube") as Extract<DrawItem, { kind: "cube" }>[];
  const tiles = items.filter((i) => i.kind === "tile") as Extract<DrawItem, { kind: "tile" }>[];
  // Tiles: paint farthest first.
  tiles.sort((a, b) => a.gx + a.gy - (b.gx + b.gy));
  cubes.sort((a, b) => {
    const d = a.gx + a.gy - (b.gx + b.gy);
    if (d !== 0) return d;
    return a.gzBase - b.gzBase;
  });

  // Helpers to draw an isometric cube at grid (gx, gy), base z = gzBase, height h.
  const renderCube = (
    gx: number,
    gy: number,
    gzBase: number,
    h: number,
    color: string,
    key: string,
    bucket: Bucket
  ) => {
    // 8 corners of a unit-tile-footprint cuboid.
    const bf = project(gx, gy, gzBase);              // back/far bottom (origin corner)
    const br = project(gx + 1, gy, gzBase);          // bottom right (towards +X)
    const bl = project(gx, gy + 1, gzBase);          // bottom left (towards +Y)
    const bn = project(gx + 1, gy + 1, gzBase);      // bottom near
    const tf = project(gx, gy, gzBase + h);
    const tr = project(gx + 1, gy, gzBase + h);
    const tl = project(gx, gy + 1, gzBase + h);
    const tn = project(gx + 1, gy + 1, gzBase + h);

    const top = `${tf.x},${tf.y} ${tr.x},${tr.y} ${tn.x},${tn.y} ${tl.x},${tl.y}`;
    const right = `${br.x},${br.y} ${bn.x},${bn.y} ${tn.x},${tn.y} ${tr.x},${tr.y}`;
    const left = `${bl.x},${bl.y} ${bn.x},${bn.y} ${tn.x},${tn.y} ${tl.x},${tl.y}`;

    const burdenMeta = BURDEN.find((z) => z.level === bucket.burden);
    const rigorMeta = RIGOR.find((r) => r.level === bucket.rigor);
    const impactMeta = IMPACT.find((i) => i.level === bucket.impact);

    return (
      <TooltipProvider key={key} delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <g className="cursor-pointer transition-opacity hover:opacity-80">
              {/* Right (darker) */}
              <polygon points={right} fill={color} fillOpacity={0.55} stroke={color} strokeWidth={0.5} />
              {/* Left (medium) */}
              <polygon points={left} fill={color} fillOpacity={0.75} stroke={color} strokeWidth={0.5} />
              {/* Top (lightest) */}
              <polygon points={top} fill={color} fillOpacity={0.95} stroke="#ffffff" strokeWidth={0.6} />
            </g>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-1">
              <div className="font-medium text-sm">
                {bucket.rigor} / {bucket.impact} / {bucket.burden}
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">Products:</span>{" "}
                <span className="font-semibold">{bucket.count}</span>
              </div>
              {rigorMeta && (
                <div className="text-xs">
                  <span className="text-muted-foreground">Rigor:</span> {rigorMeta.name}
                </div>
              )}
              {impactMeta && (
                <div className="text-xs">
                  <span className="text-muted-foreground">Impact:</span> {impactMeta.name}
                </div>
              )}
              {burdenMeta && (
                <div className="text-xs pt-1 border-t">
                  <span className="text-muted-foreground">Burden:</span> {burdenMeta.name}
                  <div className="text-[11px] text-muted-foreground italic mt-0.5">
                    {burdenMeta.readinessConsequence}
                  </div>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderTile = (
    gx: number,
    gy: number,
    rigor: string,
    impact: string,
    total: number,
    key: string
  ) => {
    const a = project(gx, gy, 0);
    const b = project(gx + 1, gy, 0);
    const c = project(gx + 1, gy + 1, 0);
    const d = project(gx, gy + 1, 0);
    const points = `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`;
    return (
      <TooltipProvider key={key} delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <polygon
              points={points}
              fill="hsl(var(--muted))"
              fillOpacity={total > 0 ? 0.35 : 0.15}
              stroke="hsl(var(--border))"
              strokeWidth={0.6}
              className="cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent side="top">
            <div className="text-xs">
              <span className="font-medium">
                {rigor} / {impact}
              </span>{" "}
              — {total} product{total === 1 ? "" : "s"}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Axis labels at the back edges.
  const impactLabels = IMPACT.map((imp, i) => {
    const p = project(i + 0.5, -0.4, 0);
    return (
      <text
        key={`il-${imp.level}`}
        x={p.x}
        y={p.y}
        textAnchor="middle"
        className="fill-foreground"
        fontSize={11}
        fontWeight={600}
      >
        {imp.level}
      </text>
    );
  });

  const rigorLabels = RIGOR.map((rg, i) => {
    const p = project(-0.4, i + 0.5, 0);
    return (
      <text
        key={`rl-${rg.level}`}
        x={p.x}
        y={p.y + 4}
        textAnchor="end"
        className="fill-foreground"
        fontSize={11}
        fontWeight={600}
      >
        {rg.level}
      </text>
    );
  });

  // Z-axis ruler at far back-left corner.
  const zRuler = BURDEN.map((z, idx) => {
    const yOffset = idx * 22 + 12;
    const p = project(0, rows + 0.1, yOffset);
    return (
      <g key={`zr-${z.level}`}>
        <rect
          x={p.x - 26}
          y={p.y - 7}
          width={20}
          height={12}
          rx={2}
          fill={Z_COLORS[z.level]}
          fillOpacity={0.85}
        />
        <text
          x={p.x - 16}
          y={p.y + 2}
          textAnchor="middle"
          fontSize={9}
          fontWeight={700}
          fill="#ffffff"
        >
          {z.level}
        </text>
      </g>
    );
  });

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <svg
          viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
          className="w-full h-auto"
          style={{ minHeight: 420, maxHeight: 560 }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Floor tiles */}
          {tiles.map((t) =>
            renderTile(t.gx, t.gy, t.rigor, t.impact, t.total, `t-${t.rigor}-${t.impact}`)
          )}
          {/* Axis labels */}
          {impactLabels}
          {rigorLabels}
          {/* Z ruler swatches */}
          {zRuler}
          {/* Cubes */}
          {cubes.map((c) =>
            renderCube(
              c.gx,
              c.gy,
              c.gzBase,
              c.height,
              Z_COLORS[c.bucket.burden],
              `c-${c.bucket.rigor}-${c.bucket.impact}-${c.bucket.burden}`,
              c.bucket
            )
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Burden (Z) ramp:</span>
        {BURDEN.map((z) => (
          <span key={z.level} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: Z_COLORS[z.level] }}
            />
            <span>
              {z.level} — {z.name}
            </span>
          </span>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Bar height encodes product count at each (Evidence rigor, Clinical impact, Implementation burden) bucket.
        Stacks read bottom-up Z0 → Z5. {totalClassified} product
        {totalClassified === 1 ? "" : "s"} with all three axes classified are shown; products missing any axis are excluded.
        Hover any cube for details.
      </p>
    </div>
  );
};

export default EvidenceImpactMatrix3D;
