import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type S = { found: string[]; stars: number; selected: string | null;
  select: (id: string | null) => void; discover: (id: string) => void; award: () => void };
export const useStore = create<S>()(persist((set, get) => ({
  found: [], stars: 0, selected: null,
  select: id => set({ selected: id }),
  discover: id => { if (!get().found.includes(id)) set(s => ({ found: [...s.found, id], stars: s.stars + 1 })); },
  award: () => set(s => ({ stars: s.stars + 1 })),
}), { name: 'wonderlab', partialize: s => ({ found: s.found, stars: s.stars }) }));
