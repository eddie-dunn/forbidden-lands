import {
  Age,
  Attribute,
  KinName,
  Profession,
  Sex,
  Skill,
  TalentAll,
} from "@/types"
import { SkillMap, getSkills } from "@/skills"
import { getAgeType, getAttributePoints, getStartingTalents } from "@/age"

import { AGE } from "@/keys"
import uuid1 from "uuid/v1"

// import { CLASS, KIN } from "@/keys"
// import { stringify } from "querystring"

export interface CharacterTalent {
  // name is gotten from translations via id
  id: TalentAll
  rank: number | undefined
}

export interface AttributeData {
  strength: number | null
  wits: number | null
  agility: number | null
  empathy: number | null
}

export interface CharacterMetaData {
  id: string
  active: boolean
  hasBeenActivated: boolean
}

export interface CharacterData {
  age: number | null
  ageType: Age
  attributes: AttributeData
  class: Profession | null
  description: string
  kin: KinName | null
  name: string
  reputation: number
  sex: Sex | null
  skills: SkillMap
  talents: CharacterTalent[]
  portrait: string | null
  metadata: CharacterMetaData
  experience: number
  willpower: number
}

export function getNewCharacterData(): CharacterData {
  const newCharData: CharacterData = {
    name: "",
    // age: null,
    age: 33,
    ageType: "",
    sex: null,
    // kin: null,
    kin: "human",
    attributes: {
      strength: null,
      agility: null,
      wits: null,
      empathy: null,
    },
    // class: null,
    class: "druid",
    skills: getSkills(),
    talents: [],

    description: "",
    reputation: 0,
    portrait: null, // require("./assets/500.png"),
    experience: 0,
    willpower: 0,

    // metadata
    metadata: {
      id: uuid1(),
      active: false,
      hasBeenActivated: false,
    },
  }
  return newCharData
}

export function calcNewCharSkillPoints(age: Age | null) {
  if (!age) return 0
  return (
    {
      [AGE.YOUNG]: 8,
      [AGE.ADULT]: 10,
      [AGE.OLD]: 12,
    }[age] || 0
  )
}

export function validateBase(character: CharacterData): boolean {
  return (
    !!character.name &&
    !!character.age &&
    character.age > 0 &&
    !!character.kin &&
    !!character.class
    // && !!character.sex
  )
}

export function validateAttributes({
  attributes,
  ageType,
}: CharacterData): boolean {
  const attribPointsSpent = Number(
    Object.entries(attributes)
      .map((attribute) => attribute[1])
      .reduce((sum, value) => Number(sum) + Number(value))
  )
  // TODO get str wit emp agi max and compare to entered value
  const attributePointsRequired = getAttributePoints(ageType || null)
  return attribPointsSpent === attributePointsRequired
}

export function validateSkills({ skills, age, kin }: CharacterData): boolean {
  const reducer = (accumulator: number | null, currentValue: number | null) =>
    Number(accumulator) + Number(currentValue)
  const skillRanksSpent = Object.entries(skills)
    .map((item) => item[1].rank)
    .reduce(reducer)
  return skillRanksSpent === calcNewCharSkillPoints(getAgeType(age, kin))
}

export function validateTalents({ age, kin, talents }: CharacterData): boolean {
  // should have correct amount of talents and ranks
  const talentRanks = talents
    .map((talent) => talent.rank)
    .filter((rank) => !!rank)
    .reduce((sum, val) => Number(sum) + Number(val), 0)
  const requiredNumberOfTalents = getStartingTalents(age, kin) + 1 // 1: class

  const valid = talentRanks === requiredNumberOfTalents
  return valid
}

export function validateNewCharacter(character: CharacterData): boolean {
  // check if all stats add up OR if character has been activated before
  return (
    [validateBase, validateAttributes, validateSkills, validateTalents]
      .map((validate) => validate(character))
      .filter((item) => item === false).length === 0 || false
  )
}

export function parseCharacterData(charData: CharacterData): CharacterData {
  if (!validateCharacter(charData).success) {
    // eslint-disable-next-line no-console
    console.error("Characterdata invalid: ", charData)
    return getNewCharacterData()
  }
  if (!charData.ageType) {
    charData.ageType = getAgeType(charData.age, charData.kin)
  }
  return charData
}

export interface Result {
  success: boolean
  errCode: number
  msg: string
}

export function validateCharacter(data: Object): Result {
  return {
    success: true,
    errCode: 0,
    msg: "no err",
  }
}
