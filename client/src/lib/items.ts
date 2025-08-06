export interface Item {
  id: number;
  name: string;
  rarity: 'common' | 'rare' | 'epic';
  emoji: string;
}

export const ITEMS: Item[] = [
  { id: 1, name: "Shrimp", rarity: "common", emoji: "🦐" },
  { id: 2, name: "Prawn", rarity: "rare", emoji: "🦐" },
  { id: 3, name: "Mackerel", rarity: "rare", emoji: "🐟" },
  { id: 4, name: "Red Snapper", rarity: "rare", emoji: "🐟" },
  { id: 5, name: "Salmon", rarity: "rare", emoji: "🐟" },
  { id: 6, name: "Clown Fish", rarity: "rare", emoji: "🐠" },
  { id: 7, name: "Koi", rarity: "rare", emoji: "🐠" },
  { id: 8, name: "Bob", rarity: "rare", emoji: "🐠" },
  { id: 9, name: "Puffer", rarity: "rare", emoji: "🐡" },
  { id: 10, name: "Eel", rarity: "epic", emoji: "🐍" },
  { id: 11, name: "Lantern Fish", rarity: "rare", emoji: "🐟" },
  { id: 12, name: "Sardine", rarity: "rare", emoji: "🐟" },
  { id: 13, name: "Ray", rarity: "epic", emoji: "🐟" },
  { id: 14, name: "Sea Horse", rarity: "rare", emoji: "🐴" },
  { id: 15, name: "Blob Fish", rarity: "rare", emoji: "🐟" },
  { id: 16, name: "Lobster", rarity: "rare", emoji: "🦞" },
  { id: 17, name: "Starfish", rarity: "common", emoji: "⭐" },
  { id: 18, name: "Octopus", rarity: "rare", emoji: "🐙" },
  { id: 19, name: "Crab", rarity: "rare", emoji: "🦀" },
  { id: 20, name: "Scampi", rarity: "rare", emoji: "🦐" },
  { id: 21, name: "Long Nosed Shell", rarity: "common", emoji: "🐚" },
  { id: 22, name: "Conch", rarity: "common", emoji: "🐚" },
  { id: 23, name: "Axolotl", rarity: "rare", emoji: "🦎" },
  { id: 24, name: "Swordfish", rarity: "epic", emoji: "🗡️" },
  { id: 25, name: "Can", rarity: "common", emoji: "🥫" },
  { id: 26, name: "Bone", rarity: "common", emoji: "🦴" },
  { id: 27, name: "Fishbone", rarity: "common", emoji: "🦴" },
  { id: 28, name: "Worm", rarity: "common", emoji: "🪱" }
];

export function getRandomItem(collectedItems: number[]): Item | null {
  // Create weighted array based on rarity
  const weightedItems: Item[] = [];
  
  ITEMS.forEach(item => {
    if (!collectedItems.includes(item.id)) {
      const weight = item.rarity === 'common' ? 3 : 
                    item.rarity === 'rare' ? 2 : 1;
      for (let i = 0; i < weight; i++) {
        weightedItems.push(item);
      }
    }
  });
  
  if (weightedItems.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * weightedItems.length);
  return weightedItems[randomIndex];
}
