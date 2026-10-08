'use client';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { useStore } from '@/store/useStore';
import { STICKERS } from './Rewards';
import { Confetti } from './Games';
import { sfx } from '@/lib/sound';

type Stk = (typeof STICKERS)[number];

/** Watches stars + streak and pops a celebration when a new sticker is earned (works on every page). */
export default function UnlockWatcher() {
  const { stars, best, celebrated, celebrate } = useStore();
  const [hyd, setHyd] = useState(false);
  const [queue, setQueue] = useState<Stk[]>([]);

  useEffect(() => { const p = useStore.persist; if (p.hasHydrated()) setHyd(true); return p.onFinishHydration(() => setHyd(true)); }, []);

  useEffect(() => {
    if (!hyd) return;
    const got = STICKERS.filter(x => (x.k === 's' ? stars >= x.v : best >= x.v));
    if (celebrated === null) { celebrate(got.map(x => x.n)); return; } // first run: don't replay stickers already owned
    const fresh = got.filter(x => !celebrated.includes(x.n));
    if (fresh.length) { celebrate(fresh.map(x => x.n)); setTimeout(() => setQueue(q => [...q, ...fresh]), 900); } // short delay so the results screen shows first
  }, [hyd, stars, best, celebrated, celebrate]);

  // Tap an unlocked sticker in the Sticker Book to replay its celebration
  useEffect(() => {
    const h = (e: Event) => { const s = STICKERS.find(x => x.n === (e as CustomEvent<string>).detail); if (s) setQueue(q => [...q, s]); };
    window.addEventListener('wl-celebrate', h); return () => window.removeEventListener('wl-celebrate', h);
  }, []);

  const cur = queue[0];
  useEffect(() => { if (cur) sfx.win(); }, [cur]);
  if (!cur) return null;
  const next = () => setQueue(q => q.slice(1));

  return (
    <div className="ul-back" onClick={next}>
      <div className="ul-card glass" style={{ '--c': '#7c3aed' } as CSSProperties} onClick={e => e.stopPropagation()} role="dialog" aria-label="Sticker unlocked">
        <div className="ul-stage"><span className="ul-emoji">{cur.e}</span></div>
        <h2>🎉 New sticker!</h2>
        <b className="ul-name">{cur.n}</b>
        <p>{cur.k === 's' ? `You collected ${cur.v} stars!` : `${cur.v} days in a row. Amazing!`}</p>
        {queue.length > 1 && <p className="ul-more">+{queue.length - 1} more to see!</p>}
        <div className="actions"><button className="btn" onClick={next}>Awesome! ✨</button>
          <Link href="/stickers" className="btn ghost" onClick={next}>🎟️ Sticker book</Link></div>
      </div>
      <Confetti key={cur.n} />
    </div>
  );
}
