/* eslint-disable no-console */
import {
  CharacterData,
  getNewCharacterData,
  getNewGear,
  parseCharacterData,
  CharacterMetaDataStatus,
} from "@/characterData"

export const CHAR_STORE_KEY: string = "savedCharacters"
export let STORE = [] // global in memory store object

const PATCHES = [
  function patch0(character: CharacterData) {
    console.log("patch0: adding necessary data structures")
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
        strength: 0,
        agility: 0,
        inventory: [],
      }
    }
    if (!character.willpower) {
      character.willpower = 0
    }
    character.metadata.dataVersion = 0
    return character
  },
  function patch1(character: CharacterData) {
    // Just a sanity check that the patcher is being run
    console.log("patch1: sanity check that patches are run")
    return character
  },
]

function applyPatches(data: SaveData | {}) {
  const dataList: CharacterData[] = Object.values(data)
  dataList.map((character) => {
    PATCHES.map((patch, patchVersion) => {
      const charDataVersion = character.metadata.dataVersion
      if (charDataVersion < patchVersion) {
        const patchedCharacter = patch(character)
        // saveCharacterToLocalStorage(patchedCharacter)
      }
    })
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
      ["active", "freeEdit", "levelup"].includes(character.metadata.status)
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
    this._storage = newData
    if (commit) {
      this.commit()
    }
  }

  commit(): void {
    saveListToLocalStorage(this._storage)
  }
}
