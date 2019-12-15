<script lang="ts">
/* eslint-disable no-console */
import Peer from "peerjs"
import { Component, Vue, Prop, Watch } from "vue-property-decorator"

import {
  GET_MP_ACTIVE,
  GET_ROOM_NAME,
  SET_OTHER_CHARS,
} from "@/store/store-types.ts"
import { FLPlayer, ChatMessage } from "@/components/multiplay/fl-node"

import FLInput from "@/components/base/FLInput.vue"
import CharacterCard from "@/components/base/CharacterCard.vue"
import { Protocol, ProtocolTypes, UserData } from "./protocol"

/*
 * Vue component for displaying chat messages
 */
@Component({
  components: {
    CharacterCard,
    FLInput,
  },
})
export default class ChatWindow extends Vue {
  @Prop({ required: true }) userName!: string
  @Prop({ required: false }) admins!: string[]

  get client(): FLPlayer {
    return this.$store.state.client
  }

  chatMessage = ""

  get users(): UserData[] {
    return this.client.users
  }

  get id() {
    return this.client.peerId
  }

  get charData() {
    return this.$store.state.multiPlayerCharacter
  }

  /** Return chat messages. Has side effect of scrolling down chat container. */
  get messages(): ChatMessage[] {
    const chatBox = this.$refs.messageBox as any
    chatBox &&
      this.$nextTick(() => {
        chatBox.scrollTop = chatBox.scrollHeight
      })
    return this.client.messages
  }

  get roomName() {
    return this.$store.getters[GET_ROOM_NAME]
  }
  get mpActive() {
    return this.$store.getters[GET_MP_ACTIVE]
  }

  nameIsBold(user: UserData): string {
    return this.id === user.peerId ? "bold" : ""
  }

  formatUserName(user: UserData) {
    if (["gm", "admin"].includes(user.role)) {
      return `GM ${user.username}`
    }
    return user.username
  }

  formatChat(chat: ChatMessage): string {
    if (chat.message.type === "!? server chat") {
      return `<< ${chat.message.msg} >>`
    }
    return `${chat.username}: ${chat.message.msg}`
  }

  _sendMsg(msg: string) {
    if (!msg) return
    const chatMsg: Protocol.Chat = {
      type: ProtocolTypes.chat,
      msg,
      from: this.id,
      to: null,
    }
    this.client.broadcast(chatMsg)
    this.chatMessage = ""
  }
}
</script>

<template>
  <div class="multiplayer-chat">
    <div class="userlist border">
      <!-- TODO: make drawer on small screen sizes -->
      <div
        v-for="(user, index) in users"
        v-bind:key="index + user"
        :class="[nameIsBold(user), 'username']"
      >
        {{ formatUserName(user) }}
      </div>
    </div>

    <div class="chat-box">
      <div class="message-box border" ref="messageBox">
        <div
          v-for="(message, index) in messages"
          v-bind:key="'chat' + index"
          class="message-item"
        >
          {{ formatChat(message) }}
        </div>
      </div>

      <div class="send-chat">
        <input
          class="chat-input"
          v-model="chatMessage"
          type="text"
          v-on:keyup.enter.exact="_sendMsg(chatMessage)"
        />
        <button
          class="button chat-button"
          :disabled="!chatMessage"
          @click="_sendMsg(chatMessage)"
        >
          >
        </button>
      </div>
    </div>
  </div>

  <!-- spacer -->
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.send-chat {
  display: flex;
  margin-top: 0.5rem;
}

.border {
  border: 2px solid @pastel-green;
}

.chat-input {
  flex-grow: 1;
  width: 10ch;
}

.chat-button {
  padding: 0 1rem;
}

.message-box {
  display: flex;
  flex-direction: column;
  height: 200px;
  overflow-y: scroll;
  padding: 0.4rem;
}

.message-item {
  font-family: "Courier New", Courier, monospace;
}

.multiplayer-chat {
  display: grid;
  grid-template-columns: minmax(10ch, 1fr) 3fr;
  grid-gap: 0.5rem;
  margin: 0.5rem;
}

.userlist {
  overflow-x: hidden;
  overflow-y: auto;
}
.username {
  margin: 0.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
