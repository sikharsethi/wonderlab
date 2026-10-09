'use client';
import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { dayKey } from '@/lib/time';
import AdultGate from './AdultGate';

const TICK = 5; // seconds per tick

/** Counts screen time while the tab is visible, and shows a friendly break screen when the parent's daily limit is reached. */
export default function TimeTracker() {
  const { addTime, limitOn, limitMin, time } = useStore();
  const [hold, setHold] = useState(false); // a grown-up allowed more time for this session
  useEffect(() => { try { setHold(sessionStorage.getItem('wl-limit-ok') === '1'); } catch { /* ignore */ } }, []);
  useEffect(() => {
    const id = setInterval(() => { if (document.visibilityState === 'visible') addTime(TICK); }, TICK * 1000);
    return () => clearInterval(id);
  }, [addTime]);

  const mins = Math.floor((time[dayKey()] || 0) / 60);
  if (!limitOn || hold || mins < limitMin) return null;
  return (
    <div className="ul-back" role="alertdialog" aria-label="Daily play time reached">
      <div className="ul-card glass">
        <div className="ul-stage"><span className="ul-emoji">🌙</span></div>
        <h2>Time for a break!</h2>
        <p>You played {mins} minutes today. Great learning! Rest your eyes and stretch.</p>
        <AdultGate note="Grown-up: solve this to allow more play today:" onPass={() => { try { sessionStorage.setItem('wl-limit-ok', '1'); } catch { /* ignore */ } setHold(true); }} />
      </div>
    </div>
  );
}
