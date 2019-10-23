import Vue from "vue"
import Vuex from "vuex"

import Client from "@/components/multiplay/client.ts"
import Host from "@/components/multiplay/host.ts"

Vue.use(Vuex)

export const SET_MP_CHAR = "SET_MULTIPLAYER_CHARACTER"
export const SET_HOST = "SET_HOST"
export const SET_CLIENT = "SET_CLIENT"

export const GET_MP_ACTIVE = "get multiplayer active"
export const GET_ROOM_NAME = "get room name"
export const GET_CLIENT_ID = "get client id"

export const store = new Vuex.Store({
  state: {
    multiPlayerCharacter: <CharacterData | null>null,
    client: new Client(),
    host: <Host | null>null,
  },
  getters: {
    [GET_MP_ACTIVE](state) {
      return state.client.connected
    },
    [GET_ROOM_NAME](state) {
      return state.client.roomName
    },
  },
  mutations: {
    [SET_MP_CHAR](state, charData: CharacterData) {
      state.multiPlayerCharacter = charData
    },
    [SET_HOST](state, host: Host) {
      state.host = host
    },
    [SET_CLIENT](state, client: Client) {
      state.client = client
    },
  },
  // Info: https://vuex.vuejs.org/guide/actions.html
  actions: {},
})
