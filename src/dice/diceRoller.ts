import { IDiceConfig, IDiceResult, TDiceSides } from "./diceTypes"
import { getRandomIntInclusive } from "./diceUtil"

/** Return random number in range [1, diceSides] */
function rollDie(diceSides: number = 6): number {
  return getRandomIntInclusive(1, diceSides)
}

function rollDiceType(diceType: TDiceSides, seed?: number): number {
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

function roll(nbrDice: number, sides: TDiceSides) {
  let successes = 0
  let fails = 0
  let rollResult: number[] = []
  for (let i = 1; i <= nbrDice; i++) {
    let result = rollDiceType(sides)
    successes += sucesssMap[result] || 0
    fails += failMap[result] || 0
    rollResult.push(result)
  }
  return { successes, fails, rollResult }
}

export function rollDice(config: IDiceConfig): IDiceResult {
  const whiteResult = roll(config.white || 0, 6)
  const redResult = roll(config.red || 0, 6)
  const blackResult = roll(config.black || 0, 6)
  const greenResult = roll(config.green || 0, 8)
  const blueResult = roll(config.blue || 0, 10)
  const orangeResult = roll(config.orange || 0, 12)
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
