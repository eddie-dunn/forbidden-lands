<script lang="ts">
// TODO: Look into http://youmightnotneedjs.com/#tabs for tabs

import Modal from "@/components/Modal.vue"
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { CharacterData, CharacterTalent } from "@/characterData"
import { Item } from "@/data/items/itemTypes"

import ModalAddItem from "@/components/gear/ModalAddItem.vue"
import FLNumberInput from "@/components/FLNumberInput.vue"
import FLButton from "@/components/base/FLButton.vue"

@Component({
  components: {
    FLButton,
    FLNumberInput,
    Modal,
    ModalAddItem,
  },
})
export default class XPModal extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  addingMount = false
  showAddItem = false

  charDataCopy: CharacterData = JSON.parse(JSON.stringify(this.charData))

  get mountData() {
    if (this.charData.mount) {
      return {
        name: this.charData.mount.name,
        strength: this.charData.mount.strength,
        agility: this.charData.mount.agility,
      }
    }
    return {
      name: "",
      strength: 0,
      agility: 0,
    }
  }

  get hasMount() {
    return this.charData.mount.strength
  }

  get gearWeight() {
    return this.inventory
      .map((item) => Number(item.weight))
      .reduce((val, sum) => val + sum, 0)
  }

  get gearWeightMax() {
    if (!this.charData.mount.strength) return 0
    const multiplier = this.charData.mount.mounted ? 2 : 4
    const charStrength = this.charData.mount.strength || 0
    return charStrength * multiplier
  }

  get inventory() {
    return this.charData.mount.inventory
  }

  get selected(): boolean {
    return this.inventory.filter((item) => !!item.selected).length > 0
  }

  addItem(item: any) {
    this.charData.mount.inventory.push(item)
  }

  moveItems() {
    const newInventory = this.inventory
      .map((item) => {
        if (item.selected) {
          this.charData.gear.inventory.push(item)
          return null
        } else {
          return item
        }
      })
      .filter((item) => !!item)
    this.charData.mount.inventory = newInventory as Item[]
  }

  dropItems() {
    const newInventory = this.inventory.filter((item) => !item.selected)
    this.charData.mount.inventory = newInventory as Item[]
  }
}
</script>

<template>
  <div class="other-gear">
    <div>
      <div>
        <div class="button-row right-adjusted">
          <div>
            <label for="mount-name" class="block"> {{ $t("Name") }}</label>
            <input
              id="mount-name"
              type="text"
              v-model="charData.mount.name"
              :disabled="viewOnly"
            />
          </div>

          <div class="mount-attrib-row">
            <span>
              <label for="mount-strength" class="capitalize block">
                {{ $t("strength") }}
              </label>
              <FLNumberInput
                id="mount-strength"
                fontSize="1.7rem"
                v-model.number="charData.mount.strength"
                :disabled="viewOnly"
              />
            </span>
            <span>
              <label for="mount-agility" class="capitalize block">
                {{ $t("agility") }}
              </label>
              <FLNumberInput
                id="mount-agility"
                fontSize="1.7rem"
                v-model.number="charData.mount.agility"
                :disabled="viewOnly"
              />
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hasMount">
      <h4>{{ $t("Carried by mount") }}</h4>
      <table>
        <thead>
          <tr>
            <th class="bonus-cell"></th>
            <th>{{ $t("Name") }}</th>
            <th class="bonus-cell">Bonus</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventory" v-bind:key="item.name">
            <td>
              <input
                type="checkbox"
                v-model="item.selected"
                :disabled="viewOnly"
              />
            </td>
            <td>{{ item.name }}</td>
            <td class="bonus-cell">{{ item.bonus || "" }}</td>
          </tr>
        </tbody>
      </table>
      <div class="button-row">
        <div>{{ $t("Encumbrance") }}: {{ gearWeight }}/{{ gearWeightMax }}</div>
        <div class="">
          <label for="is-mounted">{{ $t("Mounted") }}</label>
          <input
            type="checkbox"
            v-model="charData.mount.mounted"
            :disabled="viewOnly"
          />
        </div>
      </div>
      <div v-if="!viewOnly" class="button-row">
        <FLButton type="danger" :disabled="!selected" @click="dropItems">
          {{ $t("Drop") }}
        </FLButton>
        <FLButton :disabled="!selected" @click="moveItems">
          {{ $t("Move to backpack") }}
        </FLButton>
        <FLButton :disabled="!hasMount" @click="showAddItem = true">
          {{ $t("Add") }}
        </FLButton>
      </div>
    </div>

    <ModalAddItem
      v-if="showAddItem"
      @close="showAddItem = false"
      @add-item="addItem"
      :charData="charData"
    />

    <!-- spacer -->
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

.right-adjusted {
  justify-content: flex-start;
  align-items: stretch;
  div > {
    margin-right: 1rem;
  }
}

.bonus-cell {
  width: 6ch;
}

.mount-attrib-row {
  display: flex;
}
</style>
