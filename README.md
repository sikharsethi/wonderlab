
<div align="center">

# 🌈 WonderLab

**Learning games for kids aged 5–12.** Play, discover facts and earn stickers across science, math, geography, history, biology and space.

[![Next.js](https://img.shields.io/badge/Next.js-14-000000)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-087ea4)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#license)

[**Live demo**](wonderlab-tawny.vercel.app) · [Report a bug](https://github.com/sikharsethi/wonderlab/issues) · [Request a feature](https://github.com/sikharsethi/wonderlab/issues)

</div>

---

## Table of contents

- [About](#about)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Extending WonderLab](#extending-wonderlab)
- [Data and privacy](#data-and-privacy)
- [Accessibility](#accessibility)
- [Deployment](#deployment)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## About

WonderLab is a gamified learning web app. Children pick a subject, play short games built from a shared pool of facts, and earn stars, levels, streaks and stickers. Parents get a locked area with progress insights and simple controls.

The app is **content-driven**: every subject is plain data, and every game is generated from that data. Adding a subject or a fact needs no changes to the game code.

## Features

### For children
- **7 subjects**, each with 12 facts split into Easy, Medium and Hard levels: Science, Chemistry, Math, Geography, History, Biology, Space.
- **6 games**
  | Game | What it does |
  |---|---|
  | 🃏 Memory Match | Flip cards and pair each picture with its name |
  | 🔤 Word Scramble | Rebuild the hidden word from a picture and a clue |
  | 🚀 Quiz Rush | Three lives, streak bonuses, large answer buttons |
  | ⚡ True or False | A 30-second speed round |
  | 🧺 Sort It! | Drag items into baskets, or tap an item then a basket |
  | 🎈 Math Blast | Pop the right balloon before time runs out (Math only) |
- **No repeated questions.** Each round serves items the child has not seen yet. Mistakes are brought back first.
- **Learn from mistakes.** Every results screen lists what was missed, with a read-aloud button.
- **Rewards.** Stars, levels (every 20 stars), a daily streak, 10 collectible stickers and a celebration pop-up on each unlock.
- **Read-aloud facts** (Web Speech API) and **synthesized sound effects** (Web Audio API), with a mute toggle.
- **Search** across subjects and facts.

### For parents
- **Adult check** (a randomized multi-step sum) before the Parents area opens.
- **Analytics:** level, stars, streak, facts discovered, time spent today, a 7-day activity chart, recent games, top subject and subject needing practice.
- **Controls:** default sound setting, a daily play-time alert with selectable limits, and a two-step progress reset.

### Experience
- Liquid-glass UI with a custom CSS design system, responsive from phones to desktops, dark mode, touch-friendly targets and reduced-motion support.

## Screenshots

<!-- Add images to docs/screenshots/ and uncomment:

| Home | Subject hub | Quiz Rush |
|---|---|---|
| ![Home](docs/screenshots/home.png) | ![Hub](docs/screenshots/hub.png) | ![Quiz](docs/screenshots/quiz.png) |

| Sort It! | Sticker book | Parents |
|---|---|---|
| ![Sort](docs/screenshots/sort.png) | ![Stickers](docs/screenshots/stickers.png) | ![Parents](docs/screenshots/parents.png) |
-->

_Screenshots coming soon._

## Tech stack

| Area | Choice |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| UI | React 18, custom CSS (no UI library) |
| State | [Zustand](https://github.com/pmndrs/zustand) with `persist` middleware |
| Font | [Fredoka](https://fonts.google.com/specimen/Fredoka) via `next/font` (self-hosted at build time) |
| Audio | Web Audio API (effects), Web Speech API (read aloud) |
| Hosting | [Vercel](https://vercel.com/) |

## Getting started

**Requirements:** Node.js 18.17 or newer.

```bash
git clone https://github.com/sikharsethi/wonderlab.git
cd wonderlab
npm install
npm run dev
```

Open <http://localhost:3000>.

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |

**Test on a phone** (same Wi-Fi): run `npm run dev -- -H 0.0.0.0`, then open `http://<your-computer-ip>:3000` on the device.

## Project structure

```
src/
├── app/                    # Routes and global styles
│   ├── page.tsx            # Home
│   ├── learn/[id]/page.tsx # Subject hub + games
│   ├── stickers/page.tsx   # Sticker book
│   ├── parents/page.tsx    # Parent area
│   ├── layout.tsx          # NavBar, watchers, fonts
│   └── *.css               # globals, games, liquid (glass), polish, mobile
├── components/
│   ├── Learner.tsx         # Subject hub, level picker, game launcher
│   ├── Games.tsx           # Memory, Scramble, Quiz Rush, Math Blast, results
│   ├── Games2.tsx          # True or False, Sort It!
│   ├── NavBar.tsx · SoundToggle.tsx · Tile.tsx · Deco.tsx
│   ├── Rewards.tsx         # Streak banner + sticker book
│   ├── UnlockWatcher.tsx   # Sticker-unlock celebration
│   ├── TimeTracker.tsx     # Screen time + daily limit alert
│   └── ParentCorner.tsx · ParentDashboard.tsx · AdultGate.tsx
├── content/                # All learning content (plain data)
│   ├── types.ts            # Fact, Subject, RushQ types
│   ├── subjects.ts · extra.ts · bio.ts   # Subjects and facts
│   ├── sorts.ts            # Sort It! categories
│   ├── questions.ts        # Quiz Rush question builder
│   └── all.ts              # Registers every subject
├── lib/                    # sound, fresh (no-repeat rounds), level, time, play
└── store/useStore.ts       # Persisted progress, streak, log, settings
```

## Extending WonderLab

### Add a subject

1. Create a `Subject` in `src/content/` (see `bio.ts`). Give it **12 facts: 4 each at `lv: 1`, `2` and `3`**. Each level needs at least 4 facts for the games to work well.
2. Add it to the array in `src/content/all.ts`.
3. Add a Sort It! set in `src/content/sorts.ts`, keyed by the subject `id`. Without one, the Sort It! game is hidden for that subject.

```ts
{ id: 'ocean', name: 'Ocean', emoji: '🌊', color: '#0ea5e9', intro: 'Dive into the deep!', quiz: [],
  facts: [
    f('whale', 'Whale', '🐋', 1, 'The biggest animal on Earth lives in the sea.'),
    // …
  ] }
```

> Keep fact `id`s unique across **all** subjects and never change an existing `id`. Progress and the no-repeat history are stored against it.

### Improve question quality

A fact can carry two optional fields (see the continents in `extra.ts`):

- `ask`: a hand-written question, for example `'Which continent has kangaroos?'`
- `group`: wrong answers are drawn from the same group, so options stay realistic.

### Add a game

Build the component in `Games.tsx` or `Games2.tsx` using `Shell` and `Result`, then register it in `Learner.tsx` (`GAMES`, `RUN`, `COLORS`). Use `fresh()` / `see()` / `unsee()` from `src/lib/fresh.ts` to avoid repeats, and `bump()` to feed the review screen.

## Data and privacy

- **No accounts, no tracking, no analytics, no ads.** The app makes no network requests for user data.
- Progress, streak, activity log, time and settings are stored **only in the browser** (`localStorage` key `wonderlab`; sound preference in `wl-mute`).
- The Parents area unlock and the play-time override use `sessionStorage` and last for the browser tab.
- If you add accounts, analytics or advertising, review children's privacy requirements (for example COPPA and GDPR-K) first.

## Accessibility

- Semantic buttons and links, ARIA labels on icon-only controls, `role="switch"` toggles and dialog roles on pop-ups.
- Keyboard focus outlines and 44px touch targets.
- Honors `prefers-reduced-motion` and `prefers-color-scheme`.
- Read-aloud for every fact and review item.

## Deployment

The project deploys to Vercel with no configuration: import the GitHub repository and click **Deploy**. Every push to `main` redeploys automatically.

## Known limitations

- Progress is **per device and per browser**. Clearing site data resets it, and it does not sync across devices.
- The parent check is a deterrent, not security. Real protection needs accounts.
- Screen time counts while the tab is visible, including idle time.
- Emoji artwork varies by operating system, and some concepts (for example pyramids) have no exact emoji.
- Facts and quiz wording have **not been reviewed by educators**. Please have them checked before classroom use.
- There is no automated test suite yet.

## Roadmap

- [x] Seven subjects with three difficulty levels
- [x] Six games with no-repeat rounds and mistake review
- [x] Stars, levels, streaks, stickers and unlock celebration
- [x] Parent area with analytics and controls
- [x] Mobile and tablet layouts

## Contributing

Contributions are welcome.

1. Fork the repository and create a branch: `git checkout -b feature/my-change`
2. Make your change and run `npm run build` to confirm it compiles.
3. Commit with a clear message and open a pull request describing what changed and why.

For new educational content, please include a source or reference so facts can be verified.


---

<div align="center">Made with ❤️ for curious kids.</div>