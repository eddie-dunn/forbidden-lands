/*
Links
https://math.stackexchange.com/a/3745300/802368
*/
import { IDiceConfig } from "./diceTypes"
import { maxTotal as maxPossible } from "./diceUtil"

const count = (s: 6 | 8 | 10 | 12, c: IDiceConfig): number =>
  ({
    6: (c.white || 0) + (c.red || 0) + (c.black || 0),
    8: c.green || 0,
    10: c.blue || 0,
    12: c.orange || 0,
  }[s])

/** Return convolution of two pmf, starting at zero */
function conv(p1: number[], p2: number[]): number[] {
  const n1 = p1.length
  const n2 = p2.length
  const resLength = n1 + n2 - 1
  let res = []
  for (let i = 0; i <= resLength; i++) {
    let ac = 0
    res[i] = 0
    for (let j1 = 0; j1 <= p1.length; j1++) {
      let j2 = i - j1
      if (j2 >= 0 && j2 < p2.length) {
        ac += (p2[j2] || 0) * (p1[j1] || 0)
      }
    }
    res[i] = ac
  }
  return res
}

function compute(k6: number, k8: number, k10: number, k12: number): number[] {
  const p6 = [5 / 6.0, 1 / 6.0]
  const p8 = [5 / 8.0, 2 / 8.0, 1 / 8.0]
  const p10 = [5 / 10.0, 2 / 10.0, 2 / 10.0, 1 / 10.0]
  const p12 = [5 / 12.0, 2 / 12.0, 2 / 12.0, 2 / 12.0, 1 / 12.0]
  let p = [1]
  for (let i = 0; i < k6; i++) {
    p = conv(p, p6)
  }
  for (let i = 0; i < k8; i++) {
    p = conv(p, p8)
  }
  for (let i = 0; i < k10; i++) {
    p = conv(p, p10)
  }
  for (let i = 0; i < k12; i++) {
    p = conv(p, p12)
  }
  return p
}

/** Calculate the probability of getting >= n successes, given p */
function probgt(p: number[], n: number): number {
  return p.slice(n).reduce((prevN, currentN) => prevN + currentN)
}

/** Calculate maxium possible successes given a dice config */
export const maxPossible2 = (
  d6: number,
  d8: number,
  d10: number,
  d12: number
) => d6 + 2 * d8 + 3 * d10 + 4 * d12

/** Calculate the probability of getting minNbrSuccess with d6, d8, d10, d12 */
export function prob(c: IDiceConfig, minNbrSuccess: number): number {
  if (minNbrSuccess > maxPossible(c)) return 0

  const [d6, d8, d10, d12] = [
    count(6, c),
    count(8, c),
    count(10, c),
    count(12, c),
  ]

  const p = compute(d6, d8, d10, d12)
  return probgt(p, minNbrSuccess)
}
