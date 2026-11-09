import type { EudamedDeviceRegistration } from "@/types/eudamed";

export type RegistryMap = Record<string, EudamedDeviceRegistration[]>;

export interface RegistryChange {
  productId: string;
  kind: "added" | "removed" | "changed";
  detail: string;
}

/** Replace only refreshed product IDs; everything else (other vendors, failed lookups) is kept. */
export function mergeRegistry(previous: RegistryMap, fresh: RegistryMap, refreshedIds: Iterable<string>): RegistryMap {
  const next: RegistryMap = { ...previous };
  for (const id of refreshedIds) delete next[id];
  for (const [id, list] of Object.entries(fresh)) if (list.length) next[id] = list;
  return Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
}

const fingerprint = (r: EudamedDeviceRegistration): string =>
  `${r.basicUdi}|${r.primaryDi ?? ""}|${r.emdnCode ?? ""}`;

export function diffRegistry(previous: RegistryMap, next: RegistryMap): RegistryChange[] {
  const ids = new Set([...Object.keys(previous), ...Object.keys(next)]);
  const changes: RegistryChange[] = [];
  for (const id of [...ids].sort()) {
    const before = (previous[id] ?? []).map(fingerprint).sort();
    const after = (next[id] ?? []).map(fingerprint).sort();
    if (before.join() === after.join()) continue;
    if (!before.length) changes.push({ productId: id, kind: "added", detail: after.join("; ") });
    else if (!after.length) changes.push({ productId: id, kind: "removed", detail: before.join("; ") });
    else changes.push({ productId: id, kind: "changed", detail: `${before.join("; ")} → ${after.join("; ")}` });
  }
  return changes;
}
