<script lang="ts">
/* eslint-disable no-console */
import Peer from "peerjs"
import { Component, Vue } from "vue-property-decorator"

import {
  ConnectMessage,
  ChatMessage,
  ServerMessage,
} from "@/components/multiplay/multi"
import Host from "@/components/multiplay/host.ts"
import Client from "@/components/multiplay/client.ts"

import FLInput from "@/components/base/FLInput.vue"

const NAMES = [
  "aclie",
  "alice",
  "bob",
  "charles",
  "engelbrekt",
  "hogan",
  "johnny",

  // radio
  "alpha",
  "bravo",
  "charlie",
  "delta",
  "echo",
  "foxtrot",
  "golf",
  "hotel",
  "india",
  "juliet",
  "kilo",
  "lima",
  "mike",
]

function randomName(names: string[]) {
  const name = names[Math.floor(Math.random() * names.length)]
  return name
}

@Component({
  components: {
    FLInput,
  },
})
export default class Multiplayer extends Vue {
  gameName = ""
  userName = randomName(NAMES)
  messages: string[] = []
  users: string[] = []
  chatMessage = ""

  peerId = null
  connection = null
  host: Host | null = null
  client: Client | null = null

  appendMessage(data: ChatMessage) {
    this.messages.push(`${data.username}: ${data.message}`)
  }
  handleServerMessage(data: ServerMessage) {
    this.messages.push(`* ${data.message} *`)
  }

  logGeneral(data: any) {
    this.messages.push(data)
  }

  updateUsers(connectMessage: ConnectMessage) {
    this.users = connectMessage.peers.map((client) => {
      return client.username
    })
    // console.log("connected users", this.users)
  }

  mounted() {
    const client = new Client({
      receiveMsgCb: this.appendMessage,
      connectionCb: this.updateUsers,
      handleServerMessage: this.handleServerMessage,
    })
    this.client = client
    // client.initPromise().then((client: Client) => {
    //   console.log("client initiated", client)
    //   this.client = client
    // })
    // this.client = await client.initPromise()
  }

  async getNewClient() {
    const client = new Client({
      receiveMsgCb: this.appendMessage,
      connectionCb: this.updateUsers,
      handleServerMessage: this.handleServerMessage,
    })
    return await client.initPromise()
  }

  /* Start hosting a session, then connect to it with a client */
  async createSession() {
    const client = await this.getNewClient()
    this.client = client

    this.host = new Host({
      onHosting: (gameName) => {
        console.log(">>>>> Hosting", gameName)
        client.join(gameName, this.userName)
      },
    }).connect(this.gameName)
  }

  /* Connect to an existing session */
  joinGame(gameName: string) {
    console.log("joining", gameName)
    this.client = new Client({
      receiveMsgCb: this.appendMessage,
      connectionCb: this.updateUsers,
    })
      .init()
      .join(gameName, this.userName)
  }

  disconnect() {
    ;[this.client, this.host].map((conn) => {
      if (conn) {
        conn.disconnect()
      }
    })
    // this.host = null
    // this.client = null
    this.messages = []
  }

  sendMsg() {
    console.log("sending message clicked")
    if (!this.client) return
    this.client.sendChat(this.chatMessage)
    this.chatMessage = ""
  }

  get connected() {
    return this.clientConnected || this.hosting
  }
  get clientConnected() {
    return !!this.client && this.client.connected
  }
  get hosting() {
    return !!this.host && this.host.connected
  }
}
</script>

<template>
  <div class="multiplayer">
    <div v-if="!connected">
      <div class="grid2col">
        <FLInput label="Nickname" id="user-name" v-model="userName" />
        <FLInput
          label="Room name"
          placeholder="Leave empty to auto-assign"
          id="join-uuid"
          v-model="gameName"
          :enterCb="() => joinGame(gameName)"
        />
      </div>
      <button :disabled="!userName" @click="() => joinGame(gameName)">
        Join game
      </button>
      <button :disabled="!userName" @click="createSession">Host game</button>
    </div>

    <div v-if="connected" class="connection-box">
      <div>Nickname: {{ userName }}</div>
      <div>
        <div v-if="hosting">Room id: {{ host.hostId }}</div>
        <div v-if="clientConnected">User id: {{ client.clientId }}</div>
      </div>
      <button class="button button-danger" @click="disconnect">
        Disconnect
      </button>
    </div>

    <!-- Chatroom -->
    <div v-if="clientConnected">
      <h3>Users</h3>
      <!-- TODO: vbind on peerID -->
      <div v-for="(user, index) in users" v-bind:key="index + user">
        {{ user === userName ? `* ${user}` : user }}
      </div>
      <h3>Messages</h3>
      <div v-for="(message, index) in messages" v-bind:key="index + message">
        {{ message }}
      </div>
      <div class="send-chat">
        <input
          v-model="chatMessage"
          type="text"
          v-on:keyup.enter.exact="sendMsg(chatMessage)"
        />
        <button class="button" @click="sendMsg(chatMessage)">Send</button>
      </div>
    </div>

    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.grid2col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
  grid-gap: 1rem;
  margin: 1rem;
}

.connection-box {
  text-align: left;
}

.multiplayer {
  text-align: left;
}

.send-chat {
  display: flex;
  align-items: stretch;
  input {
    margin-right: 1rem;
  }
}
</style>
