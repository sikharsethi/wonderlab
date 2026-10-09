'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdultGate from './AdultGate';
import ParentDashboard from './ParentDashboard';

/** Parent area: shows the adult check first, then the dashboard (unlock lasts for this browser tab). */
export default function ParentCorner() {
  const [state, setState] = useState<'loading' | 'locked' | 'open'>('loading');
  useEffect(() => {
    let ok = false; try { ok = sessionStorage.getItem('wl-parent') === '1'; } catch { /* ignore */ }
    setState(ok ? 'open' : 'locked');
  }, []);
  const unlock = () => { try { sessionStorage.setItem('wl-parent', '1'); } catch { /* ignore */ } setState('open'); };
  const lock = () => { try { sessionStorage.removeItem('wl-parent'); } catch { /* ignore */ } setState('locked'); };

  if (state === 'loading') return null;
  if (state === 'locked') return (
    <div className="ul-back">
      <div className="ul-card glass" role="dialog" aria-label="Parents only">
        <div className="ul-stage" style={{ height: 110 }}><span className="ul-emoji" style={{ fontSize: 80 }}>🔒</span></div>
        <h2>Parents only</h2>
        <AdultGate onPass={unlock} />
        <p style={{ marginTop: 14 }}><Link href="/" className="btn ghost">← Back to the kids area</Link></p>
      </div>
    </div>
  );
  return <ParentDashboard onLock={lock} />;
}
