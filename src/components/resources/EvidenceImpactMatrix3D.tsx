import React, { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Text, Html, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import {
  EVIDENCE_RIGOR_LEVELS,
  CLINICAL_IMPACT_LEVELS,
  IMPLEMENTATION_BURDEN_LEVELS,
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

const Z_COLORS: Record<string, string> = {
  Z0: "#16a34a",
  Z1: "#0d9488",
  Z2: "#eab308",
  Z3: "#f97316",
  Z4: "#ef4444",
  Z5: "#e11d48",
};

const RIGOR = EVIDENCE_RIGOR_LEVELS;          // E0..E3
const IMPACT = CLINICAL_IMPACT_LEVELS;        // I0..I5
const BURDEN = IMPLEMENTATION_BURDEN_LEVELS;  // Z0..Z5

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

// ---------- Floor + grid ----------
const Floor: React.FC<{ cols: number; rows: number }> = ({ cols, rows }) => {
  const w = cols + 0.4;
  const d = rows + 0.4;
  return (
    <group position={[(cols - 1) / 2, 0, (rows - 1) / 2]}>
      {/* Base plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.95} metalness={0} />
      </mesh>
      {/* Cell grid */}
      <gridHelper
        args={[Math.max(w, d), Math.max(cols, rows), "#94a3b8", "#cbd5e1"]}
        position={[0, 0.001, 0]}
      />
    </group>
  );
};

// ---------- Axis labels ----------
const AxisLabels: React.FC<{ cols: number; rows: number; zHeight: number }> = ({
  cols,
  rows,
  zHeight,
}) => {
  const labelColor = "#1a1a2e";
  return (
    <group>
      {/* X axis: Impact (front edge, z = -0.7) */}
      {IMPACT.map((imp, i) => (
        <Text
          key={`ix-${imp.level}`}
          position={[i, 0.02, -0.9]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.32}
          color={labelColor}
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
        >
          {imp.level}
        </Text>
      ))}
      <Text
        position={[(cols - 1) / 2, 0.02, -1.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.28}
        color={labelColor}
        anchorX="center"
        anchorY="middle"
      >
        Clinical Impact (I) →
      </Text>

      {/* Z axis: Rigor (left edge, x = -0.9) */}
      {RIGOR.map((r, i) => (
        <Text
          key={`rz-${r.level}`}
          position={[-0.9, 0.02, i]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.32}
          color={labelColor}
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
        >
          {r.level}
        </Text>
      ))}
      <Text
        position={[-1.7, 0.02, (rows - 1) / 2]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        fontSize={0.28}
        color={labelColor}
        anchorX="center"
        anchorY="middle"
      >
        Evidence Rigor (E) →
      </Text>

      {/* Y axis: Burden ruler (back-left corner) */}
      {BURDEN.map((z, i) => {
        const y = (i + 0.5) * (zHeight / BURDEN.length);
        return (
          <group key={`zy-${z.level}`}>
            <mesh position={[-0.9, y, rows - 1]}>
              <boxGeometry args={[0.32, zHeight / BURDEN.length - 0.05, 0.05]} />
              <meshStandardMaterial color={Z_COLORS[z.level]} roughness={0.5} />
            </mesh>
            <Text
              position={[-1.4, y, rows - 1]}
              fontSize={0.26}
              color={labelColor}
              anchorX="center"
              anchorY="middle"
              fontWeight={700}
            >
              {z.level}
            </Text>
          </group>
        );
      })}
      <Text
        position={[-2.0, zHeight / 2, rows - 1]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.28}
        color={labelColor}
        anchorX="center"
        anchorY="middle"
      >
        Implementation Burden (Z) ↑
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
      <AxisLabels cols={cols} rows={rows} zHeight={zHeight} />

      {renderedBars}

      <PerspectiveCamera makeDefault position={[cols * 1.4, zHeight * 1.6, rows * 2.4]} fov={42} />
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
      const z = p.implementationBurden;
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

  // When products change, drop stale selection.
  useEffect(() => {
    setSelected(null);
    setHovered(null);
  }, [products]);

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
                            to={`/products/${prod.id}`}
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
