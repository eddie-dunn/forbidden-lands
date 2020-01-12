<script lang="ts">
/* eslint-disable no-console */
import Peer from "peerjs"
import { Component, Vue } from "vue-property-decorator"

import { GET_MP_ACTIVE, MP_CHARS } from "@/store/store-types.ts"
import MultiplayerCharList from "@/components/multiplay/MultiplayerCharList.vue"
import ChatWindow from "@/components/multiplay/ChatWindow.vue"
import FLInput from "@/components/base/FLInput.vue"
import FLCheckbox from "@/components/base/FLCheckbox.vue"
import { UserData } from "@/components/multiplay/protocol"
import { randomName } from "@/util"

@Component({
  components: {
    ChatWindow,
    FLCheckbox,
    FLInput,
    MultiplayerCharList,
  },
})
export default class Multiplayer extends Vue {
  roomName: string = randomName(3)
  userName: string = randomName(2)
  hostGame: boolean = false

  get connected() {
    return this.$store.getters[GET_MP_ACTIVE]
  }
  get startGameText() {
    return this.hostGame ? "Host game" : "Join game"
  }
  get mpChars() {
    return this.$store.state[MP_CHARS]
  }
  get userData(): UserData {
    return {
      characters: this.mpChars,
      peerId: "",
      role: "player",
      origin: "FLC",
      username: this.userName,
    }
  }
  get canJoin(): boolean {
    return (
      this.roomName && this.userName && this.mpChars && this.mpChars.length > 0
    )
  }

  async onClickConnect() {
    const payload = {
      userData: this.userData,
      roomName: this.roomName,
    }
    if (this.hostGame) {
      // Host game
      return await this.$store.dispatch("hostGame", payload)
    } else {
      // Join game
      return await this.$store.dispatch("joinGame", payload)
    }
  }
  async onClickDisconnect() {
    await this.$store.state.client.stop()
    if (this.$store.state.host.connected) {
      await this.$store.state.host.stop()
    }
  }
}
</script>

<template>
  <div class="multiplayer">
    <!-- <TabView :views="views" :disabled="activeConnection" /> -->

    <!-- Create game -->
    <div v-if="!connected">
      <h3 class="capitalize-first">
        {{ $t("select character") }} <span class="required">*</span>
      </h3>
      <MultiplayerCharList />
      <div class="flexy">
        <FLInput
          class="flexy-item flexy-auto-row"
          label="Nickname"
          :required="true"
          :disabled="connected"
          :enterCb="onClickConnect"
          v-model="userName"
        />
        <FLInput
          class="flexy-item flexy-auto-row"
          label="Room"
          :required="true"
          :disabled="connected"
          :enterCb="onClickConnect"
          v-model="roomName"
        />
        <FLCheckbox
          class="flexy-item flexy-full-row"
          label="Host game"
          v-model="hostGame"
        />
        <!-- TODO: Add password at some point? -->
        <!-- TODO: Enable others to join as GMs -->
      </div>
      <button
        :class="['button', 'flexy-button', connected ? 'button-danger' : '']"
        :disabled="!canJoin || connected"
        @click="onClickConnect"
      >
        {{ startGameText }}
      </button>
    </div>

    <!-- Active game -->
    <div v-if="connected">
      <button
        :class="['button', 'flexy-button', connected ? 'button-danger' : '']"
        :disabled="!connected"
        @click="onClickDisconnect"
      >
        {{ "Disconnect" }}
      </button>
      <MultiplayerCharList />
      <ChatWindow :userName="userName" />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.multiplayer {
  text-align: left;
  padding-bottom: 30vh;
  margin: 0 0.5rem;
}

.required {
  color: @pastel-red;
}

h3 {
  margin-bottom: 0.5rem;
}

.flexy {
  margin: 0.5rem 0;
  display: inline-flex;
  flex-wrap: wrap;
  .flexy-item {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
  }
  &-auto-row {
    flex: 1 1 auto;
  }
  &-full-row {
    flex: 1 1 100%;
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
</style>
