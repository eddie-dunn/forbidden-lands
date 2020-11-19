import { CharacterData } from "@/data/character/characterData"
import {
  Attribute as TAttribute,
  Skill as TSkill,
  DiceTypes as TDice,
} from "@/types"

export type TDiceColor = "white" | "red" | "black" | "green" | "blue" | "orange"

export type TDiceSides = 0 | 6 | 8 | 10 | 12 | 66 | 666 // 0 is no dice

export enum DICE_SIDES {
  "white" = 6,
  "red" = 6,
  "black" = 6,
  "green" = 8,
  "blue" = 10,
  "orange" = 12,
}

export enum DICE_TYPE {
  "white" = "white",
  "red" = "red",
  "black" = "black",
  "green" = "green",
  "blue" = "blue",
  "orange" = "orange",
}

export interface IConfigBase {
  type: string
  bonus?: number
}

interface IConfigGeneric extends IConfigBase {
  type: "generic"
}

export interface IConfigAttribute extends IConfigBase {
  type: "attribute"
  attributeType: TAttribute
  charData: CharacterData
}

export interface IConfigSkill extends IConfigBase {
  type: "skill"
  skill: TSkill
  charData: CharacterData
}

enum COMBAT_ACTION_REACTIVE {
  armor = "armor",
  dodge = "dodge",
  parry = "parry",
}
type TCombatAction =
  | "melee"
  | "ranged"
  | "disarm"
  | "grapple"
  | COMBAT_ACTION_REACTIVE

export interface IConfigCombat extends IConfigBase {
  type: "combat"
  action: TCombatAction
  charData: CharacterData
}

export type IDiceAction =
  | IConfigGeneric
  | IConfigAttribute
  | IConfigSkill
  | IConfigCombat

export interface IDiceConfigLogEntry {
  modifier: number // nbrDice
  dice: TDice
  reason?: string
  id: string
  rank?: number | string
  name?: string
}

export type TDiceConfigLog = IDiceConfigLogEntry[]
// `${modifier}${iconFor(dice)}: ${$t(reason)} ${$t(id)} ${rank} ${name}`

export interface IDiceConfig {
  // TODO: nbrWhite, nbrRed, nbrBlack etc?
  [DICE_TYPE.white]?: number | null
  [DICE_TYPE.red]?: number | null
  [DICE_TYPE.black]?: number | null
  [DICE_TYPE.green]?: number | null
  [DICE_TYPE.blue]?: number | null
  [DICE_TYPE.orange]?: number | null
}

export interface IDiceConfigWithLog extends IDiceConfig {
  log: IDiceConfigLogEntry[]
}

/** Contains number of successes and failures from a roll */
export interface IDiceResult {
  successes: number
  failWhite: number
  failBlack: number
  rollLog: {
    [DICE_TYPE.white]: number[]
    [DICE_TYPE.red]: number[]
    [DICE_TYPE.black]: number[]
    [DICE_TYPE.green]: number[]
    [DICE_TYPE.blue]: number[]
    [DICE_TYPE.orange]: number[]
  }
}
