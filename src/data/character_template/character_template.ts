import CHILDHOOD from "./childhood"
import FORMATIVE_EVENTS from "./formative_events"
import { PROFESSION_TALENTS } from "@/talents"
import { Profession } from "@/types.ts"

export interface TemplateItem {
  readonly d_min: number
  readonly d_max: number
  readonly id: string
}

export const KIN_66: TemplateItem[] = [
  {
    d_min: 11,
    d_max: 22,
    id: "alderlander",
  },
  {
    d_min: 23,
    d_max: 31,
    id: "aslene",
  },
  {
    d_min: 32,
    d_max: 34,
    id: "ailander",
  },
  {
    d_min: 35,
    d_max: 41,
    id: "halfelf",
  },
  {
    d_min: 42,
    d_max: 44,
    id: "halfling",
  },
  {
    d_min: 45,
    d_max: 52,
    id: "goblin",
  },
  {
    d_min: 53,
    d_max: 56,
    id: "orc",
  },
  {
    d_min: 61,
    d_max: 62,
    id: "wolfkin",
  },
  {
    d_min: 63,
    d_max: 64,
    id: "dwarf",
  },
  {
    d_min: 65,
    d_max: 66,
    id: "elf",
  },
]

export const PROFESSION_66: TemplateItem[] = [
  {
    d_min: 11,
    d_max: 14,
    id: "druid",
  },
  {
    d_min: 15,
    d_max: 23,
    id: "fighter",
  },
  {
    d_min: 24,
    d_max: 33,
    id: "hunter",
  },
  {
    d_min: 34,
    d_max: 42,
    id: "minstrel",
  },
  {
    d_min: 43,
    d_max: 46,
    id: "peddler",
  },
  {
    d_min: 51,
    d_max: 54,
    id: "rider",
  },
  {
    d_min: 55,
    d_max: 62,
    id: "rogue",
  },
  {
    d_min: 63,
    d_max: 66,
    id: "sorcerer",
  },
]

export default {
  CHILDHOOD,
  FORMATIVE_EVENTS,
  KIN_66,
  PROFESSION_66,
  PROFESSION_TALENTS,
}
