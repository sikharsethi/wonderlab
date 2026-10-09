// Soft floating stars and bubbles for page backgrounds (static positions, so no hydration mismatch)
const BITS: [string, number, number, number, number][] = [
  ['⭐', 6, 12, 26, 0], ['✨', 88, 18, 22, 2], ['o', 12, 68, 38, 1], ['⭐', 82, 62, 20, 3], ['o', 50, 90, 30, 4],
  ['✨', 28, 34, 18, 5], ['o', 92, 42, 34, 2], ['⭐', 62, 6, 18, 1], ['o', 3, 40, 26, 3], ['✨', 72, 82, 22, 0],
];
export default function Deco() {
  return (
    <div className="deco" aria-hidden="true">
      {BITS.map(([c, x, y, sz, d], i) => c === 'o'
        ? <i key={i} className="bub" style={{ left: `${x}%`, top: `${y}%`, width: sz, height: sz, animationDelay: `${-d * 1.3}s` }} />
        : <span key={i} style={{ left: `${x}%`, top: `${y}%`, fontSize: sz, animationDelay: `${-d * 1.3}s` }}>{c}</span>)}
    </div>
  );
}
