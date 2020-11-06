import { IDiceConfig } from "./diceTypes"
import { maxTotal } from "./diceUtil"
import { rollDice } from "./diceRoller"

export function diceSimSuccesses(
  config: IDiceConfig,
  leastExpectedNbrSucceses = 1,
  loops = 100000
): number {
  if (
    leastExpectedNbrSucceses < 0 ||
    leastExpectedNbrSucceses > maxTotal(config)
  ) {
    return 0 // early exit for degenerate case
    // throw new Error(
    //   `Least expected nbr of successes (${leastExpectedNbrSucceses}) > max total (${maxTotal(
    //     config
    //   )})`
    // )
  }

  let successes = 0
  for (let i = 0; i <= loops; i++) {
    const result = rollDice(config)
    successes += result.successes >= leastExpectedNbrSucceses ? 1 : 0
  }
  return successes / loops
}
