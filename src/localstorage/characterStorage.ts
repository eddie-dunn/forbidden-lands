/* eslint-disable no-console */

import {
  CharacterData,
  CharacterMetaDataStatus,
  getNewCharacterData,
  parseCharacterData,
  calcCharacterXP,
} from "@/data/character/characterData"
import { runPatches } from "@/localstorage/charDataPatches"

export const CHAR_STORE_KEY: string = "savedCharacters"

function applyPatches(data: SaveData | {}): SaveData {
  const patchedData: SaveData = {}
  for (const [key, character] of Object.entries(data)) {
    const patchedChar = runPatches(character)
    saveCharacterToLocalStorage(patchedChar)
    patchedData[key] = patchedChar
  }
  return patchedData
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
  return applyPatches(loadedData)
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

  storedCharacter(characterId: string): CharacterData | null {
    return loadCharacterFromLocalStorage(characterId)
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
    const char = this._storage[characterId]
    if (char.metadata.status === "new") {
      // Save xp when new -> active, so that we later can calculate how many XP
      // points have been spent on leveling up the character
      char.metadata.xpAtCreation = calcCharacterXP(char)
    }
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
    this._storage = applyPatches(newData)
    commit && this.commit()
  }

  commit(): void {
    saveListToLocalStorage(this._storage)
  }
}
