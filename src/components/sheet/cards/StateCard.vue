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
} from "@/data/character/characterData"
import FLNumberInput from "@/components/base/FLNumberInput.vue"

@Component({
  components: {
    AttributesCreate,
    AttributesActive,
    BaseSelector,
    Card,
    Conditions,
    FLNumberInput,
  },
})
export class PropertiesCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  get status() {
    return this.charData.metadata.status
  }
  get valid() {
    return validateAttributes(this.charData)
  }
  get saveStateId() {
    if (this.charData.metadata.status !== "active") return ""
    return "card_properties"
  }
  // Attributes
  get attributesEdit(): boolean {
    return ["new", undefined, "freeEdit"].includes(this.status)
  }
}

export default PropertiesCard
</script>

<template>
  <Card
    :title="$t('properties')"
    :valid="valid"
    :noSign="viewOnly || (valid && status !== 'new')"
    :saveStateId="saveStateId"
  >
    <div class="state-contents">
      <div>
        <AttributesCreate
          v-if="attributesEdit"
          :charData="charData"
          :viewOnly="viewOnly"
        />
        <AttributesActive v-else :charData="charData" :viewOnly="viewOnly" />
      </div>

      <div v-if="status !== 'new'">
        <Conditions
          :conditions="this.charData.conditions || {}"
          :viewOnly="viewOnly"
          v-model="charData.conditions"
        />
      </div>

      <div v-if="status !== 'new'" class="willpower">
        <label for="willpower">
          {{ $t("Willpower") }}
        </label>
        <FLNumberInput
          class="willpower-input"
          id="willpower"
          fontSize="1.7rem"
          min="0"
          max="10"
          :disabled="viewOnly"
          v-model.number="charData.willpower"
        />
      </div>
    </div>
  </Card>
</template>

<style lang="less" scoped>
.state-contents {
  // display: flex;
  // flex-direction: column;
  // // justify-content: center;
  display: grid;
  grid-gap: 0.5rem;
}

.willpower {
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  &-input {
    display: inline-block;
  }
}
</style>
