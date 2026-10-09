// Sound effects synthesized with the Web Audio API: no audio files needed.
type W = typeof window & { webkitAudioContext?: typeof AudioContext };
let ctx: AudioContext | null = null;

export const isMuted = () => { try { return typeof window !== 'undefined' && localStorage.getItem('wl-mute') === '1'; } catch { return false; } };
export const setMuted = (m: boolean) => { try { localStorage.setItem('wl-mute', m ? '1' : '0'); } catch { /* ignore */ } if (typeof window !== 'undefined') window.dispatchEvent(new Event('wl-sound')); };

const ac = () => {
  if (typeof window === 'undefined' || isMuted()) return null;
  if (!ctx) { const C = window.AudioContext || (window as W).webkitAudioContext; if (!C) return null; ctx = new C(); }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
};
function tone(f: number, at = 0, dur = 0.15, type: OscillatorType = 'sine', vol = 0.16, to?: number) {
  const c = ac(); if (!c) return;
  const t = c.currentTime + at, o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
}
const seq = (notes: number[], step = 0.09, dur = 0.18, type: OscillatorType = 'triangle', vol = 0.16) =>
  notes.forEach((n, i) => tone(n, i * step, dur, type, vol));

export const sfx = {
  tap: () => tone(620, 0, 0.06, 'triangle', 0.1),
  flip: () => tone(380, 0, 0.09, 'sine', 0.14, 760),
  ok: () => seq([523, 659, 784], 0.08, 0.16),
  no: () => tone(200, 0, 0.25, 'sawtooth', 0.08, 110),
  pop: () => tone(300, 0, 0.12, 'sine', 0.22, 900),
  tick: () => tone(880, 0, 0.05, 'square', 0.06),
  sparkle: () => seq([880, 1175, 1568], 0.06, 0.14, 'sine', 0.12),
  win: () => seq([523, 659, 784, 1047, 784, 1047, 1319], 0.11, 0.22, 'triangle', 0.17),
};
