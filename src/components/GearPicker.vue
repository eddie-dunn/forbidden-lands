<script lang="ts">
// TODO: Replace option / select with FLSelect
// TODO: Split up into multiple components

import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { PROFESSION } from "@/classes"
import { CharacterData, Gear } from "@/characterData"
import { Item, ItemWeapon, Range } from "@/data/items/itemTypes"

import FLNumberInput from "@/components/FLNumberInput.vue"
import FLButton from "@/components/base/FLButton.vue"
import SvgIcon from "@/components/SvgIcon.vue"
import ModalAddItem from "@/components/gear/ModalAddItem.vue"
import ModalConfirm from "@/components/ModalConfirm.vue"

@Component({
  components: {
    FLButton,
    FLNumberInput,
    ModalAddItem,
    ModalConfirm,
    SvgIcon,
  },
})
export default class ExpandableSection extends Vue {
  @Prop({ required: true }) characterData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  showAddItem = false
  showEditItem = false
  showConfirmDeleteItem = false
  addItemEdit: Item | null = null

  PROFESSION = PROFESSION
  selected: boolean[] = []

  get inventory() {
    return this.characterData.gear.inventory
  }

  get itemsSelected() {
    return this.inventory.filter((item) => !!item.selected).length > 0
  }

  equippable(item: Item) {
    return ["armor", "helmet", "shield", "weapon"].includes(item.type)
  }

  get arrows() {
    if (this.characterData.profession) {
      return PROFESSION[this.characterData.profession].starting_resources.arrows
    }
    return 0
  }

  get torches() {
    return 0
  }

  startingConsumable(consumable: string) {
    if (!this.characterData.profession) return 0
    return (
      PROFESSION[this.characterData.profession].starting_resources[
        consumable
      ] || 0
    )
  }

  get status() {
    return this.characterData.metadata.status
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
      this.characterData.gear.inventory
        .map((item) => Number(item.weight))
        .reduce((val, sum) => val + sum, 0) +
      Object.values(this.characterData.gear.money)
        .map((moneyAmount) => Math.floor(moneyAmount / 100))
        .reduce((val, sum) => val + sum, 0)
    )
  }

  get hasMount(): boolean {
    return !!this.characterData.mount.strength
  }

  get gearWeightMax() {
    const packRatRank =
      this.characterData.talents
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
    const charStrength = this.characterData.attributes.strength || 0
    return charStrength * 2 + bonus
  }

  @Watch("characterData.profession", { immediate: true })
  setConsumables() {
    if (!this.characterData.profession || this.status !== "new") return
    this.characterData.gear.consumables.food = this.startingConsumable("food")
    this.characterData.gear.consumables.water = this.startingConsumable("water")
    this.characterData.gear.consumables.arrows = this.startingConsumable(
      "arrows"
    )
    this.characterData.gear.consumables.torches = this.startingConsumable(
      "torches"
    )
  }

  moveItems() {
    const newInventory = this.inventory
      .map((item) => {
        if (item.selected) {
          this.characterData.mount.inventory.push(item)
          return null
        } else {
          return item
        }
      })
      .filter((item) => !!item)
    this.characterData.gear.inventory = newInventory as Item[]
  }

  dropItems() {
    const newInventory = this.inventory.filter((item) => !item.selected)
    this.characterData.gear.inventory = newInventory as Item[]
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
    this.characterData.gear.inventory.push(item)
  }

  updateItem(item: Item) {
    this.characterData.gear.inventory = this.inventory.map((mitem) => {
      if (mitem.id !== item.id) return mitem
      return item
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
}
</script>

<template>
  <div v-if="characterData.profession" class="gear-picker">
    <!-- start -->

    <div v-if="characterData.metadata.status === 'new'">
      <h4>{{ $t("Starting gear") }}</h4>
      <div v-if="characterData.metadata.startingItems">
        <p
          v-for="item in characterData.metadata.startingItems.split('\n')"
          v-bind:key="item"
        >
          ✣ {{ item }}
        </p>
      </div>
      <div v-else>
        {{ $t(PROFESSION[characterData.profession].gear_description) }}
      </div>
      <p>
        Silver:
        {{
          $t("D") +
            PROFESSION[characterData.profession].starting_resources.silver +
            " (" +
            $t("Roll dice before session starts") +
            ")"
        }}
      </p>
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
              <td>
                <SvgIcon name="barbute" />
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
              <td>
                <SvgIcon name="shield" />
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
              <td>
                <SvgIcon name="leather-armor" />
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
              <th class="bonus-cell">Bonus</th>
              <th class="bonus-cell">{{ $t("Damage") }}</th>
              <th>{{ $t("Range") }}</th>
              <th>{{ $t("Features") }}</th>
            </tr>
          </thead>
          <tbody v-if="equippedWeapons.length > 0">
            <tr v-for="weapon in equippedWeapons" v-bind:key="weapon.name">
              <td @click="editItem(weapon)" class="clickable-cell">
                {{ weapon.name }}
              </td>
              <td>{{ weapon.bonus }}</td>
              <td>{{ weapon.damage }}</td>
              <td class="capitalize">
                {{ getRange(weapon) }}
              </td>
              <td>{{ getFeatures(weapon) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="equippedWeapons.length < 1">No weapons equipped</div>
      </div>

      <!-- spacer -->
    </div>

    <h4>{{ $t("Consumables") }}</h4>
    <div class="consumables" v-if="characterData.profession">
      <!-- spacer -->

      <div class="consumable-item">
        <label for="food">{{ $t("Food") }}</label>
        <select
          v-model="characterData.gear.consumables.food"
          :disabled="status === 'new' || viewOnly"
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
        <label for="water">{{ $t("Water") }}</label>
        <select
          v-model.number="characterData.gear.consumables.water"
          :disabled="status === 'new' || viewOnly"
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
          v-model.number="characterData.gear.consumables.arrows"
          :disabled="status === 'new' || viewOnly"
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
          v-model.number="characterData.gear.consumables.torches"
          :disabled="status === 'new' || viewOnly"
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
        <label for="copper">
          <SvgIcon class="coin copper" name="two-coins" title="copper" />
        </label>
        <FLNumberInput
          id="copper"
          fontSize="1.7rem"
          min="0"
          max="300"
          v-model="characterData.gear.money.copper"
          :disabled="viewOnly"
        />
      </div>
      <div class="money-item">
        <label for="silver">
          <SvgIcon class="coin silver" name="two-coins" title="silver" />
        </label>
        <FLNumberInput
          id="silver"
          fontSize="1.7rem"
          min="0"
          max="300"
          v-model="characterData.gear.money.silver"
          :disabled="viewOnly"
        />
      </div>
      <div class="money-item">
        <label for="gold">
          <SvgIcon class="coin gold" name="two-coins" title="gold" />
        </label>
        <FLNumberInput
          id="gold"
          fontSize="1.7rem"
          min="0"
          max="300"
          v-model="characterData.gear.money.gold"
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
  }
}

label {
  margin-right: 0.5rem;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15ch, 1fr));
  grid-gap: 10px;
}

.money-item {
  flex: 1 0 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
