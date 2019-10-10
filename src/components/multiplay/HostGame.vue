<script lang="ts">
/* eslint-disable no-console */
import Peer from "peerjs"
import { Component, Vue } from "vue-property-decorator"

import Host from "@/components/multiplay/host.ts"
import Client from "@/components/multiplay/client.ts"
import { randomName } from "@/components/multiplay/multi"
import { timeout } from "@/util.ts"

import ChatWindow from "@/components/multiplay/ChatWindow.vue"
import FLInput from "@/components/base/FLInput.vue"

async function createNewSession(gameName: string, userName: string) {
  const client = await new Client().initPromise()
  const host = await new Host({
    onHosting: (gameName) => {
      console.log(">>>>> Hosting", gameName)
      client.join(gameName, userName)
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
  client: Client | null = null

  gameName = ""
  userName = randomName()

  hostState: HostState = "disconnected"

  get busy() {
    return this.hostState === "connecting" || this.hostState === "disconnecting"
  }
  get connected() {
    return this.hostState === "connected"
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
      this.gameName,
      this.userName
    )
    this.host = host
    console.log("setting host id", host.hostId)
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
    if (this.hostState === "disconnected") {
      await this.createNewSession()
    } else if (this.hostState === "connected") {
      this.disconnectSession()
    }
  }
}
</script>

<template>
  <div class="hostgame">
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
        placeholder="Empty => auto-select"
        :disabled="connected"
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
      :disabled="busy || !userName"
      @click="onClickHostGame"
    >
      {{ hostGameButtonText }}
    </button>
    <div v-if="connected">
      <div>
        <input type="checkbox" name="allow-other-gms" id="allow-other-gms" />
        <label for="allow-other-gms">Allow other GMs</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="allow-more-players"
          id="allow-more-players"
        />
        <label for="allow-more-players">Players can join</label>
      </div>
    </div>

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
