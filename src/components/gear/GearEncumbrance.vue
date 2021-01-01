<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

import { CharData } from "@/data/character/characterData"
import { Item, ItemWeapon, ItemWeight } from "@/data/items/itemTypes"
import { coinWeight } from "@/data/items/itemLogic"

const sum = (values?: number[]) =>
  values?.reduce((val: number, acc: number) => val + acc, 0) || 0

@Component({
  components: {},
})
export class GearEncumbrance extends Vue {
  @Prop({ default: null }) charData!: CharData

  get gearWeight() {
    return this.inventoryWeight + this.moneyWeight + this.consumableWeight
  }

  get inventoryWeight(): number {
    const inventory = this.charData?.gear.inventory
    if (!inventory) return 0
    return sum(inventory.map((item: Item) => Number(item.weight)))
  }

  get moneyWeight() {
    const money = this.charData?.gear.money
    if (!money) return 0
    return sum(Object.values(this.charData.gear.money).map(coinWeight))
  }

  get consumableWeight() {
    const consumables = this.charData?.gear.consumables
    if (!consumables) return 0
    return sum(
      Object.values(consumables).map((consumable): number =>
        !!consumable ? 1 : 0
      )
    )
  }

  get packRatBonus(): number {
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
    return bonus
  }

  get gearWeightMax() {
    const charStrength = this.charData.attributes.strength || 0
    return charStrength * 2 + this.packRatBonus
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
