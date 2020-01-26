<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { SET_PAGE_TITLE } from "@/store/store-types"
import Multiplayer from "@/components/multiplay/Multiplayer.vue"

@Component({
  components: {
    Multiplayer,
  },
})
export default class MultiplayerView extends Vue {
  mounted() {
    this.$store.commit(SET_PAGE_TITLE, "Multiplayer")
  }
}
</script>

<template>
  <div v-if="true">
    <Multiplayer />

    <!-- spacer -->
  </div>
</template>
