import type { Subject } from './types';
// Content is pure data: swap for a CMS / JSON / i18n files without touching 3D code.
export const SUBJECTS: Subject[] = [
{ id:'science', name:'Science', emoji:'🪐', color:'#7c3aed', bg:'radial-gradient(#1b1b4b,#05050f)', scene:'solar', camera:[0,8,17],
  intro:'Welcome to the Solar System! Tap a planet.',
  facts:[
   {id:'sun',name:'Sun',emoji:'☀️',text:'The Sun is a star. It gives us light and warmth!'},
   {id:'mercury',name:'Mercury',emoji:'🪨',text:'The smallest planet. A year here lasts only 88 days!'},
   {id:'venus',name:'Venus',emoji:'☁️',text:'The hottest planet, wrapped in thick clouds.'},
   {id:'earth',name:'Earth',emoji:'🌍',text:'Our home — the only planet we know with life!'},
   {id:'mars',name:'Mars',emoji:'🔴',text:'The Red Planet has the tallest volcano in the solar system.'},
   {id:'jupiter',name:'Jupiter',emoji:'🌪️',text:'The biggest planet. Its Great Red Spot is a giant storm.'},
   {id:'saturn',name:'Saturn',emoji:'💍',text:'Famous for its rings made of ice and rock.'}],
  quiz:[{q:'Which planet is known as the Red Planet?',options:['Venus','Mars','Jupiter'],answer:1},
        {q:'What does the Sun give us?',options:['Light and warmth','Rain','Wind'],answer:0}] },
{ id:'chemistry', name:'Chemistry', emoji:'⚗️', color:'#ef4444', bg:'linear-gradient(#fde68a,#fb923c)', scene:'molecules', camera:[0,3,11],
  intro:'Everything is made of atoms! Tap a molecule.',
  facts:[
   {id:'water',name:'Water (H₂O)',emoji:'💧',text:'Two hydrogen atoms and one oxygen atom. Water is essential for life!'},
   {id:'co2',name:'Carbon dioxide (CO₂)',emoji:'🌫️',text:'We breathe it out and plants use it to make food.'},
   {id:'methane',name:'Methane (CH₄)',emoji:'🔥',text:'One carbon atom with four hydrogens — a gas used in stoves.'}],
  quiz:[{q:'How many hydrogen atoms are in water?',options:['1','2','3'],answer:1},
        {q:'Which gas do plants use to make food?',options:['Methane','Oxygen','Carbon dioxide'],answer:2}] },
{ id:'math', name:'Math', emoji:'📐', color:'#0ea5e9', bg:'linear-gradient(#bae6fd,#38bdf8)', scene:'shapes', camera:[0,3,13],
  intro:'Meet the 3D shapes! Tap one to count its parts.',
  facts:[
   {id:'cube',name:'Cube',emoji:'🧊',text:'6 faces, 12 edges, 8 corners. Dice are cubes!'},
   {id:'sphere',name:'Sphere',emoji:'⚽',text:'Perfectly round: no edges and no corners.'},
   {id:'cone',name:'Cone',emoji:'🍦',text:'1 flat face, 1 curved surface and 1 pointy corner.'},
   {id:'cylinder',name:'Cylinder',emoji:'🥫',text:'2 flat circles and 1 curved side, like a can.'},
   {id:'pyramid',name:'Square pyramid',emoji:'🔺',text:'5 faces, 8 edges and 5 corners.'}],
  quiz:[{q:'How many faces does a cube have?',options:['4','6','8'],answer:1},
        {q:'Which shape has no corners?',options:['Sphere','Cube','Pyramid'],answer:0}] },
];
export const getSubject = (id: string) => SUBJECTS.find(s => s.id === id);
