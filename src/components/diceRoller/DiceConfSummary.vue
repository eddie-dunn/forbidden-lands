<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator"
import SvgIcon from "@/components/SvgIcon.vue"
import {
  ExpandableSection,
  EXPANDER_SLOT,
} from "@/components/ExpandableSection.vue"
import { DICE_TYPE, IDiceConfig } from "@/dice/diceTypes"

import { DiceImg } from "@/components/diceRoller/DiceImg.vue"

@Component({
  components: {
    ExpandableSection,
    DiceImg,
  },
})
export class DiceConfSummary extends Vue {
  @Prop({ default: null }) diceConf!: IDiceConfig

  get diceSummary(): { diceType: DICE_TYPE; nbrDice: number }[] {
    const mList = Object.entries(this.diceConf).map(([key, val]) => {
      return {
        diceType: key as DICE_TYPE,
        nbrDice: val as number,
      }
    })
    return mList.filter((i) => i.nbrDice > 0)
  }
}

export default DiceConfSummary
</script>

<template>
  <div v-if="diceSummary.length" class="DiceConfSummary-Box">
    <DiceImg
      v-for="(item, index) in diceSummary"
      :key="index"
      :diceType="item.diceType"
      :nbrDice="item.nbrDice"
    />
  </div>
  <div v-else class="DiceConfSummary-Box">
    <DiceImg :diceType="'white'" :nbrDice="0" />
  </div>
</template>

<style scoped lang="less">
@import "~Style/colors.less";

.DiceConfSummary-Box {
  color: @color-text;
  // display: grid;
  // grid-gap: 0.5rem;
  // grid-auto-flow: column;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  font-size: 2rem;
  div:not(:first-child) > {
    border-left: 1px solid #0001;
    margin-left: 5px;
    padding-left: 5px;
  }
}
</style>
