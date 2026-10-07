'use client';
import { useEffect, useState } from 'react';
import { isMuted, setMuted, sfx } from '@/lib/sound';

export default function SoundToggle() {
  const [m, setM] = useState(false);
  useEffect(() => setM(isMuted()), []);
  return (
    <button className="snd glass" aria-label={m ? 'Turn sound on' : 'Turn sound off'}
      onClick={() => { const n = !m; setM(n); setMuted(n); if (!n) sfx.ok(); }}>{m ? '🔇' : '🔊'}</button>
  );
}
