'use client';
import { useEffect, useState } from 'react';

const make = () => { const a = 12 + Math.floor(Math.random() * 12), b = 3 + Math.floor(Math.random() * 7), c = 10 + Math.floor(Math.random() * 30); return { text: `${a} × ${b} + ${c}`, ans: a * b + c }; };

/** Quick adult check: a multi-step sum a young child is unlikely to solve. New problem after each wrong try. */
export default function AdultGate({ onPass, note = 'Grown-ups only. Solve this to continue:' }: { onPass: () => void; note?: string }) {
  const [q, setQ] = useState<{ text: string; ans: number } | null>(null); // generated after mount (avoids hydration mismatch)
  const [v, setV] = useState(''); const [bad, setBad] = useState(false);
  useEffect(() => setQ(make()), []);
  if (!q) return null;
  const check = () => {
    if (Number(v) === q.ans) { onPass(); return; }
    setBad(true); setV(''); setQ(make()); setTimeout(() => setBad(false), 500);
  };
  return (
    <div className={`gate ${bad ? 'shake' : ''}`}>
      <p className="muted">{note}</p>
      <div className="gq">{q.text} = ?</div>
      <input inputMode="numeric" autoFocus value={v} placeholder="Your answer" aria-label="Answer"
        onChange={e => setV(e.target.value.replace(/\D/g, ''))} onKeyDown={e => { if (e.key === 'Enter') check(); }} />
      <button className="btn" onClick={check}>Unlock 🔓</button>
      {bad && <p className="err">Not quite. Here is a new one!</p>}
    </div>
  );
}
