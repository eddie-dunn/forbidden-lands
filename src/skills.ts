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

export type SkillMap = {
  [key in Skill]: SkillObj
}

export const SKILLS: SkillMap = {
  "animal handling": {
    id: S.ANIMAL_HANDLING,
    attribute: "empathy",
    rank: UNSET,
    // name: "animal handling",
  },
  "crafting": {
    id: S.CRAFTING,
    attribute: "strength",
    rank: UNSET,
    // name: "crafting",
  },
  "endurance": {
    id: S.ENDURANCE,
    attribute: "strength",
    rank: UNSET,
    // name: "endurance",
  },
  "healing": {
    id: S.HEALING,
    rank: UNSET,
    attribute: "empathy",
    // name: "healing",
  },
  "insight": {
    id: S.INSIGHT,
    attribute: "wits",
    rank: UNSET,
    // name: "insight",
  },
  "lore": {
    id: S.LORE,
    attribute: "wits",
    rank: UNSET,
    // name: "lore",
  },
  "manipulation": {
    id: S.MANIPULATION,
    attribute: "empathy",
    rank: UNSET,
    // name: "manipulation",
  },
  "marksmanship": {
    id: S.MARKSMANSHIP,
    attribute: "agility",
    rank: UNSET,
    // name: "marksmanship",
  },
  "melee": {
    id: S.MELEE,
    attribute: "strength",
    rank: UNSET,
    name: "melee",
  },
  "might": {
    id: S.MIGHT,
    attribute: "strength",
    rank: UNSET,
    // name: "might",
  },
  "move": {
    id: S.MOVE,
    attribute: "agility",
    rank: UNSET,
    // name: "move",
  },
  "performance": {
    id: S.PERFORMANCE,
    attribute: "empathy",
    rank: UNSET,
    // name: "performance",
  },
  "scouting": {
    id: S.SCOUTING,
    attribute: "wits",
    rank: UNSET,
    name: "scouting",
  },
  "sleight of hand": {
    id: S.SLEIGHT_OF_HAND,
    attribute: "agility",
    rank: UNSET,
    // name: "sleight of hand",
  },
  "stealth": {
    id: S.STEALTH,
    attribute: "agility",
    rank: UNSET,
    // name: "stealth",
  },
  "survival": {
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
