import { ItemWeight } from "@/data/items/itemTypes"

export function coinWeight(nbrCoins: number): ItemWeight {
  if (nbrCoins >= 400) {
    return ItemWeight.HEAVY
  } else if (nbrCoins >= 200) {
    return ItemWeight.NORMAL
  } else if (nbrCoins >= 100) {
    return ItemWeight.LIGHT
  }
  return ItemWeight.TINY
}
