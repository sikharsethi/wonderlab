'use client';
import { useEffect, useState } from 'react';
import { isMuted, setMuted, sfx } from '@/lib/sound';

export default function SoundToggle({ inline = false }: { inline?: boolean }) {
  const [m, setM] = useState(false);
  useEffect(() => { const sync = () => setM(isMuted()); sync(); window.addEventListener('wl-sound', sync); return () => window.removeEventListener('wl-sound', sync); }, []);
  return (
    <button className={inline ? 'nav-btn' : 'snd glass'} aria-label={m ? 'Turn sound on' : 'Turn sound off'}
      onClick={() => { const n = !m; setM(n); setMuted(n); if (!n) sfx.ok(); }}>{m ? '🔇' : '🔊'}</button>
  );
}
