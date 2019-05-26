import {
  Age,
  Attribute,
  KinName,
  Profession,
  Sex,
  Skill,
  TalentAll,
} from "@/types"
import { CLASS as PROFESSION_MAP, getSkillMax } from "@/classes.ts"
import { SkillMap, getSkills } from "@/skills"
import { getAgeType, getAttributePoints, getStartingTalents } from "@/age"

import { AGE } from "@/keys"
import { KIN as KIN_MAP } from "@/kin"
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
  profession: Profession | null
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

  appearance: string
  pride: string
  darkSecret: string
  relationshipts: string
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
    profession: "druid",
    skills: getSkills(),
    talents: [],

    reputation: 0,
    portrait: null, // require("./assets/500.png"),
    experience: 0,
    willpower: 0,

    appearance: "",
    pride: "",
    darkSecret: "",
    relationshipts: "",

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

function getMaxAttribLevel(
  attribute: Attribute,
  kin: KinName | null,
  profession: Profession | null
): number {
  if (!kin || !profession) return 1
  const kinMod = KIN_MAP[kin].key_attribute === attribute ? 1 : 0
  const professionMod =
    PROFESSION_MAP[profession].key_attribute === attribute ? 1 : 0
  return 4 + kinMod + professionMod
}

export function validateBase(character: CharacterData): boolean {
  return (
    !!character.name &&
    !!character.age &&
    character.age > 0 &&
    !!character.kin &&
    !!character.profession
    // && !!character.sex
  )
}

export function validateAttributes({
  attributes,
  ageType,
  profession,
  kin,
}: CharacterData): boolean {
  const attribPointsSpent = Number(
    Object.entries(attributes)
      .map((attribute) => attribute[1])
      .reduce((sum, value) => Number(sum) + Number(value))
  )
  const attribsOutsideRange = Object.entries(attributes)
    .map((item) => {
      return (
        item[1] >= 2 &&
        item[1] <= getMaxAttribLevel(item[0] as Attribute, kin, profession)
      )
    })
    .filter((item) => !item).length
  const attributePointsRequired = getAttributePoints(ageType || null)
  return (
    attribPointsSpent === attributePointsRequired && attribsOutsideRange === 0
  )
}

export function validateSkills({
  skills,
  profession,
  age,
  kin,
}: CharacterData): boolean {
  const sumReducer = (
    accumulator: number | null,
    currentValue: number | null
  ) => Number(accumulator) + Number(currentValue)
  const skillList = Object.entries(skills)
  const skillRanksSpent = skillList
    .map((item) => item[1].rank)
    .reduce(sumReducer)
  const skillRanksInvalid =
    skillList
      .map((item) => {
        const skillMax = getSkillMax(item[1].id, profession)
        const rank = Number(item[1].rank)
        return rank > skillMax || rank < 0
      })
      .filter((invalid) => !!invalid).length > 0
  return (
    !skillRanksInvalid &&
    skillRanksSpent === calcNewCharSkillPoints(getAgeType(age, kin))
  )
}

export function validateTalents({ age, kin, talents }: CharacterData): boolean {
  // should have correct amount of talents and ranks
  const talentRanks = talents
    .map((talent) => talent.rank)
    .filter((rank) => !!rank)
    .reduce((sum, val) => Number(sum) + Number(val), 0)
  const requiredNumberOfTalents = getStartingTalents(age, kin) + 2 // 1: class

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
