<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator"
import SvgIcon from "@/components/SvgIcon.vue"
import {
  ExpandableSection,
  EXPANDER_SLOT,
} from "@/components/ExpandableSection.vue"

import { capitalize } from "@/util/util"
import { DICE_TYPE } from "@/dice/diceTypes.ts"

@Component({
  components: {
    ExpandableSection,
    SvgIcon,
  },
})
export class DiceImg extends Vue {
  @Prop({ default: "white" }) diceType!: DICE_TYPE
  @Prop({ default: null }) value!: number | null
  @Prop({ default: "" }) nbrDice!: string

  get title() {
    switch (this.diceType) {
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

  get colorClass(): string {
    return `dice-${this.diceType}`
  }

  get imgName(): string {
    switch (this.diceType) {
      case DICE_TYPE.black:
      case DICE_TYPE.red:
        return "d6-6"
      case DICE_TYPE.white:
        return "d6-6-inverted"
      case DICE_TYPE.green:
        return "d8"
      case DICE_TYPE.blue:
        return "d10"
      case "orange":
      case DICE_TYPE.orange:
        return "d12"
      default:
        return "alert-error"
    }
  }

  whiteWash(diceName: string) {
    return this.diceType === "white" ? diceName + "-inverted" : diceName
  }

  get skullify() {
    return ["white", "black"].includes(this.diceType) ? "skulls-1" : "d6-1"
  }

  get swordify() {
    return ["white", "red", "black"].includes(this.diceType)
      ? "swords-1"
      : `swords-${this.value}`
  }

  get diceName() {
    if (!this.value) return this.imgName
    else if (this.value === 1) {
      return this.whiteWash(this.skullify)
    } else if (this.value < 6) {
      return this.whiteWash(`d6-${this.value}`)
    } else if (this.value === 6) {
      return this.whiteWash(this.swordify)
    }
    return `swords-${this.value}`
  }

  get cssProps() {
    return "--width: 2rem; --height: 2rem; --fontSize: 2rem;"
  }
}

export default DiceImg
</script>

<template>
  <div :class="['DiceImg-Box']" :style="cssProps">
    <label v-if="nbrDice !== null" class="label">{{ nbrDice }}</label>
    <SvgIcon :name="imgName" :title="title" :class="[colorClass, 'var-size']" />
  </div>
</template>

<style scoped lang="less">
@import "~Style/colors.less";

.DiceImg-Box {
  display: flex;
  align-items: center;
  font-size: var(--fontSize);
}

.dice {
  &-white,
  &-black {
    color: @slate-black;
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

.label {
  font-family: monospace;
}

.var-size {
  height: var(--height);
  width: var(--width);
}
</style>
