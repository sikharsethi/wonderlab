'use client';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useStore } from '@/store/useStore';
import { sfx } from '@/lib/sound';
import type { Subject } from '@/content/types';

type GP = { s: Subject; exit: () => void };
export const sh = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);
const give = (n: number) => { for (let i = 0; i < n; i++) useStore.getState().award(); };
const COL = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#0ea5e9', '#8b5cf6', '#ec4899'];
const short = (n: string) => n.split(' (')[0];

function Confetti() {
  const bits = useMemo(() => Array.from({ length: 44 }, () => ({ l: Math.random() * 100, d: Math.random(), c: COL[Math.floor(Math.random() * 7)] })), []);
  return <div className="cf">{bits.map((b, i) => <i key={i} style={{ left: `${b.l}%`, background: b.c, animationDelay: `${b.d}s` }} />)}</div>;
}
export function Result({ e, t, p, stars, again, exit }: { e: string; t: string; p: string; stars: number; again: () => void; exit: () => void }) {
  const once = useRef(false);
  useEffect(() => { if (!once.current) { once.current = true; give(stars); sfx.win(); } }, [stars]);
  return (
    <div className="gp glass res"><Confetti />
      <div className="big">{e}</div><h2>{t}</h2><p>{p}</p><p className="earn">+{stars} ⭐</p>
      <div className="actions"><button className="btn" onClick={again}>Play again</button><button className="btn ghost" onClick={exit}>All games</button></div>
    </div>
  );
}
export function Shell({ title, chips, exit, children }: { title: string; chips: string[]; exit: () => void; children: ReactNode }) {
  return (
    <div className="gp glass">
      <div className="ghead"><button className="btn ghost" onClick={exit}>← Games</button><b>{title}</b>
        <span className="stats">{chips.map((c, i) => <span key={i} className="stat">{c}</span>)}</span></div>
      {children}
    </div>
  );
}

/* 🃏 Memory Match: pair each emoji with its name */
export function Memory({ s, exit }: GP) {
  const [round, setRound] = useState(0);
  const cards = useMemo(() => sh(sh(s.facts).slice(0, 6).flatMap(f => [{ k: f.id, t: f.emoji, em: true }, { k: f.id, t: short(f.name), em: false }])), [s, round]);
  const [up, setUp] = useState<number[]>([]); const [ok, setOk] = useState<string[]>([]); const [moves, setMoves] = useState(0);
  const tap = (i: number) => {
    if (up.length === 2 || up.includes(i) || ok.includes(cards[i].k)) return;
    const n = [...up, i]; setUp(n); sfx.flip();
    if (n.length === 2) {
      setMoves(m => m + 1);
      if (cards[n[0]].k === cards[n[1]].k) { setOk(o => [...o, cards[i].k]); setUp([]); sfx.ok(); } else { sfx.no(); setTimeout(() => setUp([]), 800); }
    }
  };
  if (ok.length === cards.length / 2)
    return <Result e="🏆" t="You matched them all!" p={`Finished in ${moves} moves`} stars={moves <= cards.length / 2 + 3 ? 3 : 2}
      again={() => { setRound(r => r + 1); setUp([]); setOk([]); setMoves(0); }} exit={exit} />;
  return (
    <Shell title="🃏 Memory Match" chips={[`Moves ${moves}`, `Pairs ${ok.length}/${cards.length / 2}`]} exit={exit}>
      <p className="hint">Match each picture with its name!</p>
      <div className="mg">{cards.map((c, i) => {
        const show = up.includes(i) || ok.includes(c.k);
        return <button key={i} className={`mc ${show ? 'up' : ''} ${ok.includes(c.k) ? 'ok' : ''} ${show && c.em ? 'em' : ''}`} onClick={() => tap(i)}>{show ? c.t : '❓'}</button>;
      })}</div>
    </Shell>
  );
}

/* 🔤 Word Scramble */
export function Scramble({ s, exit }: GP) {
  const [seed, setSeed] = useState(0);
  const words = useMemo(() => sh(s.facts.map(f => ({ f, w: short(f.name).replace(/[^A-Za-z]/g, '').toUpperCase() })).filter(x => x.w.length >= 4 && x.w.length <= 9)).slice(0, 5), [s, seed]);
  const [n, setN] = useState(0); const [pick, setPick] = useState<number[]>([]); const [score, setScore] = useState(0); const [bad, setBad] = useState(false);
  const cur = words[n];
  const letters = useMemo(() => (cur ? sh(cur.w.split('')) : []), [cur]);
  const tap = (i: number) => {
    if (pick.includes(i) || pick.length >= cur.w.length) return;
    const p = [...pick, i]; setPick(p); sfx.tap();
    if (p.length === cur.w.length) {
      if (p.map(j => letters[j]).join('') === cur.w) { sfx.ok(); setScore(x => x + 1); setTimeout(() => { setN(x => x + 1); setPick([]); }, 800); }
      else { sfx.no(); setBad(true); setTimeout(() => { setPick([]); setBad(false); }, 600); }
    }
  };
  if (!cur) return <Result e="🔤" t="Word wizard!" p={`You solved ${score} of ${words.length}`} stars={Math.max(1, Math.ceil((score * 3) / Math.max(1, words.length)))}
    again={() => { setSeed(x => x + 1); setN(0); setPick([]); setScore(0); }} exit={exit} />;
  return (
    <Shell title="🔤 Word Scramble" chips={[`Word ${n + 1}/${words.length}`, `⭐ ${score}`]} exit={exit}>
      <div className="clue"><span className="big">{cur.f.emoji}</span><p>{cur.f.text}</p></div>
      <div className={`tiles ${bad ? 'shake' : ''}`}>{cur.w.split('').map((_, i) => <span key={i} className={`slot ${pick[i] !== undefined ? 'f' : ''}`}>{pick[i] !== undefined ? letters[pick[i]] : ''}</span>)}</div>
      <div className="tiles">{letters.map((l, i) => <button key={i} className="lt" disabled={pick.includes(i)} onClick={() => tap(i)}>{l}</button>)}</div>
      <div className="actions"><button className="btn ghost" onClick={() => setPick(p => p.slice(0, -1))}>⌫ Undo</button></div>
    </Shell>
  );
}

