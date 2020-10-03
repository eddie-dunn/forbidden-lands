/* eslint-disable no-console */
import { CharData, calcCharacterXP, getNewGear } from "@/characterData"
import { TalentAll, TalentGeneral } from "@/types"
import { Item } from "@/data/items/itemTypes"

import { GENERAL_TALENTS } from "@/talents"
import uuid1 from "uuid/v1"

type StoredCharDataPatch = (charData: CharData) => CharData
type EphemeralCharDataPatch = (charData: CharData) => null
type CharDataPatch = StoredCharDataPatch | EphemeralCharDataPatch

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
      } as any
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
  function updateLocalPortraitUrl(character: CharData): CharData {
    console.log("Validating portrait for", character.name, character.portrait)
    const matcher = /\/(img\/player_handbook_png-\d*\.)[\da-zA-Z]*\.png/
    const found = (character.portrait || "").match(matcher)
    if (found && found[1]) {
      const newName = __webpack_public_path__ + found[1] + "png"
      console.log("OLDNAME", character.portrait, "NEWNAME", newName)
      character.portrait = newName
    }
    return character
  },
  function addMountSkills(character: CharData): CharData {
    if (!character.mount.skills) {
      character.mount.skills = []
    }
    return character
  },
  function addMountMovement(character: CharData): CharData {
    character.mount.movementRate = character.mount.movementRate || 0
    return character
  },
  function addAnimalCompanion(character: CharData): CharData {
    const newCompanion = {
      name: "",
      strength: 0,
      agility: 0,
      movementRate: 0,
      skills: [],
      description: "",
    }
    const companion = { ...newCompanion, ...character.animalCompanion }
    character.animalCompanion = companion
    return character
  },
  function fixHttpPortrait(c: CharData): CharData {
    const match = !!(c.portrait || "").match(/http:\/\//)
    if (c.portrait && match) {
      const httpsPortrait = c.portrait.replace("http://", "https://")
      console.log("Fixing portrait http -> https", c.portrait, httpsPortrait)
      c.portrait = httpsPortrait
    }
    return c
  },
  // Permanent patches
  // function permanentPatchExample(character: CharData): CharData {}

  // Ephemeral patches
  // function ephemeralPatchExample(character: CharData): null {}
]

const tempPatches = [
  /** This patch will enable moving imports between different public paths */
  function updateLocalPortraitUrl2(character: CharData): null {
    const matcher = /\/img\/player_handbook_png-\d*\.png$/
    const found = (character.portrait || "").match(matcher)
    if (found && found[0]) {
      const newPath = __webpack_public_path__ + found[0].slice(1)
      // console.log("OLD", character.portrait, "NEW", newPath)
      character.portrait = newPath
    }
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
      console.log(`Running patch ${patchVersion} ${patch.name}`)
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

function runTempPatches(c: CharData) {
  tempPatches.map((patch, patchVersion) => {
    patch(c)
  })
}

export const CURRENT_PATCH_VERSION = charDataPatches.length - 1

export function runPatches(c: CharData): CharData {
  const patches = charDataPatches
  const oldVersion = c.metadata.dataVersion
  runTempPatches(c)
  if (oldVersion === CURRENT_PATCH_VERSION) {
    return c
  }

  console.log(">>> Patching", c.name)
  let char
  try {
    char = _apply(c, patches)
  } catch (error) {
    console.error("[PATCHING ERROR]", error)
    console.log("Attempting to rerun all patches")
    char = _apply(c, patches, true)
  }
  const newVersion = char.metadata.dataVersion
  console.log(
    "<<< Patching done",
    `${c.name} ${oldVersion} -> ${newVersion}`,
    "\n\n"
  )
  return char
}
