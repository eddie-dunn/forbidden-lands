import getDice from "@/dice/diceConfig"
import {
  IDiceConfigWithLog as IDiceConfig,
  IConfigSkill,
  IConfigAttribute,
} from "@/dice/diceTypes"
import * as T from "@/dice/translationKeys"
import { SKILLS } from "@/skills.ts"
import {
  CharacterData,
  getNewCharacterData,
} from "@/data/character/characterData"

describe(`${getDice.name} generic`, () => {
  it("returns a blank config", () => {
    expect(getDice({ type: "generic" })).toStrictEqual({ log: [] })
  })
})

describe(`${getDice.name} attribute`, () => {
  it("handles strength", () => {
    const char: CharacterData = getNewCharacterData()
    char.attributes.strength = 5
    char.attributeDmg.strength = 3
    const conf: IConfigAttribute = {
      type: "attribute",
      charData: char,
      attributeType: "strength",
    }
    const expected: IDiceConfig = {
      white: 2,
      log: [
        {
          id: conf.attributeType,
          dice: "white",
          modifier: 2,
          rank: 2,
          reason: T.DICE_CONF_BASE_ATTRIBUTE,
        },
      ],
    }
    expect(getDice(conf)).toStrictEqual(expected)
  })
  it("handles agility", () => {
    const char: CharacterData = getNewCharacterData()
    char.attributes.agility = 1
    char.attributeDmg.agility = 3

    const conf: IConfigAttribute = {
      type: "attribute",
      attributeType: "agility",
      charData: char,
    }
    const expected: IDiceConfig = {
      log: [
        {
          id: conf.attributeType,
          dice: "white",
          modifier: 0,
          rank: 0,
          reason: T.DICE_CONF_BASE_ATTRIBUTE,
        },
      ],
    }
    expect(getDice(conf)).toStrictEqual(expected)
  })
  it("handles intelligence", () => {
    const char: CharacterData = getNewCharacterData()
    char.attributes.wits = 5
    char.attributeDmg.wits = 0
    const conf: IConfigAttribute = {
      type: "attribute",
      attributeType: "wits",
      charData: char,
    }
    const expected: IDiceConfig = {
      white: 5,
      log: [
        {
          id: conf.attributeType,
          dice: "white",
          modifier: 5,
          rank: 5,
          reason: T.DICE_CONF_BASE_ATTRIBUTE,
        },
      ],
    }
    expect(getDice(conf)).toStrictEqual(expected)
  })
  it("handles empathy", () => {
    const char: CharacterData = getNewCharacterData()
    char.attributes.empathy = 4
    char.attributeDmg.empathy = 3
    const conf: IConfigAttribute = {
      type: "attribute",
      attributeType: "empathy",
      charData: char,
    }
    const expected: IDiceConfig = {
      white: 1,
      log: [
        {
          id: conf.attributeType,
          dice: "white",
          modifier: 1,
          rank: 1,
          reason: T.DICE_CONF_BASE_ATTRIBUTE,
        },
      ],
    }
    expect(getDice(conf)).toStrictEqual(expected)
  })
})

describe(`${getDice.name} skill`, () => {
  const str = 3
  const agi = 4
  const wit = 5
  const emp = 6
  const charData: CharacterData = getNewCharacterData()
  charData.attributes.strength = str
  charData.attributes.agility = agi
  charData.attributes.wits = wit
  charData.attributes.empathy = emp

  it("handles basic agility based skill roll", () => {
    const config: IConfigSkill = { type: "skill", charData, skill: "move" }
    const expected: IDiceConfig = {
      white: agi,
      log: [
        {
          id: "agility",
          dice: "white",
          modifier: agi,
          reason: T.DICE_CONF_BASE_ATTRIBUTE,
          rank: 4,
        },
        {
          id: "move",
          dice: "red",
          modifier: 0,
          reason: "DICE_CONF_FROM_SKILL",
          rank: 0,
        },
      ],
    }
    expect(getDice(config)).toStrictEqual(expected)
  })
  it("handles basic str based skill roll", () => {
    const skill = "melee"
    const skillRank = 2
    charData.skills[skill] = { ...SKILLS[skill], rank: skillRank }
    const config: IConfigSkill = { type: "skill", charData, skill }
    expect(getDice(config)).toStrictEqual({
      white: str,
      red: skillRank,
      log: [
        {
          dice: "white",
          modifier: str,
          reason: T.DICE_CONF_BASE_ATTRIBUTE,
          rank: str,
          id: "strength",
        },
        {
          dice: "red",
          modifier: skillRank,
          reason: "DICE_CONF_FROM_SKILL",
          id: "melee",
          rank: skillRank,
        },
      ],
    })
  })

  it("skill roll with bonus applied", () => {
    const bonus = 2
    const skillConfig: IConfigSkill = {
      type: "skill",
      skill: "insight",
      bonus,
      charData,
    }
    expect(getDice(skillConfig)).toStrictEqual({
      white: wit,
      red: bonus,
      log: [
        {
          dice: "white",
          modifier: wit,
          reason: T.DICE_CONF_BASE_ATTRIBUTE,
          id: "wits",
          rank: wit,
        },
        {
          dice: "red",
          modifier: 0,
          reason: T.DICE_CONF_FROM_SKILL,
          id: "insight",
          rank: 0,
        },
        {
          dice: "red",
          modifier: bonus,
          reason: T.DICE_CONF_BONUS_APPLIED,
          id: "bonus",
          rank: bonus,
        },
      ],
    })
  })

  it("skill roll with penalty applied", () => {
    const skill = "performance"
    const skillRank = 2
    const bonus = -3
    charData.skills[skill] = { ...SKILLS[skill], rank: skillRank }
    const skillConfig: IConfigSkill = { type: "skill", skill, bonus, charData }
    const expected: IDiceConfig = {
      white: emp,
      red: skillRank + bonus,
      log: [
        {
          id: "empathy",
          dice: "white",
          modifier: emp,
          rank: emp,
          reason: T.DICE_CONF_BASE_ATTRIBUTE,
        },
        {
          id: skill,
          dice: "red",
          modifier: skillRank,
          rank: skillRank,
          reason: T.DICE_CONF_FROM_SKILL,
        },
        {
          id: "bonus",
          dice: "red",
          modifier: bonus,
          rank: bonus,
          reason: T.DICE_CONF_BONUS_APPLIED,
        },
      ],
    }
    expect(getDice(skillConfig)).toStrictEqual(expected)
    // TODO: DiceRoller should handle negative red dice
  })
})
