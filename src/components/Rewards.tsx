'use client';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { useStore } from '@/store/useStore';

type Stk = { e: string; n: string; k: 's' | 'd'; v: number }; // s = total stars, d = best day streak
export const STICKERS: Stk[] = [
  { e: '🐣', n: 'Hatchling', k: 's', v: 3 }, { e: '🔥', n: 'On Fire', k: 'd', v: 3 }, { e: '🦊', n: 'Clever Fox', k: 's', v: 10 },
  { e: '🐙', n: 'Octo Pal', k: 's', v: 20 }, { e: '🌈', n: 'Week Warrior', k: 'd', v: 7 }, { e: '🦄', n: 'Unicorn', k: 's', v: 35 },
  { e: '🐉', n: 'Dragon', k: 's', v: 50 }, { e: '🏆', n: 'Two Weeks!', k: 'd', v: 14 }, { e: '🚀', n: 'Rocket', k: 's', v: 75 }, { e: '👑', n: 'Champion', k: 's', v: 100 },
];
const useBook = () => {
  const { stars, best, streak, checkin } = useStore(); const [m, setM] = useState(false);
  useEffect(() => { checkin(); setM(true); }, [checkin]);
  const st = m ? stars : 0, bs = m ? best : 0;
  return { st, bs, streak: m ? streak : 0, ok: (x: Stk) => (x.k === 's' ? st >= x.v : bs >= x.v) };
};

export function StreakBar() {
  const { st, streak, ok } = useBook();
  const got = STICKERS.filter(ok).length; const next = STICKERS.find(x => !ok(x));
  return (
    <Link href="/stickers" className="streak glass" aria-label="Open your sticker book">
      <span className="chipx"><i className="flame">🔥</i><b>{streak}</b> day streak</span>
      <span className="chipx"><i>⭐</i><b>{st}</b> stars</span>
      <span className="chipx"><i>🎟️</i><b>{got}/{STICKERS.length}</b> stickers</span>
      {next && <span className="nextup">Next: {next.e} {next.n}<em>{next.k === 's' ? `${Math.max(0, next.v - st)} ⭐ to go` : `${next.v}-day streak`}</em></span>}
      <span className="cta cta-sm">🎟️ Open sticker book <i>→</i></span>
    </Link>
  );
}

export function StickerBook() {
  const { st, bs, streak, ok } = useBook(); const next = STICKERS.find(x => !ok(x));
  return (
    <div className="pg" style={{ '--c': '#7c3aed' } as CSSProperties}>
      <header className="pgtop glass"><Link href="/" className="back" aria-label="Home">←</Link><b>🎟️ Sticker Book</b><span className="pill"><span>🔥 {streak}</span><span>⭐ {st}</span></span></header>
      {next
        ? <div className="hello glass"><span className="avatar">🦉</span><div><b>Next sticker: {next.e} {next.n}</b>
            <div className="muted">{next.k === 's' ? `${next.v - st} more stars to go!` : `Play ${next.v} days in a row (your best: ${bs})`}</div></div></div>
        : <div className="hello glass"><span className="avatar">🦉</span><b>You collected every sticker! 🎉</b></div>}
      <div className="stk">{STICKERS.map(x => { const u = ok(x); return (
        <div key={x.n} className={`sticker glass ${u ? '' : 'lock'}`} onClick={() => u && window.dispatchEvent(new CustomEvent('wl-celebrate', { detail: x.n }))}><span className="e">{u ? x.e : '🔒'}</span><b>{u ? x.n : '???'}</b>
          <small>{x.k === 's' ? `${x.v} ⭐` : `${x.v}-day streak`}</small></div>); })}</div>
    </div>
  );
}
