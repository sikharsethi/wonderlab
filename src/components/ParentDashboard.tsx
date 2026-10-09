'use client';
import { useEffect, useState, type CSSProperties } from 'react';
import { useStore } from '@/store/useStore';
import { ALL } from '@/content/all';
import { levelInfo } from '@/lib/level';
import { dayKey } from '@/lib/time';
import { isMuted, setMuted, sfx } from '@/lib/sound';

const LIMITS = [15, 20, 30, 45, 60];
const ago = (t: number) => {
  const m = Math.round((Date.now() - t) / 60000); if (m < 1) return 'Just now'; if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60); return h < 24 ? `${h} h ago` : new Date(t).toLocaleDateString();
};
function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return <button className="sw" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} />;
}

export default function ParentDashboard({ onLock }: { onLock: () => void }) {
  const { found, stars, streak, best, time, log, limitOn, limitMin, setLimit, resetAll } = useStore();
  const [grow, setGrow] = useState(false); const [soundOn, setSoundOn] = useState(true);
  const [step, setStep] = useState<'idle' | 'confirm' | 'done'>('idle'); const [word, setWord] = useState('');
  useEffect(() => { setSoundOn(!isMuted()); const id = requestAnimationFrame(() => setGrow(true)); return () => cancelAnimationFrame(id); }, []);

  const L = levelInfo(stars);
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return { k: dayKey(d), l: 'SMTWTFS'[d.getDay()], m: Math.round((time[dayKey(d)] || 0) / 60) };
  });
  const maxM = Math.max(10, ...week.map(w => w.m)); const today = week[6].m;
  const subj = ALL.map(s => { const n = s.facts.filter(x => found.includes(x.id)).length; return { s, n, total: s.facts.length, pct: Math.round((n / s.facts.length) * 100) }; });
  const learned = subj.reduce((a, x) => a + x.n, 0), total = subj.reduce((a, x) => a + x.total, 0);
  const top = [...subj].sort((a, b) => b.pct - a.pct)[0], low = [...subj].sort((a, b) => a.pct - b.pct)[0];

  return (
    <div className="pg" style={{ '--c': '#d97706' } as CSSProperties}>
      <div className="hello glass"><span className="avatar">👪</span>
        <div style={{ flex: 1 }}><b>Parent corner</b><div className="muted">How your child is learning, plus controls for this device.</div></div>
        <button className="btn ghost" onClick={onLock}>🔒 Lock</button></div>

      <div className="pstats">
        <div className="pstat glass"><b>Lv {L.level}</b>{L.title}</div>
        <div className="pstat glass"><b>⭐ {stars}</b>stars earned</div>
        <div className="pstat glass"><b>🔥 {streak}</b>day streak (best {best})</div>
        <div className="pstat glass"><b>{learned}/{total}</b>facts discovered</div>
        <div className="pstat glass"><b>⏱️ {today} min</b>{limitOn ? `today (limit ${limitMin})` : 'time spent today'}</div>
      </div>

      <div className="two">
        <div className="card2 glass"><h3>📅 This week (minutes per day)</h3>
          <div className="week">{week.map(w => (
            <div key={w.k} className="wbar"><span>{w.m || ''}</span><i style={{ height: grow ? `${Math.max(4, (w.m / maxM) * 100)}%` : '4%' }} /><span>{w.l}</span></div>))}</div></div>
        <div className="card2 glass"><h3>💪 Strengths and practice</h3>
          {learned === 0 ? <p className="muted">Play a few games and this will show what your child is best at.</p> : (<>
            <div className="box good"><small>Top subject</small><b>{top.s.emoji} {top.s.name} ({top.pct}%)</b></div>
            {low.pct < 100 && <div className="box warn"><small>Needs practice</small><b>{low.s.emoji} {low.s.name} ({low.n}/{low.total} facts)</b></div>}</>)}</div>
      </div>

      <div className="card2 glass"><h3>🕒 Recent activity</h3>
        {log.length === 0 ? <p className="muted">No games played yet. Finished games will appear here.</p> : (
          <ul className="tl">{log.slice(0, 6).map((e, i) => (
            <li key={i}><span className="te">{e.semoji}</span>
              <div><b>{e.sname} · {e.game}</b><small>{ago(e.at)} · {e.miss ? `${e.miss} to review` : 'No mistakes'}</small></div>
              <span className="tstar">+{e.stars} ⭐</span></li>))}</ul>)}</div>

      <h2 className="sec">Progress by subject</h2>
      {subj.map(({ s, n, total: t, pct }) => (
        <div key={s.id} className="prow glass" style={{ '--c': s.color } as CSSProperties}>
          <div className="ptop"><b>{s.emoji} {s.name}</b><span><span className="pct">{pct}%</span> · {n}/{t} facts</span></div>
          <div className="bar"><i style={{ width: grow ? `${pct}%` : '0%' }} /></div>
        </div>))}

      <div className="card2 glass"><h3>⚙️ Settings</h3>
        <div className="sw-row"><div><b>Sound and effects</b><span className="muted">Default for this device</span></div>
          <Switch on={soundOn} label="Sound and effects" onChange={v => { setSoundOn(v); setMuted(!v); if (v) sfx.ok(); }} /></div>
        <div className="sw-row" style={{ display: 'block' }}>
          <div className="sw-row" style={{ padding: 0, border: 0 }}><div><b>Daily play-time alert</b><span className="muted">Shows a break screen after the limit</span></div>
            <Switch on={limitOn} label="Daily play-time alert" onChange={v => setLimit(v, limitMin)} /></div>
          {limitOn && <div className="seg" role="group" aria-label="Daily limit in minutes">{LIMITS.map(m => (
            <button key={m} className={m === limitMin ? 'on' : ''} onClick={() => setLimit(true, m)}>{m} min</button>))}</div>}
        </div>
        <div className="sw-row" style={{ display: 'block' }}>
          <b>Reset progress</b><span className="muted"> Erases stars, stickers, streak and activity on this device.</span>
          {step === 'idle' && <p><button className="btn ghost" onClick={() => setStep('confirm')}>Reset progress…</button></p>}
          {step === 'confirm' && (
            <div className="confirm"><p>Type <b>RESET</b> to confirm. This cannot be undone.</p>
              <input value={word} onChange={e => setWord(e.target.value)} placeholder="RESET" aria-label="Type RESET to confirm" />
              <div className="actions"><button className="btn danger" disabled={word.trim().toUpperCase() !== 'RESET'} onClick={() => { resetAll(); setStep('done'); setWord(''); }}>Yes, erase everything</button>
                <button className="btn ghost" onClick={() => { setStep('idle'); setWord(''); }}>Cancel</button></div></div>)}
          {step === 'done' && <p className="perfect">✅ Progress was reset. <button className="btn ghost" onClick={() => setStep('idle')}>OK</button></p>}
        </div>
      </div>
      <p className="muted note">Progress and time are saved on this device only. Accounts and reports across devices are planned for a future update.</p>
    </div>
  );
}
