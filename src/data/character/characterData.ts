import {
  Age,
  Attribute,
  DiceSides,
  KinName,
  Profession,
  Sex,
  TalentAll,
} from "@/types"
import { CLASS as PROFESSION_MAP, getSkillMax } from "@/classes.ts"
import { SkillMap, getSkills, SkillObj } from "@/skills"
import { getAgeType, getAttributePoints, getStartingTalents } from "@/age"
import { Item } from "@/data/items/itemTypes"

import { AGE } from "@/keys"
import { KIN as KIN_MAP } from "@/kin"
import uuid1 from "uuid/v1"

export interface CharacterTalent {
  // name is gotten from translations via id
  id: TalentAll
  rank: 0 | 1 | 2 | 3 | undefined
}

export interface Conditions {
  cold: boolean
  starving: boolean
  dehydrated: boolean
  tired: boolean
  [key: string]: boolean
}

export interface AttributeData {
  strength: number | null
  wits: number | null
  agility: number | null
  empathy: number | null
  [key: string]: number | null
}

export type CharacterMetaDataStatus =
  | "new"
  | "active"
  | "levelup"
  | "freeEdit"
  | "trash"

export interface CharacterMetaData {
  id: string
  active: boolean
  hasBeenActivated: boolean
  status: CharacterMetaDataStatus
  dataVersion: number
  startingItems?: string
  xpAtCreation: number
}

export interface Gear {
  equipped: Item[]
  inventory: Item[]
  consumables: {
    torches: DiceSides
    food: DiceSides
    water: DiceSides
    arrows: DiceSides
  }
  money: {
    gold: number
    silver: number
    copper: number
  }
}

// TODO: Rename CharacterData => CharData
export type CharacterData = CharData
export interface CharData {
  age: number | null
  ageType: Age
  appearance: string
  attributes: AttributeData
  attributeDmg: AttributeData
  conditions: Conditions
  darkSecret: string
  experience: number
  gear: Gear
  kin: KinName | null
  metadata: CharacterMetaData
  mount: {
    name: string
    strength: number
    agility: number
    movementRate: number
    mounted: boolean
    inventory: Item[]
    skills: SkillObj[]
  }
  animalCompanion: {
    name: string
    strength: number
    agility: number
    movementRate: number
    skills: SkillObj[]
    description: string
  }
  name: string
  notes: string
  portrait: string | null
  pride: string
  profession: Profession | null
  relationships: string
  reputation: number
  sex: Sex | null
  skills: SkillMap
  talents: CharacterTalent[]
  willpower: number
}

export function getNewGear(): Gear {
  return {
    equipped: [],
    inventory: [],
    money: {
      copper: 0,
      silver: 0,
      gold: 0,
    },
    consumables: {
      torches: 0,
      food: 0,
      water: 0,
      arrows: 0,
    },
  }
}

export function getNewCharacterData(): CharacterData {
  const newCharData: CharacterData = {
    name: "",
    age: null,
    // age: 33,
    ageType: "",
    sex: null,
    kin: null,
    // kin: "human",
    attributes: {
      strength: null,
      agility: null,
      wits: null,
      empathy: null,
    },
    attributeDmg: {
      strength: 0,
      agility: 0,
      wits: 0,
      empathy: 0,
    },
    conditions: {
      cold: false,
      starving: false,
      dehydrated: false,
      tired: false,
    },
    profession: null,
    // profession: "druid",
    skills: getSkills(),
    talents: [],

    reputation: 0,
    portrait: null,
    // portrait: require("./assets/500.png"),
    experience: 0,
    willpower: 0,

    appearance: "",
    pride: "",
    darkSecret: "",
    relationships: "",

    gear: getNewGear(),
    mount: {
      name: "",
      mounted: false,
      strength: 0,
      agility: 0,
      movementRate: 0,
      inventory: [],
      skills: [],
    },
    animalCompanion: {
      name: "",
      strength: 0,
      agility: 0,
      movementRate: 0,
      skills: [],
      description: "",
    },

    notes: "",

    // metadata
    metadata: {
      id: uuid1(),
      active: false,
      status: "new",
      hasBeenActivated: false,
      dataVersion: -1,
      xpAtCreation: 0,
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
        Number(item[1]) >= 2 &&
        Number(item[1]) <=
          getMaxAttribLevel(item[0] as Attribute, kin, profession)
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
    skillRanksSpent !== 0 &&
    skillRanksSpent === calcNewCharSkillPoints(getAgeType(age, kin))
  )
}

export function validateTalents({ age, kin, talents }: CharacterData): boolean {
  // should have correct amount of talents and ranks
  const talentRanks = talents
    .filter((talent) => !!talent.id)
    .map((talent) => talent.rank as number)
    .filter((rank) => !!rank)
    .reduce((sum, val) => sum + val, 0)
  const requiredNumberOfTalents = getStartingTalents(age, kin) + 2 // 1: class

  const valid = talentRanks === requiredNumberOfTalents
  return valid
}

export function validateNewCharacter(character: CharacterData): boolean {
  // check if all stats add up OR if character has been activated before
  return (
    [
      validateBase, //
      validateAttributes, //
      validateSkills, //
      validateTalents, //
    ]
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

const sum = (acc: number, val: number) => acc + val

export function calcCharacterXP(data: CharacterData): number {
  return (
    calcCharacterSkillXP(data.skills) + calcCharacterTalentXP(data.talents) - 3
    // -3 to compensate for kin talent being lvl 1; maybe fix some other day
  )
}

function calcCharacterTalentXP(talents: CharacterTalent[]): number {
  function calcTalent(lvl: number) {
    const arr = Array.from({ length: lvl }, (v, k) => k + 1)
    return arr.reduce((acc, val) => acc + val * 3, 0)
  }
  const talentSum = talents
    .map((talent) => calcTalent(talent.rank || 0))
    .reduce(sum, 0)
  return talentSum
}

function calcCharacterSkillXP(skills: SkillMap): number {
  function calcSkill(lvl: number) {
    const arr = Array.from({ length: lvl }, (v, k) => k + 1)
    return arr.reduce((acc, val) => acc + val * 5, 0)
  }
  const skillSum = Object.values(skills)
    .map((skill) => calcSkill(skill.rank || 0))
    .reduce(sum, 0)
  return skillSum
}
