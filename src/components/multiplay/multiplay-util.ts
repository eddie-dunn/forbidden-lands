import { INodeUser, UserData } from "@/components/multiplay/protocol"

import { CharacterData } from "@/data/character/characterData"

/** Return a list of all GMs/Admins */
export function getGms(users: INodeUser[]): INodeUser[] {
  return users.filter((user) => ["gm", "admin"].includes(user.role))
}

/** Return a list of all Players */
export function getPlayers(users: INodeUser[]): INodeUser[] {
  return users.filter((user) => user.role === "player")
}

/** Take chardata and remove sensitive information */
export function filterCharData(charData: CharacterData): CharacterData {
  if (!charData) return charData // Handle null chardata
  const gear = { ...charData.gear, money: { copper: 0, gold: 0, silver: 0 } }
  return {
    ...charData,
    darkSecret: "",
    relationships: "",
    notes: "",
    gear,
  }
} // TODO: add test? :)

function filterCharDataList(
  charDataList: (CharacterData | null)[]
): (CharacterData | null)[] {
  return charDataList.map((char) => {
    if (!char) return null
    return filterCharData(char)
  })
}

export function pullUserData(user: INodeUser): UserData {
  const { username, origin, peerId, characters, role } = user
  return { username, origin, peerId, characters, role }
}

export function pullFilteredUserData(users: INodeUser[]): UserData[] {
  const filteredUsers: UserData[] = users.map((user) => {
    return {
      ...pullUserData(user),
      characters: filterCharDataList(user.characters),
    }
  })
  return filteredUsers
}
