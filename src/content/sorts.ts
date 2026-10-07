type Side = { name: string; e: string; items: string[] };
// 6 items per side: each round shows 3 of each, favoring ones not seen yet
export const SORTS: Record<string, { a: Side; b: Side }> = {
  science: { a: { name: 'Planets', e: '🪐', items: ['Mars', 'Venus', 'Saturn', 'Jupiter', 'Earth', 'Neptune'] }, b: { name: 'Not planets', e: '☄️', items: ['Sun', 'Moon', 'Comet', 'Sirius', 'Asteroid', 'Rocket'] } },
  chemistry: { a: { name: 'Solids', e: '🧊', items: ['Ice', 'Rock', 'Wood', 'Coin', 'Brick', 'Glass'] }, b: { name: 'Liquids', e: '💧', items: ['Water', 'Milk', 'Juice', 'Oil', 'Honey', 'Soup'] } },
  math: { a: { name: 'Even numbers', e: '2️⃣', items: ['2', '4', '6', '8', '10', '12'] }, b: { name: 'Odd numbers', e: '3️⃣', items: ['1', '3', '5', '7', '9', '11'] } },
  geography: { a: { name: 'Mountains & deserts', e: '🏜️', items: ['Sahara', 'Everest', 'Alps', 'Gobi', 'Andes', 'Kalahari'] }, b: { name: 'Water', e: '🌊', items: ['Nile', 'Pacific', 'Atlantic', 'Danube', 'Arctic', 'Indian'] } },
  history: { a: { name: 'Long ago', e: '🏺', items: ['Pyramids', 'Colosseum', 'Pharaoh', 'Gladiator', 'Castle', 'Knight'] }, b: { name: 'Today', e: '📱', items: ['Smartphone', 'Airplane', 'Computer', 'Television', 'Robot', 'Internet'] } },
  biology: { a: { name: 'Plants', e: '🌿', items: ['Rose', 'Oak', 'Fern', 'Grass', 'Cactus', 'Tulip'] }, b: { name: 'Animals', e: '🐾', items: ['Tiger', 'Eagle', 'Frog', 'Whale', 'Bee', 'Snake'] } },
  space: { a: { name: 'Stars', e: '⭐', items: ['Sun', 'Sirius', 'Polaris', 'Vega', 'Rigel', 'Antares'] }, b: { name: 'Planets', e: '🪐', items: ['Mars', 'Venus', 'Saturn', 'Earth', 'Neptune', 'Jupiter'] } },
};
