<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import CharacterBackstory from "@/components/backstories/CharacterBackstory.vue"

@Component({
  components: {
    CharacterBackstory,
  },
})
export default class CharacterTemplateView extends Vue {}
</script>

<template>
  <div class="character-template">
    <h1>Backstories</h1>
    <CharacterBackstory />
  </div>
</template>

<style scoped lang="less"></style>
