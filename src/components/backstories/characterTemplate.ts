import characterTemplate, {
  TemplateItem,
} from "@/data/character_template/character_template"

import { Profession, ExtendedKinName } from "@/types.ts"
import { rollDice } from "@/dice"

function diceRollToValue(
  diceRoll: number,
  valueList: TemplateItem[]
): TemplateItem {
  return (
    valueList.find(
      (item) => diceRoll >= item.d_min && diceRoll <= item.d_max
    ) || { id: "foo", d_min: 0, d_max: 0 } // <- should never happen
  )
}

interface ProfessionRoll {
  id: Profession
  diceRoll: number
  result: TemplateItem
  [key: string]: number | TemplateItem | Profession
}

interface KinRoll {
  id: ExtendedKinName
  diceRoll: number
  result: TemplateItem
  [key: string]: number | TemplateItem | ExtendedKinName
}

function roll66(diceRoll: number | undefined, valueList: TemplateItem[]) {
  diceRoll = diceRoll || rollDice(66)
  const result = diceRollToValue(diceRoll, valueList)
  return {
    diceRoll,
    result,
    id: result ? result.id : "elf", // TODO: What is this? Refactor!
  }
}

export function rollProfession(diceRoll?: number): ProfessionRoll {
  return roll66(diceRoll, characterTemplate.PROFESSION_66) as ProfessionRoll
}

export function rollKin(diceRoll?: number): KinRoll {
  return roll66(diceRoll, characterTemplate.KIN_66) as KinRoll
}

export function rollTalent(professionId: string /*Profession*/) {
  const sides = professionId === "sorcerer" ? 8 : 6
  const diceRoll = rollDice(sides)
  const talentId =
    characterTemplate.PROFESSION_TALENTS[professionId as Profession][
      Math.round(diceRoll / 2) - 1
    ]
  return {
    diceRoll,
    id: talentId,
  }
}

export function rollAge(kin: any): number {
  // interval [kin.young - 2, kin.old + 10]
  return 18 // TODO: Implement
}
