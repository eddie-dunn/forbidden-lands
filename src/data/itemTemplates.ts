import { Item, ItemArmor, ItemWeapon } from "@/characterData"

// Armor
const leather: Item = {
  bonus: 2,
  bonusType: "armor", // fixme
  weight: 0.5,
  id: "leather-armor",
  name: "Leather Armor",
  type: "armor",
}

const studdedLeather: Item = {
  bonus: 3,
  bonusType: "armor", // fixme
  weight: 1,
  id: "studded-leather-armor",
  name: "Studded Leather Armor",
  type: "armor",
}

// Helmets
const fullHelm: ItemArmor = {
  armorType: "head",
  bonus: 3,
  bonusType: "black", // fixme
  weight: 1,
  id: "studded-leather-armor",
  name: "Studded Leather Armor",
  type: "armor",
}

// Shields
const smallShield: Item = {
  bonus: 1,
  bonusType: "parry",
  weight: 1,
  id: "small-shield",
  name: "Small Shield",
  type: "shield",
}

const largeShield: Item = {
  bonus: 2,
  bonusType: "parry",
  weight: 1,
  id: "large-shield",
  name: "Large Shield",
  type: "shield",
}

// Weapons

const quarterstaff: ItemWeapon = {
  bonus: 1,
  damage: 1,
  bonusType: "black",
  weight: 1,
  id: "quarterstaff",
  name: "Quarterstaff",
  type: "weapon",
  range: 0,
  features: {
    blunt: true,
    hook: true,
    parrying: true,
  },
}

const shortSword: ItemWeapon = {
  bonus: 2,
  bonusType: "black",
  weight: 1,
  id: "short-sword",
  name: "Short Sword",
  type: "weapon",
  range: 0,
  damage: 1,
  features: {
    pointed: true,
    edged: true,
    parrying: true,
  },
}

const broadSword: ItemWeapon = {
  bonus: 2,
  damage: 2,
  bonusType: "black",
  weight: 2,
  id: "broad-sword",
  name: "Broad Sword",
  type: "weapon",
  range: 0,
  features: {
    pointed: true,
    edged: true,
    parrying: true,
  },
}
