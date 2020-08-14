import { rollDice } from "@/dice/diceRoller"

describe(`${rollDice.name}`, () => {
  it(`no dice`, () => {
    const conf = {}
    const expected = {
      successes: 0,
      failBlack: 0,
      failWhite: 0,
      rollLog: {
        black: [],
        blue: [],
        green: [],
        orange: [],
        red: [],
        white: [],
      },
    }
    const result = rollDice(conf)
    expect(result).toStrictEqual(expected)
  })
  // TODO: Add more tests if seeding RNG is enabled
})
