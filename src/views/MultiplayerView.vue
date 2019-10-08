<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Multiplayer from "@/components/multiplay/Multiplayer.vue"

@Component({
  components: {
    Multiplayer,
  },
})
export default class MultiplayerView extends Vue {}
</script>

<template>
  <div v-if="true">
    <h1>Multiplayer</h1>
    <Multiplayer />

    <!-- spacer -->
  </div>
</template>