/* 🚀 Quiz Rush: 3 lives, build a streak */
export function Rush({ s, exit }: GP) {
  const [seed, setSeed] = useState(0);
  const qs = useMemo(() => {
    const gen = s.facts.map(f => ({ q: `Who am I? ${f.text}`, a: f.name, options: sh([f.name, ...sh(s.facts.filter(x => x.id !== f.id)).slice(0, 2).map(x => x.name)]) }));
    const base = s.quiz.map(q => ({ q: q.q, a: q.options[q.answer], options: q.options }));
    return sh([...base, ...gen]).slice(0, 8);
  }, [s, seed]);
  const [i, setI] = useState(0); const [lives, setLives] = useState(3); const [streak, setStreak] = useState(0); const [score, setScore] = useState(0); const [pick, setPick] = useState<string | null>(null);
  const q = qs[i];
  const answer = (o: string) => {
    if (pick) return; setPick(o);
    if (o === q.a) { sfx.ok(); setStreak(x => x + 1); setScore(x => x + 1 + (streak >= 2 ? 1 : 0)); } else { sfx.no(); setLives(l => l - 1); setStreak(0); }
    setTimeout(() => { setPick(null); setI(x => x + 1); }, 900);
  };
  if (!q || lives <= 0) return <Result e={lives > 0 ? '🚀' : '💪'} t={lives > 0 ? 'Quiz complete!' : 'Good try!'} p={`Score: ${score}`} stars={Math.min(5, Math.max(1, Math.ceil(score / 2)))}
    again={() => { setSeed(x => x + 1); setI(0); setLives(3); setStreak(0); setScore(0); }} exit={exit} />;
  return (
    <Shell title="🚀 Quiz Rush" chips={['❤️'.repeat(lives), `🔥 ${streak}`, `⭐ ${score}`]} exit={exit}>
      <div className="bar"><i style={{ width: `${(i / qs.length) * 100}%` }} /></div>
      <h3 className="q">{q.q}</h3>
      <div className="opts">{q.options.map(o => <button key={o} disabled={!!pick} className={pick ? (o === q.a ? 'ok' : o === pick ? 'no' : '') : ''} onClick={() => answer(o)}>{o}</button>)}</div>
      {streak >= 3 && <p className="hint">🔥 Streak bonus! Double points!</p>}
    </Shell>
  );
}

/* 🎈 Math Blast: pop the right balloon in 30 seconds */
export function Blast({ exit }: GP) {
  const [t, setT] = useState(30); const [score, setScore] = useState(0); const [oops, setOops] = useState(0);
  const mk = (sc = 0) => {
    const a = 1 + Math.floor(Math.random() * (8 + sc)), b = 1 + Math.floor(Math.random() * (8 + sc / 2)), mul = Math.random() < 0.35;
    const ans = mul ? a * b : a + b; const set = new Set([ans]);
    while (set.size < 4) set.add(Math.max(0, ans + Math.floor(Math.random() * 9) - 4));
    return { q: `${a} ${mul ? '×' : '+'} ${b}`, ans, opts: sh(Array.from(set)) };
  };
  const [q, setQ] = useState(() => mk());
  useEffect(() => { if (t <= 0) return; const id = setTimeout(() => { if (t <= 6) sfx.tick(); setT(x => x - 1); }, 1000); return () => clearTimeout(id); }, [t]);
  if (t <= 0) return <Result e="🎈" t="Time's up!" p={`You popped ${score} balloons`} stars={Math.min(5, Math.max(1, Math.ceil(score / 4)))}
    again={() => { setT(30); setScore(0); setOops(0); setQ(mk()); }} exit={exit} />;
  const tap = (o: number) => { if (o === q.ans) { sfx.pop(); setScore(x => x + 1); setQ(mk(score)); } else { sfx.no(); setOops(x => x + 1); } };
  return (
    <Shell title="🎈 Math Blast" chips={[`⏱️ ${t}s`, `🎈 ${score}`]} exit={exit}>
      <h3 className="q big2">{q.q} = ?</h3>
      <div className={`balloons ${oops ? 'shk' : ''}`} key={`${q.q}-${oops}`}>
        {q.opts.map((o, i) => <button key={o} className="bl" style={{ background: COL[(i * 2 + score) % 7], animationDelay: `${i * -0.7}s` }} onClick={() => tap(o)}>{o}</button>)}
      </div>
    </Shell>
  );
}
