'use client';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { useStore } from '@/store/useStore';
import type { Subject } from '@/content/types';

export default function Tile({ s }: { s: Subject }) {
  const found = useStore(x => x.found);
  const [m, setM] = useState(false); useEffect(() => setM(true), []);
  const n = m ? s.facts.filter(f => found.includes(f.id)).length : 0;
  const all = n === s.facts.length;
  return (
    <Link href={`/learn/${s.id}`} className="tile glass" style={{ '--c': s.color } as CSSProperties} aria-label={`Play ${s.name}`}>
      <span className="emo">{s.emoji}</span>
      <h3>{s.name}</h3>
      <p>{s.intro}</p>
      <div className="bar"><i style={{ width: `${(n / s.facts.length) * 100}%` }} /></div>
      <small>{all ? '🏅 Badge earned!' : `${n}/${s.facts.length} discovered`}</small>
      <span className="cta"><i>▶</i> {all ? 'Play Again' : 'Play Now'}</span>
    </Link>
  );
}
