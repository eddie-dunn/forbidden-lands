<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import {
  CharacterData,
  CharacterTalent,
  Conditions,
} from "@/data/character/characterData"

import FLNumberInput from "@/components/FLNumberInput.vue"
import SvgIcon from "@/components/SvgIcon.vue"
import { DiceColor } from "@/components/dice/diceTypes"

@Component({
  components: {
    FLNumberInput,
    SvgIcon,
  },
})
export default class Dice extends Vue {
  @Prop({ required: true }) color!: DiceColor
  @Prop({ default: null }) value!: number

  whiteWash(diceName: string) {
    return this.color === "white" ? diceName + "-inverted" : diceName
  }

  get skullify() {
    return ["white", "black"].includes(this.color) ? "skulls-1" : "d6-1"
  }

  get swordify() {
    return ["white", "red", "black"].includes(this.color)
      ? "swords-1"
      : `swords-${this.value}`
  }
  get diceName() {
    if (!this.value) return this.baseIconName
    else if (this.value === 1) {
      return this.whiteWash(this.skullify)
    } else if (this.value < 6) {
      return this.whiteWash(`d6-${this.value}`)
    } else if (this.value === 6) {
      return this.whiteWash(this.swordify)
    }
    return `swords-${this.value}`
  }

  get baseIconName() {
    switch (this.color) {
      case "red":
      case "black":
        return "d6-6"
      case "white":
        return "d6-6-inverted"
      case "green":
        return "d8"
      case "blue":
        return "d10"
      case "orange":
        return "d12"
      default:
        return "alert-error"
    }
  }

  get title() {
    switch (this.color) {
      case "white":
        return this.$t("attributes")
      case "red":
        return this.$t("skills")
      case "black":
        return this.$t("Gear")
      case "green":
        return this.$t("mighty")
      case "blue":
        return this.$t("epic")
      case "orange":
        return this.$t("legendary")
      default:
        return "UNKNOWN"
    }
  }

  get diceClass() {
    return `dice-icon dice-${this.color}`
  }
}
</script>

<template>
  <SvgIcon :name="diceName" :title="title" :class="diceClass" />
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.dice {
  &-white {
    color: @slate-black;
  }
  &-black {
    color: black;
  }
  &-red {
    color: red;
  }
  &-green {
    color: green;
  }
  &-blue {
    color: blue;
  }
  &-orange {
    color: orange;
  }
}
</style>
