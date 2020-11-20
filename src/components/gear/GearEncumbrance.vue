<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

import { CharData } from "@/data/character/characterData"
import { Item, ItemWeapon } from "@/data/items/itemTypes"

@Component({
  components: {},
})
export class GearEncumbrance extends Vue {
  @Prop({ default: null }) charData!: CharData

  get gearWeight() {
    return (
      this.charData.gear.inventory
        .map((item: Item) => Number(item.weight))
        .reduce((val, sum) => val + sum, 0) +
      Object.values(this.charData.gear.money)
        .map((moneyAmount) => Math.floor(moneyAmount / 100))
        .reduce((val, sum) => val + sum, 0)
    )
  }

  get gearWeightMax() {
    const packRatRank =
      this.charData.talents
        .map((talent) => {
          if (talent.id === "pack rat") return talent.rank
        })
        .pop() || 0
    const bonus = {
      0: 0,
      1: 2,
      2: 5,
      3: 10,
    }[packRatRank]
    const charStrength = this.charData.attributes.strength || 0
    return charStrength * 2 + bonus
  }
}

export default GearEncumbrance
</script>

<template>
  <div class="Box-GearEncumbrance">
    <div>{{ $t("Encumbrance") }}: {{ gearWeight }}/{{ gearWeightMax }}</div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.Box-GearEncumbrance {
  display: block;
}
</style>
