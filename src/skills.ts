import { Attribute, Skill } from "@/types"
import { ATTRIBUTE, SKILL as S } from "@/keys.ts"

const UNSET = null
/*
Animal Handling ( EMPATHY )
Crafting ( STRENGTH )
Endurance ( STRENGTH )
Healing ( EMPATHY )
Insight ( WITS )
Lore ( WITS )
Manipulation ( EMPATHY )
Marksmanship ( AGILITY )
Melee ( STRENGTH )
Might ( STRENGTH )
Move ( AGILITY )
Performance ( EMPATHY )
Scouting ( WITS )
Sleight of Hand ( AGILITY )
Stealth ( AGILITY )
Survival ( WITS )
*/

export interface SkillObj {
  id: Skill
  attribute: Attribute
  rank: number | null
  name?: string
}

export interface SkillMap {
  [propType: string]: SkillObj
}

export const SKILLS: SkillMap = {
  [S.ANIMAL_HANDLING]: {
    id: S.ANIMAL_HANDLING,
    attribute: "empathy",
    rank: UNSET,
    // name: "animal handling",
  },
  [S.CRAFTING]: {
    id: S.CRAFTING,
    attribute: "strength",
    rank: UNSET,
    // name: "crafting",
  },
  [S.ENDURANCE]: {
    id: S.ENDURANCE,
    attribute: "strength",
    rank: UNSET,
    // name: "endurance",
  },
  [S.HEALING]: {
    id: S.HEALING,
    rank: UNSET,
    attribute: "empathy",
    // name: "healing",
  },
  [S.INSIGHT]: {
    id: S.INSIGHT,
    attribute: "wits",
    rank: UNSET,
    // name: "insight",
  },
  [S.LORE]: {
    id: S.LORE,
    attribute: "wits",
    rank: UNSET,
    // name: "lore",
  },
  [S.MANIPULATION]: {
    id: S.MANIPULATION,
    attribute: "empathy",
    rank: UNSET,
    // name: "manipulation",
  },
  [S.MARKSMANSHIP]: {
    id: S.MARKSMANSHIP,
    attribute: "agility",
    rank: UNSET,
    // name: "marksmanship",
  },
  [S.MELEE]: {
    id: S.MELEE,
    attribute: "strength",
    rank: UNSET,
    name: "melee",
  },
  [S.MIGHT]: {
    id: S.MIGHT,
    attribute: "strength",
    rank: UNSET,
    // name: "might",
  },
  [S.MOVE]: {
    id: S.MOVE,
    attribute: "agility",
    rank: UNSET,
    // name: "move",
  },
  [S.PERFORMANCE]: {
    id: S.PERFORMANCE,
    attribute: "empathy",
    rank: UNSET,
    // name: "performance",
  },
  [S.SCOUTING]: {
    id: S.SCOUTING,
    attribute: "wits",
    rank: UNSET,
    name: "scouting",
  },
  [S.SLEIGHT_OF_HAND]: {
    id: S.SLEIGHT_OF_HAND,
    attribute: "agility",
    rank: UNSET,
    // name: "sleight of hand",
  },
  [S.STEALTH]: {
    id: S.STEALTH,
    attribute: "agility",
    rank: UNSET,
    // name: "stealth",
  },
  [S.SURIVAL]: {
    id: S.SURIVAL,
    attribute: "wits",
    rank: UNSET,
  },
}

export function getSkills(): SkillMap {
  return JSON.parse(JSON.stringify(SKILLS))
}

export function iconFor(attribute: Attribute): string {
  const map = {
    [ATTRIBUTE.STRENGTH]: "strong",
    [ATTRIBUTE.AGILITY]: "acrobatic",
    [ATTRIBUTE.WITS]: "brain",
    [ATTRIBUTE.EMPATHY]: "shaking-hands",
  }
  return map[attribute] || "close-button"
}
