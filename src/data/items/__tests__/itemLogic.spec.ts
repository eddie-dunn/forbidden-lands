import { ItemWeight } from "@/data/items/itemTypes"
import { coinWeight } from "@/data/items/itemLogic"

describe("coinWeight", () => {
  it("returns correct weight for <100 coins", () => {
    expect(coinWeight(50)).toEqual(ItemWeight.TINY)
  })
  it("returns correct weight for [100-200) coins", () => {
    expect(coinWeight(150)).toEqual(ItemWeight.LIGHT)
  })
  it("returns correct weight for [200-400) coins", () => {
    expect(coinWeight(250)).toEqual(ItemWeight.NORMAL)
  })
  it("returns correct weight for >= 400 coins", () => {
    expect(coinWeight(500)).toEqual(ItemWeight.HEAVY)
  })
})
