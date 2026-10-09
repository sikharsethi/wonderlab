import type { Subject, Fact } from './types';
const f = (id: string, name: string, emoji: string, lv: number, text: string, extra: Partial<Fact> = {}): Fact => ({ id, name, emoji, lv, text, ...extra });
export const EXTRA: Subject[] = [
{ id:'geography', name:'Geography', emoji:'🌍', color:'#16a34a', intro:'Travel the world and learn about our planet!', quiz:[],
  facts:[
   f('asia','Asia','🐼',1,'The biggest continent. It is home to more than half of all people!', { group: 'continent', ask: 'Which continent has the most people living on it?' }),
   f('africa','Africa','🦁',1,'A huge continent with lions, elephants and the Sahara Desert.', { group: 'continent', ask: 'Which continent is home to lions, elephants and the Sahara?' }),
   f('europe','Europe','🏰',1,'Lots of small countries with castles, many languages and old cities.', { group: 'continent', ask: 'Which continent has lots of small countries and old castles?' }),
   f('oceania','Oceania','🦘',1,'Includes Australia, where kangaroos live, and many Pacific islands.', { group: 'continent', ask: 'Which continent has kangaroos?' }),
   f('sahara','Sahara','🐪',2,'The largest hot desert in the world, covering much of North Africa.'),
   f('amazon','Amazon','🌳',2,'The biggest rainforest on Earth, full of amazing animals and plants.'),
   f('nile','Nile','🌊',2,'One of the longest rivers in the world, flowing through Egypt.'),
   f('island','Island','🏝️',2,'A piece of land completely surrounded by water.'),
   f('everest','Everest','🏔️',3,'The tallest mountain on Earth, found in the Himalayas.'),
   f('compass','Compass','🧭',3,'A tool with a needle that always points north.'),
   f('equator','Equator','🌐',3,'An imaginary line around the middle of the Earth, where it is hottest.'),
   f('glacier','Glacier','❄️',3,'A huge, slow-moving river of ice.')] },
{ id:'history', name:'History', emoji:'🏺', color:'#d97706', intro:'Visit amazing places and people from the past!', quiz:[],
  facts:[
   f('pyramids','Pyramids','🔺',1,'Giant stone tombs built in Egypt about 4,500 years ago.'),
   f('pharaoh','Pharaoh','👑',1,'The king or queen of ancient Egypt.'),
   f('vikings','Vikings','⛵',1,'Sailors from the north who explored in long wooden ships.'),
   f('castle','Castle','🏰',1,'A strong stone building where kings and queens lived and defended themselves.'),
   f('colosseum','Colosseum','🏟️',2,'An ancient Roman arena where crowds watched big shows.'),
   f('greatwall','Great Wall','🧱',2,'A very long wall built in China to protect its lands.'),
   f('knight','Knight','🛡️',2,'A soldier in armor who served a king long ago.'),
   f('wheel','Wheel','🛞',2,'One of the oldest inventions. It changed how people travel and carry things.'),
   f('tajmahal','Taj Mahal','🕌',3,'A white marble palace in India, built in memory of an emperor\'s wife.'),
   f('eiffel','Eiffel Tower','🗼',3,'An iron tower in Paris, France, finished in 1889.'),
   f('samurai','Samurai','⚔️',3,'A warrior of old Japan who followed a strict code of honor.'),
   f('explorer','Explorer','🗺️',3,'A person who travels to unknown places to discover new things.')] },
];
