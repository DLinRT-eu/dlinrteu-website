import React, { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Text, Html, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import {
  EVIDENCE_RIGOR_LEVELS,
  CLINICAL_IMPACT_LEVELS,
  ADOPTION_READINESS_LEVELS,
} from "@/data/evidence-impact-levels";
import dataService from "@/services/DataService";
import type { ProductDetails } from "@/types/productDetails";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { RotateCw, RefreshCw, Eye, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Real interactive WebGL 3D plot of the Evidence × Impact × Implementation-Burden matrix.
 *
 * Axes (3D world):
 *  - X : Clinical Impact      I0 → I5
 *  - Y : Implementation Burden Z0 → Z5  (vertical, height of bars also encodes count)
 *  - Z : Evidence Rigor       E0 → E3
 *
 * Each (E, I, Z) bucket with ≥1 product → one box.
 *  - footprint  : 0.8 × 0.8 cell units
 *  - height     : sqrt(count) (compresses outliers); minimum visible height
 *  - color      : burden-tier palette
 *  - hover      : emissive glow + HTML tooltip
 *  - click      : pin selection in the side panel
 */

interface EvidenceImpactMatrix3DProps {
  products?: ProductDetails[];
}

// Per-axis readiness palette (R0 low → R5 high readiness; rose → green).
const R_COLORS: Record<string, string> = {
  R0: "#e11d48",
  R1: "#ef4444",
  R2: "#f97316",
  R3: "#eab308",
  R4: "#0d9488",
  R5: "#16a34a",
};

// Composite (E,I,R) → single sequential ramp so the bar color reflects all
// three axes, not just R. Score in [0,1].
const E_RANK_M: Record<string, number> = { E0: 0, E1: 1, E2: 2, E3: 3 };
const I_RANK_M: Record<string, number> = { I0: 0, I1: 1, I2: 2, I3: 3, I4: 4, I5: 5 };
const R_RANK_M: Record<string, number> = { R0: 0, R1: 1, R2: 2, R3: 3, R4: 4, R5: 5 };

// Sequential rose → green ramp (low to high composite readiness/impact/rigor).
const RAMP = ["#e11d48", "#ef4444", "#f97316", "#eab308", "#0d9488", "#16a34a"];

const compositeColor = (rigor: string, impact: string, burden: string): string => {
  const score = ((E_RANK_M[rigor] ?? 0) / 3 + (I_RANK_M[impact] ?? 0) / 5 + (R_RANK_M[burden] ?? 0) / 5) / 3;
  const idx = Math.min(RAMP.length - 1, Math.max(0, Math.round(score * (RAMP.length - 1))));
  return RAMP[idx];
};

const RIGOR = EVIDENCE_RIGOR_LEVELS;          // E0..E3
const IMPACT = CLINICAL_IMPACT_LEVELS;        // I0..I5
const BURDEN = ADOPTION_READINESS_LEVELS;     // R0..R5

interface BucketProduct {
  id: string;
  name: string;
  company?: string;
  category?: string;
}

interface Bucket {
  rigor: string;
  impact: string;
  burden: string;
  count: number;
  products: BucketProduct[];
}

// ---------- Bars ----------
interface BarProps {
  bucket: Bucket;
  x: number;
  z: number;
  yBase: number;
  height: number;
  color: string;
  selected: boolean;
  onHover: (b: Bucket | null, screenPos?: { x: number; y: number }) => void;
  onSelect: (b: Bucket) => void;
}

const Bar: React.FC<BarProps> = ({ bucket, x, z, yBase, height, color, selected, onHover, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const baseColor = useMemo(() => new THREE.Color(color), [color]);
  const isHighlighted = hovered || selected;
  const emissive = isHighlighted ? baseColor.clone().multiplyScalar(0.9) : new THREE.Color("#000000");
  const scale = hovered ? 1.08 : 1;

  return (
    <group position={[x, yBase + height / 2, z]}>
      <mesh
        ref={meshRef}
        scale={[scale, 1, scale]}
        castShadow
        receiveShadow
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
          onHover(bucket);
        }}
        onPointerOut={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
          onHover(null);
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect(bucket);
        }}
      >
        <boxGeometry args={[0.78, height, 0.78]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={emissive}
          emissiveIntensity={isHighlighted ? 0.6 : 0}
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>

      {/* Selected outline */}
      {selected && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.86, height + 0.04, 0.86]} />
          <meshBasicMaterial color="#1a1a2e" wireframe />
        </mesh>
      )}

      {/* Floating tooltip on hover, pinned label on select */}
      {(hovered || selected) && (
        <Html
          position={[0, height / 2 + 0.25, 0]}
          center
          distanceFactor={10}
          zIndexRange={[100, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            className="rounded-md bg-background/95 backdrop-blur border shadow-lg px-2.5 py-1.5 text-[11px] whitespace-nowrap"
            style={{ borderColor: color }}
          >
            <div className="font-bold">
              {bucket.rigor} · {bucket.impact} · {bucket.burden}
            </div>
            <div className="text-muted-foreground">
              {bucket.count} product{bucket.count === 1 ? "" : "s"}
              {!selected && " · click to list"}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// ---------- Floor (subtle grid only) ----------
const Floor: React.FC<{ cols: number; rows: number }> = ({ cols, rows }) => {
  const size = Math.max(cols, rows);
  return (
    <group position={[(cols - 1) / 2, 0, (rows - 1) / 2]}>
      <gridHelper
        args={[size, size, "#cbd5e1", "#e2e8f0"]}
        position={[0, 0, 0]}
      />
    </group>
  );
};

// ---------- Axes (E, I, Z) drawn like the reference figure ----------
// Layout convention:
//   X = Evidence rigor (E)   — front-left edge along the floor
//   Z = Clinical impact (I)  — front-right edge along the floor
//   Y = Implementation burden (Z) — vertical, back-right corner
const AxisLine: React.FC<{
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
}> = ({ from, to, color = "#1a1a2e" }) => {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const dir = b.clone().sub(a);
  const len = dir.length();
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize()
  );
  return (
    <mesh position={mid.toArray()} quaternion={quat}>
      <cylinderGeometry args={[0.025, 0.025, len, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

const Axes: React.FC<{ cols: number; rows: number; zHeight: number }> = ({
  cols,
  rows,
  zHeight,
}) => {
  const labelColor = "#1a1a2e";
  // The "front" of the scene is z = rows - 1 (closest to camera).
  // The "back-right" corner where the Z axis stands is (cols - 1, 0, -0.5).
  const frontZ = rows - 0.5;          // E axis line sits here (front)
  const rightX = cols - 0.5;          // I axis line sits here (right)
  const backZ = -0.5;
  const leftX = -0.5;

  const tickProps = {
    fontSize: 0.3,
    color: labelColor,
    anchorX: "center" as const,
    anchorY: "middle" as const,
    outlineWidth: 0.012,
    outlineColor: "#ffffff",
  };

  return (
    <group>
      {/* === I axis (Clinical impact) — front edge, runs along X (length = cols) === */}
      <AxisLine from={[leftX, 0, frontZ]} to={[rightX, 0, frontZ]} />
      {IMPACT.map((imp, i) => (
        <group key={`i-${imp.level}`}>
          <mesh position={[i, 0, frontZ + 0.08]}>
            <boxGeometry args={[0.04, 0.04, 0.12]} />
            <meshBasicMaterial color={labelColor} />
          </mesh>
          <Text
            {...tickProps}
            position={[i, 0.01, frontZ + 0.45]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontWeight={700}
          >
            {imp.level}
          </Text>
        </group>
      ))}
      <Text
        {...tickProps}
        position={[(cols - 1) / 2, 0.01, frontZ + 1.15]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.34}
      >
        Clinical impact (I-axis) →
      </Text>

      {/* === E axis (Evidence rigour) — right edge, runs along Z (length = rows) === */}
      <AxisLine from={[rightX, 0, frontZ]} to={[rightX, 0, backZ]} />
      {RIGOR.map((r, i) => (
        <group key={`e-${r.level}`}>
          <mesh position={[rightX + 0.08, 0, i]}>
            <boxGeometry args={[0.12, 0.04, 0.04]} />
            <meshBasicMaterial color={labelColor} />
          </mesh>
          <Text
            {...tickProps}
            position={[rightX + 0.5, 0.01, i]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontWeight={700}
          >
            {r.level}
          </Text>
        </group>
      ))}
      <Text
        {...tickProps}
        position={[rightX + 1.25, 0.01, (rows - 1) / 2]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        fontSize={0.34}
      >
        Evidence rigour (E-axis) →
      </Text>

      {/* === Z axis (Implementation burden) — vertical at back-right corner === */}
      <AxisLine from={[rightX, 0, backZ]} to={[rightX, zHeight, backZ]} />
      {BURDEN.map((z, i) => {
        const y = (i + 0.5) * (zHeight / BURDEN.length);
        const labelText =
          i === 0 ? `${z.level} low` : i === BURDEN.length - 1 ? `${z.level} high` : z.level;
        return (
          <group key={`z-${z.level}`}>
            <mesh position={[rightX + 0.08, y, backZ]}>
              <boxGeometry args={[0.12, 0.04, 0.04]} />
              <meshBasicMaterial color={labelColor} />
            </mesh>
            <Text
              {...tickProps}
              position={[rightX + 0.55, y, backZ]}
              fontWeight={700}
            >
              {labelText}
            </Text>
          </group>
        );
      })}
      <Text
        {...tickProps}
        position={[rightX + 1.5, zHeight / 2, backZ]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.34}
      >
        Implementation effort / assurance burden (Z-axis) ↑
      </Text>
    </group>
  );
};

// ---------- Auto-rotate driver ----------
const AutoRotate: React.FC<{ controlsRef: React.MutableRefObject<any>; enabled: boolean }> = ({
  controlsRef,
  enabled,
}) => {
  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = enabled;
      controlsRef.current.autoRotateSpeed = 0.8;
      controlsRef.current.update();
    }
  });
  return null;
};

// ---------- Scene ----------
interface SceneProps {
  buckets: Bucket[];
  showEmpty: boolean;
  selected: Bucket | null;
  onHover: (b: Bucket | null) => void;
  onSelect: (b: Bucket) => void;
  controlsRef: React.MutableRefObject<any>;
  autoRotate: boolean;
}

const Scene: React.FC<SceneProps> = ({
  buckets,
  showEmpty,
  selected,
  onHover,
  onSelect,
  controlsRef,
  autoRotate,
}) => {
  const cols = IMPACT.length;       // 6
  const rows = RIGOR.length;        // 4
  const zCount = BURDEN.length;     // 6
  const zSlot = 1.1;                // vertical units per Z slot
  const zHeight = zCount * zSlot;

  const maxCount = Math.max(1, ...buckets.map((b) => b.count));
  const heightFor = (count: number) => {
    // sqrt scaling so a single big cell doesn't crush the rest.
    const norm = Math.sqrt(count) / Math.sqrt(maxCount);
    return Math.max(0.18, norm * (zSlot - 0.15));
  };

  const renderedBars = useMemo(() => {
    const out: React.ReactNode[] = [];
    const byKey = new Map(buckets.map((b) => [`${b.rigor}-${b.impact}-${b.burden}`, b]));
    for (let r = 0; r < rows; r++) {
      for (let i = 0; i < cols; i++) {
        for (let z = 0; z < zCount; z++) {
          const rigor = RIGOR[r].level;
          const impact = IMPACT[i].level;
          const burden = BURDEN[z].level;
          const key = `${rigor}-${impact}-${burden}`;
          const bucket = byKey.get(key);
          const yBase = z * zSlot;
          if (bucket) {
            const isSel =
              selected !== null &&
              selected.rigor === rigor &&
              selected.impact === impact &&
              selected.burden === burden;
            out.push(
              <Bar
                key={key}
                bucket={bucket}
                x={i}
                z={r}
                yBase={yBase}
                height={heightFor(bucket.count)}
                color={Z_COLORS[burden]}
                selected={isSel}
                onHover={onHover}
                onSelect={onSelect}
              />
            );
          } else if (showEmpty) {
            out.push(
              <mesh key={`empty-${key}`} position={[i, yBase + 0.04, r]}>
                <boxGeometry args={[0.78, 0.04, 0.78]} />
                <meshStandardMaterial
                  color={Z_COLORS[burden]}
                  transparent
                  opacity={0.18}
                  roughness={0.9}
                />
              </mesh>
            );
          }
        }
      }
    }
    return out;
  }, [buckets, showEmpty, selected, maxCount]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[8, 14, 8]}
        intensity={0.9}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-6, 8, -4]} intensity={0.35} />

      <Floor cols={cols} rows={rows} />
      <Axes cols={cols} rows={rows} zHeight={zHeight} />

      {renderedBars}

      <PerspectiveCamera makeDefault position={[cols * 1.7, zHeight * 1.1, rows * 2.6]} fov={40} />
      <OrbitControls
        ref={controlsRef}
        target={[(cols - 1) / 2, zHeight / 3, (rows - 1) / 2]}
        enablePan
        enableZoom
        enableRotate
        minDistance={6}
        maxDistance={28}
        maxPolarAngle={Math.PI / 2.05}
      />
      <AutoRotate controlsRef={controlsRef} enabled={autoRotate} />
    </>
  );
};

// ---------- Main exported component ----------
const EvidenceImpactMatrix3D: React.FC<EvidenceImpactMatrix3DProps> = ({ products }) => {
  const isMobile = useIsMobile();
  const controlsRef = useRef<any>(null);
  const [hovered, setHovered] = useState<Bucket | null>(null);
  const [selected, setSelected] = useState<Bucket | null>(null);
  const [showEmpty, setShowEmpty] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const buckets = useMemo<Bucket[]>(() => {
    const map = new Map<string, Bucket>();
    const source = products ?? dataService.getAllProducts();
    for (const p of source) {
      const e = p.evidenceRigor;
      const i = p.clinicalImpact;
      const z = p.adoptionReadiness;
      if (!e || !i || !z) continue;
      const key = `${e}-${i}-${z}`;
      const prod: BucketProduct = {
        id: p.id,
        name: p.name,
        company: p.company,
        category: p.category,
      };
      const existing = map.get(key);
      if (existing) {
        existing.count += 1;
        existing.products.push(prod);
      } else {
        map.set(key, { rigor: e, impact: i, burden: z, count: 1, products: [prod] });
      }
    }
    return Array.from(map.values());
  }, [products]);

  const totalClassified = useMemo(() => buckets.reduce((s, b) => s + b.count, 0), [buckets]);

  // When the product set actually changes (not just a new array reference from the parent),
  // drop stale selection. Use a stable signature so clicks aren't wiped by re-renders.
  const productSig = useMemo(
    () => (products ?? []).map((p) => p.id).sort().join("|"),
    [products]
  );
  useEffect(() => {
    setSelected(null);
    setHovered(null);
  }, [productSig]);

  const resetView = () => setResetKey((k) => k + 1);

  const detail = selected ?? hovered;
  const detailMeta = detail
    ? {
        rigor: RIGOR.find((r) => r.level === detail.rigor),
        impact: IMPACT.find((i) => i.level === detail.impact),
        burden: BURDEN.find((b) => b.level === detail.burden),
      }
    : null;

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetView} className="h-8 text-xs">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Reset view
          </Button>
          <Toggle
            pressed={autoRotate}
            onPressedChange={setAutoRotate}
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            aria-label="Auto-rotate"
          >
            <RotateCw className="h-3.5 w-3.5 mr-1.5" />
            Auto-rotate
          </Toggle>
          <Toggle
            pressed={showEmpty}
            onPressedChange={setShowEmpty}
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            aria-label="Show empty cells"
          >
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            Empty cells
          </Toggle>
        </div>
        <div className="text-xs text-muted-foreground">
          Drag to rotate · scroll to zoom · right-drag to pan
        </div>
      </div>

      {/* Canvas + side panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-3">
        <div
          className="relative w-full rounded-lg border bg-gradient-to-b from-background to-muted/30 overflow-hidden"
          style={{ minHeight: isMobile ? 440 : 620 }}
        >
          <Canvas
            key={resetKey}
            shadows
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ width: "100%", height: "100%", minHeight: isMobile ? 440 : 620 }}
          >
            <Suspense fallback={null}>
              <Scene
                buckets={buckets}
                showEmpty={showEmpty}
                selected={selected}
                onHover={setHovered}
                onSelect={setSelected}
                controlsRef={controlsRef}
                autoRotate={autoRotate}
              />
            </Suspense>
          </Canvas>

          {/* Floating hover/selected pill in canvas corner (always visible) */}
          {detail && detailMeta && (
            <div className="absolute top-3 left-3 max-w-[280px] rounded-md border bg-background/95 backdrop-blur px-3 py-2 shadow-md text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">
                  {detail.rigor} / {detail.impact} / {detail.burden}
                </span>
                {selected && (
                  <button
                    onClick={() => setSelected(null)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Clear selection"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <div className="mt-1">
                <span className="text-muted-foreground">Products:</span>{" "}
                <span className="font-semibold text-primary">{detail.count}</span>
              </div>
            </div>
          )}
        </div>

        {/* Side panel */}
        <aside className="rounded-lg border bg-card p-3 text-xs space-y-3">
          <div>
            <div className="font-semibold text-sm mb-1">
              {detail ? "Bucket details" : "Burden axis (Z)"}
            </div>
            {detail && detailMeta ? (
              <div className="space-y-2">
                <div className="text-muted-foreground">
                  <span className="font-medium text-foreground">Rigor:</span> {detailMeta.rigor?.name}
                </div>
                <div className="text-muted-foreground">
                  <span className="font-medium text-foreground">Impact:</span>{" "}
                  {detailMeta.impact?.name}
                </div>
                <div className="text-muted-foreground">
                  <span className="font-medium text-foreground">Burden:</span>{" "}
                  {detailMeta.burden?.name}
                </div>
                {detailMeta.burden && (
                  <div className="pt-2 border-t text-muted-foreground italic">
                    {detailMeta.burden.readinessConsequence}
                  </div>
                )}
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-muted-foreground">
                      Products{" "}
                      <span className="font-semibold text-primary">({detail.count})</span>
                    </span>
                    {selected && (
                      <button
                        onClick={() => setSelected(null)}
                        className="text-[10px] text-muted-foreground hover:text-foreground underline"
                      >
                        clear
                      </button>
                    )}
                  </div>
                  {selected ? (
                    <ul className="max-h-64 overflow-auto pr-1 space-y-1.5">
                      {detail.products.map((prod) => (
                        <li key={prod.id}>
                          <Link
                            to={`/product/${prod.id}`}
                            className="group block rounded-md border border-transparent hover:border-border hover:bg-muted/50 px-2 py-1.5 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-medium text-foreground group-hover:text-primary line-clamp-2">
                                {prod.name}
                              </span>
                              <ExternalLink className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
                            </div>
                            {(prod.company || prod.category) && (
                              <div className="text-[10px] text-muted-foreground mt-0.5">
                                {[prod.company, prod.category].filter(Boolean).join(" · ")}
                              </div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[11px] text-muted-foreground italic">
                      Click the bar to list products in this bucket.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Hover or click a bar for details. Bar height encodes product count
                (square-root scaled).
              </p>
            )}
          </div>

          <div className="pt-2 border-t">
            <div className="font-semibold mb-1.5">Burden palette</div>
            <ul className="space-y-1">
              {BURDEN.map((z) => (
                <li key={z.level} className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: Z_COLORS[z.level] }}
                  />
                  <span className="font-medium">{z.level}</span>
                  <span className="text-muted-foreground truncate">{z.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t text-muted-foreground">
            {totalClassified} product{totalClassified === 1 ? "" : "s"} with all three axes
            classified are shown. Products missing any axis are excluded.
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EvidenceImpactMatrix3D;
