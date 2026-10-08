'use client';
import { useEffect, useState, type CSSProperties } from 'react';
import { useStore } from '@/store/useStore';
import { ALL } from '@/content/all';
import { levelInfo } from '@/lib/level';
import NavBar from './NavBar';

export default function ParentCorner() {
  const { found, stars, streak, best } = useStore();
  const [m, setM] = useState(false); useEffect(() => setM(true), []);
  const f = m ? found : []; const st = m ? stars : 0; const L = levelInfo(st);
  const total = ALL.reduce((a, s) => a + s.facts.length, 0);
  const learned = ALL.reduce((a, s) => a + s.facts.filter(x => f.includes(x.id)).length, 0);
  const reset = () => { if (confirm('Reset all progress on this device? This cannot be undone.')) { localStorage.removeItem('wonderlab'); location.reload(); } };
  return (
    <>
      <NavBar />
      <div className="pg" style={{ '--c': '#d97706' } as CSSProperties}>
        <div className="hello glass"><span className="avatar">👪</span><div><b>Parent corner</b><div className="muted">A quick look at how your child is learning.</div></div></div>
        <div className="pstats">
          <div className="pstat glass"><b>Lv {L.level}</b>{L.title}</div>
          <div className="pstat glass"><b>⭐ {st}</b>stars earned</div>
          <div className="pstat glass"><b>🔥 {m ? streak : 0}</b>day streak (best {m ? best : 0})</div>
          <div className="pstat glass"><b>{learned}/{total}</b>facts discovered</div>
        </div>
        <h2 className="sec">Progress by subject</h2>
        {ALL.map(s => { const n = s.facts.filter(x => f.includes(x.id)).length; return (
          <div key={s.id} className="prow glass" style={{ '--c': s.color } as CSSProperties}>
            <div className="ptop"><b>{s.emoji} {s.name}</b><span>{n}/{s.facts.length} facts</span></div>
            <div className="bar"><i style={{ width: `${(n / s.facts.length) * 100}%` }} /></div>
          </div>); })}
        <p className="muted note">💡 Tip: ask your child to teach you one new fact today. Explaining it is the best way to remember it!</p>
        <p className="muted note">Progress is saved on this device only. Accounts and reports across devices are planned for a future update.</p>
        <button className="btn ghost" onClick={reset}>Reset progress on this device</button>
      </div>
    </>
  );
}
