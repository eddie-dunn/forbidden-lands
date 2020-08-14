import { prob } from "@/dice/diceProbability.ts"
import { diceSimSuccesses } from "@/dice/diceSim.ts"

const SWORDS = "⚔"

describe(`d6, at least`, () => {
  const nbrSuccess = 1
  it(`${nbrSuccess}${SWORDS} for 1d6`, () => {
    const diceConf = { white: 1 }
    const expected = 0.167
    const result = prob(diceConf, nbrSuccess)
    expect(result).toBeCloseTo(expected)
  })
  it(`${nbrSuccess}${SWORDS} for 2d6`, () => {
    const diceConf = { white: 2 }
    const expected = 0.306
    const result = prob(diceConf, nbrSuccess)
    expect(result).toBeCloseTo(expected)
  })
  it(`${nbrSuccess}${SWORDS} for 3d6`, () => {
    const diceConf = { white: 3 }
    const expected = 0.421
    const result = prob(diceConf, nbrSuccess)
    expect(result).toBeCloseTo(expected)
  })
  it(`${nbrSuccess}${SWORDS} for 10d6`, () => {
    const diceConf = { white: 10 }
    const expected = 0.838
    const result = prob(diceConf, nbrSuccess)
    expect(result).toBeCloseTo(expected)
  })

  const minSuccess2 = 2
  it(`${minSuccess2}${SWORDS} for 2d6`, () => {
    const diceConf = { white: 2 }
    const expected = 0.02778
    const result = prob(diceConf, minSuccess2)
    expect(result).toBeCloseTo(expected)
  })

  it(`${minSuccess2}${SWORDS} for 3d6`, () => {
    const diceConf = { white: 1, red: 1, black: 1 }
    const expected = 0.07407
    const result = prob(diceConf, minSuccess2)
    expect(result).toBeCloseTo(expected)
  })

  it(`${minSuccess2}${SWORDS} for 10d6`, () => {
    const diceConf = { white: 3, red: 4, black: 3 }
    const expected = 0.51548
    const result = prob(diceConf, minSuccess2)
    expect(result).toBeCloseTo(expected)
  })

  const minSuccess3 = 3
  it(`${minSuccess3}${SWORDS} for 10d6`, () => {
    const diceConf = { white: 3, red: 4, black: 3 }
    const expected = 0.225
    const result = prob(diceConf, minSuccess3)
    expect(result).toBeCloseTo(expected)
  })
})

describe(`simulated conf`, () => {
  const SOConf = { white: 5, green: 7, blue: 11, orange: 13 }
  describe(`${JSON.stringify(SOConf)}`, () => {
    it(`${30}${SWORDS}`, () => {
      const expected = 0.6195
      const result = prob(SOConf, 30)
      expect(result).toBeCloseTo(expected)
    })
  })

  const SOConf2 = { white: 1, green: 1, blue: 1, orange: 1 }
  describe(`${JSON.stringify(SOConf)}`, () => {
    it("is equal to SO answer", () => {
      // https://math.stackexchange.com/a/3736750/802368
      const expected = 0.8914930555555557
      const result = prob(SOConf2, 1)
      expect(result).toBeCloseTo(expected)
    })
  })

  const conf1 = {
    white: 5,
    red: 3,
    black: 2,
    green: 1,
  }
  describe(`${JSON.stringify(conf1)}`, () => {
    it(`one success`, () => {
      const expected = 0.9
      const result = prob(conf1, 1)
      expect(result).toBeCloseTo(expected)
    })
    it(`two successes`, () => {
      const expected = 0.655
      const result = prob(conf1, 2)
      expect(result).toBeCloseTo(expected)
    })
    it(`three successes`, () => {
      const expected = 0.375
      const result = prob(conf1, 3)
      expect(result).toBeCloseTo(expected)
    })
  })

  const conf2 = {
    white: 2,
    red: 2,
    black: 1,
    green: 1,
    orange: 1,
  }
  describe(`${JSON.stringify(conf2)}`, () => {
    it(`one success`, () => {
      const expected = 0.895
      const result = prob(conf2, 1)
      expect(result).toBeCloseTo(expected)
    })
    it(`two successes`, () => {
      const expected = 0.71
      const result = prob(conf2, 2)
      expect(result).toBeCloseTo(expected)
    })
    it(`three successes`, () => {
      const expected = 0.5
      const result = prob(conf2, 3)
      expect(result).toBeCloseTo(expected)
    })
  })
})

describe(`degenerate cases`, () => {
  it(`more successes than possible`, () => {
    const conf = {
      white: 1, // 1 success
      red: 1, // 1 success
      black: 1, // 1 success
      green: 1, // 2 success
      blue: 1, // 3 success
      orange: 1, // 4 success
    } // Total: 12
    const maxTotal = 12
    const expected = 0
    const simResult = diceSimSuccesses(conf, maxTotal + 1)
    const result = prob(conf, maxTotal + 1)
    expect(result).toBe(expected)
    expect(result).toBe(simResult)
  })
  it(`zero dice`, () => {
    const conf = { black: 0 }
    const expected = 0
    const result = prob(conf, 1)
    expect(result).toBe(expected)
  })
  it(`negative dice`, () => {
    const conf = { white: -1 }
    const expected = 0
    const result = prob(conf, 1)
    expect(result).toBe(expected)
  })
  it(`negative nbr successes`, () => {
    const conf = { white: 1 }
    const expected = 0
    const result = prob(conf, -1)
    expect(result).toBe(expected)
  })
})
