<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import ExpandableSection from "@/components/ExpandableSection.vue"
import { FLSelect, Option } from "@/components/base/FLSelect.vue"
import { FLNumberInput } from "@/components/base/FLNumberInput.vue"
import { IconButton } from "@/components/base/IconButton.vue"

import ModalConfirm from "@/components/ModalConfirm.vue"
import Modal from "@/components/Modal.vue"
import { GearTable } from "@/components/gear/GearTable.vue"
import { CharData } from "@/data/character/characterData"
import {
  Item,
  ItemArmor,
  ItemHelmet,
  ItemShield,
  ItemWeapon,
  ITEM_TYPE,
  Range,
  WEAPON_CATEGORY,
} from "@/data/items/itemTypes"
import SvgIcon from "@/components/SvgIcon.vue"
import { GearEquippedRow } from "./GearEquippedRow.vue"
import { GearRowDetail } from "@/components/gear/GearRowDetail.vue"

import { iconFor, equippable } from "./util"
import { TSkillId } from "@/types"
import {
  convertLogToConfig,
  diceLogAttributes,
  diceLogItem,
  diceLogSkill,
  isRangedWeapon,
} from "@/dice/diceConfigurator"

@Component({
  components: {
    SvgIcon,
    GearTable,
    Modal,
    ModalConfirm,
    GearEquippedRow,
    GearRowDetail,

    ExpandableSection,
    FLSelect,
    FLNumberInput,
    IconButton,
  },
})
export class GearEquipped extends Vue {
  @Prop({ default: null }) charData!: CharData

  iconFor = iconFor
  selectItem: { items: Item[]; visible: boolean } = {
    items: [],
    visible: false,
  }

  get inventoryEquipped() {
    return this.charData.gear.inventory.filter((i) => i.equipped)
  }

  get inventoryNotEquipped() {
    return this.charData.gear.inventory.filter(
      (i) => equippable(i) && !i.equipped
    )
  }

  get equippedHelmet(): ItemHelmet | undefined {
    return this.inventoryEquipped.find(
      (item: Item): item is ItemHelmet => item.type === "helmet"
    )
  }

  get equippedShield(): ItemShield | undefined {
    return this.inventoryEquipped.find(
      (item): item is ItemShield => item.type === "shield"
    )
  }

  get equippedArmor(): ItemArmor | undefined {
    const found = this.inventoryEquipped.find(
      (item): item is ItemArmor => item.type === "armor"
    )
    return found
  }

  get equippedWeapons(): ItemWeapon[] {
    return this.inventoryEquipped.filter(
      (item): item is ItemWeapon => item.type === "weapon"
    )
  }

  get rowData(): { item: Item | undefined; itemType: ITEM_TYPE; id: string }[] {
    return [
      //
      { id: "helmet", item: this.equippedHelmet, itemType: ITEM_TYPE.helmet },
      { id: "shield", item: this.equippedShield, itemType: ITEM_TYPE.shield },
      { id: "armor", item: this.equippedArmor, itemType: ITEM_TYPE.armor },
      ...this.equippedWeapons.map((w) => ({
        id: w.id,
        item: w,
        itemType: ITEM_TYPE.weapon,
      })),
      { id: "add-weapon", item: undefined, itemType: ITEM_TYPE.weapon },
    ]
  }

  // FIXME: Abstract away the dice config settings to dice engine that can
  // handle character talents, status etc
  armorClicked() {
    if (!this.equippedArmor && !this.equippedHelmet) return
    const black =
      (this.equippedHelmet || { bonus: 0 }).bonus +
      (this.equippedArmor || { bonus: 0 }).bonus
    this.$root.$emit("open-dice-modal", {
      title: this.$t("armor"),
      dice: { black },
      disablePush: true,
    })
  }

