import { Age, KinName, Profession, Sex, Skill, TalentAll } from "@/types"
import { getAgeType, getAttributePoints, getStartingTalents } from "@/age"

import { AGE } from "@/keys"
import { getSkills } from "@/skills"
import uuid1 from "uuid/v1"

// import { CLASS, KIN } from "@/keys"
// import { stringify } from "querystring"

export interface TalentData {
  // name is gotten from translations via id
  id: TalentAll
  description: string
  rank: number
}

export interface SkillData {
  id: Skill // name is gotten from translations via id
  rank: number
  description: string
}

export interface AttributeData {
  strength: number | null
  wits: number | null
  agility: number | null
  empathy: number | null
}

export interface MetaData {
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
  skills: SkillData[] // or object?
  talents: TalentData[]
  portrait: string | null
  metadata: MetaData
}

export function getNewCharacterData(): CharacterData {
  return {
    name: "",
    age: null,
    ageType: "young",
    sex: "male",
    kin: "human",
    attributes: {
      strength: null,
      agility: null,
      wits: null,
      empathy: null,
    },
    class: null,
    skills: getSkills(),
    talents: [],

    description: "",
    reputation: 0,
    portrait: null, // require("./assets/500.png"),

    // metadata
    metadata: {
      id: uuid1(),
      active: false,
      hasBeenActivated: false,
    },
  }
}

export function calcNewCharSkillPoints(age: Age | null) {
  if (!age) return -1
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
    !!character.class &&
    !!character.sex
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
  const attributePointsRequired = getAttributePoints(ageType || null)
  return attribPointsSpent === attributePointsRequired
}

export function validateSkills({ skills, age, kin }: CharacterData): boolean {
  const reducer = (accumulator: number, currentValue: number) =>
    Number(accumulator) + currentValue
  const skillRanksSpent = Object.entries(skills)
    .map((item) => item[1].rank)
    .reduce(reducer)
  return skillRanksSpent === calcNewCharSkillPoints(getAgeType(age, kin))
}

export function validateTalents({ age, kin, talents }: CharacterData): boolean {
  // should have correct amount of talents
  const requiredNumberOfTalents = getStartingTalents(age, kin) + 2

  // Check for talent id existing? Use keys (lol)
  return talents.filter((item) => !!item).length === requiredNumberOfTalents
}

export function validateNewCharacter(character: CharacterData): boolean {
  // check if all stats add up OR if character has been activated before
  return (
    [validateBase, validateAttributes, validateSkills, validateTalents]
      .map((validate) => validate(character))
      .filter((item) => item === false).length === 0 ||
    (character.metadata && character.metadata.hasBeenActivated) ||
    false
  )
  // return baseValid(character) && attributesValid(character)
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
