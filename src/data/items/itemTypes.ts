import { Attribute, Skill, DiceTypes, CombatAction } from "@/types"
type BonusType = Attribute | Skill | DiceTypes | CombatAction | null

type ItemType = "armor" | "helmet" | "shield" | "weapon" | "other" | ""

type Weight = 0 | 0.5 | 1 | 2 | 10 /* -> can't be carried normally */

type SkillMod = { id: Skill; mod: number }

export type BaseItem = {
  // Required
  bonus: number
  bonusType: BonusType // rename to dice type?
  id: string
  name: string
  type: ItemType
  weight: Weight

  // Inventory management
  equipped?: boolean
  selected?: boolean

  // Optional
  comment?: string
  cost?: number
  features?: {}

  // Modifiers
  skillMods?: SkillMod[]
  attributeMods?: { id: Attribute; mod: number }
  actionMods?: { id: CombatAction; mod: number }
}

export enum Range {
  "armslength",
  "near",
  "short",
  "long",
}

export interface ItemWeapon extends BaseItem {
  damage: number
  range: Range
  type: "weapon"
  features: {
    blunt?: boolean
    pointed?: boolean
    edged?: boolean
    parrying?: boolean
    hook?: boolean
    slow_loading?: boolean // crossbows
  }
  grip: 1 | 2
  skill: Skill
}

export interface ItemArmor extends BaseItem {
  type: "armor"
  bonusType: "black"
}

export interface ItemShield extends BaseItem {
  type: "shield"
  bonusType: "black"
}

export interface ItemHelmet extends BaseItem {
  type: "helmet"
  bonusType: "black"
}

export type Item = BaseItem | ItemWeapon | ItemArmor | ItemShield | ItemHelmet
