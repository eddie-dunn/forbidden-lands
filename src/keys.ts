import {
  Age,
  Attribute,
  KinName,
  Profession,
  Skill,
  TalentAll,
} from "@/types.ts"

interface AgeKeys {
  [key: string]: Age
}
export const AGE: AgeKeys = {
  YOUNG: "young",
  ADULT: "adult",
  OLD: "old",
}

export enum AgeKeysA {
  young,
  old,
  adult,
}

interface AttributeKeys {
  [key: string]: Attribute
}
export const ATTRIBUTE: AttributeKeys = {
  STRENGTH: "strength",
  AGILITY: "agility",
  WITS: "wits",
  EMPATHY: "empathy",
}

interface KinKeys {
  [key: string]: KinName
}
export const KIN: KinKeys = {
  DWARF: "dwarf",
  ELF: "elf",
  GOBLIN: "goblin",
  HALFELF: "halfelf",
  HALFLING: "halfling",
  HUMAN: "human",
  ORC: "orc",
  WOLFKIN: "wolfkin",
}

interface SkillKeys {
  [key: string]: Skill
}
export const SKILL: SkillKeys = {
  ANIMAL_HANDLING: "animal handling",
  CRAFTING: "crafting",
  ENDURANCE: "endurance",
  HEALING: "healing",
  INSIGHT: "insight",
  LORE: "lore",
  MANIPULATION: "manipulation",
  MARKSMANSHIP: "marksmanship",
  MELEE: "melee",
  MIGHT: "might",
  MOVE: "move",
  PERFORMANCE: "performance",
  SCOUTING: "scouting",
  SLEIGHT_OF_HAND: "sleight of hand",
  STEALTH: "stealth",
  SURIVAL: "survival",
}

interface TalentKeys {
  [key: string]: TalentAll
}
export const TALENT: TalentKeys = {
  // Kin
  TRUE_GRIT: "True Grit", // dwarf
  INNER_PEACE: "Inner Peace", // elf
  SNEAKY: "Sneaky", // goblin
  PSYCHIC_POWER: "Psychic Power", // half-elf
  HARD_TO_CATCH: "Hard to Catch", // halfling
  ADAPTIVE: "Adaptive", // human
  UNBREAKABLE: "Unbreakable", // orc
  HUNTING_INSTINCTS: "Hunting Instincts", // wolfkin

  // General
  AMBIDEXTROUS: "Ambidextrous",
  AXE_FIGHTER: "Axe Fighter",
  BERSERKER: "Berserker",
  BOWYER: "Bowyer",
  BRAWLER: "Brawler",
  BUILDER: "Builder",
  CHEF: "Chef",
  COLD_BLOODED: "Cold Blooded",
  DEFENDER: "Defender",
  DRAGONSLAYER: "Dragonslayer",
  EXECUTIONER: "Executioner",
  FAST_FOOTWORK: "Fast Footwork",
  FAST_SHOOTER: "Fast Shooter",
  FEARLESS: "Fearless",
  FIRM_GRIP: "Firm Grip",
  FISHER: "Fisher",
  HAMMER_FIGHTER: "Hammer Fighter",
  HERBALIST: "Herbalist",
  HORSEBACK_FIGHTER: "Horseback Fighter",
  INCORRUPTIBLE: "Incorruptible",
  KNIFE_FIGHTER: "Knife Fighter",
  LIGHTNING_FAST: "Lightning Fast",
  LOCKPICKER: "Lockpicker",
  LUCKY: "Lucky",
  MASTER_OF_THE_HUNT: "Master of the Hunt",
  MELEE_CHARGE: "Melee Charge",
  PACK_RAT: "Pack Rat",
  PAIN_RESISTANT: "Pain Resistant",
  PATHFINDER: "Pathfinder",
  POISONER: "Poisoner",
  QUARTERMASTER: "Quartermaster",
  QUICKDRAW: "Quickdraw",
  SAILOR: "Sailor",
  SHARPSHOOTER: "Sharpshooter",
  SHARP_TONGUE: "Sharp Tongue",
  SHIELD_FIGHTER: "Shield Fighter",
  SIXTH_SENSE: "Sixth Sense",
  SMITH: "Smith",
  SPEAR_FIGHTER: "Spear Fighter",
  STEADY_FEET: "Steady Feet",
  SWORD_FIGHTER: "Sword Fighter",
  TAILOR: "Tailor",
  TANNER: "Tanner",
  THREATENING: "Threatening",
  THROWING_ARM: "Throwing Arm",
  WANDERER: "Wanderer",

  // Druid
  PATH_OF_HEALING: "Path of Healing",
  PATH_OF_SHIFTING_SHAPES: "Path of Shifting Shapes",
  PATH_OF_SIGHT: "Path of Sight",

  // Fighter
  PATH_OF_THE_BLADE: "Path of the Blade",
  PATH_OF_THE_ENEMY: "Path of the Enemy",
  PATH_OF_THE_SHIELD: "Path of the Shield",

  // HUNTER
  PATH_OF_THE_ARROW: "Path of the Arrow",
  PATH_OF_THE_BEAST: "Path of the Beast",
  PATH_OF_THE_FOREST: "Path of the Forest",

  // MINSTREL
  PATH_OF_THE_HYMN: "Path of the Hymn",
  PATH_OF_THE_SONG: "Path of the Song",
  PATH_OF_THE_WARCRY: "Path of the Warcry",

  // Peddler
  PATH_OF_GOLD: "Path of Gold",
  PATH_OF_LIES: "Path of Lies",
  PATH_OF_MANY_THINGS: "Path of Many Things",

  // Rider
  PATH_OF_THE_COMPANION: "Path of the Companion",
  PATH_OF_THE_KNIGHT: "Path of the Knight",
  PATH_OF_THE_PLAINS: "Path of the Plains",

  // Rogue
  PATH_OF_THE_FACE: "Path of the Face",
  PATH_OF_THE_KILLER: "Path of the Killer",
  PATH_OF_POISON: "Path of Poison",

  // Sorcerer
  PATH_OF_BLOOD: "Path of Blood",
  PATH_OF_DEATH: "Path of Death",
  PATH_OF_SIGNS: "Path of Signs",
  PATH_OF_STONE: "Path of Stone",
}

interface ProfessionKeys {
  [key: string]: Profession
}
export const CLASS: ProfessionKeys = {
  DRUID: "druid",
  FIGHTER: "fighter",
  HUNTER: "hunter",
  MINSTREL: "minstrel",
  PEDDLER: "peddler",
  RIDER: "rider",
  SORCERER: "sorcerer",
  ROGUE: "rogue",
}

interface Keys {
  [key: string]: Age | Attribute | KinName | Profession | Skill | TalentAll
}
export const KEYS: Keys = {
  ...AGE,
  ...ATTRIBUTE,
  ...CLASS,
  ...KIN,
  ...TALENT,
}

export default {
  AGE,
  ATTRIBUTE,
  CLASS,
  KIN,
  TALENT,
}
