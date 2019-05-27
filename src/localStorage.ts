import { Interface } from "readline"

/* eslint-disable no-console */

export const URL_STORE_KEY: string = "savedUrls"

// interface UrlSaveData {
//   [propName: string]: string
// }
type UrlSaveData = string

function saveListToLocalStorage(urlList: UrlSaveData[]) {
  localStorage.setItem(URL_STORE_KEY, JSON.stringify(urlList))
}

function loadAllUrlsFromLocalStorage(): UrlSaveData[] {
  const loadedData = JSON.parse(localStorage.getItem(URL_STORE_KEY) || "[]")
  console.log("loaded list", loadedData)
  return loadedData
}

// function removeUrl(index: number): UrlSaveData[] {
//   let urlList = loadAllUrlsFromLocalStorage()
//   console.log("Removing", urlList[index], "from", urlList)
//   const filterUrlList = urlList.filter((_, idx) => idx !== index)
//   saveListToLocalStorage(filterUrlList)
//   return filterUrlList
// }

abstract class LocalStore {
  storage: string[] = []
  abstract remove(index: number, commit: boolean): void
  abstract add(item: string, commit: boolean): void
  abstract commit(): void
  get length(): number {
    return this.storage.length
  }
}

// In-memory interface to localStorage
export default class UrlStore extends LocalStore {
  storage: UrlSaveData[] = loadAllUrlsFromLocalStorage()

  remove(urlIndex: number, commit: boolean = true): void {
    // delete this.storage[urlIndex]
    const filterUrlList = this.storage.filter((_, idx) => idx !== urlIndex)
    this.storage = filterUrlList
    if (commit) {
      this.commit()
    }
  }

  add(url: string, commit: boolean = true) {
    this.storage.unshift(url)
    if (commit) {
      this.commit()
    }
  }

  commit(): void {
    console.log("commit called")
    saveListToLocalStorage(this.storage)
  }

  get length(): number {
    return this.storage.length
  }
}
