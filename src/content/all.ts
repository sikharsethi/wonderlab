import { SUBJECTS } from './subjects';
import { EXTRA } from './extra';
import { BIO } from './bio';
// Refreshed intro lines (the 3D wording is gone)
const INTRO: Record<string, string> = {
  science: 'Explore the Sun, the planets and our solar system!',
  chemistry: 'Atoms and molecules are the tiny pieces of everything!',
  math: 'Play with numbers, shapes and puzzles!',
};
export const ALL = [...SUBJECTS, ...EXTRA, ...BIO].map(s => (INTRO[s.id] ? { ...s, intro: INTRO[s.id] } : s));
export const getSubject = (id: string) => ALL.find(s => s.id === id);
