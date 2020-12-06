import { TItem } from "src/data/items/itemTypes"
import { ACTION_FAST, ACTION_SLOW } from "src/data/combat/typesCombat"
import { CharData } from "src/data/character/characterData"
import {
  isRangedWeapon,
  isSlashing,
  isStabbing,
} from "src/data/items/logic/weaponLogic"

export function combatItems(c: CharData): TItem[] {
  return c.gear.inventory.filter((i) => i.equipped || i.type === "other")
}

export function itemsFastAction(
  combatItems: TItem[],
  actionId: ACTION_FAST | ""
): TItem[] {
  switch (actionId) {
    case ACTION_FAST.parry:
      return combatItems.filter(
        (i) =>
          i.type === "shield" || (i.type === "weapon" && i.features.parrying)
      )

    case ACTION_FAST.disarm:
      return combatItems.filter((i) => !!(isStabbing(i) || isSlashing(i)))

    case ACTION_FAST.shove:
      return combatItems.filter(
        (i) =>
          !!(i.type === "shield" || (i.type === "weapon" && i.features.hook))
      )

    case ACTION_FAST.use_item:
      return combatItems

    default:
      return []
  }
}

export function itemsSlowAction(
  combatItems: TItem[],
  actionId: ACTION_SLOW | ""
): TItem[] {
  switch (actionId) {
    case ACTION_SLOW.slash:
      return combatItems.filter(isSlashing)

    case ACTION_SLOW.stab:
      return combatItems.filter(isStabbing)

    case ACTION_SLOW.charge:
      return combatItems.filter((i) => !!(isStabbing(i) || isSlashing(i)))

    case ACTION_SLOW.shoot:
      return combatItems.filter(
        (i) => i.type === "weapon" && isRangedWeapon(i) && i.bonus
      )

    default:
      return []
  }
}

export function getCombatItems(
  type: "fast" | "slow",
  items: TItem[],
  actionId: ACTION_FAST | ACTION_SLOW | ""
) {
  const _items = items.filter((i) => i.equipped || i.type === "other")
  switch (type) {
    case "fast":
      return itemsFastAction(_items, actionId as ACTION_FAST)
    case "slow":
      return itemsSlowAction(_items, actionId as ACTION_SLOW)
    default:
      throw Error(`Invalid type '${type}'`)
  }
}
