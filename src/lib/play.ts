import { createContext } from 'react';
/** Tells results screens which subject/game is being played, so each finished game can be logged. */
export type PlayMeta = { sid: string; sname: string; semoji: string; game: string };
export const PlayCtx = createContext<PlayMeta | null>(null);
