<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import {
  CharacterData,
  CharacterTalent,
  validateTalents,
} from "@/characterData"

import FLNumberInput from "@/components/FLNumberInput.vue"
import Card from "@/components/Card.vue"
import TalentSelector from "@/components/TalentSelector.vue"

@Component({
  components: {
    Card,
    FLNumberInput,
    TalentSelector,
  },
})
export default class TalentCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: true }) viewOnly!: boolean

  get isNewChar() {
    return this.charData.metadata.status === "new"
  }

  get talentsValid(): boolean {
    return validateTalents(this.charData)
  }

  get talentSum(): number {
    const sum = (acc: number, number: number) => Number(acc) + Number(number)
    return this.charData.talents
      .map((talent) => talent.rank || 0)
      .reduce(sum, 0)
  }

  updateTalents(talents: CharacterTalent[]) {
    // this.$emit("talents-updated", talents)
    this.$set(this.charData, "talents", talents)
  }
}
</script>

<template>
  <Card
    class="row-half"
    :title="$t('talents')"
    :valid="talentsValid"
    :noSign="!isNewChar"
  >
    <TalentSelector
      :key="talentSum"
      class="content"
      :charData="charData"
      @talents-updated="updateTalents"
    />

    <div v-if="!isNewChar" class="willpower">
      <label for="willpower">
        {{ $t("Willpower") }}
      </label>
      <FLNumberInput
        class="nbr-input"
        id="willpower"
        fontSize="1.7rem"
        min="0"
        max="10"
        :disabled="viewOnly"
        v-model="charData.willpower"
      />
    </div>
  </Card>
</template>

<style lang="less" scoped>
.willpower {
  text-align: center;
}
.nbr-input {
  justify-content: center;
}
</style>
