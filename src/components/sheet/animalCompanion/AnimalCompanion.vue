<script lang="ts">
import Modal from "@/components/Modal.vue"
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { CharacterData, CharacterTalent } from "@/data/character/characterData"
import { Item } from "@/data/items/itemTypes"

import ModalAddItem from "@/components/gear/ModalAddItem.vue"
import FLNumberInput from "@/components/base/FLNumberInput.vue"
import FLButton from "@/components/base/FLButton.vue"

import { AnimalCompanionSkills } from "./AnimalCompanionSkills.vue"
import { AnimalCompanionStats } from "./AnimalCompanionStats.vue"

@Component({
  components: {
    FLButton,
    FLNumberInput,
    Modal,
    ModalAddItem,
    AnimalCompanionSkills,
    AnimalCompanionStats,
  },
})
export class AnimalCompanion extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  get hasMount() {
    return this.charData.mount.strength
  }
}

export default AnimalCompanion
</script>

<template>
  <div class="animal-companion">
    <div class="animal-stats">
      <AnimalCompanionStats :charData="charData" :viewOnly="viewOnly" />
      <AnimalCompanionSkills :charData="charData" :viewOnly="viewOnly" />
      <div class="animal-description">
        <label class="capitalize" for="description">
          {{ $t("description") }}
        </label>
        <textarea
          v-model="charData.animalCompanion.description"
          id="description"
          :disabled="viewOnly"
        />
      </div>
    </div>

    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.animal-stats {
  display: grid;
  grid-row-gap: 1rem;
}

.animal-description {
  display: flex;
  flex-direction: column;
}
</style>
