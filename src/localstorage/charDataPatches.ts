/* eslint-disable no-console */
import { CharData, Item, calcCharacterXP, getNewGear } from "@/characterData"
import { TalentAll, TalentGeneral } from "@/types"

import { GENERAL_TALENTS } from "@/talents"
import uuid1 from "uuid/v1"

type StoredCharDataPatch = (charData: CharData) => CharData
type EphemeralCharDataPatch = (charData: CharData) => null
type CharDataPatch = StoredCharDataPatch | EphemeralCharDataPatch

// TODO: Move patches here
const charDataPatches: CharDataPatch[] = [
  function patch0(character: CharData): CharData {
    if (!character.metadata.dataVersion) {
      console.log("adding dataVersion to character")
      character.metadata.dataVersion = 0
    }
    return character
  },
  function patch1(character: CharData): CharData {
    const name = character.name
    const id = character.metadata.id
    if (!character.metadata.status) {
      console.log("Adding status to", name, id)
      character.metadata.status = "new"
    }
    if (!character.gear || !character.gear.money) {
      console.log("Adding gear to", name, id)
      character.gear = getNewGear()
    }
    if (!character.mount) {
      console.log("Adding empty mount to", name, id)
      character.mount = {
        name: "",
        mounted: false,
        strength: 0,
        agility: 0,
        inventory: [],
      }
    }
    if (!character.willpower) {
      character.willpower = 0
    }
    return character
  },
  function patch2(character: CharData): CharData {
    const updateItem = (item: Item) => {
      if (item.type === "weapon" && !item.features) {
        console.log("Adding features to item", item.name, "for", character.name)
        item.features = {}
      }
      if (!item.id) {
        console.log("Adding id to item", item.name, "for", character.name)
        item.id = uuid1()
      }
    }
    character.gear.inventory.map(updateItem)
    character.mount.inventory.map(updateItem)
    return character
  },
  function patch3(character: CharData): CharData {
    character.talents = character.talents.map(({ id, rank }) => {
      const lowerCaseTalent = (id || "").toLowerCase() as TalentAll
      if (!GENERAL_TALENTS.includes(lowerCaseTalent as TalentGeneral)) {
        return { id, rank }
      }
      console.log("lowercasing talent", id, "->", lowerCaseTalent)
      return { id: lowerCaseTalent, rank }
    })
    return character
  },
  function patch4(character: CharData): CharData {
    const xpOrig = character.metadata.xpAtCreation
    if (!xpOrig) {
      const avgXPForAgeType = {
        "young": 65,
        "adult": 83,
        "old": 103,
        "": 80,
      }
      const calcedXP = calcCharacterXP(character)
      const newXP = Math.min(calcedXP, avgXPForAgeType[character.ageType])
      console.log("calced xp", calcedXP, "setting xp to", newXP)
      character.metadata.xpAtCreation = newXP
    }
    return character
  },
  // Ephemeral patches
  function patch5(character: CharData): null {
    console.log("Validating portrait for", character.name, character.portrait)
    const matcher = /\/(img\/player_handbook_png-\d*\.)[\da-zA-Z]*\.png/
    const found = (character.portrait || "").match(matcher)
    if (found && found[1]) {
      const newName = __webpack_public_path__ + found[1] + "png"
      console.log("OLDNAME", character.portrait, "NEWNAME", newName)
      character.portrait = newName
    }
    // return character
    // Not saving patch until verified as working
    // Check regex for multiple character versions for
    //  - localhost
    //  - bifrost
    return null
  },
]

function _apply(
  charData: CharData,
  patches: CharDataPatch[],
  applyAllPatches?: boolean
): CharData {
  // Init
  let cCopy: CharData = JSON.parse(JSON.stringify(charData))
  let temporaryPatchApplied = false
  if (applyAllPatches) cCopy.metadata.dataVersion = -1

  // Exec
  patches.map((patch, patchVersion) => {
    if (cCopy.metadata.dataVersion < patchVersion) {
      console.log("Running patch", patchVersion)
      const tempPatch = !patch(cCopy)
      if (tempPatch) {
        temporaryPatchApplied = true
      }
      if (!temporaryPatchApplied) {
        cCopy.metadata.dataVersion = patchVersion
      }
    }
  })
  return cCopy
}

export function runPatches(
  c: CharData,
  patches: CharDataPatch[] = charDataPatches
): CharData {
  console.log(">>> Patching", c.name)
  let char
  try {
    char = _apply(c, patches)
  } catch (error) {
    console.error("[PATCHING ERROR]", error)
    console.log("Attempting to rerun all patches")
    char = _apply(c, patches, true)
  }
  console.log("<<< Patching done", char.name, "\n\n")
  return char
}
