<script lang="ts">
/* eslint-disable no-console */
import { Component, Vue } from "vue-property-decorator"
import Peer from "peerjs"

class Host {
  peer: Peer | null = null
  connections: Peer.DataConnection[] = []

  initialize() {
    this.peer = new Peer(undefined, {
      debug: 2,
    })

    this.peer.on("open", (id: string) => {
      console.log("my host id is:", id)
    })

    this.peer.on("connection", (conn: Peer.DataConnection) => {
      console.log("got connection from", conn.peer)

      // Add callbacks
      conn.on("data", (data: any) => {
        console.log("data received", data)
        this.broadcast(data)
        // TODO: don't broadcast data back to sender
      })
      this.connections.push(conn)
    })
    return this
  }
  broadcast(message: string) {
    console.log("broadcasting", message)
    this.connections.map((conn) => conn.send(message))
  }
}

class Client {
  client: Peer | null = null
  host: Peer.DataConnection | null = null

  initialize(destination: string) {
    this.client = new Peer(undefined, {
      debug: 2,
    })

    this.client.on("open", (id: string) => {
      console.log("my client id is:", id)
    })

    console.log("connecting to", destination)
    this.host = this.client.connect(destination)

    this.host.on("data", (data) => console.log("got data from host", data))
    return this
  }
  send(message: string) {
    console.log("sending", message)
    if (this.host) this.host.send(message)
  }
}
/**
 * https://github.com/jmcker/Peer-to-Peer-Cue-System/blob/master/send.html
 * https://github.com/jmcker/Peer-to-Peer-Cue-System/blob/master/receive.html
 *
 */

@Component({
  components: {},
})
export default class MultiplayerView extends Vue {
  gameName = ""
  hosting = false
  joining = false
  messages: string[] = []
  chatMessage = ""

  peerId = null
  connection = null
  // peer: FLPeer | null = null
  host: Host | null = null
  client: Client | null = null

  createGame() {
    console.log("create clicked")
    // this.peer = new FLPeer().initialize({ host: true })
    this.host = new Host().initialize()
    this.hosting = true
  }

  joinGame() {
    console.log("joining clicked")
    // this.peer = new FLPeer().initialize()
    // if (this.peer) {
    //   this.peer.join(this.gameName)
    //   this.joining = true
    // }
    this.client = new Client().initialize(this.gameName)
  }

  sendMsg() {
    console.log("sending message clicked")
    if (this.hosting && this.host) {
      this.host.broadcast(this.chatMessage)
    } else if (this.client) {
      this.client.send(this.chatMessage)
    }
    // if (this.peer) {
    //   this.peer.send(this.chatMessage)
    // }
    // this.messages.push(this.chatMessage)
    this.chatMessage = ""
  }
}
</script>

<template>
  <div class="multiplayer">
    <div v-if="!hosting">
      <h2>Join</h2>
      <label for="join-uuid">Session name</label>
      <input id="join-uuid" type="text" v-model="gameName" />
      <button @click="joinGame">Join game</button>
    </div>
    <div v-if="!joining">
      <h2>Host</h2>
      <button @click="createGame">Host game</button>
    </div>
    <div v-if="hosting || joining || true">
      <h3>Messages</h3>
      <div>{{ messages }}</div>
      <input v-model="chatMessage" type="text" />
      <button @click="sendMsg(chatMessage)">Send</button>
    </div>
  </div>
</template>
