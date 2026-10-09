import type { Fact, RushQ, Subject } from './types';

const sh = <T>(a: T[]) => [...a].sort(() => Math.random() - 0.5);
const short = (n: string) => n.split(' (')[0];

/**
 * Builds Quiz Rush questions for a subject. Every prompt is a complete, natural sentence:
 *  - "Can you guess it? <clue>"            -> pick the name
 *  - "Which word matches this picture?"     -> big emoji above, pick the name (never a picture option)
 *  - fact.ask (optional, hand-written)      -> e.g. "Which continent has kangaroos?"
 * Wrong answers come from the same `group` when set (continents vs continents), else from other facts.
 */
export function buildQuestions(s: Subject): RushQ[] {
  const decoys = (f: Fact) => {
    const same = f.group ? s.facts.filter(x => x.group === f.group && x.id !== f.id) : [];
    return sh(same.length >= 2 ? same : s.facts.filter(x => x.id !== f.id)).slice(0, 2);
  };
  const options = (f: Fact) => sh([short(f.name), ...decoys(f).map(x => short(x.name))]);
  const fromFacts = s.facts.flatMap<RushQ>(f => [
    { id: `g-${f.id}`, fid: f.id, prompt: `Can you guess it? ${f.text}`, options: options(f), answer: short(f.name) },
    f.ask
      ? { id: `a-${f.id}`, fid: f.id, prompt: f.ask, options: options(f), answer: short(f.name) }
      : { id: `w-${f.id}`, fid: f.id, prompt: 'Which word matches this picture?', art: f.emoji, options: options(f), answer: short(f.name) },
  ]);
  const base = s.quiz.map<RushQ>(q => ({ id: `q-${q.q}`, prompt: q.q, options: q.options, answer: q.options[q.answer] }));
  return [...base, ...fromFacts];
}

/** What to show on the results screen when a question was missed */
export const reviewFor = (s: Subject, q: RushQ) => {
  const f = s.facts.find(x => x.id === q.fid);
  return f ? { e: f.emoji, t: short(f.name), p: f.text } : { e: '❓', t: q.prompt, p: `Answer: ${q.answer}` };
};
