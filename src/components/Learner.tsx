'use client';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { useStore } from '@/store/useStore';
import type { Subject } from '@/content/types';
import { Memory, Scramble, Rush, Blast } from './Games';
import { TrueFalse, Sort } from './Games2';
import { SORTS } from '@/content/sorts';
import { sfx } from '@/lib/sound';
import { pool } from '@/lib/fresh';
import Deco from './Deco';
import { PlayCtx } from '@/lib/play';

const GAMES = {
  match: { n: 'Memory Match', e: '🃏', d: 'Flip cards and find the pairs' },
  scramble: { n: 'Word Scramble', e: '🔤', d: 'Unscramble the secret word' },
  rush: { n: 'Quiz Rush', e: '🚀', d: 'Answer fast and keep your streak!' },
  blast: { n: 'Math Blast', e: '🎈', d: 'Pop the right balloon in 30s' },
  tf: { n: 'True or False', e: '⚡', d: 'Speed round: 30 seconds!' },
  sort: { n: 'Sort It!', e: '🧺', d: 'Drag items into the right basket' },
};
type K = keyof typeof GAMES;
const COLORS: Record<K, string> = { match: '#f97316', scramble: '#0ea5e9', rush: '#8b5cf6', tf: '#ec4899', sort: '#14b8a6', blast: '#ef4444' };
const RUN = { match: Memory, scramble: Scramble, rush: Rush, blast: Blast, tf: TrueFalse, sort: Sort };

export default function Learner({ s }: { s: Subject }) {
  const { found, discover, checkin } = useStore();
  const [ready, setReady] = useState(false); useEffect(() => { checkin(); setReady(true); }, [checkin]);
  const [lv, setLv] = useState(1); const [g, setG] = useState<K | null>(null); const [open, setOpen] = useState<string | null>(null);
  const list: K[] = ['match', 'scramble', 'rush', 'tf', ...(SORTS[s.id] ? (['sort'] as K[]) : []), ...(s.id === 'math' ? (['blast'] as K[]) : [])];
  const done = ready ? s.facts.filter(f => found.includes(f.id)).length : 0;
  const speak = (t: string) => { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.rate = .9; speechSynthesis.speak(u); };
  const Game = g ? RUN[g] : null;
  const leveled = s.facts.some(f => (f.lv ?? 1) > 1); const view = { ...s, facts: pool(s, lv) };

  return (
    <div className="pg" style={{ '--c': s.color } as CSSProperties}>
      <Deco />
      <header className="pgtop glass"><Link href="/" className="back" aria-label="Home">←</Link><b>{s.emoji} {s.name}</b><span style={{ width: 38 }} /></header>
      {Game ? <PlayCtx.Provider value={{ sid: s.id, sname: s.name, semoji: s.emoji, game: GAMES[g as K].n }}><Game s={view} exit={() => setG(null)} /></PlayCtx.Provider> : (
        <>
          <div className="hello glass"><span className="avatar">🦉</span>
            <div><b>Hi, explorer!</b><div className="muted">Play a game, or tap a card below to discover facts. Every game earns stars!</div></div></div>
          {leveled && <div className="lvls"><b className="lbl">Level:</b>{['🌱 Easy', '🌿 Medium', '🌳 Hard'].map((n, i) => <button key={n} className={lv === i + 1 ? 'on' : ''} onClick={() => { sfx.tap(); setLv(i + 1); }}>{n}</button>)}</div>}
          <h2 className="sec">🎮 Games</h2>
          <div className="menu">{list.map(k => (
            <button key={k} className="gcard" style={{ '--c': COLORS[k] } as CSSProperties} onClick={() => { sfx.tap(); setG(k); }}><span>{GAMES[k].e}</span><b>{GAMES[k].n}</b><small>{GAMES[k].d}</small></button>))}</div>
          <h2 className="sec">🔎 Discover · {done}/{s.facts.length}</h2>
          <div className="bar"><i style={{ width: `${(done / s.facts.length) * 100}%` }} /></div>
          <div className="fgrid">{s.facts.map(f => (
            <div key={f.id} role="button" tabIndex={0} className={`fcard glass ${ready && found.includes(f.id) ? 'done' : ''}`}
              onClick={() => { setOpen(open === f.id ? null : f.id); if (found.includes(f.id)) sfx.tap(); else sfx.sparkle(); discover(f.id); }}>
              <div className="e">{f.emoji}</div><b>{f.name}</b>
              {open === f.id && <><p>{f.text}</p><button className="btn read" onClick={e => { e.stopPropagation(); speak(f.text); }}>🔊 Read aloud</button></>}
            </div>))}</div>
        </>
      )}
    </div>
  );
}
