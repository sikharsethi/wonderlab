import type { Subject } from './types';
// lv: 1 = easy, 2 = medium, 3 = hard
export const BIO: Subject[] = [
{ id:'biology', name:'Biology', emoji:'🧬', color:'#10b981', intro:'Discover how living things work, from your body to tiny cells!', quiz:[],
  facts:[
   {id:'heart',name:'Heart',emoji:'❤️',lv:1,text:'Pumps blood around your whole body, all day and all night.'},
   {id:'brain',name:'Brain',emoji:'🧠',lv:1,text:'Your control center. It helps you think, move and feel.'},
   {id:'bones',name:'Bones',emoji:'🦴',lv:1,text:'A grown-up has 206 bones that hold the body up.'},
   {id:'lungs',name:'Lungs',emoji:'🫁',lv:1,text:'Two organs that let you breathe air in and out.'},
   {id:'roots',name:'Roots',emoji:'🌱',lv:2,text:'The plant parts that drink water from the soil.'},
   {id:'seeds',name:'Seeds',emoji:'🌰',lv:2,text:'Tiny packages that can grow into brand new plants.'},
   {id:'bees',name:'Bees',emoji:'🐝',lv:2,text:'They carry pollen between flowers, helping plants make fruit.'},
   {id:'leaves',name:'Leaves',emoji:'🍃',lv:2,text:'Leaves use sunlight to make food for the plant.'},
   {id:'cells',name:'Cells',emoji:'🔬',lv:3,text:'The tiny building blocks of every living thing.'},
   {id:'dna',name:'DNA',emoji:'🧬',lv:3,text:'A code inside your cells that decides things like your eye color.'},
   {id:'bacteria',name:'Bacteria',emoji:'🦠',lv:3,text:'Tiny living things. Some make us sick, others help us digest food.'},
   {id:'habitat',name:'Habitat',emoji:'🏞️',lv:3,text:'The natural home where an animal or plant lives.'}] },
{ id:'space', name:'Space', emoji:'🚀', color:'#4f46e5', intro:'Blast off and explore stars, galaxies and beyond!', quiz:[],
  facts:[
   {id:'moon',name:'Moon',emoji:'🌙',lv:1,text:'Earth\'s natural satellite. It circles us about once a month.'},
   {id:'stars',name:'Stars',emoji:'⭐',lv:1,text:'Giant balls of glowing gas, very far away.'},
   {id:'comet',name:'Comet',emoji:'☄️',lv:1,text:'A ball of ice and dust that grows a glowing tail near the Sun.'},
   {id:'rocket',name:'Rocket',emoji:'🚀',lv:1,text:'A powerful machine that carries astronauts and satellites to space.'},
   {id:'galaxy',name:'Galaxy',emoji:'🌌',lv:2,text:'A huge family of billions of stars. Ours is the Milky Way.'},
   {id:'astronaut',name:'Astronaut',emoji:'👩‍🚀',lv:2,text:'A person trained to travel and work in space.'},
   {id:'telescope',name:'Telescope',emoji:'🔭',lv:2,text:'Helps us see faraway planets and stars.'},
   {id:'eclipse',name:'Eclipse',emoji:'🌑',lv:2,text:'When the Moon moves in front of the Sun and blocks its light.'},
   {id:'blackhole',name:'Black hole',emoji:'🕳️',lv:3,text:'A place with gravity so strong that not even light can escape.'},
   {id:'gravity',name:'Gravity',emoji:'🍎',lv:3,text:'The force that pulls things together and keeps us on the ground.'},
   {id:'asteroid',name:'Asteroid',emoji:'🪨',lv:3,text:'A rocky leftover from when the planets were formed.'},
   {id:'lightyear',name:'Light-year',emoji:'💡',lv:3,text:'The distance light travels in one year: about 9.5 trillion km.'}] },
];
