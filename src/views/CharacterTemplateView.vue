<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { SET_PAGE_TITLE } from "@/store/store-types"
import CharacterBackstory from "@/components/backstories/CharacterBackstory.vue"

@Component({
  components: {
    CharacterBackstory,
  },
})
export default class CharacterTemplateView extends Vue {
  mounted() {
    this.$store.commit(SET_PAGE_TITLE, "Template")
  }
}
</script>

<template>
  <section class="character-template-view">
    <CharacterBackstory />
  </section>
</template>

<style scoped lang="less">
.character-template-view {
  display: flex;
  flex: 1 1 auto;
}
</style>
