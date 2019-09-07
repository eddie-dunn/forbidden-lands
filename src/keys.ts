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
  AMBIDEXTROUS: "ambidextrous",
  AXE_FIGHTER: "axe fighter",
  BERSERKER: "berserker",
  BOWYER: "bowyer",
  BRAWLER: "brawler",
  BUILDER: "builder",
  CHEF: "chef",
  COLD_BLOODED: "cold blooded",
  DEFENDER: "defender",
  DRAGONSLAYER: "dragonslayer",
  EXECUTIONER: "executioner",
  FAST_FOOTWORK: "fast footwork",
  FAST_SHOOTER: "fast shooter",
  FEARLESS: "fearless",
  FIRM_GRIP: "firm grip",
  FISHER: "fisher",
  HAMMER_FIGHTER: "hammer fighter",
  HERBALIST: "herbalist",
  HORSEBACK_FIGHTER: "horseback fighter",
  INCORRUPTIBLE: "incorruptible",
  KNIFE_FIGHTER: "knife fighter",
  LIGHTNING_FAST: "lightning fast",
  LOCKPICKER: "lockpicker",
  LUCKY: "lucky",
  MASTER_OF_THE_HUNT: "master of the hunt",
  MELEE_CHARGE: "melee charge",
  PACK_RAT: "pack rat",
  PAIN_RESISTANT: "pain resistant",
  PATHFINDER: "pathfinder",
  POISONER: "poisoner",
  QUARTERMASTER: "quartermaster",
  QUICKDRAW: "quickdraw",
  SAILOR: "sailor",
  SHARPSHOOTER: "sharpshooter",
  SHARP_TONGUE: "sharp tongue",
  SHIELD_FIGHTER: "shield fighter",
  SIXTH_SENSE: "sixth sense",
  SMITH: "smith",
  SPEAR_FIGHTER: "spear fighter",
  STEADY_FEET: "steady feet",
  SWORD_FIGHTER: "sword fighter",
  TAILOR: "tailor",
  TANNER: "tanner",
  THREATENING: "threatening",
  THROWING_ARM: "throwing arm",
  WANDERER: "wanderer",

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
