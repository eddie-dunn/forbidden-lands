<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import {
  CharacterData,
  CharacterTalent,
  Conditions,
} from "@/data/character/characterData"

import { DiceColor } from "@/components/dice/diceTypes"
import SvgIcon from "@/components/SvgIcon.vue"
import Dice from "./DiceType.vue"

@Component({
  components: {
    Dice,
    SvgIcon,
  },
})
export default class DiceResult extends Vue {
  @Prop({ required: true }) color!: DiceColor
  @Prop({ required: true }) rolls!: number[]
}
</script>

<template>
  <div class="diceResult">
    <Dice
      v-for="(result, index) in rolls"
      v-bind:key="'result-' + color + index"
      :color="color"
      :value="result"
      class="dice-icon"
    />
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.dice-icon {
  height: 3rem;
  width: 3rem;
}
</style>
