import {
  CharacterData,
  getNewCharacterData,
  AttributeData,
} from "@/characterData"
import {
  ExtendedKinName,
  KinName,
  Profession,
  Skill,
  TalentProfession,
  Age,
} from "@/types.ts"

import { capitalize } from "@/util/util"
import characterTemplate from "@/data/character_template/character_template"
import { getAgeType, getAttributePoints } from "@/age"

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
  formativeEvents: string
  [key: string]: string
}

export function kinTransform(kinId: ExtendedKinName): KinName {
  if (["alderlander", "ailander", "aslene"].includes(kinId)) {
    return "human"
  }
  return kinId as KinName
}

export function getCharDataFromQuery(query: CharDataQueryObj): CharacterData {
  const {
    kinId,
    professionId,
    talentId,
    childhoodIndex,
    formativeEvents,
    age,
  } = query
  const childhood = characterTemplate.CHILDHOOD[kinId][Number(childhoodIndex)]
  const fevents = formativeEvents.split(",").map((eventIndex) => {
    return characterTemplate.FORMATIVE_EVENTS[professionId][
      Number(eventIndex) - 1
    ]
  })

  const charData = getNewCharacterData()
  charData.kin = kinTransform(kinId)
  charData.profession = professionId
  charData.talents[1] = { id: talentId, rank: 1 } // set profession talent
  fevents.map((event, index) => {
    charData.talents[index + 2] = {
      id: event.talent,
      rank: 1,
    }
  }) // set general talents

  // TODO: Add dedent? https://github.com/dmnd/dedent

  const stringifyObj = (o: any) => {
    return Object.entries(o)
      .map(
        ([key, value]) =>
          `${capitalize(String(key))} ${capitalize(String(value))}`
      )
      .join(", ")
  }

  let formativeEventNotes = fevents.map(
    ({ name, story, skills, talent, items }) => {
      return `
## ${capitalize(name)}

${story}

Items: ${items}
Skills: ${stringifyObj(skills)}
Talent: ${capitalize(talent)}
`.trim()
    }
  )

  charData.notes = `
# ${capitalize(kinId)} ${capitalize(professionId)}

## ${capitalize(childhood.name)}

${childhood.story}

Attributes: ${stringifyObj(childhood.attributes)}
Skills: ${stringifyObj(childhood.skills)}

${formativeEventNotes.join("\n\n")}
`.trim()

  charData.age = Number(age)
  charData.attributes = adjustAttributesByAge(
    childhood.attributes,
    Number(age),
    kinTransform(kinId)
  )

  // Adjust skills according to template
  const mergedSkills = fevents
    .map((event) => event.skills)
    .reduce(mergeSkills, childhood.skills)
  Object.entries(mergedSkills).map((skill) => {
    const skillId = skill[0]
    const skillVal = skill[1]
    charData.skills[skillId as Skill].rank = skillVal || 0
  })

  charData.metadata.startingItems = fevents.map((f) => f.items).join("\n")
  return charData
}

function adjustAttributesByAge(
  attributes: AttributeData,
  age: number,
  kin: KinName
): AttributeData {
  const ageType: Age = getAgeType(age, kin)
  const newAttributes: AttributeData = { ...attributes }
  const attributesPointTotal = (a: AttributeData) => {
    return (
      Number(a.agility) +
      Number(a.empathy) +
      Number(a.strength) +
      Number(a.wits)
    )
  }
  const expected = getAttributePoints(ageType)
  while (attributesPointTotal(newAttributes) > expected) {
    if (newAttributes.strength && newAttributes.strength > 3) {
      newAttributes.strength--
    } else if (newAttributes.agility && newAttributes.agility > 2) {
      newAttributes.agility--
    } else if (newAttributes.wits && newAttributes.wits > 2) {
      newAttributes.wits--
    }
  }
  return newAttributes
}
