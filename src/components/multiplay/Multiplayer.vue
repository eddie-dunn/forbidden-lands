<script lang="ts">
/* eslint-disable no-console */
import Peer from "peerjs"
import { Component, Vue } from "vue-property-decorator"

import {
  UserListMsg,
  ChatMessage,
  ServerMessage,
  randomName,
} from "@/components/multiplay/multi"
import Host from "@/components/multiplay/host.ts"
import Client from "@/components/multiplay/client.ts"
import HostGame from "@/components/multiplay/HostGame.vue"
import JoinGame from "@/components/multiplay/JoinGame.vue"

import TabView from "@/components/base/TabView.vue"
import FLInput from "@/components/base/FLInput.vue"

@Component({
  components: {
    HostGame,
    JoinGame,
    TabView,
  },
})
export default class Multiplayer extends Vue {
  get views() {
    return [HostGame, JoinGame]
  }
}
</script>

<template>
  <div class="multiplayer">
    <TabView :views="views" />
    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.multiplayer {
  text-align: left;
  padding-bottom: 30vh;
}
</style>
