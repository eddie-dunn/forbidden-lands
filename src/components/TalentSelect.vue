<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { TranslateResult } from "vue-i18n"

import {
  CharacterData,
  CharacterTalent,
  CharacterMetaDataStatus,
} from "@/characterData"
import {
  Age,
  KinName,
  TalentKin,
  Profession,
  TalentProfession,
  TalentAll,
} from "@/types"

interface TranslatedTalent {
  translation: string
  id: string
  rank: number | null | undefined
}

function talentsSortedByTranslation(
  vm: any, // Vue instance with $t function
  talents: CharacterTalent[]
): TranslatedTalent[] {
  const translationList = talents.map((talent) => {
    const translation: TranslateResult = String(vm.$t(talent.id))
    return { translation, id: talent.id, rank: talent.rank || 1 }
  })

  const sortedTalents = translationList.sort((item1, item2) => {
    return item1.translation < item2.translation ? -1 : 1
  })
  return sortedTalents
}

@Component
export default class Talentelect extends Vue {
  @Prop() label!: string
  @Prop({ required: true }) talentOptions!: CharacterTalent[]
  @Prop({ default: 3 }) maxTalentRank!: number
  @Prop({ default: null }) value!: string
  @Prop({ default: null }) talentRank!: number
  @Prop({ default: false }) disabled!: number

  selectedTalent = null

  get translatedTalents() {
    return talentsSortedByTranslation(this, this.talentOptions)
  }
  // talentRank = 1

  incTalent() {
    if (this.talentRank && this.talentRank < this.maxTalentRank) {
      // this.talentRank += 1
      this.$emit("rank-changed", this.talentRank + 1)
    }
  }

  decTalent() {
    if (this.talentRank > 1) {
      // this.talentRank -= 1
      this.$emit("rank-changed", this.talentRank - 1)
    }
  }

  talentChanged(ev: any) {
    this.$emit("input", ev.target.value)
  }
}
</script>

<template>
  <div>
    <label for="talent">{{ label }}</label>
    <!-- <select id="talent" v-model="selectedTalent" @input="talentChanged"> -->
    <select
      id="talent"
      v-bind:value="value"
      v-on:input="talentChanged"
      :disabled="disabled"
    >
      <option
        v-for="talent in translatedTalents"
        :key="talent.id"
        v-bind:value="talent.id"
      >
        {{ talent.translation }} {{ talentRank }}
      </option>
    </select>
    <span class="toggle">
      <button :disabled="disabled || this.talentRank <= 1" @click="decTalent">
        -
      </button>
      <button
        @click="incTalent"
        :disabled="disabled || this.talentRank >= this.maxTalentRank"
      >
        +
      </button>
    </span>
  </div>
</template>

<style lang="less"></style>
