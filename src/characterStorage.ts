/* eslint-disable no-console */
import {
  CharacterData,
  getNewCharacterData,
  parseCharacterData,
} from "@/characterData"

export const CHAR_STORE_KEY: string = "savedCharacters"
export let STORE = [] // global in memory store object

// TODO: Add commit memory store to localStorage

export function saveCharacterToLocalStorage(characterData: CharacterData) {
  const id = characterData.metadata.id
  // Get current storage map
  const storeData: any = JSON.parse(
    localStorage.getItem(CHAR_STORE_KEY) || "{}"
  )
  // Check if id exists, if yes -- handle somehow; overwrite? prompt?
  if (storeData[id]) {
    /* eslint-disable-next-line no-console */
    console.error("Overwriting current character ", id)
  }
  /* eslint-disable-next-line no-console */
  console.log(storeData)
  storeData[id] = characterData
  // write to storage

  /* eslint-disable-next-line no-console */
  console.log("saving", JSON.stringify(storeData[id]))
  localStorage.setItem(CHAR_STORE_KEY, JSON.stringify(storeData))
}

interface SaveData {
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
  console.log("loaded", loadedCharacterData)
  return parseCharacterData(loadedCharacterData)
}

export function loadAllCharactersFromLocalStorage(): SaveData {
  const loadedData = JSON.parse(localStorage.getItem(CHAR_STORE_KEY) || "{}")
  console.log("loaded list", loadedData)
  // return Object.values(loadedData)
  return loadedData
}

/* Remove character by uuid from data, return new data version */
export function removeCharacter(characterId: string): SaveData {
  let charData = loadAllCharactersFromLocalStorage()
  console.log("Removing", characterId, "from", charData)
  // const toDelete = new Set([characterId, "abc", "efg"])
  // const newCharacterList = charData.filter(
  //   (obj: CharacterData) => obj.metadata && obj.metadata.id !== characterId //!toDelete.has(obj.metadata.id)
  // )
  // console.log("newlist", newCharacterList)
  // const newCharacterObject: SaveData = {}
  // for (let i = 0; i < newCharacterList.length; i++) {
  //   if (newCharacterList[i].metadata.id) {
  //     newCharacterObject[newCharacterList[i].metadata.id] = newCharacterList[i]
  //   }
  // }
  // console.log("newobj", newCharacterObject)
  // saveListToLocalStorage(newCharacterObject)
  delete charData[characterId]
  saveListToLocalStorage(charData)
  return charData
}

// saveDraftCharacter
// loadDraftCharacter

// In-memory interface to localStorage
export class Store {
  storage: SaveData = loadAllCharactersFromLocalStorage()

  removeCharacter(characterId: string, commit: boolean = false): void {
    delete this.storage[characterId]
    if (commit) {
      this.commit()
    }
  }
  addCharacter(character: CharacterData, commit: boolean = false) {
    this.storage[character.metadata.id] = character
    if (commit) {
      this.commit()
    }
  }
  length(): number {
    return Object.keys(this.storage).length
  }
  commit(): void {
    console.log("commit called")
    saveListToLocalStorage(this.storage)
  }
}
