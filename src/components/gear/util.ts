import { Item, ITEM_TYPE, WEAPON_CATEGORY } from "@/data/items/itemTypes"

export function iconForType(type?: ITEM_TYPE) {
  switch (type) {
    case "armor":
      return "leather-armor"
    case "helmet":
      return "barbute"
    case "shield":
      return "shield"
    case "weapon":
      return "sword-brandish"
    default:
      return "swap-bag"
  }
}

export function iconFor(item?: Item) {
  if (!item) {
    return "swap-bag"
  }

  switch (item.type) {
    case "armor":
      return "leather-armor"
    case "helmet":
      return "barbute"
    case "shield":
      return "shield"
    case "weapon":
      switch (item.category) {
        case WEAPON_CATEGORY.axe:
          return "sharp-axe"

        case WEAPON_CATEGORY.blunt:
          return "flat-hammer"

        case WEAPON_CATEGORY.bow:
          return "bow-arrow"

        case WEAPON_CATEGORY.crossbow:
          return "crossbow"

        case WEAPON_CATEGORY.knife:
          return "bowie-knife"

        case WEAPON_CATEGORY.polearm:
          return "spear"

        case WEAPON_CATEGORY.sword:
          return "stiletto"

        case WEAPON_CATEGORY.thrown:
          return "thrown-spear"

        default:
          return "sword-brandish"
      }
    default:
      return "swap-bag"
  }
}

export function equippable(item: Item) {
  return ["armor", "helmet", "shield", "weapon"].includes(item.type)
}
