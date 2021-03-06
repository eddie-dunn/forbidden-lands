/* eslint-disable no-console */
import Vue from "vue"
import Vuex from "vuex"
import {
  MP_CHARS,
  MP_SAVE_CHAR,
  SET_CLIENT,
  SET_HOST,
  SET_MP_CHAR,
  SET_OTHER_CHARS,
  GET_MP_ACTIVE,
  GET_MP_PLAYER,
  GET_MP_PLAYERS,
  GET_MP_PLAYER_SELF,
  GET_ROOM_NAME,
  PAGE_TITLE,
  GET_PAGE_TITLE,
  SET_PAGE_TITLE,
  PAGE_SUBTITLE,
  GET_PAGE_SUBTITLE,
  SET_PAGE_SUBTITLE,
} from "./store-types"
import { CharacterData } from "@/data/character/characterData"
import { Err, OK, log } from "@/util/util"

import { FLPlayer } from "@/components/multiplay/fl-player"
import { FLHost } from "@/components/multiplay/fl-host"
import { UserData, PeerId } from "@/components/multiplay/protocol"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    [MP_CHARS]: <(CharacterData | null)[]>[],
    client: new FLPlayer(),
    host: new FLHost(),
    [PAGE_TITLE]: { title: "Forbidden Lands Companion", translate: false },
    [PAGE_SUBTITLE]: "",
  },
  getters: {
    [GET_MP_ACTIVE](state) {
      return state.client.connected
    },
    [GET_ROOM_NAME](state) {
      return state.client.hostId
    },
    [GET_MP_PLAYER](state): (peerId: PeerId) => UserData | undefined {
      return (peerId: PeerId) =>
        state.client.users.find((user) => user.peerId === peerId)
    },
    // Return own mp character
    [GET_MP_PLAYER_SELF](state): UserData | undefined {
      return state.client.users.find(
        (user) => user.peerId === state.client.peerId
      )
    },
    [GET_MP_PLAYERS](state): UserData[] {
      return state.client.users
    },
    [GET_PAGE_TITLE](state): { title: string; translate: boolean } {
      return state[PAGE_TITLE]
    },
    [GET_PAGE_SUBTITLE](state) {
      return state[PAGE_SUBTITLE]
    },
  },
  mutations: {
    /* Player picks char(s) to use in MP */
    [SET_MP_CHAR](state, chars: CharacterData[]) {
      state[MP_CHARS] = chars
    },
    [SET_OTHER_CHARS](state, characters: UserData[]) {
      console.log("committing chars?", characters)
    },
    [SET_HOST](state, host: FLHost) {
      state.host = host
    },
    [SET_CLIENT](state, client: FLPlayer) {
      state.client = client
    },
    [MP_SAVE_CHAR](state, charData: CharacterData) {
      if (!state.client.connected) return
      state.client.notifyCharUpdate(charData)
    },
    /** Other */
    [SET_PAGE_TITLE](
      state,
      title: string | { title: string; translate?: boolean }
    ) {
      if (typeof title === "string") {
        state[PAGE_TITLE] = { title, translate: true }
      } else {
        state[PAGE_TITLE] = { title: title.title, translate: !!title.translate }
      }
    },
    [SET_PAGE_SUBTITLE](state, title: string) {
      state[PAGE_SUBTITLE] = title
    },
  },
  // Info: https://vuex.vuejs.org/guide/actions.html
  actions: {
    async hostGame({ state }, { userData, roomName }: SHost) {
      return hostGame(state.host, state.client, roomName, userData)
    },
    async joinGame({ state }, { userData, roomName }: SHost) {
      // TODO: Improve error handling
      await state.client.start()
      await state.client.connectTo(roomName, userData)
    },
  },
})

interface SHost {
  userData: UserData
  roomName: string
}

async function hostGame(
  host: FLHost,
  client: FLPlayer,
  roomName: string,
  userData: UserData
) {
  // Setup host
  log("setup host")
  try {
    await host.start(roomName)
  } catch (err) {
    return Err("host error", err)
  }
  // Setup client
  log("setup client")
  try {
    await client.start()
  } catch (err) {
    return Err("client error", err)
  }
  host.adminId = client.peerId
  // Connect client to host
  userData = { ...userData, peerId: client.peerId }
  try {
    await client.connectTo(host.peerId, userData)
  } catch (err) {
    return Err("client could not connect to host", err)
  }
  return OK()
}
