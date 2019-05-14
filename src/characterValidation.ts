// TODO: Move character validation here
import { CharacterData } from "@/characterData"

export function validateBaseNew(characterData: CharacterData): boolean {
  const valid =
    !!characterData.name &&
    // !!characterData.sex &&
    !!characterData.age &&
    !!characterData.kin &&
    !!characterData.profession
  return valid
}

function validateAttributesNew() {}

function validateTalentsNew() {}

function validateSkillsNew() {}
