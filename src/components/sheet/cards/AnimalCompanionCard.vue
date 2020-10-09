<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { CharacterData } from "@/data/character/characterData"

import AnimalCompanion from "@/components/sheet/animalCompanion/AnimalCompanion.vue"
import Card from "@/components/Card.vue"

@Component({
  components: {
    AnimalCompanion,
    Card,
  },
})
export class MountCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: true }) viewOnly!: boolean

  get saveStateId() {
    if (this.charData.metadata.status !== "active") return ""
    return "card_animal-companion"
  }
}

export default MountCard
</script>

<template>
  <Card
    class="row-full"
    :title="$t('animal companion')"
    :noSign="true"
    :saveStateId="saveStateId"
  >
    <AnimalCompanion :charData="charData" :viewOnly="viewOnly" />
  </Card>
</template>

<style lang="less" scoped></style>
