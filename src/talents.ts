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
  id: string
  name?: string
  description_id?: string
}

export interface TalentObj {
  id: string
  rank: number
}
export function getTalentObjects(talentList: TalentAll[]): TalentObj[] {
  const talentObj = talentList.map((talentName: TalentAll) => {
    return {
      id: talentName,
      rank: -1,
    }
  })
  /* eslint-disable no-console */
  console.log("talentobj", talentObj)
  return talentObj
}

export const transformToTranslationKey = (s: string) =>
  s.replace(/ /g, "_").toUpperCase()

function makeTalent(name: string, description_id = ""): Talent {
  return { id: transformToTranslationKey(name), name, description_id }
}

type KinTalentMap = { [key in KinName]: TalentKin }
export const KIN_TALENTS = {
  //TODO: remove
  [KIN.DWARF]: makeTalent("True Grit"),
  [KIN.ELF]: makeTalent("Inner Peace"),
  [KIN.GOBLIN]: makeTalent("Sneaky"),
  [KIN.HALFELF]: makeTalent("Psychic Power"),
  [KIN.HALFLING]: makeTalent("Hard to Catch"),
  [KIN.HUMAN]: makeTalent("adaptive"),
  [KIN.ORC]: makeTalent("Unbreakable"),
  [KIN.WOLFKIN]: makeTalent("Hunting Instincts"),
}

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

export function getKinTalent(kin: KinName | null): Talent | null {
  if (!kin) return null
  return KIN_TALENTS[kin]
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

export const GENERAL_TALENTS = {
  [TALENT.AMBIDEXTROUS]: {
    id: [TALENT.AMBIDEXTROUS],
    name: "Ambidextrous",
    description_id: "",
  },
  [TALENT.AXE_FIGHTER]: {
    name: "Axe fighter",
  },
  [TALENT.BERSERKER]: {
    name: "Berserker",
  },
  [TALENT.BOWYER]: {
    name: "Bowyer",
  },
  [TALENT.BRAWLER]: {
    name: "Brawler",
  },
  [TALENT.BUILDER]: {
    name: "Builder",
  },
  [TALENT.CHEF]: {
    name: "Chef",
  },
  [TALENT.COLD_BLOODED]: {
    name: "Cold Blooded",
  },
  [TALENT.DEFENDER]: {
    name: "Defender",
  },
  [TALENT.DRAGONSLAYER]: {
    name: "Dragonslayer",
  },
  [TALENT.EXECUTIONER]: { name: "Executioner" },

  [TALENT.FAST_FOOTWORK]: { name: "Fast Footwork" },
  [TALENT.FAST_SHOOTER]: { name: "Fast Shooter" },
  [TALENT.FEARLESS]: { name: "Fearless" },
  [TALENT.FIRM_GRIP]: { name: "Firm Grip" },
  [TALENT.FISHER]: { name: "Fisher" },
  [TALENT.HAMMER_FIGHER]: { name: "Hammer Fighter" },
  [TALENT.HERBALIST]: { name: "Herbalist" },
  [TALENT.HORSEBACK_FIGHTER]: { name: "Horseback Fighter" },
  [TALENT.INCORRUPTIBLE]: { name: "Incorruptible" },
  [TALENT.KNIFE_FIGHTER]: { name: "Knife Fighter" },
  [TALENT.LIGHTNING_FAST]: { name: "Lightning Fast" },
  [TALENT.LOCKPICKER]: { name: "Lockpicker" },
  [TALENT.LUCKY]: { name: "Lucky" },
  [TALENT.MASTER_OF_THE_HUNT]: { name: "Master of the Hunt" },
  [TALENT.MELEE_CHARGE]: { name: "Melee Charge" },
  [TALENT.PACK_RAT]: { name: "Pack Rat" },
  [TALENT.PAIN_RESISTANT]: { name: "Pain Resistant" },
  [TALENT.PATHFINDER]: { name: "Pathfinder" },
  [TALENT.POISONER]: { name: "Poisoner" },
  [TALENT.QUARTERMASTER]: { name: "Quartermaster" },
  [TALENT.QUICKDRAW]: { name: "Quickdraw" },
  [TALENT.SAILOR]: { name: "Sailor" },
  [TALENT.SHARPSHOOTER]: { name: "Sharpshooter" },
  [TALENT.SHARP_TONGUE]: { name: "Sharp Tongue" },
  [TALENT.SHIELD_FIGHTER]: { name: "Shield Fighter" },
  [TALENT.SIXTH_SENSE]: { name: "Sixth Sense" },
  [TALENT.SMITH]: { name: "Smith" },
  [TALENT.SPEAR_FIGHTER]: { name: "Spear Fighter" },
  [TALENT.STEADY_FEET]: { name: "Steady Feet" },
  [TALENT.SWORD_FIGHTER]: { name: "Sword Fighter" },
  [TALENT.TAILOR]: { name: "Tailor" },
  [TALENT.TANNER]: { name: "Tanner" },
  [TALENT.THREATENING]: { name: "Threatening" },
  [TALENT.THROWING_ARM]: { name: "Throwing Arm" },
  [TALENT.WANDERER]: { name: "Wanderer" },
}

export const GENERAL_TALENTS2: TalentGeneral[] = [
  "Ambidextrous",
  "Axe Fighter",
  "Berserker",
  "Bowyer",
  "Brawler",
  "Builder",
  "Chef",
  "Cold Blooded",
  "Defender",
  "Dragonslayer",
  "Executioner",
  "Fast Footwork",
  "Fast Shooter",
  "Fearless",
  "Firm Grip",
  "Fisher",
  "Hammer Fighter",
  "Herbalist",
  "Horseback Fighter",
  "Incorruptible",
  "Knife Fighter",
  "Lightning Fast",
  "Lockpicker",
  "Lucky",
  "Master of the Hunt",
  "Melee Charge",
  "Pack Rat",
  "Pain Resistant",
  "Pathfinder",
  "Poisoner",
  "Quartermaster",
  "Quickdraw",
  "Sailor",
  "Sharpshooter",
  "Sharp Tongue",
  "Shield Fighter",
  "Sixth Sense",
  "Smith",
  "Spear Fighter",
  "Steady Feet",
  "Sword Fighter",
  "Tailor",
  "Tanner",
  "Threatening",
  "Throwing Arm",
  "Wanderer",
]

export const ALL_TALENTS = {
  ...KIN_TALENTS,
  ...CLASS_TALENTS,
  ...GENERAL_TALENTS,
}

export function getClassTalents(className: Profession | null) {
  if (!className) return null
  return CLASS_TALENTS[className]
}

export function getTalent(name: TalentAll) {
  return ALL_TALENTS[name]
}
