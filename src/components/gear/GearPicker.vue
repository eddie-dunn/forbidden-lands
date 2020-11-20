<script lang="ts">
// TODO: Replace option / select with FLSelect
// TODO: Split up into multiple components

import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { PROFESSION } from "@/classes"
import { CharData, Gear } from "@/data/character/characterData"
import { Item, ItemWeapon, Range } from "@/data/items/itemTypes"

import ModalAddItem from "@/components/gear/ModalAddItem.vue"

import { GearStarting } from "@/components/gear/GearStarting.vue"
import { GearConsumables } from "@/components/gear/GearConsumables.vue"
import { GearMoney } from "@/components/gear/GearMoney.vue"
import { GearBackpack } from "@/components/gear/GearBackpack.vue"
import { GearEquipped } from "@/components/gear/GearEquipped.vue"
import { GearEncumbrance } from "src/components/gear/GearEncumbrance.vue"

@Component({
  components: {
    GearStarting,
    GearConsumables,
    GearEncumbrance,
    GearMoney,
    GearBackpack,
    GearEquipped,
    ModalAddItem,
  },
})
export default class GearPicker extends Vue {
  @Prop({ required: true }) charData!: CharData
  @Prop({ default: false }) viewOnly!: boolean

  showAddItem = false
  showEditItem = false
  showConfirmDeleteItem = false
  addItemEdit: Item | null = null

  PROFESSION = PROFESSION
  selected: boolean[] = []

  get inventory() {
    return this.charData.gear.inventory
  }

  get gearWeight() {
    return (
      this.charData.gear.inventory
        .map((item) => Number(item.weight))
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

  editItem(item: Item) {
    if (!item) return
    this.addItemEdit = item
    this.showEditItem = true
  }

  updateItem(updatedItem: Item) {
    this.charData.gear.inventory = this.inventory.map((mitem) => {
      if (mitem.id !== updatedItem.id) return mitem
      return updatedItem
    })
    this.addItemEdit = null
  }
}
</script>

<template>
  <div v-if="charData.profession" class="gear-picker">
    <!-- start -->
    <GearStarting :charData="charData" />

    <!-- TODO: Look into using flex or grid instead of tables -->
    <div class="inventory">
      <GearEquipped
        v-if="charData.metadata.status !== 'new'"
        class="equipped"
        :charData="charData"
        @edit="editItem"
      />

      <GearBackpack
        :charData="charData"
        :viewOnly="viewOnly"
        class="other-gear"
      />
    </div>

    <div class="inventory">
      <GearConsumables
        :charData="charData"
        :viewOnly="viewOnly"
        class="spacing-top"
      />

      <GearMoney
        :charData="charData"
        :viewOnly="viewOnly"
        class="spacing-top"
        style="display: inline-flex;"
      />
    </div>

    <GearEncumbrance :charData="charData" class="encumbrance" />

    <ModalAddItem
      v-if="showEditItem"
      @close="showEditItem = false"
      @add-item="updateItem"
      :editItem="addItemEdit"
      :title="$t('Edit') + ': ' + addItemEdit.name"
    />
    <!-- end -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
h4 {
  // margin: 1rem auto 0.5rem auto;
  text-align: left;
}

.inventory {
  // display: grid;
  // grid-column-gap: 1rem;
  // grid-template-columns: repeat(auto-fill, minmax(350px, auto));
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    .equipped {
      margin-left: 1rem;
    }
    flex-direction: row-reverse;
    > * {
      flex: 1 0 45%;
    }
  }
}

.encumbrance {
  margin: 1rem auto;
  text-align: center;
}

.spacing-top {
  margin-top: 1rem;
}
</style>
