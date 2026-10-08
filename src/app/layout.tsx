import './globals.css';
import './games.css';
import './liquid.css';
import './polish.css';
import SoundToggle from '@/components/SoundToggle';
import UnlockWatcher from '@/components/UnlockWatcher';
import type { Metadata, Viewport } from 'next';
import { Fredoka } from 'next/font/google';
const font = Fredoka({ subsets: ['latin'], variable: '--font' });
export const metadata: Metadata = { title: 'WonderLab – learning games for kids', description: 'Play games and learn science, math, geography and history.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={font.variable}>{children}<SoundToggle /><UnlockWatcher /></body></html>;
}
