type Side = { name: string; e: string; items: string[] };
export const SORTS: Record<string, { a: Side; b: Side }> = {
  science: { a: { name: 'Rocky planets', e: '🪨', items: ['Mercury', 'Venus', 'Earth', 'Mars'] }, b: { name: 'Giant planets', e: '🌪️', items: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'] } },
  chemistry: { a: { name: 'Solids', e: '🧊', items: ['Ice', 'Rock', 'Wood', 'Coin'] }, b: { name: 'Liquids', e: '💧', items: ['Water', 'Milk', 'Juice', 'Oil'] } },
  math: { a: { name: 'Even numbers', e: '2️⃣', items: ['2', '4', '8', '10', '12'] }, b: { name: 'Odd numbers', e: '3️⃣', items: ['1', '3', '7', '9', '11'] } },
  geography: { a: { name: 'Mountains & deserts', e: '🏜️', items: ['Sahara', 'Everest', 'Alps', 'Gobi'] }, b: { name: 'Water', e: '🌊', items: ['Nile', 'Pacific', 'Atlantic', 'Thames'] } },
  history: { a: { name: 'Long ago', e: '🏺', items: ['Pyramids', 'Colosseum', 'Pharaoh', 'Gladiator'] }, b: { name: 'Today', e: '📱', items: ['Smartphone', 'Airplane', 'Computer', 'Television'] } },
};
