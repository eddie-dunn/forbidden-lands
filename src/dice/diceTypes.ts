import { CharacterData } from "@/characterData"
import {
  Attribute as TAttribute,
  Skill as TSkill,
  DiceTypes as TDice,
} from "@/types"

type DiceColor = "white" | "red" | "black" | "green" | "blue" | "orange"

export type TDiceSides = 0 | 6 | 8 | 10 | 12 | 66 | 666 // 0 is no dice

export enum Dice {
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

export interface IConfigCombat extends IConfigBase {
  type: "combat"
  action:
    | "armor"
    | "disarm"
    | "dodge"
    | "grapple"
    | "melee"
    | "parry"
    | "ranged"
  charData: CharacterData
}

export type IDiceAction =
  | IConfigGeneric
  | IConfigAttribute
  | IConfigSkill
  | IConfigCombat

export interface IDiceConfigLogEntry {
  dice: TDice
  modifier: number
  reason: string
}

export interface IDiceConfig {
  [Dice.white]?: number | null
  [Dice.red]?: number | null
  [Dice.black]?: number | null
  [Dice.green]?: number | null
  [Dice.blue]?: number | null
  [Dice.orange]?: number | null
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
    [Dice.white]: number[]
    [Dice.red]: number[]
    [Dice.black]: number[]
    [Dice.green]: number[]
    [Dice.blue]: number[]
    [Dice.orange]: number[]
  }
}
