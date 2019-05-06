import { ATTRIBUTE, CLASS as C, SKILL } from "@/keys.ts"
import { Attribute, DiceSides, Profession, Skill } from "@/types.ts"

import { GearDescriptionKeys } from "@/locales/localetypes"

export interface Resource {
  food: DiceSides
  water: DiceSides
  arrows: DiceSides
  torches: DiceSides
  silver: DiceSides
}
export interface StartResource {
  food: DiceSides
  water: DiceSides
  arrows?: DiceSides
  silver: DiceSides
}

export interface Class {
  id: Profession
  key_attribute: Attribute
  skills: Skill[]
  nicknames?: string[]
  gear_description: GearDescriptionKeys
  starting_resources: StartResource
}

type ClassList = { [key in Profession]: Class }
// interface KinList {
//   [key: string]: Kin;
// }
export const CLASS: ClassList = {
  druid: {
    id: C.DRUID,
    key_attribute: ATTRIBUTE.WITS,
    skills: [
      SKILL.ENDURANCE,
      SKILL.SURIVAL,
      SKILL.INSIGHT,
      SKILL.HEALING,
      SKILL.ANIMAL_HANDLING,
    ],
    starting_resources: {
      food: 8,
      water: 8,
      silver: 6,
    },
    gear_description: "gear_druid",
    // TYPICAL NICKNAMES: Windwalker, Raven Claw, Wood Dweller
  },
  fighter: {
    id: C.FIGHTER,
    key_attribute: ATTRIBUTE.STRENGTH,
    skills: [
      SKILL.CRAFTING,
      SKILL.ENDURANCE,
      SKILL.MELEE,
      SKILL.MIGHT,
      SKILL.MOVE,
    ],
    starting_resources: {
      food: 8,
      water: 6,
      silver: 6,
    },
    gear_description: "gear_fighter",
    // TYPICAL NICKNAMES: Gravemaker, Grimjaw, Ironboot
  },
  hunter: {
    id: C.HUNTER,
    key_attribute: ATTRIBUTE.AGILITY,
    skills: [
      SKILL.MARKSMANSHIP,
      SKILL.MOVE,
      SKILL.SCOUTING,
      SKILL.STEALTH,
      SKILL.SURIVAL,
    ],
    starting_resources: {
      food: 8,
      water: 8,
      silver: 6,
      arrows: 10,
    },
    gear_description: "gear_hunter",
    // TYPICAL NICKNAMES: Wolfkiller, Pathfinder, Red Fox
  },
  minstrel: {
    id: C.MINSTREL,
    key_attribute: ATTRIBUTE.EMPATHY,
    skills: [
      SKILL.LORE,
      SKILL.INSIGHT,
      SKILL.MANIPULATION,
      SKILL.PERFORMANCE,
      SKILL.HEALING,
    ],
    starting_resources: {
      food: 8,
      water: 6,
      silver: 8,
    },
    gear_description: "gear_minstrel",
    // TYPICAL NICKNAMES: Silvertounge, Beguiler, Madrigal
  },
  peddler: {
    id: C.PEDDLER,
    key_attribute: ATTRIBUTE.EMPATHY,
    skills: [
      SKILL.CRAFTING,
      SKILL.SLEIGHT_OF_HAND,
      SKILL.SCOUTING,
      SKILL.INSIGHT,
      SKILL.MANIPULATION,
    ],
    starting_resources: {
      food: 8,
      water: 8,
      silver: 12,
    },
    gear_description: "gear_peddler",
    // TYPICAL NICKNAMES: Goldtooth, Silversmile, The Honest
  },
  rider: {
    id: C.RIDER,
    key_attribute: ATTRIBUTE.AGILITY,
    skills: [
      SKILL.ENDURANCE,
      SKILL.MELEE,
      SKILL.MARKSMANSHIP,
      SKILL.SURIVAL,
      SKILL.ANIMAL_HANDLING,
    ],
    starting_resources: {
      food: 8,
      water: 8,
      silver: 6,
      arrows: 10,
    },
    gear_description: "gear_rider",
    // TYPICAL NICKNAMES: Spearhawk, Black Mane , Windrider
  },
  rogue: {
    id: C.ROGUE,
    key_attribute: ATTRIBUTE.AGILITY,
    skills: [
      SKILL.MELEE,
      SKILL.STEALTH,
      SKILL.SLEIGHT_OF_HAND,
      SKILL.MOVE,
      SKILL.MANIPULATION,
    ],
    starting_resources: {
      food: 6,
      water: 6,
      silver: 10,
    },
    gear_description: "gear_rogue",
    // TYPICAL NICKNAMES: Half-Finger, Redeye, The Rat
  },
  sorcerer: {
    id: C.SORCERER,
    key_attribute: ATTRIBUTE.WITS,
    skills: [
      SKILL.CRAFTING,
      SKILL.SLEIGHT_OF_HAND,
      SKILL.LORE,
      SKILL.INSIGHT,
      SKILL.MANIPULATION,
    ],
    starting_resources: {
      food: 6,
      water: 8,
      silver: 8,
    },
    gear_description: "gear_sorcerer",
    // TYPICAL NICKNAMES: Rootheart, Greycape, The Wise
  },
}

export function getSkillMax(skillId: Skill, professionId: Profession): number {
  // if (CLASS[professionId].skills.filter(skill => skill === skillId)) return 3;
  if (isClassSkill(skillId, professionId)) return 3
  return 1
}

export function isClassSkill(
  skillId: Skill,
  professionId: Profession
): boolean {
  if (!professionId) return false
  return CLASS[professionId].skills.indexOf(skillId) !== -1
}

export default {
  CLASS,
  getSkillMax,
  isClassSkill,
}
