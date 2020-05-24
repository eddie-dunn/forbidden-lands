<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import AttributesCreate from "@/components/sheet/attributes/AttributesCreate.vue"
import AttributesActive from "@/components/sheet/attributes/AttributesActive.vue"
import BaseSelector from "@/components/BaseSelector.vue"
import Conditions from "@/components/Conditions.vue"
import Card from "@/components/Card.vue"
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
    AttributesCreate,
    AttributesActive,
    BaseSelector,
    Card,
    Conditions,
  },
})
export default class BaseCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  get status() {
    return this.charData.metadata.status
  }
  get valid() {
    return validateAttributes(this.charData) && validateBase(this.charData)
  }
  // Attributes
  get attributesEdit(): boolean {
    return ["new", undefined, "freeEdit"].includes(this.status)
  }
}
</script>

<template>
  <Card
    :title="$t('Base data')"
    :valid="valid"
    :noSign="viewOnly || (valid && status !== 'new')"
  >
    <BaseSelector :data="charData" :viewOnly="viewOnly" />

    <div class="base-data-sub">
      <div>
        <AttributesCreate
          v-if="attributesEdit"
          :charData="charData"
          :viewOnly="viewOnly"
        />
        <AttributesActive v-else :charData="charData" :viewOnly="viewOnly" />
      </div>
      <div v-if="status !== 'new'">
        <h4>{{ $t("Conditions") }}</h4>
        <Conditions
          :conditions="this.charData.conditions || {}"
          :viewOnly="viewOnly"
          v-model="charData.conditions"
        />
      </div>
    </div>
  </Card>
</template>

<style lang="less" scoped></style>
