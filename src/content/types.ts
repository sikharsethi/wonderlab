export type Fact = { id: string; name: string; emoji: string; text: string; lv?: number };
export type QuizQ = { q: string; options: string[]; answer: number };
export type Subject = {
  id: string; name: string; emoji: string; color: string; bg?: string; intro: string;
  scene?: string; camera?: [number, number, number];
  facts: Fact[]; quiz: QuizQ[];
};
