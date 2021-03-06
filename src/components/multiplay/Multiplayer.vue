<script lang="ts">
/* eslint-disable no-console */
import Peer from "peerjs"
import { Component, Vue } from "vue-property-decorator"

import { GET_MP_ACTIVE, MP_CHARS } from "@/store/store-types.ts"
import MultiplayerCharList from "@/components/multiplay/MultiplayerCharList.vue"
import ChatWindow from "@/components/multiplay/ChatWindow.vue"
import FLInput from "@/components/base/FLInput.vue"
import FLButton from "@/components/base/FLButton.vue"
import FLCheckbox from "@/components/base/FLCheckbox.vue"
import { UserData } from "@/components/multiplay/protocol"
import { randomName } from "@/util/util"

const REGEX_ROOM_NAME = /[^a-zA-Z -]/g

@Component({
  components: {
    ChatWindow,
    FLButton,
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
      this.validRoomName &&
      this.userName &&
      this.mpChars &&
      this.mpChars.length > 0
    )
  }
  get validRoomName(): boolean {
    if (!this.roomName) return false
    return !this.wrongChar
  }
  get wrongChar(): string {
    return [...(this.roomName.match(REGEX_ROOM_NAME) || [])].join("") || ""
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
        <small v-if="wrongChar">
          Room name cannot contain '{{ wrongChar }}'
        </small>
        <FLCheckbox
          class="flexy-item flexy-full-row"
          label="Host game"
          v-model="hostGame"
        />
        <!-- TODO: Add password at some point? -->
        <!-- TODO: Enable others to join as GMs -->
      </div>
      <FLButton
        :class="['flexy-button']"
        :disabled="!canJoin || connected"
        @click="onClickConnect"
      >
        {{ startGameText }}
      </FLButton>
    </div>

    <!-- Active game -->
    <div v-if="connected">
      <FLButton
        type="danger"
        :class="['flexy-button']"
        :disabled="!connected"
        @click="onClickDisconnect"
      >
        {{ "Disconnect" }}
      </FLButton>
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
