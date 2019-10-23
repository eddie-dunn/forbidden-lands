<script lang="ts">
/* eslint-disable no-console */
import Peer from "peerjs"
import { Component, Vue, Prop, Watch } from "vue-property-decorator"

import { GET_ROOM_NAME } from "@/store/store.ts"
import {
  UserListMsg,
  ChatMessage,
  ServerMessage,
  User,
} from "@/components/multiplay/multi"
import Host from "@/components/multiplay/host.ts"
import Client from "@/components/multiplay/client.ts"

import FLInput from "@/components/base/FLInput.vue"
import CharacterCard from "@/components/base/CharacterCard.vue"

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
  @Prop({ required: true }) client!: Client

  chatMessage = ""

  get users(): User[] {
    return this.client.userList
  }

  get charList() {
    return this.users.filter((user: User) => {
      return user.peerId !== this.id && !!user.charData
    }) // Get all connected users except self
  }

  get id() {
    return this.client.clientId
  }

  get charData() {
    return this.$store.state.multiPlayerCharacter
  }

  get messages(): (ChatMessage | ServerMessage)[] {
    const chatBox = this.$refs.messageBox
    chatBox &&
      this.$nextTick(() => {
        ;(chatBox as any).scrollTop = (chatBox as any).scrollHeight
      })
    return this.client.chatMessages
  }

  get roomName() {
    return this.$store.getters[GET_ROOM_NAME]
  }

  thisUserClass(username: string): string {
    return this.userName === username ? "bold" : ""
  }

  formatUserName(user: User) {
    // TODO: Display user card
    if (!user.admin) return user.username
    return `GM ${user.username}`
  }

  formatChat(msg: ChatMessage | ServerMessage): string {
    if (msg.type === "server-message") {
      return `<< ${msg.message} >>`
    }
    return `${msg.username}: ${msg.message}`
  }

  _sendMsg(msg: string) {
    this.client.sendChat(msg)
    this.chatMessage = ""
  }
}
</script>

<template>
  <div class="multiplayer-chat">
    <div class="room-stats">Room name: {{ roomName }}</div>
    <div>Ping: FIXME</div>
    <h3>Characters</h3>
    <div class="character-list">
      <div class="card-wrapper" v-if="charData">
        <CharacterCard :clickDisabled="true" :charData="charData" />
      </div>
      <div
        v-for="(char, index) in charList"
        v-bind:key="index + char.peerId"
        class="card-wrapper"
      >
        <CharacterCard :clickDisabled="true" :charData="char.charData" />
      </div>
    </div>

    <h3>Users</h3>
    <div
      v-for="(user, index) in users"
      v-bind:key="index + user"
      :class="thisUserClass(user.username)"
    >
      {{ formatUserName(user) }}
    </div>

    <h3>Messages</h3>
    <div class="chat-box">
      <div class="message-box" ref="messageBox">
        <div
          v-for="(message, index) in messages"
          v-bind:key="index + message.message"
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
        <button class="button" @click="_sendMsg(chatMessage)">Send</button>
      </div>
      <div>HELLO {{ charList }}</div>
    </div>
  </div>

  <!-- spacer -->
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.send-chat {
  display: flex;
  margin: 1rem 0;
}

.chat-input {
  margin-right: 0.5rem;
  flex-grow: 1;
}

.chat-box {
  margin: 2rem;
}

.message-box {
  display: flex;
  flex-direction: column;
  height: 200px;
  overflow-y: scroll;
  border: 2px solid @pastel-green;
  padding: 1rem;
}

.message-item {
  font-family: "Courier New", Courier, monospace;
}

.character-list {
  display: flex;
  margin: 0.8rem;
  overflow-x: auto;
}

.card-wrapper {
  padding: 5px;
  margin: 0 3px 10px 3px;
  width: 170px;
  flex: 0 0 auto;
}
</style>
