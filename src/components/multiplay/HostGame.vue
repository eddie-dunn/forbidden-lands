<script lang="ts">
// TODO: Add better error handling

import Peer from "peerjs"
import { Component, Vue } from "vue-property-decorator"

import Host from "@/components/multiplay/host.ts"
import Client from "@/components/multiplay/client.ts"
import { randomName } from "@/components/multiplay/multi"
import { timeout } from "@/util.ts"

import ChatWindow from "@/components/multiplay/ChatWindow.vue"
import FLInput from "@/components/base/FLInput.vue"

async function createNewSession(
  client: Client,
  gameName: string,
  userName: string
) {
  await client.initPromise()
  const host = await new Host({
    onHosting: (gameName) => {
      client.join(gameName, userName, null)
    },
  }).connect(gameName)
  // TODO: Use async instead of 'onHosting' callback
  return { client, host }
}

async function disconnect(peer: Host | Client | null) {
  if (!peer) return null
  await peer.disconnect()
  return null
}

type HostState = "connecting" | "disconnected" | "connected" | "disconnecting"

/*
 * Vue component for creating and starting a multiplayer session
 */
@Component({
  components: {
    FLInput,
    ChatWindow,
  },
})
export default class HostGame extends Vue {
  host: Host | null = null
  client = this.$store.state.client

  gameName = randomName(3)
  userName = randomName(1)

  hostState: HostState = "disconnected"

  get busy() {
    return this.hostState === "connecting" || this.hostState === "disconnecting"
  }
  get connected() {
    return this.hostState === "connected"
  }
  get canHost() {
    return !this.busy && this.userName && this.hostState === "disconnected"
  }

  get hostGameButtonText() {
    return {
      connecting: "Connecting",
      disconnecting: "Disconnecting",
      disconnected: "Host game",
      connected: "Disconnect",
    }[this.hostState]
  }

  async createNewSession() {
    this.hostState = "connecting"
    const { host, client } = await createNewSession(
      this.$store.state.client,
      this.gameName,
      this.userName
    )
    this.host = host
    this.gameName = host.hostId || ""
    this.client = client
    this.hostState = "connected"
  }

  async disconnectSession() {
    this.hostState = "disconnecting"
    this.client = await disconnect(this.client)
    this.host = await disconnect(this.host)
    this.hostState = "disconnected"
  }

  async onClickHostGame() {
    if (this.canHost) {
      await this.createNewSession()
    } else if (this.hostState === "connected") {
      await this.disconnectSession()
    }
  }
}
</script>

<template>
  <div class="hostgame">
    <!-- spacer -->

    <div v-if="!connected" class="flexy">
      <FLInput
        class="flexy-item"
        label="Nickname"
        :required="true"
        :disabled="connected"
        :enterCb="onClickHostGame"
        v-model="userName"
      />
      <FLInput
        class="flexy-item"
        label="Room"
        placeholder="Empty => auto-select"
        :disabled="connected"
        :enterCb="onClickHostGame"
        v-model="gameName"
      />
      <!-- TODO: Add password at some point? -->
    </div>

    <button
      :class="[
        'button',
        'flexy-button',
        hostState === 'connected' ? 'button-danger' : '',
      ]"
      :disabled="!canHost && !connected"
      @click="onClickHostGame"
    >
      {{ hostGameButtonText }}
    </button>

    <ChatWindow v-if="connected" :userName="userName" :client="client" />

    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

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
  margin: 0.5rem 1rem 0 auto;
}
</style>
