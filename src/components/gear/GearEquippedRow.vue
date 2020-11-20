<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import ExpandableSection from "@/components/ExpandableSection.vue"
import { FLSelect, Option } from "@/components/base/FLSelect.vue"
import { FLNumberInput } from "@/components/base/FLNumberInput.vue"
import { IconButton } from "@/components/base/IconButton.vue"

import { CharData } from "@/data/character/characterData"
import {
  Item,
  ItemArmor,
  ItemHelmet,
  ItemShield,
  ItemWeapon,
  ITEM_TYPE,
  Range,
} from "@/data/items/itemTypes"
import SvgIcon from "@/components/SvgIcon.vue"
import { GearRowDetail } from "@/components/gear/GearRowDetail.vue"
import { iconFor, equippable, iconForType } from "./util"

function getWeaponDetails(vm: Vue, weapon: ItemWeapon) {
  function getRange() {
    return vm.$t(Range[weapon.range])
  }

  function getFeatures() {
    return Object.entries(weapon.features)
      .filter((feature) => {
        return feature[1]
      })
      .map((feature) => String(vm.$t(feature[0])))
  }
  return [`${vm.$t("Range")}: ${getRange()}`, ...getFeatures()].join(", ")
}

function canAdd(c: CharData, t: ITEM_TYPE): boolean {
  return !!c.gear.inventory.find((i) => i.type === t && !i.equipped)
}

interface IRow {
  item: Item | undefined | null
  icon?: string
  bonusClick: () => void
  editClick: () => void
  addClick: () => void
  canAdd: boolean
  equipped: boolean
}

// FIXME: Handle bonus click
@Component({
  components: {
    SvgIcon,
    IconButton,
    GearRowDetail,
  },
})
export class GearEquippedRow extends Vue {
  @Prop({ default: null }) charData!: CharData
  @Prop({ default: null }) itemType!: ITEM_TYPE
  @Prop({ default: null }) item!: Item | null | undefined

  get row(): IRow {
    const row: IRow = this.item
      ? {
          item: this.item,
          icon: iconFor(this.item),
          bonusClick: () => this.$emit("bonusclick", this.item),
          equipped: !!this.item.equipped,
          editClick: () => this.$emit("edit", this.item),
          addClick: () => {},
          canAdd: canAdd(this.charData, this.itemType),
        }
      : {
          item: undefined,
          icon: iconForType(this.itemType),
          bonusClick: () => {},
          addClick: () => this.onEquip(this.itemType),
          editClick: () => {},
          canAdd: canAdd(this.charData, this.itemType),
          equipped: false,
        }
    return row
  }

  onUnequip(item: Item) {
    this.$emit("unequip", item)
  }

  onEquip(filterType: ITEM_TYPE | null) {
    this.$emit("equip", filterType)
  }
}

export default GearEquippedRow
</script>

<template>
  <tr>
    <td class="cell-add-remove">
      <IconButton
        v-if="row.item && row.item.equipped"
        icon="close"
        @click="onUnequip(row.item)"
      />
      <IconButton
        v-else
        icon="add"
        color="main"
        @click="row.addClick"
        :disabled="!row.canAdd"
      />
    </td>
    <td
      :class="['name-cell', row.equipped && 'cell-clickable']"
      @click="() => row.equipped && row.editClick()"
    >
      <GearRowDetail :item="row.item" :icon="row.icon" :showBonus="false" />
    </td>
    <td>
      <IconButton
        v-if="row.bonusClick && row.item && row.item.bonus"
        color="main"
        icon=""
        @click="row.bonusClick"
        class="bonus-button"
      >
        {{ row.item.bonus }}
      </IconButton>
    </td>
  </tr>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.name-cell {
  text-align: left;
}

.cell-clickable {
  cursor: pointer;
  &:hover {
    background: @color-main;
  }
}

.name-box {
  display: flex;
  .underlined {
    text-decoration: underline dotted @color-main;
  }
  .name {
    word-wrap: break-word;
    margin: 0 3px;
    flex-grow: 1;
  }
  svg {
    flex-shrink: 0;
  }
}

.details {
  color: #000000a0;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  margin-top: 3px;
  text-transform: capitalize;
}

.nowrap {
  white-space: nowrap;
}

.bonus-button {
  font-size: 1.2rem;
  display: block;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
