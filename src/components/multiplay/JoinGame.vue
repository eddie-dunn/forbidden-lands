<script lang="ts">
/* eslint-disable no-console */
import Peer from "peerjs"
import { Component, Vue, Watch } from "vue-property-decorator"

import {
  UserListMsg,
  ChatMessage,
  ServerMessage,
  randomName,
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
  character: CharacterData | null = null
  client = new Client()

  userList: any[] = []

  get activeCharacters() {
    return this.$characterStore.activeCharacters
  }

  get busy() {
    return (
      this.clientState === "connecting" || this.clientState === "disconnecting"
    )
  }

  get connected() {
    return this.clientState === "connected"
  }

  // get userList() {
  //   console.log("get userlist")
  //   return this.client.userList
  // }

  @Watch("client.userList", { deep: true })
  updateUserList() {
    console.log("updating joingame userlist")
    this.userList = this.client.userList
  }

  get joinGameButtonText() {
    return {
      connecting: "Connecting",
      disconnecting: "Disconnecting",
      disconnected: "Join game",
      connected: "Disconnect",
    }[this.clientState]
  }

  async joinGame() {
    this.clientState = "connecting"
    const client = await new Client().initPromise()
    await client.join(this.roomName, this.userName)
    this.client = client
    this.clientState = "connected"
  }

  async disconnectSession() {
    this.clientState = "disconnecting"
    await this.client.disconnect()
    this.clientState = "disconnected"
  }

  async onClickJoinGame() {
    // const from =
    //   this.clientState === "disconnected" ? "connecting" : "disconnecting"
    // const to =
    //   this.clientState === "disconnected" ? "connected" : "disconnected"
    // this.clientState = from
    // await timeout(500)
    // this.clientState = to
    if (this.clientState === "disconnected") {
      await this.joinGame()
    } else if (this.clientState === "connected") {
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
    <div>
      <h3>Character<span class="red-star">*</span></h3>
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
    </div>
    <div class="flexy">
      <FLInput
        class="flexy-item"
        label="Nickname"
        :required="true"
        :disabled="connected"
        v-model="userName"
      />
      <FLInput
        class="flexy-item"
        label="Room"
        :required="true"
        :disabled="connected"
        v-model="roomName"
      />
      <!-- TODO: Add password at some point? -->
      <!-- TODO: Enable players to join as GMs -->
    </div>
    <div>
      <button
        :class="[
          'button',
          'flexy-button',
          clientState === 'connected' ? 'button-danger' : '',
        ]"
        :disabled="busy || !userName || !roomName"
        @click="onClickJoinGame"
      >
        {{ joinGameButtonText }}
      </button>
    </div>

    <ChatWindow
      v-if="connected"
      :sendMsg="sendMsg"
      :users="userList"
      :messages="[]"
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
