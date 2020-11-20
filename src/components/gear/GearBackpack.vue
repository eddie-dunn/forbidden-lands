<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { FLButton } from "@/components/base/FLButton.vue"
import { CharData } from "@/data/character/characterData"
import SvgIcon from "@/components/SvgIcon.vue"
import { Item, ItemWeapon } from "@/data/items/itemTypes"
import ModalAddItem from "@/components/gear/ModalAddItem.vue"
import ModalConfirm from "@/components/ModalConfirm.vue"
import { GearTable } from "@/components/gear/GearTable.vue"
import { GearRowDetail } from "@/components/gear/GearRowDetail.vue"

import { iconFor, equippable } from "./util"

@Component({
  components: {
    FLButton,
    GearRowDetail,
    GearTable,
    ModalAddItem,
    ModalConfirm,
    SvgIcon,
  },
})
export class GearBackpack extends Vue {
  @Prop({ default: null }) charData!: CharData
  @Prop({ default: false }) viewOnly!: boolean

  showAddItem = false
  showEditItem = false
  showConfirmDeleteItem = false
  addItemEdit: Item | null = null

  iconFor = iconFor
  equippable = equippable

  get inventory() {
    return this.charData.gear.inventory
  }

  get backpack() {
    return this.inventory.filter((i) => !i.equipped)
  }

  get itemsSelected() {
    return this.inventory.filter((item) => !!item.selected).length > 0
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

  get hasMount(): boolean {
    return !!this.charData.mount.strength
  }

  addItem(item: Item) {
    this.charData.gear.inventory.push(item)
  }

  moveItems() {
    const newInventory = this.inventory
      .map((item) => {
        if (item.selected) {
          this.charData.mount.inventory.push(item)
          return null
        } else {
          return item
        }
      })
      .filter((item) => !!item)
    this.charData.gear.inventory = newInventory as Item[]
  }

  dropItems() {
    const newInventory = this.inventory.filter((item) => !item.selected)
    this.charData.gear.inventory = newInventory as Item[]
    this.showConfirmDeleteItem = false
  }

  get deleteItemsBody() {
    const items = this.inventory
      .filter((item) => item.selected)
      .map((item) => item.name)
      .join(", ")
    return `${this.$t("Drop")} ${items}?`
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

export default GearBackpack
</script>

<template>
  <div class="Box-GearBackpack">
    <!-- spacer -->

    <div class="other-gear">
      <h4>{{ $t("Inventory") }}</h4>
      <GearTable>
        <thead>
          <tr>
            <th class="empty-cell"></th>
            <!-- <th class="bonus-cell">{{ $t("Active") }}</th> -->
            <th>{{ $t("Name") }}</th>
            <th class="bonus-cell">Bonus</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in backpack" v-bind:key="item.name + index">
            <td>
              <input
                type="checkbox"
                v-model="item.selected"
                :disabled="viewOnly"
              />
            </td>
            <td
              @click="!viewOnly && editItem(item)"
              class="clickable-cell name-cell"
            >
              <GearRowDetail :item="item" :showBonus="false" />
            </td>
            <td>{{ item.bonus || "" }}</td>
          </tr>
        </tbody>
      </GearTable>

      <div v-if="!viewOnly" class="button-row">
        <FLButton
          type="danger"
          :disabled="!itemsSelected"
          @click="showConfirmDeleteItem = true"
        >
          {{ $t("Drop") }}
        </FLButton>
        <FLButton :disabled="!itemsSelected || !hasMount" @click="moveItems">
          {{ $t("Move to mount") }}
        </FLButton>
        <FLButton @click="showAddItem = true">
          {{ $t("Add") }}
        </FLButton>
      </div>
    </div>

    <ModalAddItem
      v-if="showEditItem"
      @close="showEditItem = false"
      @add-item="updateItem"
      :editItem="addItemEdit"
      :title="$t('Edit') + ': ' + addItemEdit.name"
    />

    <ModalAddItem
      v-if="showAddItem"
      @close="showAddItem = false"
      @add-item="addItem"
      :editItem="null"
      :title="$t('Add item')"
    />

    <ModalConfirm
      v-if="showConfirmDeleteItem"
      :body="deleteItemsBody"
      :confirmAction="dropItems"
      @close="showConfirmDeleteItem = false"
    />
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.Box-GearBackpack {
  display: block;

  .flex {
    display: flex;
    align-items: center;

    :first-child {
      margin-right: 5px;
      flex: 0 0 auto;
    }
  }

  .empty-cell {
    min-width: 5ch;
    width: 24px;
  }

  .clickable {
    cursor: pointer;
    box-shadow: @box-shadow-normal;
    padding: 3px;
    margin: 3px;
  }

  .name-cell {
    text-align: left;
  }

  .clickable-cell {
    cursor: pointer;
    &:hover {
      background: @color-main;
    }
  }
}
</style>
