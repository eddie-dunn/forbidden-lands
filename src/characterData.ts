import { Age, KinName, Profession, Sex, Skill, TalentAll } from "@/types"

import { getSkills } from "@/skills"

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

export interface CharacterData {
  age: number | null
  ageType?: Age
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
}

export function getNewCharacterData(): CharacterData {
  return {
    name: "",
    // ageType: AGE.ADULT,
    age: null,
    sex: "male",
    kin: "human",
    attributes: {
      strength: null,
      agility: null,
      wits: null,
      empathy: null,
    },
    class: "druid",
    skills: getSkills(),
    talents: [],

    description: "",
    reputation: 0,
    portrait: null, // require("./assets/500.png"),
  }
}

export function parseCharacterData(charData: CharacterData): CharacterData {
  if (!validateCharacter(charData).success) {
    // eslint-disable-next-line no-console
    console.error("Characterdata invalid: ", charData)
    return getNewCharacterData()
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

export const LOCAL_STORE: string = "savedCharacters"

export function loadCharacterListFromLocalStorage(): CharacterData[] {
  const loadedData = JSON.parse(localStorage.getItem(LOCAL_STORE) || "{}")
  return Object.values(loadedData)
}

export function loadCharacterFromLocalStorage(id: string): CharacterData {
  if (!id) return getNewCharacterData()

  const loadedData = JSON.parse(localStorage.getItem(LOCAL_STORE) || "{}")
  console.log(loadedData[id])
  if (!loadedData[id]) return getNewCharacterData()
  const loadedCharacterData = loadedData[id]
  console.log("loaded", loadedCharacterData)
  return parseCharacterData(loadedCharacterData)
}

export function saveToLocalStorage(characterData: CharacterData) {
  const id = characterData.name // change?
  if (!id) {
    console.error("name not set, can't save")
  }
  // Get current storage map
  const storeData: any = JSON.parse(localStorage.getItem(LOCAL_STORE) || "{}")
  // Check if id exists, if yes -- handle somehow; overwrite? prompt?
  if (storeData[id]) {
    console.error("Overwriting current character ", id)
  }
  console.log(storeData)
  storeData[id] = characterData
  // write to storage

  console.log("saving", JSON.stringify(characterData))
  localStorage.setItem(LOCAL_STORE, JSON.stringify(storeData))
}
