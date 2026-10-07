import { ALL } from '@/content/all';
import Tile from '@/components/Tile';
import { StreakBar } from '@/components/Rewards';
const PERKS = ['🎮 6 fun games', '🔊 Read-aloud facts', '🎟️ Stickers & streaks', '📱 Works on phones'];
export default function Home() {
  return (
    <div className="home-wrap">
      <i className="orb" style={{ background: '#7c3aed', top: -120, left: -80, width: 420, height: 420 }} />
      <i className="orb" style={{ background: '#f97316', top: 160, right: -120, width: 380, height: 380, animationDelay: '-5s' }} />
      <i className="orb" style={{ background: '#0ea5e9', bottom: -140, left: '30%', width: 460, height: 460, animationDelay: '-9s' }} />
      <main className="home">
        <span className="badge">🎮 Learning games for ages 5–12</span>
        <h1>Learn, play and grow with <em>WonderLab</em></h1>
        <p className="lead">Match cards, unscramble words, pop balloons and race through quizzes. Every game earns stars!</p>
        <div className="perks">{PERKS.map(p => <span key={p}>{p}</span>)}</div>
        <StreakBar />
        <div className="grid">{ALL.map(s => <Tile key={s.id} s={s} />)}</div>
      </main>
    </div>
  );
}
