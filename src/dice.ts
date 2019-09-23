// TODO: Use chance.js instead in order to be able to set seed?
import { DiceSides } from "@/types"
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function rollDie(diceSides: number = 6): number {
  return getRandomIntInclusive(1, diceSides)
}

export function rollDice(
  diceType: DiceSides,
  seed: number | undefined = undefined
): number {
  if (diceType === 666) {
    return Number(String(rollDie(6)) + String(rollDie(6)) + String(rollDie(6)))
  } else if (diceType === 66) {
    return Number(String(rollDie(6)) + String(rollDie(6)))
  }
  return rollDie(diceType)
}
