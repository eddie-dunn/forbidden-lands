<script lang="ts">
// TODO: Replace option / select with FLSelect
// TODO: Split up into multiple components

import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { PROFESSION } from "@/classes"
import { CharData, Gear } from "@/data/character/characterData"
import { Item, ItemWeapon, Range } from "@/data/items/itemTypes"

import FLNumberInput from "@/components/base/FLNumberInput.vue"
import FLButton from "@/components/base/FLButton.vue"
import SvgIcon from "@/components/SvgIcon.vue"
import ModalAddItem from "@/components/gear/ModalAddItem.vue"
import ModalConfirm from "@/components/ModalConfirm.vue"

import { GearStarting } from "./GearStarting.vue"

@Component({
  components: {
    GearStarting,
    FLButton,
    FLNumberInput,
    ModalAddItem,
    ModalConfirm,
    SvgIcon,
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

  get itemsSelected() {
    return this.inventory.filter((item) => !!item.selected).length > 0
  }

  equippable(item: Item) {
    return ["armor", "helmet", "shield", "weapon"].includes(item.type)
  }

  get arrows() {
    if (this.charData.profession) {
      return PROFESSION[this.charData.profession].starting_resources.arrows
    }
    return 0
  }

  get torches() {
    return 0
  }

  startingConsumable(consumable: string) {
    if (!this.charData.profession) return 0
    return (
      PROFESSION[this.charData.profession].starting_resources[consumable] || 0
    )
  }

  get status() {
    return this.charData.metadata.status
  }

  get equippedWeapons() {
    return this.inventory.filter(
      (item: Item) => item.type === "weapon" && item.equipped
    )
  }

  get equippedHelmet() {
    return this.inventory
      .filter((item) => item.type === "helmet" && item.equipped)
      .pop()
  }

  get equippedShield() {
    return this.inventory
      .filter((item) => item.type === "shield" && item.equipped)
      .pop()
  }

  get equippedArmor() {
    return this.inventory
      .filter((item) => item.type === "armor" && item.equipped)
      .pop()
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

  get hasMount(): boolean {
    return !!this.charData.mount.strength
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

  @Watch("charData.profession", { immediate: true })
  setConsumables() {
    if (!this.charData.profession || this.status !== "new") return
    this.charData.gear.consumables.food = this.startingConsumable("food")
    this.charData.gear.consumables.water = this.startingConsumable("water")
    this.charData.gear.consumables.arrows = this.startingConsumable("arrows")
    this.charData.gear.consumables.torches = this.startingConsumable("torches")
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

  iconFor(item: Item) {
    switch (item.type) {
      case "armor":
        return "leather-armor"
      case "helmet":
        return "barbute"
      case "shield":
        return "shield"
      case "weapon":
        if ((item as ItemWeapon).range >= 2) {
          return "thrown-spear"
        }
        return "sword-brandish"
      default:
        return "swap-bag"
    }
  }

  addItem(item: Item) {
    this.charData.gear.inventory.push(item)
  }

  updateItem(updatedItem: Item) {
    this.charData.gear.inventory = this.inventory.map((mitem) => {
      if (mitem.id !== updatedItem.id) return mitem
      return updatedItem
    })
    this.addItemEdit = null
  }

  editItem(item: Item) {
    if (!item) return
    this.addItemEdit = item
    this.showEditItem = true
  }

  getFeatures(weapon: ItemWeapon) {
    return Object.entries(weapon.features)
      .filter((feature) => {
        return feature[1]
      })
      .map((feature) => this.$t(feature[0]))
      .join(", ")
  }

  getRange(weapon: ItemWeapon) {
    return this.$t(Range[weapon.range])
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
}
</script>

<template>
  <div v-if="charData.profession" class="gear-picker">
    <!-- start -->
    <GearStarting :charData="charData" />

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

    <!-- TODO: Look into using flex or grid instead of tables -->
    <div class="inventory">
      <!-- spacer -->

      <div class="other-gear">
        <h4>{{ $t("Inventory") }}</h4>
        <table>
          <thead>
            <tr>
              <th class="empty-cell"></th>
              <th class="bonus-cell">{{ $t("Active") }}</th>
              <th class="icon-cell">{{ $t("Type") }}</th>
              <th>{{ $t("Name") }}</th>
              <th class="bonus-cell">Bonus</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in inventory"
              v-bind:key="item.name + index"
            >
              <td>
                <input
                  type="checkbox"
                  v-model="item.selected"
                  :disabled="viewOnly"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  v-model="item.equipped"
                  :disabled="!equippable(item) || viewOnly"
                />
              </td>
              <td>
                <SvgIcon :name="iconFor(item)" :title="item.type" />
              </td>
              <td @click="!viewOnly && editItem(item)" class="clickable-cell">
                {{ item.name }}
              </td>
              <td>{{ item.bonus || "" }}</td>
            </tr>
          </tbody>
        </table>
        <div>{{ $t("Encumbrance") }}: {{ gearWeight }}/{{ gearWeightMax }}</div>

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

      <div class="protection">
        <h4>{{ $t("Active") }} {{ $t("Protection") }}</h4>
        <table>
          <thead>
            <tr>
              <th class="empty-cell"></th>
              <th>{{ $t("Name") }}</th>
              <th class="bonus-cell">Bonus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td @click="armorClicked">
                <div :class="equippedHelmet ? 'clickable' : ''">
                  <SvgIcon name="barbute" />
                </div>
              </td>
              <td
                @click="editItem(equippedHelmet)"
                :class="equippedHelmet ? 'clickable-cell' : ''"
              >
                {{ equippedHelmet ? equippedHelmet.name : "" }}
              </td>
              <td>{{ equippedHelmet ? equippedHelmet.bonus : "" }}</td>
            </tr>
            <tr>
              <td @click="shieldClicked">
                <div :class="equippedShield ? 'clickable' : ''">
                  <SvgIcon name="shield" />
                </div>
              </td>
              <td
                @click="editItem(equippedShield)"
                :class="equippedShield ? 'clickable-cell' : ''"
              >
                {{ equippedShield ? equippedShield.name : "" }}
              </td>
              <td>{{ equippedShield ? equippedShield.bonus : "" }}</td>
            </tr>
            <tr>
              <td @click="armorClicked">
                <div :class="equippedArmor ? 'clickable' : ''">
                  <SvgIcon name="leather-armor" />
                </div>
              </td>
              <td
                @click="editItem(equippedArmor)"
                :class="equippedArmor ? 'clickable-cell' : ''"
              >
                {{ equippedArmor ? equippedArmor.name : "" }}
              </td>
              <td>{{ equippedArmor ? equippedArmor.bonus : "" }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="weapons">
        <h4>{{ $t("Active") }} {{ $t("Weapons") }}</h4>
        <table>
          <thead>
            <tr>
              <th>{{ $t("Name") }}</th>
              <th class="bonus-cell">
                <div>Bonus</div>
                <div class="capitalize for-medium-down">{{ $t("dmg") }}</div>
              </th>
              <th class="bonus-cell capitalize for-medium-up">
                {{ $t("dmg") }}
              </th>
              <th>
                <div>{{ $t("Range") }}</div>
                <div class="for-medium-down">{{ $t("Features") }}</div>
              </th>
              <th class="for-medium-up">{{ $t("Features") }}</th>
            </tr>
          </thead>
          <tbody v-if="equippedWeapons.length > 0">
            <tr v-for="weapon in equippedWeapons" v-bind:key="weapon.name">
              <td @click="editItem(weapon)" class="clickable-cell">
                {{ weapon.name }}
              </td>
              <td>
                <div>
                  {{ weapon.bonus }}
                </div>
                <div class="for-medium-down">
                  {{ weapon.damage }}
                </div>
              </td>
              <td class="for-medium-up">{{ weapon.damage }}</td>
              <td class="capitalize">
                <div>{{ getRange(weapon) }}</div>
                <div class="for-medium-down">
                  {{ getFeatures(weapon) }}
                </div>
              </td>
              <td class="capitalize for-medium-up">
                {{ getFeatures(weapon) }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="equippedWeapons.length < 1">No weapons equipped</div>
      </div>

      <!-- spacer -->
    </div>

    <h4>{{ $t("Consumables") }}</h4>
    <div class="consumables" v-if="charData.profession">
      <!-- spacer -->

      <div class="consumable-item">
        <label for="food">{{ $t("Food") }}</label>
        <select v-model="charData.gear.consumables.food" :disabled="viewOnly">
          <option
            v-for="val in [0, 6, 8, 10, 12]"
            v-bind:key="val"
            :value="val"
          >
            {{ !!val ? $t("D") + val : 0 }}
          </option>
        </select>
      </div>

      <div class="consumable-item">
        <label for="water">{{ $t("Water") }}</label>
        <select
          v-model.number="charData.gear.consumables.water"
          :disabled="viewOnly"
        >
          <option
            v-for="val in [0, 6, 8, 10, 12]"
            v-bind:key="val"
            :value="val"
          >
            {{ !!val ? $t("D") + val : 0 }}
          </option>
        </select>
      </div>

      <div class="consumable-item">
        <label for="arrows">{{ $t("Arrows") }}</label>
        <select
          v-model.number="charData.gear.consumables.arrows"
          :disabled="viewOnly"
        >
          <option
            v-for="val in [0, 6, 8, 10, 12]"
            v-bind:key="val"
            :value="val"
          >
            {{ !!val ? $t("D") + val : 0 }}
          </option>
        </select>
      </div>

      <div class="consumable-item">
        <label for="torches">{{ $t("Torches") }}</label>
        <select
          v-model.number="charData.gear.consumables.torches"
          :disabled="viewOnly"
        >
          <option
            v-for="val in [0, 6, 8, 10, 12]"
            v-bind:key="val"
            :value="val"
          >
            {{ !!val ? $t("D") + val : 0 }}
          </option>
        </select>
      </div>

      <!-- spacer -->
    </div>

    <h4>{{ $t("Coins") }}</h4>
    <div class="money">
      <div class="money-item">
        <SvgIcon class="coin copper" name="two-coins" title="copper" />
        <FLNumberInput
          id="copper"
          fontSize="1.7rem"
          min="0"
          max="300"
          v-model="charData.gear.money.copper"
          :disabled="viewOnly"
        />
      </div>
      <div class="money-item">
        <SvgIcon class="coin silver" name="two-coins" title="silver" />
        <FLNumberInput
          id="silver"
          fontSize="1.7rem"
          min="0"
          max="300"
          v-model="charData.gear.money.silver"
          :disabled="viewOnly"
        />
      </div>
      <div class="money-item">
        <SvgIcon class="coin gold" name="two-coins" title="gold" />
        <FLNumberInput
          id="gold"
          fontSize="1.7rem"
          min="0"
          max="300"
          v-model="charData.gear.money.gold"
          :disabled="viewOnly"
        />
      </div>
    </div>

    <!-- end -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
h4 {
  margin: 1rem auto 0.5rem auto;
  text-align: center;
}
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  // border: 3px solid purple;
  th {
    font-variant-caps: small-caps;
    font-weight: normal;
    font-size: 0.8rem;
  }
  th,
  td > {
    word-wrap: break-word;
    border: 1px solid @pastel-green-transparent;
    height: 1.8em;
    text-align: center;
    > div:not(:first-child) {
      border-top: 1px solid @pastel-green-transparent;
    }
  }
}

label {
  margin-right: 0.5rem;
}

.clickable {
  cursor: pointer;
  box-shadow: @box-shadow-normal;
  padding: 3px;
  margin: 3px;
}

.bonus-cell {
  width: 6ch;
}
.empty-cell {
  width: 5ch;
}
.icon-cell {
  width: 5ch;
}

.clickable-cell {
  cursor: pointer;
  text-decoration: underline dotted @color-main;
  &:hover {
    background: @color-main;
  }
}

.weapons {
  flex: 1 1 100%;
}
.protection,
.other-gear {
  flex: 1 1 100%;
  @media (min-width: 768px) {
    flex: 0 1 48%;
  }
}

.coin {
  height: 40px;
  width: 40px;
}
.gold {
  fill: gold;
}
.copper {
  fill: #93523e;
}
.silver {
  fill: silver;
}

.consumables {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.consumable-item {
  @media (max-width: 500px) {
    label {
      display: block;
    }
  }
}

.inventory {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.money {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 auto;
  max-width: 500px;
}

.money-item {
  flex: 0 0 30%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.for-medium-up {
  @media (max-width: 600px) {
    display: none;
  }
}

.for-medium-down {
  @media (min-width: 600px) {
    display: none;
  }
}
</style>
