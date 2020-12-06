import { CharData } from "src/data/character/characterData"
import { actionsFast, actionsSlow } from "src/data/combat/combatActions"
import {
  ICombatAction,
  ICombatActionFast,
  ICombatActionSlow,
} from "src/data/combat/typesCombat"

export function getFastActions({
  valid,
  charData,
}: {
  valid: boolean
  charData: CharData
}): ICombatActionFast[] {
  const test = valid ? (i: any) => !!i : (i: any) => !i
  return actionsFast.filter(
    (action) => test(action.prereqOk(charData)) && !action.hidden?.(charData)
  )
}

export function getSlowActions({
  valid,
  charData,
}: {
  valid: boolean
  charData: CharData
}): ICombatActionSlow[] {
  const test = valid ? (i: any) => !!i : (i: any) => !i
  return actionsSlow.filter(
    (action) => test(action.prereqOk(charData)) && !action.hidden?.(charData)
  )
}

export function getActions(
  type: "fast" | "slow",
  charData: CharData
): {
  valid: ICombatAction[]
  invalid: ICombatAction[]
} {
  switch (type) {
    case "fast":
      return {
        valid: actionsFast.filter(
          (action) => action.prereqOk(charData) && !action.hidden?.(charData)
        ),
        invalid: actionsFast.filter(
          (action) => !action.prereqOk(charData) && !action.hidden?.(charData)
        ),
      }

    case "slow":
      return {
        valid: actionsSlow.filter(
          (action) => action.prereqOk(charData) && !action.hidden?.(charData)
        ),
        invalid: actionsSlow.filter(
          (action) => !action.prereqOk(charData) && !action.hidden?.(charData)
        ),
      }
    default:
      throw Error(`Invalid type '${type}'`)
  }
}
