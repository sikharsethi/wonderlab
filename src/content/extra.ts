import type { Subject } from './types';
export const EXTRA: Subject[] = [
{ id:'geography', name:'Geography', emoji:'🌍', color:'#16a34a', intro:'Travel the world and learn about our planet!', quiz:[],
  facts:[
   {id:'asia',name:'Asia',emoji:'🐼',text:'The biggest continent. It is home to more than half of all people!'},
   {id:'africa',name:'Africa',emoji:'🦁',text:'A huge continent with lions, elephants and the Sahara Desert.'},
   {id:'europe',name:'Europe',emoji:'🏰',text:'Lots of small countries with castles, many languages and old cities.'},
   {id:'oceania',name:'Oceania',emoji:'🦘',text:'Includes Australia, where kangaroos live, and many Pacific islands.'},
   {id:'sahara',name:'Sahara',emoji:'🐪',text:'The largest hot desert in the world, covering much of North Africa.'},
   {id:'amazon',name:'Amazon',emoji:'🌳',text:'The biggest rainforest on Earth, full of amazing animals and plants.'},
   {id:'everest',name:'Everest',emoji:'🏔️',text:'The tallest mountain on Earth, found in the Himalayas.'},
   {id:'nile',name:'Nile',emoji:'🌊',text:'One of the longest rivers in the world, flowing through Egypt.'}] },
{ id:'history', name:'History', emoji:'🏺', color:'#d97706', intro:'Visit amazing places and people from the past!', quiz:[],
  facts:[
   {id:'pyramids',name:'Pyramids',emoji:'🔺',text:'Giant stone tombs built in Egypt about 4,500 years ago.'},
   {id:'colosseum',name:'Colosseum',emoji:'🏟️',text:'An ancient Roman arena where crowds watched big shows.'},
   {id:'greatwall',name:'Great Wall',emoji:'🧱',text:'A very long wall built in China to protect its lands.'},
   {id:'tajmahal',name:'Taj Mahal',emoji:'🕌',text:'A white marble palace in India, built in memory of an emperor\'s wife.'},
   {id:'eiffel',name:'Eiffel Tower',emoji:'🗼',text:'An iron tower in Paris, France, finished in 1889.'},
   {id:'vikings',name:'Vikings',emoji:'⛵',text:'Sailors from the north who explored in long wooden ships.'},
   {id:'pharaoh',name:'Pharaoh',emoji:'👑',text:'The king or queen of ancient Egypt.'}] },
];
