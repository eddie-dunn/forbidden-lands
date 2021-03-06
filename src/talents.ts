// This shit needs to be seriously refactored, the relationship between keys
// types and talents in this module is too damn confusing
import { CLASS, KIN, TALENT } from "@/keys.ts"
import {
  KinName,
  Profession,
  TalentAll,
  TalentGeneral,
  TalentKin,
  TalentProfession,
} from "@/types"

export interface Talent {
  id: TalentAll
  name?: string
  translationKey: string // TODO should be removed, and translations updated
  description_id?: string[]
}

// TODO: Remove
export const transformToTranslationKey = (s: string) =>
  s.replace(/ /g, "_").toUpperCase()

export const KIN_TALENTS = {
  //TODO: remove
  [KIN.DWARF]: {
    id: "True Grit",
    translationKey: transformToTranslationKey("True Grit"),
    description_id: [""],
  },
  [KIN.ELF]: {
    id: "Inner Peace",
    tra: transformToTranslationKey("Inner Peace"),
    description_id: [""],
  },
  [KIN.GOBLIN]: {
    id: "Sneaky",
    translationKey: transformToTranslationKey("Sneaky"),
    description_id: [""],
  },
  [KIN.HALFELF]: {
    id: "Psychic Power",
    tra: transformToTranslationKey("Psychich Power"),
    description_id: [""],
  },
  [KIN.HALFLING]: {
    id: "Hard to Catch",
    translationKey: transformToTranslationKey("Hard to Catch"),
    description_id: [""],
  },
  [KIN.HUMAN]: {
    id: "Adaptive",
    translationKey: transformToTranslationKey("Adaptive"),
    description_id: [""],
  },
  [KIN.ORC]: {
    id: "Unbreakable",
    translationKey: transformToTranslationKey("Unbreakable"),
    description_id: [""],
  },
  [KIN.WOLFKIN]: {
    id: "Hunting Instincts",
    translationKey: transformToTranslationKey("Hunting Instincts"),
    description_id: [""],
  },
}

type KinTalentMap = { [key in KinName]: TalentKin }
export const KIN_TALENTS2: KinTalentMap = {
  human: "Adaptive",
  halfling: "Hard to Catch",
  wolfkin: "Hunting Instincts",
  elf: "Inner Peace",
  halfelf: "Psychic Power",
  goblin: "Sneaky",
  dwarf: "True Grit",
  orc: "Unbreakable",
}

type ProfessionTalentMap = { [key in Profession]: TalentProfession[] }
export const PROFESSION_TALENTS: ProfessionTalentMap = {
  druid: ["Path of Healing", "Path of Shifting Shapes", "Path of Sight"],
  fighter: ["Path of the Blade", "Path of the Enemy", "Path of the Shield"],
  hunter: ["Path of the Arrow", "Path of the Beast", "Path of the Forest"],
  minstrel: ["Path of the Hymn", "Path of the Song", "Path of the Warcry"],
  peddler: ["Path of Gold", "Path of Lies", "Path of Many Things"],
  rider: ["Path of the Companion", "Path of the Knight", "Path of the Plains"],
  rogue: ["Path of the Face", "Path of the Killer", "Path of Poison"],
  sorcerer: [
    "Path of Blood",
    "Path of Death",
    "Path of Signs",
    "Path of Stone",
  ],
}

