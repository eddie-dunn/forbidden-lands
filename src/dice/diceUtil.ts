import { IDiceConfig } from "./diceTypes"

export const maxTotal = (conf: IDiceConfig) => {
  const d6 =
    Number(conf.white || 0) + Number(conf.red || 0) + Number(conf.black || 0)
  const d8 = Number(conf.green || 0)
  const d10 = Number(conf.blue || 0)
  const d12 = Number(conf.orange || 0)
  return d6 + 2 * d8 + 3 * d10 + 4 * d12
}
export const maxPossible = maxTotal

// TODO: Use chance.js instead in order to be able to set seed?
// More on seeding: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min
}
