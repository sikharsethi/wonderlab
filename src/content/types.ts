export type Fact = { id: string; name: string; emoji: string; text: string; lv?: number; group?: string; ask?: string };
export type QuizQ = { q: string; options: string[]; answer: number };
/** One Quiz Rush question. `art` is a big picture shown above the prompt; options are always plain text labels. */
export type RushQ = { id: string; prompt: string; art?: string; options: string[]; answer: string; fid?: string };
export type Subject = {
  id: string; name: string; emoji: string; color: string; bg?: string; intro: string;
  scene?: string; camera?: [number, number, number];
  facts: Fact[]; quiz: QuizQ[];
};
