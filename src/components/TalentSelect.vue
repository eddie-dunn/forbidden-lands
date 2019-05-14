<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

@Component
export default class Talentelect extends Vue {
  @Prop() label!: string
  @Prop({ required: true }) talentOptions!: string
  @Prop({ required: true }) rankDisabled!: number[]

  // Initial data can be declared as instance properties
  selectedTalent = null
  talentRank = 1

  // Component methods can be declared as instance methods
  // onClick(): void {
  //   window.alert(this.message + this.exampleProperty)
  // }
  // isRankDisabled(index: number): boolean {
  //   console.log("index talent", index)
  //   return index != 22
  // }
}
</script>

<template>
  <div>
    <label for="class-talent">{{ label }}</label>
    <select id="class-talent" v-model="selectedTalent" required>
      <option
        v-for="talent in talentOptions"
        :key="talent.id"
        v-bind:value="talent.id"
      >
        {{ /*tName(talent)*/ talent.translation }}
      </option>
    </select>
    <span class="toggle">
      <input
        type="radio"
        name="classTalentRank"
        v-model.number="talentRank"
        value="1"
        checked="checked"
      />
      <label for="classTalentRank">1</label>
      <input
        type="radio"
        name="classTalentRank"
        v-model.number="talentRank"
        value="2"
        :disabled="rankDisabled"
      />
      <label for="classTalentRank">2</label>
    </span>
  </div>
</template>

<style lang="less"></style>
