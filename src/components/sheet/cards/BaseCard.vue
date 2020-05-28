<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import AttributesCreate from "@/components/sheet/attributes/AttributesCreate.vue"
import AttributesActive from "@/components/sheet/attributes/AttributesActive.vue"
import BaseSelector from "@/components/BaseSelector.vue"
import Conditions from "@/components/Conditions.vue"
import Card from "@/components/Card.vue"
import FlavorSelector from "@/components/FlavorSelector.vue"

import {
  getNewCharacterData,
  CharacterData,
  CharacterTalent,
  validateBase,
  validateAttributes,
  validateTalents,
  validateSkills,
  CharacterMetaDataStatus,
  CharacterMetaData,
  calcCharacterXP,
} from "@/characterData"

@Component({
  components: {
    AttributesActive,
    AttributesCreate,
    BaseSelector,
    Card,
    Conditions,
    FlavorSelector,
  },
})
export default class BaseCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  get status() {
    return this.charData.metadata.status
  }
  get valid() {
    return validateBase(this.charData)
  }
  // Attributes
  get attributesEdit(): boolean {
    return ["new", undefined, "freeEdit"].includes(this.status)
  }
}
</script>

<template>
  <Card
    :title="$t('character')"
    :valid="valid"
    :noSign="viewOnly || (valid && status !== 'new')"
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
