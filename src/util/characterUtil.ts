import { CharacterData, getNewCharacterData } from "@/characterData"
import {
  ExtendedKinName,
  KinName,
  Profession,
  Skill,
  TalentAll,
  TalentProfession,
} from "@/types.ts"

import { capitalize } from "@/util"
import characterTemplate from "@/data/character_template/character_template"

export function stringChar(characterData: CharacterData) {
  return JSON.stringify(characterData)
}

type SkillObj = { [S in Skill]?: number }
function mergeSkills(skills1: SkillObj, skills2: SkillObj) {
  const mergedSkills = { ...skills1 }
  const skills2Entries = Object.entries(skills2) as [Skill, number][]
  skills2Entries.map((skill) => {
    const name = skill[0]
    const value = skill[1]
    if (mergedSkills[name]) {
      ;(mergedSkills[name] as number) += value
    } else {
      mergedSkills[name] = value
    }
  })
  return mergedSkills
}

export interface CharDataQueryObj {
  kinId: ExtendedKinName
  professionId: Profession
  talentId: TalentProfession
  age: string
  childhoodIndex: string
  formativeEventIndex: string
  [key: string]: string
}

export function kinTransform(kinId: ExtendedKinName): KinName {
  if (["alderlander", "ailander", "aslene"].includes(kinId)) {
    return "human"
  }
  return kinId as KinName
}

// FIXME: Add tests
export function getCharDataFromQuery(query: {
  [key: string]: string
}): CharacterData {
  const {
    kinId,
    professionId,
    talentId,
    childhoodIndex,
    formativeEventIndex,
    age,
  } = query as CharDataQueryObj // TODO: Hack, might want to add extra checking
  const childhood = characterTemplate.CHILDHOOD[kinId][Number(childhoodIndex)]
  const formativeEvent =
    characterTemplate.FORMATIVE_EVENTS[professionId][
      Number(formativeEventIndex)
    ]
  const charData = getNewCharacterData()
  charData.kin = kinTransform(kinId)
  charData.profession = professionId
  charData.talents[1] = { id: talentId, rank: 1 }
  charData.talents[2] = { id: formativeEvent.talent as TalentAll, rank: 1 }

  // TODO: Add dedent? https://github.com/dmnd/dedent
  charData.notes = `# ${capitalize(kinId)}, childhood: ${capitalize(
    childhood.name
  )}\n${childhood.story}\n\n# ${capitalize(
    professionId
  )}, formative event: ${capitalize(formativeEvent.name)}\n${
    formativeEvent.story
  }`
  charData.age = Number(age)
  charData.attributes = childhood.attributes

  // Adjust skills according to template
  const mergedSkills = mergeSkills(childhood.skills, formativeEvent.skills)
  Object.entries(mergedSkills).map((skill) => {
    const skillId = skill[0]
    const skillVal = skill[1]
    charData.skills[skillId as Skill].rank = skillVal || 0
  })

  charData.metadata.startingItems = formativeEvent.items
  return charData
}
