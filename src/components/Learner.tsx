'use client';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { useStore } from '@/store/useStore';
import type { Subject } from '@/content/types';
import { Memory, Scramble, Rush, Blast } from './Games';

const GAMES = {
  match: { n: 'Memory Match', e: '🃏', d: 'Flip cards and find the pairs' },
  scramble: { n: 'Word Scramble', e: '🔤', d: 'Unscramble the secret word' },
  rush: { n: 'Quiz Rush', e: '🚀', d: 'Answer fast and keep your streak!' },
  blast: { n: 'Math Blast', e: '🎈', d: 'Pop the right balloon in 30s' },
};
type K = keyof typeof GAMES;
const RUN = { match: Memory, scramble: Scramble, rush: Rush, blast: Blast };

export default function Learner({ s }: { s: Subject }) {
  const { found, stars, discover } = useStore();
  const [ready, setReady] = useState(false); useEffect(() => setReady(true), []);
  const [g, setG] = useState<K | null>(null); const [open, setOpen] = useState<string | null>(null);
  const list: K[] = ['match', 'scramble', 'rush', ...(s.id === 'math' ? (['blast'] as K[]) : [])];
  const done = ready ? s.facts.filter(f => found.includes(f.id)).length : 0;
  const speak = (t: string) => { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.rate = .9; speechSynthesis.speak(u); };
  const Game = g ? RUN[g] : null;

  return (
    <div className="pg" style={{ '--c': s.color } as CSSProperties}>
      <header className="pgtop glass"><Link href="/" className="back" aria-label="Home">←</Link><b>{s.emoji} {s.name}</b><span className="pill">⭐ {ready ? stars : 0}</span></header>
      {Game ? <Game s={s} exit={() => setG(null)} /> : (
        <>
          <div className="hello glass"><span className="avatar">🦉</span>
            <div><b>Hi, explorer!</b><div className="muted">Play a game, or tap a card below to discover facts. Every game earns stars!</div></div></div>
          <h2 className="sec">🎮 Games</h2>
          <div className="menu">{list.map(k => (
            <button key={k} className="gcard" onClick={() => setG(k)}><span>{GAMES[k].e}</span><b>{GAMES[k].n}</b><small>{GAMES[k].d}</small></button>))}</div>
          <h2 className="sec">🔎 Discover · {done}/{s.facts.length}</h2>
          <div className="bar"><i style={{ width: `${(done / s.facts.length) * 100}%` }} /></div>
          <div className="fgrid">{s.facts.map(f => (
            <div key={f.id} role="button" tabIndex={0} className={`fcard glass ${ready && found.includes(f.id) ? 'done' : ''}`}
              onClick={() => { setOpen(open === f.id ? null : f.id); discover(f.id); }}>
              <div className="e">{f.emoji}</div><b>{f.name}</b>
              {open === f.id && <><p>{f.text}</p><button className="btn ghost" onClick={e => { e.stopPropagation(); speak(f.text); }}>🔊 Read</button></>}
            </div>))}</div>
        </>
      )}
    </div>
  );
}
