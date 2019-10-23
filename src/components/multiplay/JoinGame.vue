<script lang="ts">
/* eslint-disable no-console */
import Peer from "peerjs"
import { Component, Vue, Watch } from "vue-property-decorator"

import { store, SET_CLIENT, SET_MP_CHAR } from "@/store/store.ts"
import {
  UserListMsg,
  ChatMessage,
  ServerMessage,
} from "@/components/multiplay/multi"
import Host from "@/components/multiplay/host.ts"
import Client from "@/components/multiplay/client.ts"
import { timeout } from "@/util.ts"
import { CharacterData } from "@/characterData.ts"

import CharacterCard from "@/components/base/CharacterCard.vue"
import ChatWindow from "@/components/multiplay/ChatWindow.vue"
import FLInput from "@/components/base/FLInput.vue"

type HostState = "connecting" | "disconnected" | "connected" | "disconnecting"

/*
 * Vue component for joining an existing multiplayer session
 */
@Component({
  components: {
    FLInput,
    CharacterCard,
    ChatWindow,
  },
})
export default class JoinGame extends Vue {
  userName = ""
  roomName = ""
  playerType = "player"
  clientState: HostState = "disconnected"
  // character: CharacterData | null = null

  userList: any[] = []

  get character(): CharacterData | null {
    return this.$store.state.multiPlayerCharacter
  }
  set character(charData: CharacterData | null) {
    this.$store.commit(SET_MP_CHAR, charData)
  }

  get activeCharacters() {
    return this.$characterStore.activeCharacters
  }

  get busy() {
    return (
      this.clientState === "connecting" || this.clientState === "disconnecting"
    )
  }

  get connected() {
    return this.client.connected
  }

  @Watch("client.userList", { deep: true })
  updateUserList() {
    console.log("updating joingame userlist")
    this.userList = this.client.userList
  }

  get client() {
    return this.$store.state.client
  }

  get joinGameButtonText() {
    if (this.busy) {
      return {
        connecting: "Connecting",
        disconnecting: "Disconnecting",
        disconnected: "Join game",
        connected: "Disconnect",
      }[this.clientState]
    }
    if (this.connected) {
      return "Disconnect"
    }
    return "Join game"
  }

  get canJoin() {
    return !this.busy && this.userName && this.roomName
  }

  async joinGame() {
    this.clientState = "connecting"
    const client = await new Client().initPromise()

    console.log("joining with", this.userName, this.character)
    await client
      .join(this.roomName, this.userName, this.character as CharacterData)
      .then((client: Client) => {
        // this.client = client
        this.$store.commit(SET_CLIENT, client)
        this.clientState = "connected"
      })
      .catch((e: any) => {
        console.error("FIXME", e)
        this.clientState = "disconnected"
      })
  }

  async disconnectSession() {
    this.clientState = "disconnecting"
    await this.client.disconnect()
    this.clientState = "disconnected"
  }

  async onClickJoinGame() {
    if (!this.connected && this.canJoin) {
      await this.joinGame()
    } else if (this.connected) {
      await this.disconnectSession()
    }
  }

  pictureSelected(character: CharacterData) {
    if (
      this.character &&
      this.character.metadata.id === character.metadata.id
    ) {
      this.character = null
      this.userName = ""
    } else {
      this.character = character
      this.userName = character.name
    }
  }

  sendMsg(msg: string) {
    console.log("sending", msg)
    this.client.sendChat(msg)
  }

  mounted() {
    const firstChar = this.activeCharacters[0]
    this.character = firstChar
    this.userName = firstChar ? firstChar.name : ""
  }
}
</script>

<template>
  <div class="hostgame">
    <div v-if="!connected">
      <h4>Character<span class="red-star">*</span></h4>
      <div class="character-list">
        <div
          v-for="(charData, index) in activeCharacters"
          :key="'active' + index"
          :class="[
            'card-wrapper',
            character && character.metadata.id === charData.metadata.id
              ? 'selected'
              : 'invisiborder',
          ]"
          @click="() => pictureSelected(charData)"
        >
          <CharacterCard :clickDisabled="true" :charData="charData" />
        </div>
      </div>

      <div class="flexy">
        <FLInput
          class="flexy-item"
          label="Nickname"
          :required="true"
          :disabled="connected"
          :enterCb="onClickJoinGame"
          v-model="userName"
        />
        <FLInput
          class="flexy-item"
          label="Room"
          :required="true"
          :disabled="connected"
          :enterCb="onClickJoinGame"
          v-model="roomName"
        />
        <!-- TODO: Add password at some point? -->
        <!-- TODO: Enable others to join as GMs -->
      </div>
    </div>
    <div>
      <button
        v-if="!connected"
        :class="['button', 'flexy-button', connected ? 'button-danger' : '']"
        :disabled="!canJoin || connected"
        @click="onClickJoinGame"
      >
        {{ joinGameButtonText }}
      </button>
      <button
        v-if="connected"
        :class="['button', 'flexy-button', connected ? 'button-danger' : '']"
        :disabled="!connected"
        @click="disconnectSession"
      >
        {{ "Disconnect" }}
      </button>
    </div>

    <ChatWindow
      v-if="connected && client"
      :roomName="roomName"
      :userName="userName"
      :client="client"
    />

    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

h3 {
  margin-bottom: 0.5rem;
}
.flexy {
  margin: 0.5rem;
  display: inline-flex;
  flex-wrap: wrap;
  .flexy-item {
    flex: 1 1 auto;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
  }
}
.flexy-button {
  display: block;
  margin: 1rem 1rem 0 auto;
}

.flexy-col {
  display: flex;
  flex-direction: column;
}

.join_as {
  // justify-content: center;
  display: flex;
  align-items: center;
}

.character-list {
  display: flex;
  margin: 0.8rem;
  overflow-x: auto;
}

.red-star {
  color: @pastel-red;
}

.selected {
  border: 2px solid @pastel-green;
}
.invisiborder {
  border: 2px solid #0000;
}

.card-wrapper {
  padding: 5px;
  margin: 0 3px 10px 3px;
  width: 170px;
  flex: 0 0 auto;
}
</style>
