import { TSkillId } from "@/types"
import { CharData } from "@/data/character/characterData"
import { ItemRange } from "src/data/items/itemTypes"

export enum ACTION_SLOW {
  slash = "action-slash",
  stab = "action-stab",
  unarmed_attack = "action-unarmed_attack",
  grapple = "action-grapple",
  break_free = "action-break_free",
  shoot = "action-shoot",
  persuade = "action-persuade",
  taunt = "action-taunt",
  cast_spell = "action-cast",
  flee = "action-flee",
  crawl = "action-crawl",
  charge = "action-charge",
  none = "",
}

export enum ACTION_FAST {
  dodge = "action-dodge",
  parry = "action-parry",
  draw_weapon = "action-draw_weapon",
  swing_weapon = "action-swing_weapon",
  get_up = "action-get_up",
  shove = "action-shove",
  disarm = "action-disarm",
  feint = "action-feint",
  run = "action-run",
  retreat = "action-retreat",
  grapple_attack = "action-grapple_attack",
  ready_weapon = "action-ready_weapon",
  aim = "action-aim",
  power_word = "action-power_word",
  use_item = "action-use_item",
  none = "",
}

export type ACTION_ALL = ACTION_FAST | ACTION_SLOW | ""

export interface ICombatState {
  fastActionPerformed: boolean
  slowActionPerformed: boolean
  prone: boolean
  grappled: boolean
  grappling: boolean
  opponent: "monster" | "humanoid"
  targetDistance: ItemRange
}

export interface ICombatAction {
  id: ACTION_ALL
  skill: TSkillId | null // skillId used to perform action
  prerequisite: (c: CharData) => string
  prereqOk: (c: CharData, state?: ICombatState) => boolean
  hidden?: (c: CharData) => boolean
  name?: string // translated string
}

export interface ICombatActionFast extends ICombatAction {
  id: ACTION_FAST
}

export interface ICombatActionSlow extends ICombatAction {
  id: ACTION_SLOW
}
