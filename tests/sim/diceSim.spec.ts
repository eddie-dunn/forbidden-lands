import { diceSimSuccesses } from "@/dice/diceSim.ts"

const SWORDS = "⚔"

/*
Dice  | chance of 1 success | pushed roll
1     | 17%                 | 29%
2     | 31%                 | 50%
3     | 42%                 | 64%
4     | 52%                 | 74%
5     | 60%                 | 81%
6     | 67%                 | 87%
7     | 72%                 | 90%
8     | 77%                 | 93%
9     | 81%                 | 95%
10    | 84%                 | 96%
*/

describe("sim vs Stack Overflow", () => {
  // https://math.stackexchange.com/a/3736750/802368
  const SOConf1 = { white: 1, green: 1, blue: 1, orange: 1 }
  it(`equals SO answer for ${JSON.stringify(SOConf1)}`, () => {
    const expected = 0.8915
    const result = diceSimSuccesses(SOConf1, 1)
    expect(result).toBeCloseTo(expected)
  })
  const SOConf2 = { white: 5, green: 7, blue: 11, orange: 13 }
  it(`equals SO answer for ${JSON.stringify(SOConf2)}`, () => {
    const expected = 0.6195
    const result = diceSimSuccesses(SOConf2, 30)
    expect(result).toBeCloseTo(expected)
  })
})

describe(`${diceSimSuccesses.name}, result >= 1 ${SWORDS} for`, () => {
  it(`1D6`, () => {
    const conf = { white: 1 }
    const expected = 1 / 6
    const result = diceSimSuccesses(conf)
    expect(result).toBeCloseTo(expected)
  })
  it(`3D6`, () => {
    const conf = { white: 1, red: 1, black: 1 }
    const expected = 0.42
    const result = diceSimSuccesses(conf)
    expect(result).toBeCloseTo(expected)
  })
  it(`10D6`, () => {
    const conf = { white: 3, red: 4, black: 3 }
    const expected = 0.84
    const result = diceSimSuccesses(conf)
    expect(result).toBeCloseTo(expected)
  })
  it(`1D8 -> 0.375`, () => {
    const conf = { green: 1 }
    const expected = 0.375
    const result = diceSimSuccesses(conf)
    expect(result).toBeCloseTo(expected)
  })
  it(`2D8 -> 0.61`, () => {
    const conf = { green: 2 }
    const expected = 0.61
    const result = diceSimSuccesses(conf)
    expect(result).toBeCloseTo(expected)
  })
  it(`3D8 -> 0.755`, () => {
    const conf = { green: 3 }
    const expected = 0.755
    const result = diceSimSuccesses(conf)
    expect(result).toBeCloseTo(expected)
  })
  it(`10D8 -> 0.991`, () => {
    const conf = { green: 10 }
    const expected = 0.991
    const result = diceSimSuccesses(conf)
    expect(result).toBeCloseTo(expected)
  })
})

describe(`${diceSimSuccesses.name}, result >= 2 ${SWORDS} for`, () => {
  const nbrSuccess = 2
  it(`1D8 -> 0.123`, () => {
    const conf = { green: 1 }
    const expected = 0.123 // 1/8
    const result = diceSimSuccesses(conf, nbrSuccess)
    expect(result).toBeCloseTo(expected)
  })
  it(`1D10 -> 0.298`, () => {
    const conf = { blue: 1 }
    const expected = 0.298
    const result = diceSimSuccesses(conf, nbrSuccess)
    expect(result).toBeCloseTo(expected)
  })
  it(`1D12 -> 0.415`, () => {
    const conf = { orange: 1 }
    const expected = 0.415
    const result = diceSimSuccesses(conf, nbrSuccess)
    expect(result).toBeCloseTo(expected)
  })
  it(`1D6 -> 0`, () => {
    const conf = { white: 1 }
    const expected = 0
    const result = diceSimSuccesses(conf, nbrSuccess, 10)
    expect(result).toBe(expected)
  })
  it(`3D6 -> 0.076`, () => {
    const conf = {
      white: 1,
      red: 1,
      black: 1,
    }
    const expected = 0.076
    const result = diceSimSuccesses(conf, nbrSuccess)
    expect(result).toBeCloseTo(expected)
  })
  it(`10D6 -> 0.514`, () => {
    const conf = {
      white: 3,
      red: 4,
      black: 3,
    }
    const expected = 0.514
    const result = diceSimSuccesses(conf, nbrSuccess)
    expect(result).toBeCloseTo(expected)
  })
})

describe(`${diceSimSuccesses.name}, 3 ${SWORDS}`, () => {
  const nbrSuccess = 3
  it(`8D6 -> 0.135`, () => {
    const conf = { white: 3, red: 3, black: 2 }
    const expected = 0.135
    const result = diceSimSuccesses(conf, nbrSuccess)
    expect(result).toBeCloseTo(expected, 2)
  })
  it(`1D10 -> 0.1`, () => {
    const conf = { blue: 1 }
    const expected = 1 / 10
    const result = diceSimSuccesses(conf, nbrSuccess)
    expect(result).toBeCloseTo(expected)
  })
})

describe(`${diceSimSuccesses.name}, 4 ${SWORDS}`, () => {
  const nbrSuccess = 4
  it(`1D12 -> 1/12`, () => {
    const conf = { orange: 1 }
    const expected = 1 / 12
    const result = diceSimSuccesses(conf, nbrSuccess)
    expect(result).toBeCloseTo(expected)
  })
})

describe(`${diceSimSuccesses.name}, simulated conf`, () => {
  const conf1 = {
    white: 5,
    red: 3,
    black: 2,
    green: 1,
  }
  describe(`${JSON.stringify(conf1)}`, () => {
    it(`one success`, () => {
      const expected = 0.9
      const result = diceSimSuccesses(conf1, 1)
      expect(result).toBeCloseTo(expected)
    })
    it(`two successes`, () => {
      const expected = 0.655
      const result = diceSimSuccesses(conf1, 2)
      expect(result).toBeCloseTo(expected)
    })
    it(`three successes`, () => {
      const expected = 0.375
      const result = diceSimSuccesses(conf1, 3)
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
      const result = diceSimSuccesses(conf2, 1)
      expect(result).toBeCloseTo(expected)
    })
    it(`two successes`, () => {
      const expected = 0.71
      const result = diceSimSuccesses(conf2, 2)
      expect(result).toBeCloseTo(expected)
    })
    it(`three successes`, () => {
      const expected = 0.5
      const result = diceSimSuccesses(conf2, 3)
      expect(result).toBeCloseTo(expected)
    })
  })
})

describe(`${diceSimSuccesses.name}, degenerate cases`, () => {
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
    const result = diceSimSuccesses(conf, maxTotal + 1)
    expect(result).toBe(expected)
  })
  it(`zero dice`, () => {
    const conf = { black: 0 }
    const expected = 0
    const result = diceSimSuccesses(conf, 1)
    expect(result).toBe(expected)
  })
  it(`negative dice`, () => {
    const conf = { white: -1 }
    const expected = 0
    const result = diceSimSuccesses(conf, 1)
    expect(result).toBe(expected)
  })
  it(`negative nbr successes`, () => {
    const conf = { white: 1 }
    const expected = 0
    const result = diceSimSuccesses(conf, -1)
    expect(result).toBe(expected)
  })
})
