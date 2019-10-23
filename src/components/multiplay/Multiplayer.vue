<script lang="ts">
/* eslint-disable no-console */
import Peer from "peerjs"
import { Component, Vue } from "vue-property-decorator"

import { GET_MP_ACTIVE } from "@/store/store.ts"
import {
  UserListMsg,
  ChatMessage,
  ServerMessage,
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
    return [
      { name: "Host game", component: HostGame },
      { name: "Join game", component: JoinGame },
    ]
  }
  get activeConnection() {
    return this.$store.getters[GET_MP_ACTIVE]
  }
}
</script>

<template>
  <div class="multiplayer">
    <TabView :views="views" :disabled="activeConnection" />
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