// TODO: Remove CLASS_TALENTS?
export const CLASS_TALENTS = {
  [CLASS.DRUID]: {
    [TALENT.PATH_OF_HEALING]: {
      name: "Path of Healing",
    },
    [TALENT.PATH_OF_SHIFTING_SHAPES]: {
      name: "Path of Shifting Shapes",
    },
    [TALENT.PATH_OF_SIGHT]: {
      name: "Path of Sight",
    },
  },
  [CLASS.FIGHTER]: {
    [TALENT.PATH_OF_THEBLADE]: {
      name: "Path of the Blade",
    },
    [TALENT.PATH_OF_THE_ENEMY]: {
      name: "Path of the Enemy",
    },
    [TALENT.PATH_OF_THE_SHIELD]: {
      name: "Path of the Shield",
    },
  },
  [CLASS.HUNTER]: {
    [TALENT.PATH_OF_THE_ARROW]: { name: "Path of the Arrow" },
    [TALENT.PATH_OF_THE_BEAST]: { name: "Path of the Beast" },
    [TALENT.PATH_OF_THE_FOREST]: { name: "Path of the Forest" },
  },
  [CLASS.MINSTREL]: {
    [TALENT.PATH_OF_THE_HYMN]: { name: "Path of the Hymn" },
    [TALENT.PATH_OF_THE_SONG]: { name: "Path of the Song" },
    [TALENT.PATH_OF_THE_WARCRY]: { name: "Path of the Warcry" },
  },
  [CLASS.PEDDLER]: {
    [TALENT.PATH_OF_GOLD]: { name: "Path of Gold" },
    [TALENT.PATH_OF_LIES]: { name: "Path of Lies" },
    [TALENT.PATH_OF_MANY_THINGS]: { name: "Path of Many Things" },
  },
  [CLASS.RIDER]: {
    [TALENT.PATH_OF_THE_COMPANION]: { name: "Path of the Companion" },
    [TALENT.PATH_OF_THE_KNIGHT]: { name: "Path of the Knight" },
    [TALENT.PATH_OF_THE_PLAINS]: { name: "Path of the Plains" },
  },
  [CLASS.ROGUE]: {
    [TALENT.PATH_OF_THE_FACE]: { name: "Path of the Face" },
    [TALENT.PATH_OF_THE_KILLER]: { name: "Path of the Killer" },
    [TALENT.PATH_OF_THE_POISON]: { name: "Path of Poison" },
  },
  [CLASS.SORCERER]: {
    [TALENT.PATH_OF_BLOOD]: { name: "Path of Blood" },
    [TALENT.PATH_OF_DEATH]: { name: "Path of Death" },
    [TALENT.PATH_OF_SIGNS]: { name: "Path of Signs" },
    [TALENT.PATH_OF_STONE]: { name: "Path of Stone" },
  },
}

export function getTalentsForProfession(
  profession: Profession | null
): TalentProfession[] {
  if (!profession) return []
  return PROFESSION_TALENTS[profession]
}

// Metadata for General Talents
export type TalentRank = 0 | 1 | 2 | 3

export const GENERAL_TALENTS: TalentGeneral[] = [
  // An array of Talent IDs
  "ambidextrous",
  "axe fighter",
  "berserker",
  "bowyer",
  "brawler",
  "builder",
  "chef",
  "cold blooded",
  "defender",
  "dragonslayer",
  "executioner",
  "fast footwork",
  "fast shooter",
  "fearless",
  "firm grip",
  "fisher",
  "hammer fighter",
  "herbalist",
  "horseback fighter",
  "incorruptible",
  "knife fighter",
  "lightning fast",
  "lockpicker",
  "lucky",
  "master of the hunt",
  "melee charge",
  "pack rat",
  "pain resistant",
  "pathfinder",
  "poisoner",
  "quartermaster",
  "quickdraw",
  "sailor",
  "sharp tongue",
  "sharpshooter",
  "shield fighter",
  "sixth sense",
  "smith",
  "spear fighter",
  "steady feet",
  "sword fighter",
  "tailor",
  "tanner",
  "threatening",
  "throwing arm",
  "wanderer",
]
export const GENERAL_TALENTS2 = GENERAL_TALENTS

export const ALL_TALENTS = {
  ...KIN_TALENTS,
  ...CLASS_TALENTS,
  // ...GENERAL_TALENTS,
}

export function getClassTalents(className: Profession | null) {
  if (!className) return null
  return CLASS_TALENTS[className]
}

export function getTalent(name: TalentAll) {
  return ALL_TALENTS[name]
}
