<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { CharacterData } from "@/data/character/characterData"

import Mount from "@/components/sheet/mount/Mount.vue"
import Card from "@/components/Card.vue"

@Component({
  components: {
    Mount,
    Card,
  },
})
export class MountCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: true }) viewOnly!: boolean

  get saveStateId() {
    if (this.charData.metadata.status !== "active") return ""
    return "card_mount"
  }
}

export default MountCard
</script>

<template>
  <Card
    class="row-full"
    :title="$t('Mount')"
    :noSign="true"
    :saveStateId="saveStateId"
  >
    <Mount :charData="charData" :viewOnly="viewOnly" />
  </Card>
</template>

<style lang="less" scoped></style>
