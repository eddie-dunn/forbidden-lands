<template>
  <TemplateSelect
    :title="$t(value.id)"
    :diceValue="value.diceRoll"
    @randomClicked="randomClicked"
  >
    <div>{{ $t("Class talent") }}, {{ $t(professionId) }}</div>
    <div
      v-for="(talent, index) in characterTemplate.PROFESSION_TALENTS[
        professionId
      ]"
      @click="setTalent(talent, index)"
      v-bind:key="talent + index"
    >
      <input
        :id="'template-' + talent"
        type="radio"
        :value="talent"
        :checked="talent === value.id"
        @change="setTalent(talent, index)"
      />
      <span :class="talent === value.id ? 'bold' : ''">
        <label :for="'template-' + talent">
          {{ $t(talent) }}
        </label>
      </span>
    </div>
  </TemplateSelect>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { Profession } from "@/types.ts"

import TemplateSelect from "@/components/backstories/TemplateSelect.vue"
import { rollTalent } from "@/components/backstories/characterTemplate"
import characterTemplate, {
  TemplateItem,
} from "@/data/character_template/character_template"

import { rollDice } from "@/dice"

@Component({
  components: {
    TemplateSelect,
  },
})
export default class CharacterTemplateChildhood extends Vue {
  characterTemplate = characterTemplate

  @Prop({ required: true }) value!: { id: string; diceRoll: number }
  @Prop({ required: true }) professionId!: Profession

  setTalent(talentId: string, index: number) {
    const data = { id: talentId, diceRoll: (1 + index) * 2 - 1 }
    this.$emit("input", data)
  }

  randomClicked() {
    this.$emit("input", rollTalent(this.professionId))
  }

  @Watch("professionId")
  onProfessionChange() {
    this.randomClicked()
  }
}
</script>

<style scoped lang="less">
.template-grid {
  display: grid;
  grid-template-columns: min-content 2fr 1fr 1fr;
  grid-gap: 1rem;
  margin: 1rem;
  &-title {
    grid-column-start: 2;
    grid-column-end: -1;
  }
}

.bold {
  font-weight: bold;
}

.template-childhood {
  text-align: left;
}
</style>
