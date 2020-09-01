<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { CharData } from "@/characterData"

import GearPicker from "@/components/GearPicker.vue"
import Card from "@/components/Card.vue"

@Component({
  components: {
    GearPicker,
    Card,
  },
})
export class GearCard extends Vue {
  @Prop({ required: true }) charData!: CharData
  @Prop({ default: false }) viewOnly!: boolean

  get saveStateId() {
    if (this.charData.metadata.status !== "active") return ""
    return "card_gear"
  }
}

export default GearCard
</script>

<template>
  <Card
    class="row-full"
    :title="$t('Gear')"
    :noSign="true"
    :saveStateId="saveStateId"
  >
    <GearPicker :charData="charData" :viewOnly="viewOnly" />
  </Card>
</template>

<style lang="less" scoped></style>
