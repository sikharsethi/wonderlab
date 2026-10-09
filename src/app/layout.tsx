import './globals.css';
import './games.css';
import './liquid.css';
import './polish.css';
import './mobile.css';
import NavBar from '@/components/NavBar';
import TimeTracker from '@/components/TimeTracker';
import UnlockWatcher from '@/components/UnlockWatcher';
import type { Metadata, Viewport } from 'next';
import { Fredoka } from 'next/font/google';
const font = Fredoka({ subsets: ['latin'], variable: '--font' });
export const metadata: Metadata = { title: 'WonderLab – learning games for kids', description: 'Play games and learn science, math, geography and history.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f4f5ff' }, { media: '(prefers-color-scheme: dark)', color: '#0d0f25' }] };
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={font.variable}><NavBar />{children}<UnlockWatcher /><TimeTracker /></body></html>;
}