  shieldClicked() {
    if (!this.equippedShield) return
    const black = this.equippedShield.bonus
    const white =
      Number(this.charData.attributes.strength) -
      Number(this.charData.attributeDmg.strength)
    const red = this.charData.skills.melee.rank
    this.$root.$emit("open-dice-modal", {
      title: this.$t("parry"),
      dice: { white, black, red },
      disablePush: true,
    })
  }

  weaponClicked(item: ItemWeapon) {
    const skill: TSkillId = isRangedWeapon(item) ? "marksmanship" : "melee"

    const attributeLog = diceLogAttributes(this.charData, skill)
    const skillLog = diceLogSkill(this.charData, skill)
    const itemLog = diceLogItem(item)
    const dice = convertLogToConfig([attributeLog, skillLog, itemLog].flat())

    // const dice = { white: 3, red: 3, black: item.bonus } // FIXME: Get dice
    this.$root.$emit("open-dice-modal", {
      title: item.name,
      dice,
      disablePush: false,
    })
  }

  bonusClick(item: Item): void {
    switch (item.type) {
      case "shield":
        return this.shieldClicked()
      case "armor":
      case "helmet":
        return this.armorClicked()
      case "weapon":
        return this.weaponClicked(item)
      default:
        console.warn(`Cannot handle item type '${item.type}'`) // eslint-disable-line no-console
    }
  }

  onUnequip(item: Item) {
    this.equipItem(item, false)
  }

  onEquip(filterType: ITEM_TYPE | null) {
    const available = this.itemTypeAvailable(filterType)
    if (available.length === 1) {
      const item = available[0]
      this.equipItem(item, true)
    } else {
      this.selectItem = {
        visible: true,
        items: available,
      }
    }
  }

  itemTypeAvailable(filterType: ITEM_TYPE | null) {
    const _filter = filterType
      ? (item: Item) => item.type === filterType
      : (item: Item) => item
    const available = this.inventoryNotEquipped.filter(_filter)
    return available
  }

  equipItem(item: Item, equipped: boolean) {
    this.charData.gear.inventory = this.charData.gear.inventory.map((i) => {
      if (i.id === item.id) return { ...item, equipped }
      return i
    })
    this.selectItemClose()
  }

  selectItemClose() {
    this.selectItem = { items: [], visible: false }
  }
}

// FIXME: Fix dice rolling for weapons

export default GearEquipped
</script>

<template>
  <div class="Box-GearEquipped">
    <h4>{{ $t("Protection") }} & {{ $t("Weapons") }}</h4>
    <GearTable>
      <thead>
        <tr>
          <th class="button-cell"></th>
          <th>{{ $t("Name") }}</th>
          <th class="button-cell">
            <!-- <IconButton icon="rolling-dices" /> -->
            Bonus
          </th>
        </tr>
      </thead>
      <tbody>
        <GearEquippedRow
          v-for="row in rowData"
          :key="row.id"
          :item="row.item"
          :itemType="row.itemType"
          :charData="charData"
          @equip="onEquip"
          @unequip="onUnequip"
          @edit="(i) => $emit('edit', i)"
          @bonusclick="bonusClick"
        />
      </tbody>
    </GearTable>

    <Modal
      v-if="selectItem.visible"
      @close="selectItemClose"
      :maximized="false"
    >
      <div slot="body" class="select-body">
        <div v-if="!selectItem.items.length">
          <div style="margin: 2rem;">
            N/A
          </div>
        </div>
        <div
          v-else
          v-for="item in selectItem.items"
          :key="item.id"
          class="select-row"
        >
          <IconButton @click="equipItem(item, true)">
            <GearRowDetail :item="item" :underline="false" />
          </IconButton>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.Box-GearEquipped {
  display: block;
}

.button-cell {
  width: 24px;
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

.select-body {
  padding: 0.5rem;
  width: 300px;
}

.select-row {
  padding: 1rem 0;
  &:not(:last-child) {
    border-bottom: 1px solid ~"@{color-text}55";
  }
  button {
    width: 100%;
    display: block;
  }
}
</style>
