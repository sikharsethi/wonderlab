# WonderLab
`npm install && npm run dev` → http://localhost:3000
- Content lives in `src/content/subjects.ts` (data only). To add a subject: add data, a scene in `components/scenes.tsx`, and register it in `Stage.tsx`.
- Progress/stars: zustand + localStorage (`src/store/useStore.ts`).
