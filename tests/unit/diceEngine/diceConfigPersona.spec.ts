import getDice from "@/dice/diceConfig"
import {
  IDiceConfigWithLog as IDiceConfig,
  IConfigSkill,
  IConfigAttribute,
} from "@/dice/diceTypes"
import * as T from "@/dice/translationKeys"
import { Bertil } from "../data/personas"
import { Attribute as TAttribute, Skill as TSkill } from "@/types"

describe(`${Bertil.name} the ${Bertil.profession}`, () => {
  const skill: TSkill = "sleight of hand"

  it(`has correct dice for attribute roll with bonus`, () => {
    const attribute: TAttribute = "empathy"
    const conf: IConfigAttribute = {
      type: "attribute",
      attributeType: attribute,
      charData: Bertil,
      bonus: 3,
    }
    const expected: IDiceConfig = {
      red: 3,
      white: Bertil.attributes[attribute],
      log: [
        { dice: "white", modifier: 2, reason: T.DICE_CONF_BASE_ATTRIBUTE },
        { dice: "red", modifier: 3, reason: T.DICE_CONF_BONUS_APPLIED },
      ],
    }
    expect(getDice(conf)).toStrictEqual(expected)
  })

  it(`has correct dice for skill roll '${skill}'`, () => {
    const conf: IConfigSkill = { type: "skill", skill, charData: Bertil }
    const expected: IDiceConfig = {
      red: 3,
      white: 4,
      log: [
        { dice: "white", modifier: 4, reason: T.DICE_CONF_BASE_ATTRIBUTE },
        { dice: "red", modifier: 3, reason: T.DICE_CONF_FROM_SKILL },
      ],
    }
    expect(getDice(conf)).toStrictEqual(expected)
  })

  it(`has correct dice for skill roll '${skill}' when damaged`, () => {
    const dmgBertil = {
      ...Bertil,
      attributeDmg: {
        ...Bertil.attributeDmg,
        agility: Bertil.attributes.agility! - 1, // only 1 point remains
      },
    }
    const expected: IDiceConfig = {
      red: 3,
      white: 1,
      log: [
        { dice: "white", modifier: 1, reason: T.DICE_CONF_BASE_ATTRIBUTE },
        { dice: "red", modifier: 3, reason: T.DICE_CONF_FROM_SKILL },
      ],
    }
    expect(
      getDice({ type: "skill", skill, charData: dmgBertil })
    ).toStrictEqual(expected)
  })
  // With item providing active bonus...
  // With item providing passive bonus...
  // With item providing skill-specific penalty...
  // With talent providing bonus...
})

// Test support for logging how dice are calculated
// Test support for items granting attribute bonus
// Test support for items granting skill bonus
