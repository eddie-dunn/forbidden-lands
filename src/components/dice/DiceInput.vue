<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import {
  CharacterData,
  CharacterTalent,
  Conditions,
} from "@/data/character/characterData"

import FLNumberInput from "@/components/FLNumberInput.vue"
import Dice from "./DiceType.vue"
import { DiceColor } from "./diceTypes"

@Component({
  components: {
    Dice,
    FLNumberInput,
  },
})
export default class DiceInput extends Vue {
  @Prop({ required: true }) color!: DiceColor
  @Prop({ default: "" }) value!: string
  @Prop({ default: () => {} }) rollCb!: () => {}
  @Prop({ default: () => {} }) pushCb!: () => {}

  emit($value: any) {
    this.$emit("input", $value)
  }
}
</script>

<template>
  <div class="dice-input">
    <label :for="color" class="dice-label">
      <Dice :color="color" class="dice-icon" />
    </label>
    <FLNumberInput
      :id="color"
      :value="value"
      @input="emit"
      min="0"
      max="99"
      :enterCb="rollCb"
      :ctrlEnterCb="pushCb"
    />
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.dice-icon,
.dice-label {
  height: 3rem;
  width: 3rem;
}
.dice-input {
  display: flex;
  flex: 1 1 30%;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    justify-content: flex-start;
  }
}
</style>
