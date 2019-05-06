import { $t } from "@/i18n"
import { Attribute } from "@/types"
import { SKILL as S } from "@/keys.ts"

const UNSET = null
/*
Might ( STRENGTH )
Endurance ( STRENGTH )
Melee ( STRENGTH )
Crafting ( STRENGTH )
Stealth ( AGILITY )
Sleight of Hand ( AGILITY )
Move ( AGILITY )
Marksmanship ( AGILITY )
Scouting ( WITS )
Lore ( WITS )
Survival ( WITS )
Insight ( WITS )
Manipulation ( EMPATHY )
Performance ( EMPATHY )
Healing ( EMPATHY )
Animal Handling ( EMPATHY )
*/

export const SKILLS = {
  [S.ANIMAL_HANDLING]: {
    id: S.ANIMAL_HANDLING,
    name: "animal handling",
    attribute: "",
    rank: UNSET,
    description: "",
  },
  [S.CRAFTING]: {
    id: S.CRAFTING,
    name: "crafting",
    rank: UNSET,
  },
  [S.ENDURANCE]: {
    id: S.ENDURANCE,
    name: "endurance",
    rank: UNSET,
  },
  [S.HEALING]: {
    id: S.HEALING,
    name: "healing",
    rank: UNSET,
  },
  [S.INSIGHT]: {
    id: S.INSIGHT,
    name: "insight",
    rank: UNSET,
  },
  [S.LORE]: {
    id: S.LORE,
    name: "lore",
    rank: UNSET,
  },
  [S.MANIPULATION]: {
    id: S.MANIPULATION,
    name: "manipulation",
    rank: UNSET,
  },
  [S.MARKSMANSHIP]: {
    id: S.MARKSMANSHIP,
    name: "marksmanship",
    rank: UNSET,
  },
  [S.MELEE]: {
    id: S.MELEE,
    name: "melee",
    rank: UNSET,
  },
  [S.MIGHT]: {
    id: S.MIGHT,
    name: "might",
    rank: UNSET,
  },
  [S.MOVE]: {
    id: S.MOVE,
    name: "move",
    rank: UNSET,
  },
  [S.PERFORMANCE]: {
    id: S.PERFORMANCE,
    name: "performance",
    rank: UNSET,
  },
  [S.SCOUTING]: {
    id: S.SCOUTING,
    name: "scouting",
    rank: UNSET,
  },
  [S.SLEIGHT_OF_HAND]: {
    id: S.SLEIGHT_OF_HAND,
    name: "sleight of hand",
    rank: UNSET,
  },
  [S.STEALTH]: {
    id: S.STEALTH,
    name: "stealth",
    rank: UNSET,
  },
  [S.SURIVAL]: {
    id: S.SURIVAL,
    name: $t("survival"),
    rank: UNSET,
  },
}

export function getSkills() {
  return JSON.parse(JSON.stringify(SKILLS))
}
