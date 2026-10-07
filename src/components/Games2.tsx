'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Subject } from '@/content/types';
import { SORTS } from '@/content/sorts';
import { Result, Shell, sh } from './Games';
import { sfx } from '@/lib/sound';
import { fresh, see } from '@/lib/fresh';

type GP = { s: Subject; exit: () => void };

/* ⚡ True or False: speed round */
export function TrueFalse({ s, exit }: GP) {
  const [seed, setSeed] = useState(0); const idx = useRef(0);
  const deck = useMemo(() => fresh(`${s.id}:tf`, s.facts, f => f.id, s.facts.length), [s, seed]);
  const mk = () => {
    const f = deck[idx.current++ % deck.length], truth = Math.random() < 0.5;
    return { f, truth, text: truth ? f.text : sh(s.facts.filter(x => x.id !== f.id))[0].text };
  };
  const [t, setT] = useState(30); const [score, setScore] = useState(0); const [miss, setMiss] = useState(0);
  const [q, setQ] = useState(mk); const [flash, setFlash] = useState('');
  useEffect(() => { if (t <= 0) return; const id = setTimeout(() => { if (t <= 6) sfx.tick(); setT(x => x - 1); }, 1000); return () => clearTimeout(id); }, [t]);
  if (t <= 0) return <Result e="⚡" t="Time's up!" p={`${score} right, ${miss} wrong`} stars={Math.min(5, Math.max(1, Math.ceil(score / 3)))}
    again={() => { setSeed(x => x + 1); idx.current = 0; setT(30); setScore(0); setMiss(0); setQ(mk()); }} exit={exit} />;
  const ans = (v: boolean) => {
    const ok = v === q.truth; if (ok) sfx.ok(); else sfx.no(); see([`${s.id}:tf:${q.f.id}`]); if (ok) setScore(x => x + 1); else setMiss(x => x + 1);
    setFlash(ok ? 'ok' : 'no'); setTimeout(() => setFlash(''), 300); setQ(mk());
  };
  return (
    <Shell title="⚡ True or False" chips={[`⏱️ ${t}s`, `✅ ${score}`, `❌ ${miss}`]} exit={exit}>
      <div className={`tfcard ${flash}`}><span className="big">{q.f.emoji}</span><h3>{q.f.name}</h3><p>{q.text}</p></div>
      <p className="hint">Is that true about {q.f.name}?</p>
      <div className="tfb"><button className="t" onClick={() => ans(true)}>✅ True</button><button className="f" onClick={() => ans(false)}>❌ False</button></div>
    </Shell>
  );
}

/* 🧺 Sort It: drag items into the right basket (mouse + touch) */
export function Sort({ s, exit }: GP) {
  const set = SORTS[s.id]; const [seed, setSeed] = useState(0);
  const items = useMemo(() => sh([...fresh(`${s.id}:sort:a`, set.a.items, t => t, 3).map(t => ({ t, b: 'a' })), ...fresh(`${s.id}:sort:b`, set.b.items, t => t, 3).map(t => ({ t, b: 'b' }))]), [set, seed]);
  const [done, setDone] = useState<number[]>([]); const [miss, setMiss] = useState(0); const [bad, setBad] = useState(-1);
  const [d, setD] = useState<{ i: number; sx: number; sy: number; x: number; y: number } | null>(null);
  const drop = (i: number, b?: string) => {
    if (!b) return;
    if (items[i].b === b) { sfx.ok(); see([`${s.id}:sort:${b}:${items[i].t}`]); setDone(x => [...x, i]); } else { sfx.no(); setMiss(m => m + 1); setBad(i); setTimeout(() => setBad(-1), 500); }
  };
  if (done.length === items.length) return <Result e="🧺" t="All sorted!" p={miss ? `${miss} mix-ups along the way` : 'Perfect, no mistakes!'} stars={miss === 0 ? 4 : miss < 3 ? 3 : 2}
    again={() => { setSeed(x => x + 1); setDone([]); setMiss(0); }} exit={exit} />;
  return (
    <Shell title="🧺 Sort It!" chips={[`Sorted ${done.length}/${items.length}`, `Oops ${miss}`]} exit={exit}>
      <p className="hint">Drag each item into the right basket!</p>
      <div className="baskets">{(['a', 'b'] as const).map(k => (
        <div key={k} data-b={k} className="basket"><span className="big">{set[k].e}</span><b>{set[k].name}</b>
          <div className="placed">{items.map((it, i) => (done.includes(i) && it.b === k ? <span key={i} className="chip2">{it.t}</span> : null))}</div></div>))}</div>
      <div className="pool">{items.map((it, i) => done.includes(i) ? null : (
        <button key={i} className={`dg ${bad === i ? 'shake' : ''}`}
          style={d?.i === i ? { transform: `translate(${d.x - d.sx}px,${d.y - d.sy}px) scale(1.1)`, zIndex: 10 } : undefined}
          onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); sfx.tap(); setD({ i, sx: e.clientX, sy: e.clientY, x: e.clientX, y: e.clientY }); }}
          onPointerMove={e => { if (d && d.i === i) setD({ ...d, x: e.clientX, y: e.clientY }); }}
          onPointerCancel={() => setD(null)}
          onPointerUp={e => {
            const hit = document.elementsFromPoint(e.clientX, e.clientY).find(el => (el as HTMLElement).dataset?.b) as HTMLElement | undefined;
            setD(null); drop(i, hit?.dataset.b);
          }}>{it.t}</button>))}</div>
    </Shell>
  );
}
