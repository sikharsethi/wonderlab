import { useStore } from '@/store/useStore';
import type { Subject } from '@/content/types';

const sh = <T>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

/** Picks n items, UNSEEN ones first (random order). Only once everything was seen does it reshuffle all, so rounds don't repeat. */
export function fresh<T>(ns: string, items: T[], key: (t: T) => string, n: number): T[] {
  const seen = new Set(useStore.getState().seen); const k = (t: T) => `${ns}:${key(t)}`;
  return [...sh(items.filter(t => !seen.has(k(t)))), ...sh(items.filter(t => seen.has(k(t))))].slice(0, n);
}
export const see = (keys: string[]) => useStore.getState().see(keys);

/** Facts available at a level (1 easy, 2 medium, 3 hard). Subjects without levels use every fact. */
export const pool = (s: Subject, lv: number) => { const p = s.facts.filter(f => (f.lv ?? 1) <= lv); return p.length >= 4 ? p : s.facts; };
