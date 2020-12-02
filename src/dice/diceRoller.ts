import { CharData } from "@/data/character/characterData"
import {
  IDiceConfig,
  IDiceResult,
  TDiceSides,
  DICE_TYPE,
  TDiceColor,
  DICE_SIDES,
} from "./diceTypes"
import { getRandomIntInclusive } from "./diceUtil"

/** Return random number in range [1, diceSides] */
function rollDie(diceSides: number = 6): number {
  return getRandomIntInclusive(1, diceSides)
}

export function rollDiceType(diceType: TDiceSides, seed?: number): number {
  if (diceType === 666) {
    return Number(String(rollDie(6)) + String(rollDie(6)) + String(rollDie(6)))
  } else if (diceType === 66) {
    return Number(String(rollDie(6)) + String(rollDie(6)))
  }
  return rollDie(diceType)
}

const failMap: { [key: number]: number } = { 1: 1 }
const sucesssMap: { [key: number]: number } = {
  6: 1,
  7: 1,
  8: 2,
  9: 2,
  10: 3,
  11: 3,
  12: 4,
}

function roll(nbrDice: number | null | undefined, sides: TDiceSides) {
  let successes = 0
  let fails = 0
  const rollResult: number[] = []
  if (!nbrDice) {
    return { successes, fails, rollResult }
  }
  const lim = Math.abs(nbrDice)
  for (let i = 1; i <= lim; i++) {
    const result = rollDiceType(sides)
    successes += sucesssMap[result] || 0
    fails += failMap[result] || 0
    rollResult.push(result)
  }
  if (nbrDice < 0) {
    successes = -successes // negative nbr of dice inverts successes
  }
  return { successes, fails, rollResult }
}

export function rollDice(config: IDiceConfig): IDiceResult {
  const whiteResult = roll(config.white, 6)
  const redResult = roll(config.red, 6)
  const blackResult = roll(config.black, 6)
  const greenResult = roll(config.green, 8)
  const blueResult = roll(config.blue, 10)
  const orangeResult = roll(config.orange, 12)
  const failWhite = whiteResult.fails
  const failBlack = blackResult.fails
  const successes =
    whiteResult.successes +
    redResult.successes +
    blackResult.successes +
    greenResult.successes +
    blueResult.successes +
    orangeResult.successes
  return {
    successes,
    failWhite,
    failBlack,
    rollLog: {
      white: whiteResult.rollResult,
      red: redResult.rollResult,
      black: blackResult.rollResult,
      green: greenResult.rollResult,
      blue: blueResult.rollResult,
      orange: orangeResult.rollResult,
    },
  }
}

type TColorSidesMap = {
  [key in TDiceColor]: TDiceSides
}
const colorToSidesMap: TColorSidesMap = {
  [DICE_TYPE.white]: 6,
  [DICE_TYPE.black]: 6,
  [DICE_TYPE.red]: 6,
  [DICE_TYPE.green]: 8,
  [DICE_TYPE.blue]: 10,
  [DICE_TYPE.orange]: 12,
}

function pushResult(result: number[], color: TDiceColor) {
  return result.map((diceRoll) => {
    if (
      diceRoll >= 6 ||
      (diceRoll === 1 && ["white", "black"].includes(color))
    ) {
      return diceRoll
    }
    return rollDiceType(colorToSidesMap[color])
  })
}
export function pushDice(result: IDiceResult): IDiceResult {
  // FIXME: Implement
  // Re-roll all rerollable dice
  // const pushWhite = pushResult(result.rollLog.white, "white")
  // const pushRed = pushResult(result.rollLog.white, "red")
  // const pushBlack = pushResult(result.rollLog.white, "black")
  // const pushGreen = pushResult(result.rollLog.green, "green")
  // const failWhite = pushWhite.fails
  // const failBlack = blackResult.fails
  // const successes =
  //   whiteResult.successes +
  //   redResult.successes +
  //   blackResult.successes +
  //   greenResult.successes +
  //   blueResult.successes +
  //   orangeResult.successes
  // Append to log
  // Add successes
  // add failWhite
  // add failBlack
  return result
}

function nbrSwords(n?: number[]) {
  return n?.reduce((a, b) => a + sucesssMap[b] || 0, 0) || 0
}
function nbrSkulls(n?: number[]) {
  return n?.reduce((a, b) => a + (b === 1 ? 1 : 0), 0) || 0
}
function totalSwords(r: IRollResult) {
  return Object.values(r).reduce((a, b) => a + nbrSwords(b), 0)
}

interface IRollResult {
  white?: number[]
  red?: number[]
  black?: number[]
  green?: number[]
  blue?: number[]
  orange?: number[]
  [key: string]: number[] | undefined
}

/** Get dice rolls for a set number of dice */
function getDiceRolls(
  nbrDice: number | null | undefined,
  sides: TDiceSides
): number[] {
  const rollResult: number[] = []
  if (!nbrDice) {
    return rollResult
  }
  const lim = Math.abs(nbrDice)
  for (let i = 1; i <= lim; i++) {
    const result = rollDiceType(sides)
    rollResult.push(result)
  }
  return rollResult
}

export function getRollResult(conf: IDiceConfig): IRollResult {
  return {
    white: getDiceRolls(conf.white, DICE_SIDES.white),
    red: getDiceRolls(conf.red, DICE_SIDES.red),
    black: getDiceRolls(conf.black, DICE_SIDES.black),
    green: getDiceRolls(conf.green, DICE_SIDES.green),
    blue: getDiceRolls(conf.blue, DICE_SIDES.blue),
    orange: getDiceRolls(conf.orange, DICE_SIDES.orange),
  }
}

export function canPush(
  char: CharData,
  log: IDiceResult[],
  reactiveRoll?: boolean
): boolean {
  if (!!reactiveRoll) return false

  if (log.length === 1) return true
  if (char.kin === "dwarf" && char.willpower > 0) return true

  return false
}
