import { ItemWeapon, TItem, WEAPON_CATEGORY } from "src/data/items/itemTypes"

export const isSlashing = (i: any | ItemWeapon) =>
  !!(i?.features?.blunt || i?.features?.edged)

export const isStabbing = (i: any | ItemWeapon) => !!i?.features?.pointed

export function isRangedWeapon(item: TItem): boolean {
  return (
    item.type === "weapon" &&
    Boolean(
      item.category === WEAPON_CATEGORY.bow ||
        item.category === WEAPON_CATEGORY.crossbow ||
        item.category === WEAPON_CATEGORY.thrown
    )
  )
}

export function isMeleeWeapon(item: TItem): boolean {
  return item.type === "weapon" && !isRangedWeapon(item)
}
