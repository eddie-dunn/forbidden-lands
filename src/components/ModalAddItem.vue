<script lang="ts">
// TODO: Look into http://youmightnotneedjs.com/#tabs for tabs

import uuid1 from "uuid/v1"
import Modal from "@/components/Modal.vue"
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import {
  CharacterData,
  CharacterTalent,
  Item,
  ItemWeapon,
} from "@/characterData"

import FLNumberInput from "@/components/FLNumberInput.vue"

function defaultItem(): Item {
  return {
    bonus: 0,
    bonusType: "",
    equipped: false,
    name: "",
    weight: 1,
    type: "",
    id: uuid1(),
    features: {},
  }
}

@Component({
  components: {
    FLNumberInput,
    Modal,
  },
})
export default class AddItem extends Vue {
  @Prop({ default: () => defaultItem() }) editItem!: Item
  @Prop({ default: "" }) title!: string

  tmpGear: Item = JSON.parse(JSON.stringify(this.editItem))

  get isWeapon(): boolean {
    return this.tmpGear.type === "weapon"
  }

  pageFor(itemType: string) {
    const loc = this.$i18n.locale
    if (itemType === "weapon") {
      return loc === "se" ? "98+" : "101+"
    }
    if (itemType === "armor") {
      return loc === "se" ? "103" : "106"
    }
    if (itemType === "helmet") {
      return loc === "se" ? "103" : "106"
    }
    if (itemType === "shield") {
      return loc === "se" ? "102" : "106"
    }
    if (itemType === "other") {
      return loc === "se" ? "176+" : "182+"
    }
    return "?"
  }
  emitNewInventory() {
    this.$emit("add-item", this.tmpGear)
    this.close()
  }

  close() {
    this.$emit("close")
  }
}
</script>

<template>
  <Modal class="inventory-modal" @close="close" :maximized="true">
    <div v-if="title" slot="header" class="header">
      <h2>{{ title }}</h2>
    </div>

    <div slot="body" class="modal-body">
      <div class="new-item-form">
        <label for="gear-type">{{ $t("Type") }}</label>
        <select v-model="tmpGear.type">
          <option disabled value="">{{ $t("Choose") }}</option>
          <option value="armor">{{ $t("Armor") }}</option>
          <option value="helmet">{{ $t("Helmet") }}</option>
          <option value="shield">{{ $t("Shield") }}</option>
          <option value="weapon">{{ $t("Weapon") }}</option>
          <option value="other">{{ $t("Other") }}</option>
        </select>

        <label for="gear-name">{{ $t("Name") }}</label>
        <input type="text" v-model="tmpGear.name" ref="tmpGearNameInput" />

        <label for="gear-weight">{{ $t("Weight") }}</label>
        <select v-model.number="tmpGear.weight">
          <option disabled value="">{{ $t("Choose") }}</option>
          <option :value="0">{{ $t("Tiny") }}</option>
          <option :value="0.5">{{ $t("Light") }}</option>
          <option :value="1">Normal</option>
          <option :value="2">{{ $t("Heavy") }}</option>
        </select>

        <label for="gear-bonus">Bonus</label>
        <FLNumberInput v-model="tmpGear.bonus" max="9" fontSize="1.2rem" />

        <label v-if="isWeapon" for="gear-damage">{{ $t("Damage") }}</label>
        <FLNumberInput
          v-if="isWeapon"
          v-model="tmpGear.damage"
          fontSize="1.2rem"
          max="9"
        />

        <label v-if="isWeapon" for="gear-range">{{ $t("Range") }}</label>
        <select
          v-model.number="tmpGear.range"
          v-if="isWeapon"
          class="capitalize"
        >
          <option disabled value="">{{ $t("Choose") }}</option>
          <option class="capitalize" value="0">
            {{ $t("Armslength") }}
          </option>
          <option class="capitalize" value="1">{{ $t("Near") }}</option>
          <option class="capitalize" value="2">{{ $t("Short") }}</option>
          <option class="capitalize" value="3">{{ $t("Long") }}</option>
        </select>

        <label for="gear-comment">{{ $t("Comment") }}</label>
        <input type="text" v-model="tmpGear.comment" />

        <label v-if="isWeapon" for="weapon-features">
          {{ $t("Features") }}
        </label>
        <div v-if="isWeapon" id="weapon-features" class="grid-features">
          <div class="flex">
            <input
              v-model="tmpGear.features.blunt"
              type="checkbox"
              name="blunt"
              id="blunt"
            />
            <label class="capitalize" for="blunt">{{ $t("blunt") }}</label>
          </div>
          <div class="flex">
            <input
              type="checkbox"
              name="pointed"
              id="pointed"
              v-model="tmpGear.features.pointed"
            />
            <label class="capitalize" for="pointed">{{ $t("pointed") }}</label>
          </div>
          <div class="flex">
            <input
              type="checkbox"
              name="edged"
              id="edged"
              v-model="tmpGear.features.edged"
            />
            <label class="capitalize" for="edged">{{ $t("edged") }}</label>
          </div>
          <div class="flex">
            <input
              type="checkbox"
              name="parrying"
              id="parrying"
              v-model="tmpGear.features.parrying"
            />
            <label class="capitalize" for="parrying">
              {{ $t("parrying") }}
            </label>
          </div>
          <div class="flex">
            <input
              type="checkbox"
              name="hook"
              id="hook"
              v-model="tmpGear.features.hook"
            />
            <label class="capitalize" for="hook">{{ $t("hook") }}</label>
          </div>
          <div class="flex">
            <input
              type="checkbox"
              name="slow_loading"
              id="slow_loading"
              v-model="tmpGear.features.slow_loading"
            />
            <label class="capitalize" for="slow_loading">
              {{ $t("slow_loading") }}
            </label>
          </div>
        </div>
      </div>

      <div v-if="tmpGear.type">
        <h4>Info</h4>
        <div>
          {{ $t("PHB_ref", { page: pageFor(tmpGear.type) }) }}
        </div>
      </div>
    </div>

    <div class="modal-button-row" slot="footer">
      <button @click="close" class="button button-cancel">
        {{ $t("Cancel") }}
      </button>
      <button @click="emitNewInventory" class="button">OK</button>
    </div>

    <!-- spacer -->
  </Modal>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
h2 {
  margin: 0rem 1rem 1rem 1rem;
}

.flex {
  display: flex;
}

.grid-features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13ch, 1fr));
}

.modal-body {
  overflow: auto;
  text-align: left;
  max-width: 70rem;
  padding: 1rem;
  margin: 1rem auto;
}

.new-item-form {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1rem;
  align-items: center;
}

.header {
  border-bottom: solid @pastel-green 5px;
}

.modal-button-row {
  border-top: solid @pastel-green 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0.5rem;
}

.tab {
  background: white;
  color: @pastel-green;
  padding: 0.5rem;
  margin-right: 5px;
  outline: solid 1px @pastel-green;
  display: inline-block;
  cursor: pointer;
  &:active {
    transform: translateY(3px);
    background: @pastel-green;
    color: white;
  }
  &--active {
    background: @pastel-green;
    color: white;
  }
}

.tab-bar {
  text-align: left;
  margin: 0 1rem;
}

.inventory-modal {
  margin: 0 auto;
}
</style>
