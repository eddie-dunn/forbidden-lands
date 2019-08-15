<template>
  <TemplateSelect
    :title="$t('Profession')"
    :diceValue="value.diceRoll"
    @randomClicked="randomClicked"
  >
    <div
      v-for="(professsion, index) in PROFESSION_66"
      @click="setKinWithValue(professsion.d_min)"
      v-bind:key="professsion + index"
    >
      <input
        :id="'template-' + professsion.id"
        type="radio"
        :value="professsion.id"
        :checked="professsion.id === value.id"
        @change="setKinWithValue(professsion.d_min)"
      />
      <span :class="professsion.id === value.id ? 'bold' : ''">
        {{ professsion.d_min }}-{{ professsion.d_max }}
        <label :for="'template-' + professsion.id">{{
          $t(professsion.id)
        }}</label>
      </span>
    </div>
  </TemplateSelect>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import TemplateSelect from "@/components/backstories/TemplateSelect.vue"
import {
  PROFESSION_66,
  TemplateItem,
} from "@/data/character_template/character_template"

import { rollProfession } from "@/components/backstories/characterTemplate.ts"

@Component({
  components: {
    TemplateSelect,
  },
})
export default class CharacterTemplateChildhood extends Vue {
  PROFESSION_66 = PROFESSION_66
  roll = rollProfession

  @Prop({ required: true }) value!: {
    id: string
    diceRoll: number
    result: TemplateItem
  }

  setKinWithValue(diceVal: number) {
    // professsion is set by 'rolling' with a fixed value
    this.$emit("input", this.roll(diceVal))
  }

  randomClicked() {
    this.$emit("input", this.roll())
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
