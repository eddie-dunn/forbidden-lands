<script lang="ts">
/* eslint-disable no-console */
import Peer from "peerjs"
import { Component, Vue, Prop, Watch } from "vue-property-decorator"

import {
  UserListMsg,
  ChatMessage,
  ServerMessage,
  randomName,
} from "@/components/multiplay/multi"
import Host from "@/components/multiplay/host.ts"
import Client from "@/components/multiplay/client.ts"

import FLInput from "@/components/base/FLInput.vue"

/*
 * Vue component for displaying chat messages
 */
@Component({
  components: {
    FLInput,
  },
})
export default class ChatWindow extends Vue {
  // TODO: Update component to take a Client object instead?
  // @Prop({ required: true }) users!: string[]
  // @Prop({ required: true }) messages!: string[]
  @Prop({ required: true }) userName!: string[]
  // @Prop({ required: true }) sendMsg!: (msg: string) => {}
  @Prop({ required: true }) client!: Client

  // @Watch("client.userList", { deep: true })
  // updateUserList() {
  //   console.log("updating joingame userlist")
  //   this.users = this.client.userList
  // }

  get users() {
    return this.client.userList
  }

  get messages(): ChatMessage[] {
    return this.client.chatMessages
  }

  chatMessage = ""
  // messages = []

  _sendMsg(msg: string) {
    // this.sendMsg(msg)
    this.client.sendChat(msg)
    this.chatMessage = ""
  }
}
</script>

<template>
  <div class="multiplayer-chat">
    <!-- Chatroom -->
    <h3>Users</h3>
    <!-- TODO: vbind on peerID -->
    <div v-for="(user, index) in users" v-bind:key="index + user">
      {{ user.username === userName ? `* ${user.username}` : user.username }}
    </div>
    <h3>Messages</h3>
    <div
      v-for="(message, index) in messages"
      v-bind:key="index + message.username"
    >
      {{ message.username }}: {{ message.message }}
    </div>
    <div class="send-chat">
      <input
        v-model="chatMessage"
        type="text"
        v-on:keyup.enter.exact="_sendMsg(chatMessage)"
      />
      <button class="button" @click="_sendMsg(chatMessage)">Send</button>
    </div>
  </div>

  <!-- spacer -->
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
</style>
