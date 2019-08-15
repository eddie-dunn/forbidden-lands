import characterTemplate, {
  TemplateItem,
} from "@/data/character_template/character_template"

import { Profession } from "@/types.ts"
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

function roll66(diceRoll: number | undefined, valueList: TemplateItem[]) {
  diceRoll = diceRoll || rollDice(66)
  const result = diceRollToValue(diceRoll, valueList)
  return {
    diceRoll,
    result,
    id: result ? result.id : "elf",
  }
}

export function rollProfession(diceRoll?: number) {
  return roll66(diceRoll, characterTemplate.PROFESSION_66)
}

export function rollKin(diceRoll?: number) {
  return roll66(diceRoll, characterTemplate.KIN_66)
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
