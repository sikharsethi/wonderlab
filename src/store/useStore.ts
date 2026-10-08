import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type S = { celebrated: string[] | null; celebrate: (n: string[]) => void; seen: string[]; see: (k: string[]) => void; unsee: (k: string[]) => void; found: string[]; stars: number; selected: string | null; streak: number; best: number; last: string;
  select: (id: string | null) => void; discover: (id: string) => void; award: () => void; checkin: () => void };
const day = (d = new Date()) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
export const useStore = create<S>()(persist((set, get) => ({
  celebrated: null, celebrate: n => set(s => ({ celebrated: Array.from(new Set([...(s.celebrated ?? []), ...n])) })), seen: [], see: k => set(s => ({ seen: Array.from(new Set([...s.seen, ...k])).slice(-500) })), unsee: k => set(s => ({ seen: s.seen.filter(x => !k.includes(x)) })), found: [], stars: 0, selected: null, streak: 0, best: 0, last: '',
  select: id => set({ selected: id }),
  discover: id => { if (!get().found.includes(id)) set(s => ({ found: [...s.found, id], stars: s.stars + 1 })); },
  award: () => set(s => ({ stars: s.stars + 1 })),
  // Daily streak: +1 if you played yesterday, reset to 1 if you missed a day
  checkin: () => {
    const { last, streak, best } = get(); const t = day(); if (last === t) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    const n = last === day(y) ? streak + 1 : 1;
    set({ last: t, streak: n, best: Math.max(best, n) });
  },
}), { name: 'wonderlab', partialize: s => ({ celebrated: s.celebrated, seen: s.seen, found: s.found, stars: s.stars, streak: s.streak, best: s.best, last: s.last }) }));
