import { CLASS, KIN, TALENT } from "@/keys.ts"
import { KinName, Profession, TalentAll, TalentProfession } from "@/types"

export interface Talent {
  id: string
  name?: string
  description: string
}

export const transformToTranslationKey = (s: string) =>
  s.replace(/ /g, "_").toUpperCase()

function makeTalent(name: string, description = ""): Talent {
  return { id: transformToTranslationKey(name), name, description }
}

interface KinTalent {
  dwarf?: Talent
}

export const KIN_TALENTS = {
  [KIN.DWARF]: makeTalent("True Grit"),
  [KIN.ELF]: makeTalent("Inner Peace"),
  [KIN.GOBLIN]: makeTalent("Sneaky"),
  [KIN.HALFELF]: makeTalent("Psychic Power"),
  [KIN.HALFLING]: makeTalent("Hard to Catch"),
  [KIN.HUMAN]: makeTalent("adaptive"),
  [KIN.ORC]: makeTalent("Unbreakable"),
  [KIN.WOLFKIN]: makeTalent("Hunting Instincts"),
}

export function getKinTalent(kin: KinName): Talent {
  return KIN_TALENTS[kin]
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

export const GENERAL_TALENTS = {
  [TALENT.AMBIDEXTROUS]: {
    id: "AMBIDEXTROUS",
    name: "Ambidextrous",
    description: "",
    level1: "Level 1 description",
    level2: "Level 2 description",
    level3: "Level 3 description",
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

export const ALL_TALENTS = {
  ...KIN_TALENTS,
  ...CLASS_TALENTS,
  ...GENERAL_TALENTS,
}

export function getClassTalents(className: Profession) {
  return CLASS_TALENTS[className]
}

export function getTalent(name: TalentAll) {
  return ALL_TALENTS[name]
}
