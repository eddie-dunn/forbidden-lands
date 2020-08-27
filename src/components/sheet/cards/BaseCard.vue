<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import BaseSelector from "@/components/BaseSelector.vue"
import Card from "@/components/Card.vue"
import FlavorSelector from "@/components/FlavorSelector.vue"

import { CharacterData, validateBase } from "@/characterData"

@Component({
  components: {
    BaseSelector,
    Card,
    FlavorSelector,
  },
})
export class BaseCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  get status() {
    return this.charData.metadata.status
  }
  get valid() {
    return validateBase(this.charData)
  }
  get saveStateId() {
    if (this.charData.metadata.status !== "active") return ""
    return "card_base"
  }
}

export default BaseCard
</script>

<template>
  <Card
    :title="$t('character')"
    :valid="valid"
    :noSign="viewOnly || (valid && status !== 'new')"
    :saveStateId="saveStateId"
  >
    <BaseSelector :data="charData" :viewOnly="viewOnly" />
    <FlavorSelector
      :data="charData"
      :viewOnly="viewOnly"
      class="flavor-input"
    />
  </Card>
</template>

<style lang="less" scoped>
.flavor-input {
  margin: 1rem 0;
}
</style>
