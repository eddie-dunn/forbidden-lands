import {
  CharacterData,
  CharacterMetaDataStatus,
  Item,
  calcCharacterXP,
  getNewCharacterData,
  getNewGear,
  parseCharacterData,
} from "@/characterData"
import { TalentAll, TalentGeneral } from "@/types"

import { GENERAL_TALENTS } from "@/talents"
/* eslint-disable no-console */
import uuid1 from "uuid/v1"

export const CHAR_STORE_KEY: string = "savedCharacters"

const PATCHES = [
  function patch0(character: CharacterData): CharacterData {
    if (!character.metadata.dataVersion) {
      console.log("adding dataVersion to character")
      character.metadata.dataVersion = 0
    }
    return character
  },
  function patch1(character: CharacterData): CharacterData {
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
  function patch2(character: CharacterData): CharacterData {
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
  function patch3(character: CharacterData): CharacterData {
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
  function patch4(character: CharacterData): CharacterData {
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
  function patch5(character: CharacterData): CharacterData | null {
    console.log("patcher 5", character.name, character.portrait)
    const matcher = /(\/img\/player_handbook_png-\d*\.)([\da-zA-Z]*)(\.png)/
    const found = (character.portrait || "").match(matcher)
    if (found && found[1]) {
      const newName = found[1] + "png"
      console.log("OLDNAME", character.portrait, "NEWNAME", newName)
      character.portrait = newName
    }
    // return character
    return null
  },
]

function applyPatches(data: SaveData | {}) {
  const dataList: CharacterData[] = Object.values(data)
  dataList.map((character) => {
    // character.metadata.dataVersion = 1 // use for testing
    const charDataVersion = character.metadata.dataVersion || -1
    console.log("charDataversion", charDataVersion, character.name)
    PATCHES.map((patch, patchVersion) => {
      if (charDataVersion < patchVersion) {
        console.log(`Running patch ${patchVersion} on ${character.name}`)
        const patchedCharacter = patch(character)
        if (patchedCharacter) {
          patchedCharacter.metadata.dataVersion = patchVersion
        }
      }
    })
    // Apply all patches to in memory data, only write to storage at end
    saveCharacterToLocalStorage(character)
  })
}

export function saveCharacterToLocalStorage(characterData: CharacterData) {
  const id = characterData.metadata.id
  // Get current storage map
  const storeData: any = JSON.parse(
    localStorage.getItem(CHAR_STORE_KEY) || "{}"
  )
  // Check if id exists, if yes -- handle somehow; overwrite? prompt?
  if (storeData[id]) {
    /* eslint-disable-next-line no-console */
    // console.error("Overwriting current character ", id)
  }
  /* eslint-disable-next-line no-console */
  // console.log(storeData)
  storeData[id] = characterData
  // write to storage

  /* eslint-disable-next-line no-console */
  // console.log("saving", JSON.stringify(storeData[id]))
  localStorage.setItem(CHAR_STORE_KEY, JSON.stringify(storeData))
}

export interface SaveData {
  [propName: string]: CharacterData
}

export function saveListToLocalStorage(characterList: SaveData) {
  localStorage.setItem(CHAR_STORE_KEY, JSON.stringify(characterList))
}

export function loadCharacterFromLocalStorage(id: string): CharacterData {
  if (!id) return getNewCharacterData()

  const loadedData = JSON.parse(localStorage.getItem(CHAR_STORE_KEY) || "{}")
  if (!loadedData[id]) return getNewCharacterData()
  const loadedCharacterData = loadedData[id]
  /* eslint-disable-next-line no-console */
  // console.log("loaded", loadedCharacterData)
  return parseCharacterData(loadedCharacterData)
}

export function loadAllCharactersFromLocalStorage(): SaveData {
  const loadedData = JSON.parse(localStorage.getItem(CHAR_STORE_KEY) || "{}")
  // console.log("loaded data", loadedData)
  applyPatches(loadedData)
  return loadedData
}

// In-memory interface to localStorage
// Methods with an optional commit parameter can be invoked with commit = false
// if many operations are to be done before saving to local storage
export class Store {
  _storage: SaveData = loadAllCharactersFromLocalStorage()

  get storage() {
    return this._storage
  }

  get length(): number {
    return Object.keys(this._storage).length
  }

  get activeCharacters() {
    return Object.values(this.storage).filter((character) =>
      ["active", "levelup"].includes(character.metadata.status)
    )
  }

  get newCharacters() {
    return Object.values(this.storage).filter((character) =>
      ["new", undefined].includes(character.metadata.status)
    )
  }

  charactersByStatus(
    status: (CharacterMetaDataStatus | undefined)[] | CharacterMetaDataStatus
  ) {
    if (!Array.isArray(status)) {
      status = [status]
    }
    return Object.values(this.storage).filter((character) =>
      status.includes(character.metadata.status)
    )
  }

  characterById(characterId: string): CharacterData | null {
    return this.storage[characterId] || null
  }

  removeCharacter(characterId: string, commit: boolean = true): void {
    delete this._storage[characterId]
    if (commit) {
      this.commit()
    }
  }

  addCharacter(character: CharacterData, commit: boolean = true) {
    this._storage[character.metadata.id] = character
    if (commit) {
      this.commit()
    }
  }

  deactivate(characterId: string, commit: boolean = true) {
    this._storage[characterId].metadata.status = "freeEdit"
    commit && this.commit()
  }

  activate(characterId: string, commit: boolean = true) {
    this._storage[characterId].metadata.status = "active"
    commit && this.commit()
  }

  getStorageDataBlob() {
    const tmpStore = JSON.stringify(this._storage)
    const blob = new Blob([tmpStore])
    const objectUrl = window.URL.createObjectURL(blob)
    setTimeout(() => {
      // Cleanup if object url hasn't been used before timeout
      window.URL.revokeObjectURL(objectUrl)
    }, 60000)
    return objectUrl
  }

  replaceData(newData: SaveData, commit: boolean = true) {
    applyPatches(newData) // TODO: apply patches in a functional way
    this._storage = newData
    // if (commit) {
    //   this.commit()
    // }
  }

  commit(): void {
    saveListToLocalStorage(this._storage)
  }
}
