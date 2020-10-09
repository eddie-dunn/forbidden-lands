<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { CharacterData, CharacterTalent } from "@/data/character/characterData"
import { Item } from "@/data/items/itemTypes"

import FLNumberInput from "@/components/base/FLNumberInput.vue"

@Component({
  components: {
    FLNumberInput,
  },
})
export class AnimalCompanionStats extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean
}
export default AnimalCompanionStats
</script>

<template>
  <div>
    <div class="name">
      <label for="animal-companion-name" class="block"> {{ $t("Name") }}</label>
      <input
        id="animal-companion-name"
        type="text"
        v-model="charData.animalCompanion.name"
        :disabled="viewOnly"
      />
    </div>

    <div class="attrib-row">
      <div>
        <label for="companion-strength" class="capitalize block">
          {{ $t("strength") }}
        </label>
        <FLNumberInput
          id="companion-strength"
          fontSize="1.7rem"
          v-model.number="charData.animalCompanion.strength"
          :disabled="viewOnly"
        />
      </div>
      <div>
        <label for="animal-companion-agility" class="capitalize block">
          {{ $t("agility") }}
        </label>
        <FLNumberInput
          id="animal-companion-agility"
          fontSize="1.7rem"
          v-model.number="charData.animalCompanion.agility"
          :disabled="viewOnly"
        />
      </div>
      <div>
        <label for="movement-rate" class="capitalize block">
          {{ $t("movement rate") }}
        </label>
        <FLNumberInput
          id="movement-rate"
          fontSize="1.7rem"
          v-model.number="charData.animalCompanion.movementRate"
          :disabled="viewOnly"
        />
      </div>
    </div>

    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.name {
  & > input {
    width: 100%;
  }
  margin-bottom: 1rem;
}

.attrib-row {
  & > div {
    display: inline-block;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
