import { Attribute, Skill, DiceTypes, CombatAction, DiceSides } from "@/types"
type BonusType = Attribute | Skill | DiceTypes | CombatAction | null

type ItemType = "armor" | "helmet" | "shield" | "weapon" | "other" | ""

type Weight = 0 | 0.5 | 1 | 2 | 10 /* -> can't be carried normally */

// TODO: Use this instead
export enum ITEM_WEIGHT {
  tiny = 0,
  light = 0.5,
  normal = 1,
  heavy = 2,
  massive = 10, // can't be carried normally
}

type SkillMod = { id: Skill; mod: number }

type BaseItem = {
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

  // Modifiers
  artifactDice?: DiceSides[]
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

export interface ItemOther extends BaseItem {
  type: "other" | ""
}

export enum WEAPON_CATEGORY {
  axe = "axe",
  blunt = "blunt",
  knife = "knife",
  polearm = "polearm",
  sword = "sword",
  unarmed = "unarmed",

  bow = "bow",
  crossbow = "crossbow",
  thrown = "thrown",
}

export interface ItemWeapon extends BaseItem {
  type: "weapon"
  // category?: WEAPON_CATEGORY
  category: WEAPON_CATEGORY
  damage: number
  range: Range
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

export type Item = ItemOther | ItemWeapon | ItemArmor | ItemShield | ItemHelmet
