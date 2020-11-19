import {
  CharacterData,
  getNewCharacterData,
} from "@/data/character/characterData"
import { allShields, meleeWeapons } from "@/data/items/items"

const UNSET = null

const newPersona = getNewCharacterData()

export const basePersona: CharacterData = {
  ...newPersona,
  name: "Base Persona",
  age: 33,
  ageType: "adult",
  sex: "male",
  kin: "human",
  profession: "fighter",

  attributes: {
    strength: 5,
    agility: 4,
    wits: 3,
    empathy: 2,
  },

  attributeDmg: {
    strength: 0,
    agility: 0,
    wits: 0,
    empathy: 0,
  },

  skills: {
    "animal handling": {
      id: "animal handling",
      attribute: "empathy",
      rank: UNSET,
    },
    "crafting": {
      id: "crafting",
      attribute: "strength",
      rank: UNSET,
    },
    "endurance": {
      id: "endurance",
      attribute: "strength",
      rank: UNSET,
    },
    "healing": {
      id: "healing",
      rank: UNSET,
      attribute: "empathy",
    },
    "insight": {
      id: "insight",
      attribute: "wits",
      rank: UNSET,
    },
    "lore": {
      id: "lore",
      attribute: "wits",
      rank: UNSET,
    },
    "manipulation": {
      id: "manipulation",
      attribute: "empathy",
      rank: UNSET,
    },
    "marksmanship": {
      id: "marksmanship",
      attribute: "agility",
      rank: UNSET,
    },
    "melee": {
      id: "melee",
      attribute: "strength",
      rank: UNSET,
    },
    "might": {
      id: "might",
      attribute: "strength",
      rank: UNSET,
    },
    "move": {
      id: "move",
      attribute: "agility",
      rank: UNSET,
    },
    "performance": {
      id: "performance",
      attribute: "empathy",
      rank: UNSET,
    },
    "scouting": {
      id: "scouting",
      attribute: "wits",
      rank: UNSET,
    },
    "sleight of hand": {
      id: "sleight of hand",
      attribute: "agility",
      rank: UNSET,
    },
    "stealth": {
      id: "stealth",
      attribute: "agility",
      rank: UNSET,
    },
    "survival": {
      id: "survival",
      attribute: "wits",
      rank: UNSET,
    },
  },

  talents: [],

  gear: {
    ...newPersona.gear,
    equipped: [],
    inventory: [],
  },
}

export const Adam: CharacterData = {
  ...basePersona,
  name: "Adam",
  profession: "fighter",
  skills: {
    ...basePersona.skills,
    melee: { ...basePersona.skills.melee, rank: 3 },
    marksmanship: { ...basePersona.skills.marksmanship, rank: 2 },
  },
}

export const Bertil: CharacterData = {
  ...basePersona,
  name: "Bertil",
  profession: "rogue",
  skills: {
    ...basePersona.skills,
    "sleight of hand": { ...basePersona.skills["sleight of hand"], rank: 3 },
    "scouting": { ...basePersona.skills.scouting, rank: 2 },
  },
}

export const Caesar: CharacterData = {
  ...basePersona,
  name: "Caesar",
  profession: "fighter",
  metadata: {
    ...basePersona.metadata,
    status: "active",
  },
  talents: [
    //
    { id: "sword fighter", rank: 3 },
    { id: "axe fighter", rank: 3 },
    { id: "spear fighter", rank: 3 },
    { id: "hammer fighter", rank: 3 },
    { id: "shield fighter", rank: 3 },
  ],
  skills: {
    ...basePersona.skills,
    melee: { ...basePersona.skills.melee, rank: 3 },
    marksmanship: { ...basePersona.skills.marksmanship, rank: 2 },
  },
  gear: {
    consumables: { arrows: 12, torches: 0, food: 6, water: 6 },
    equipped: [],
    inventory: [
      //
      { ...meleeWeapons.trident, equipped: true },
      { ...meleeWeapons.falchion, equipped: false },
      { ...meleeWeapons.halberd, equipped: false },
      { ...meleeWeapons.heavywarhammer, equipped: true },
      { ...allShields[1], equipped: true },
    ],
    money: { copper: 0, silver: 0, gold: 0 },
  },
}
