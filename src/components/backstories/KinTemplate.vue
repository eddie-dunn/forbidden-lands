<template>
  <!-- Kin  -->
  <TemplateSelect
    :title="$t(value.id)"
    :description="$t('Kin')"
    :diceValue="value.diceRoll"
    @randomClicked="randomClicked"
  >
    <div
      v-for="(kin, index) in KIN_66"
      @click="setKinWithValue(kin.d_min)"
      v-bind:key="kin + index"
    >
      <input
        :id="'template-' + kin.id"
        type="radio"
        :value="kin.id"
        :checked="kin.id === value.id"
        @change="setKinWithValue(kin.d_min)"
      />
      <span :class="kin.id === value.id ? 'bold' : ''">
        {{ kin.d_min }}-{{ kin.d_max }}
        <label class="capitalize" :for="'template-' + kin.id">
          {{ $t(kin.id) }}
        </label>
      </span>
    </div>
  </TemplateSelect>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import TemplateSelect from "@/components/backstories/TemplateSelect.vue"
import {
  KIN_66,
  TemplateItem,
} from "@/data/character_template/character_template"

import { rollKin } from "@/components/backstories/characterTemplate.ts"

@Component({
  components: {
    TemplateSelect,
  },
})
export default class CharacterTemplateChildhood extends Vue {
  KIN_66 = KIN_66

  @Prop({ required: true }) value!: {
    id: string
    diceRoll: number
    result: TemplateItem
  }

  setKinWithValue(diceVal: number) {
    // Kin is set by 'rolling' with a fixed value
    this.$emit("input", rollKin(diceVal))
  }

  randomClicked() {
    this.$emit("input", rollKin())
  }
}
</script>

<style scoped lang="less">
.kin-template-grid {
  // TODO
  display: grid;
}
</style>
