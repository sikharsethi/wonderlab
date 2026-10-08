export const STARS_PER_LEVEL = 20;
const TITLES = ['Little Explorer', 'Brave Adventurer', 'Young Scientist', 'Clever Inventor', 'Super Genius'];
/** Level from total stars: every 20 stars = 1 level */
export const levelInfo = (stars: number) => {
  const level = Math.floor(stars / STARS_PER_LEVEL) + 1, into = stars % STARS_PER_LEVEL;
  return { level, into, need: STARS_PER_LEVEL, pct: (into / STARS_PER_LEVEL) * 100, title: TITLES[Math.min(level - 1, TITLES.length - 1)] };
};
