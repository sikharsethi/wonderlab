'use client';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { useStore } from '@/store/useStore';
import type { Subject } from '@/content/types';
import { Memory, Scramble, Rush, Blast } from './Games';
import { TrueFalse, Sort } from './Games2';
import { SORTS } from '@/content/sorts';
import { sfx } from '@/lib/sound';

const GAMES = {
  match: { n: 'Memory Match', e: '🃏', d: 'Flip cards and find the pairs' },
  scramble: { n: 'Word Scramble', e: '🔤', d: 'Unscramble the secret word' },
  rush: { n: 'Quiz Rush', e: '🚀', d: 'Answer fast and keep your streak!' },
  blast: { n: 'Math Blast', e: '🎈', d: 'Pop the right balloon in 30s' },
  tf: { n: 'True or False', e: '⚡', d: 'Speed round: 30 seconds!' },
  sort: { n: 'Sort It!', e: '🧺', d: 'Drag items into the right basket' },
};
type K = keyof typeof GAMES;
const RUN = { match: Memory, scramble: Scramble, rush: Rush, blast: Blast, tf: TrueFalse, sort: Sort };

export default function Learner({ s }: { s: Subject }) {
  const { found, stars, discover, streak, checkin } = useStore();
  const [ready, setReady] = useState(false); useEffect(() => { checkin(); setReady(true); }, [checkin]);
  const [g, setG] = useState<K | null>(null); const [open, setOpen] = useState<string | null>(null);
  const list: K[] = ['match', 'scramble', 'rush', 'tf', ...(SORTS[s.id] ? (['sort'] as K[]) : []), ...(s.id === 'math' ? (['blast'] as K[]) : [])];
  const done = ready ? s.facts.filter(f => found.includes(f.id)).length : 0;
  const speak = (t: string) => { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.rate = .9; speechSynthesis.speak(u); };
  const Game = g ? RUN[g] : null;

  return (
    <div className="pg" style={{ '--c': s.color } as CSSProperties}>
      <header className="pgtop glass"><Link href="/" className="back" aria-label="Home">←</Link><b>{s.emoji} {s.name}</b><Link href="/stickers" className="pill">🔥 {ready ? streak : 0} · ⭐ {ready ? stars : 0}</Link></header>
      {Game ? <Game s={s} exit={() => setG(null)} /> : (
        <>
          <div className="hello glass"><span className="avatar">🦉</span>
            <div><b>Hi, explorer!</b><div className="muted">Play a game, or tap a card below to discover facts. Every game earns stars!</div></div></div>
          <h2 className="sec">🎮 Games</h2>
          <div className="menu">{list.map(k => (
            <button key={k} className="gcard" onClick={() => { sfx.tap(); setG(k); }}><span>{GAMES[k].e}</span><b>{GAMES[k].n}</b><small>{GAMES[k].d}</small></button>))}</div>
          <h2 className="sec">🔎 Discover · {done}/{s.facts.length}</h2>
          <div className="bar"><i style={{ width: `${(done / s.facts.length) * 100}%` }} /></div>
          <div className="fgrid">{s.facts.map(f => (
            <div key={f.id} role="button" tabIndex={0} className={`fcard glass ${ready && found.includes(f.id) ? 'done' : ''}`}
              onClick={() => { setOpen(open === f.id ? null : f.id); if (found.includes(f.id)) sfx.tap(); else sfx.sparkle(); discover(f.id); }}>
              <div className="e">{f.emoji}</div><b>{f.name}</b>
              {open === f.id && <><p>{f.text}</p><button className="btn ghost" onClick={e => { e.stopPropagation(); speak(f.text); }}>🔊 Read</button></>}
            </div>))}</div>
        </>
      )}
    </div>
  );
}
