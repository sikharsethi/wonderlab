'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useStore } from '@/store/useStore';
import { ALL } from '@/content/all';
import { levelInfo } from '@/lib/level';
import SoundToggle from './SoundToggle';

export default function NavBar() {
  const { stars, streak } = useStore();
  const [m, setM] = useState(false); useEffect(() => setM(true), []);
  const L = levelInfo(m ? stars : 0);
  const [panel, setPanel] = useState<'search' | 'me' | null>(null);
  const [q, setQ] = useState('');
  const ref = useRef<HTMLElement>(null);

  // Close popovers on outside click or Escape
  useEffect(() => {
    const off = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setPanel(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setPanel(null); };
    document.addEventListener('mousedown', off); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', off); document.removeEventListener('keydown', esc); };
  }, []);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase(); if (!t) return [];
    return ALL.flatMap(s => [
      ...(s.name.toLowerCase().includes(t) ? [{ k: `s-${s.id}`, e: s.emoji, n: s.name, sub: 'Subject', id: s.id }] : []),
      ...s.facts.filter(f => f.name.toLowerCase().includes(t)).map(f => ({ k: f.id, e: f.emoji, n: f.name, sub: s.name, id: s.id })),
    ]).slice(0, 8);
  }, [q]);

  return (
    <header className="nav glass" ref={ref}>
      <Link href="/" className="brand"><span className="bemoji">🌈</span><span className="bname">WonderLab</span></Link>
      <nav className="nav-r" aria-label="Main">
        <SoundToggle inline />
        <button className="nav-btn" aria-label="Search" aria-expanded={panel === 'search'} onClick={() => setPanel(panel === 'search' ? null : 'search')}>🔍</button>
        <button className="me" aria-label={`Profile, level ${L.level}`} aria-expanded={panel === 'me'} onClick={() => setPanel(panel === 'me' ? null : 'me')} style={{ '--p': `${L.pct}%` } as CSSProperties}>
          <span className="ring"><span className="av">🦉</span></span><span className="lv">Lv {L.level}</span>
        </button>
        <Link href="/parents" className="nav-parents">👪 <span>Parents</span></Link>
      </nav>

      {panel === 'search' && (
        <div className="pop glass">
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search planets, animals, shapes…" aria-label="Search" />
          {results.map(r => (
            <Link key={r.k} href={`/learn/${r.id}`} className="sr" onClick={() => setPanel(null)}><span>{r.e}</span><b>{r.n}</b><em>{r.sub}</em></Link>))}
          {q.trim() && !results.length && <p className="muted">Nothing found. Try another word!</p>}
        </div>
      )}
      {panel === 'me' && (
        <div className="pop glass" style={{ '--c': '#7c3aed' } as CSSProperties}>
          <b>🦉 {L.title}</b>
          <div className="bar" style={{ margin: '8px 0 4px' }}><i style={{ width: `${L.pct}%` }} /></div>
          <small className="muted">{L.into}/{L.need} ⭐ to reach Level {L.level + 1}</small>
          <p>🔥 {m ? streak : 0}-day streak</p>
          <Link href="/stickers" className="cta cta-sm">🎟️ Sticker book <i>→</i></Link>
        </div>
      )}
    </header>
  );
}
