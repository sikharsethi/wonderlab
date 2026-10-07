import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type S = { found: string[]; stars: number; selected: string | null; streak: number; best: number; last: string;
  select: (id: string | null) => void; discover: (id: string) => void; award: () => void; checkin: () => void };
const day = (d = new Date()) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
export const useStore = create<S>()(persist((set, get) => ({
  found: [], stars: 0, selected: null, streak: 0, best: 0, last: '',
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
}), { name: 'wonderlab', partialize: s => ({ found: s.found, stars: s.stars, streak: s.streak, best: s.best, last: s.last }) }));
