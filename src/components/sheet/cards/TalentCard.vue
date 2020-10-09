<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import {
  CharacterData,
  CharacterTalent,
  validateTalents,
} from "@/data/character/characterData"

import FLNumberInput from "@/components/base/FLNumberInput.vue"
import Card from "@/components/Card.vue"
import TalentSelector from "@/components/TalentSelector.vue"

@Component({
  components: {
    Card,
    FLNumberInput,
    TalentSelector,
  },
})
export class TalentCard extends Vue {
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
  get saveStateId() {
    if (this.charData.metadata.status !== "active") return ""
    return "card_talent"
  }

  updateTalents(talents: CharacterTalent[]) {
    // this.$emit("talents-updated", talents)
    this.$set(this.charData, "talents", talents)
  }
}

export default TalentCard
</script>

<template>
  <Card
    class="row-half"
    :title="$t('talents')"
    :valid="talentsValid"
    :noSign="!isNewChar"
    :saveStateId="saveStateId"
  >
    <TalentSelector
      :key="talentSum"
      class="content"
      :charData="charData"
      @talents-updated="updateTalents"
    />
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
