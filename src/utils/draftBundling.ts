export interface BundleSourceDraft {
  id: string;
  product_id: string;
  updated_at: string;
  status: string;
  draft_data: Record<string, unknown>;
  changed_fields: string[];
  creator_name?: string;
  creator_email?: string;
}

export interface FieldHistoryEntry {
  draftId: string;
  updatedAt: string;
  author?: string;
  value: unknown;
}

export interface BundledField {
  path: string;
  current: unknown;
  proposed: unknown;
  history: FieldHistoryEntry[];
}

export interface ProductBundle {
  productId: string;
  drafts: BundleSourceDraft[];
  fields: BundledField[];
}

export function getAtPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc === null || acc === undefined || typeof acc !== 'object') return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

export function setAtPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');
  let cursor: Record<string, unknown> = obj;
  keys.slice(0, -1).forEach(key => {
    const next = cursor[key];
    if (!next || typeof next !== 'object' || Array.isArray(next)) cursor[key] = {};
    cursor = cursor[key] as Record<string, unknown>;
  });
  cursor[keys[keys.length - 1]] = value;
}

export function valuesEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

/** Groups drafts per product; for each changed path the newest draft (by updated_at) wins. */
export function buildBundles(
  drafts: BundleSourceDraft[],
  getCurrent: (productId: string) => unknown,
): ProductBundle[] {
  const byProduct = new Map<string, BundleSourceDraft[]>();
  drafts.forEach(d => {
    const list = byProduct.get(d.product_id) ?? [];
    list.push(d);
    byProduct.set(d.product_id, list);
  });

  return [...byProduct.entries()].map(([productId, list]) => {
    const sorted = [...list].sort((a, b) => a.updated_at.localeCompare(b.updated_at));
    const current = getCurrent(productId);
    const fieldMap = new Map<string, FieldHistoryEntry[]>();
    sorted.forEach(d => {
      (d.changed_fields ?? []).forEach(path => {
        const entries = fieldMap.get(path) ?? [];
        entries.push({
          draftId: d.id,
          updatedAt: d.updated_at,
          author: d.creator_name || d.creator_email,
          value: getAtPath(d.draft_data, path),
        });
        fieldMap.set(path, entries);
      });
    });
    const fields: BundledField[] = [...fieldMap.entries()]
      .map(([path, history]) => ({
        path,
        current: getAtPath(current, path),
        proposed: history[history.length - 1].value,
        history,
      }))
      .sort((a, b) => a.path.localeCompare(b.path));
    return { productId, drafts: sorted, fields };
  });
}
