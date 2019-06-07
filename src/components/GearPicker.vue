<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { CLASS as PROFESSION } from "@/classes"
import { CharacterData } from "@/characterData"

const DEFAULT_GEAR = {
  name: "",
  weight: 1,
}
function getDefaultGear() {
  return {
    name: "",
    weight: 1,
  }
}

type VType = Vue & { focus: () => {} }

@Component
export default class ExpandableSection extends Vue {
  @Prop({ required: true }) characterData!: CharacterData

  PROFESSION = PROFESSION
  adding = false

  tmpGear = getDefaultGear()

  addGear() {
    this.adding = false
    this.inventory.push(this.tmpGear)
    this.tmpGear = getDefaultGear()
  }

  cancelAddGear() {
    this.tmpGear = getDefaultGear()
    this.adding = false
  }

  removeGear(index: number) {
    this.inventory.splice(index, 1)
  }

  setAdding() {
    this.adding = true
    this.$nextTick(() => (this.$refs.tmpGearNameInput as VType).focus())
  }

  // TODO: set consumables from charData or use starting gear if newly created
  get inventory() {
    if (!this.characterData.gear || !this.characterData.gear.inventory) {
      this.characterData.gear = {
        inventory: [],
        equipped: [],
      }
    }
    return this.characterData.gear.inventory
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

  get gearWeight() {
    return this.inventory
      .map((item) => item.weight)
      .reduce((val, sum) => val + sum, 0)
  }

  get gearWeightMax() {
    const multiplier = 1 // TODO get pack mule talent level
    const charStrength = this.characterData.attributes.strength || 0
    return charStrength * 2 * multiplier
  }
}
</script>

<template>
  <div v-if="characterData.profession" class="gear-picker">
    <!-- start -->
    <div class="consumables" v-if="characterData.profession">
      <div>
        {{ $t("Food") }}:
        {{
          $t("D") + PROFESSION[characterData.profession].starting_resources.food
        }}
      </div>
      <div>
        {{ $t("Water") }}:
        {{
          $t("D") +
            PROFESSION[characterData.profession].starting_resources.water
        }}
      </div>
      <div>
        {{ $t("Arrows") }}:
        {{ arrows ? $t("D") + arrows : "0" }}
      </div>
      <div>
        {{ $t("Torches") }}:
        {{ torches ? $t("D") + torches : "0" }}
      </div>
    </div>

    <div v-if="characterData.metadata.status === 'new'">
      <h4>{{ $t("Starting gear") }}</h4>
      <div>
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

    <!-- TODO: Complete gear selector -->
    <div v-if="false">
      <h4>{{ $t("Starting gear") }}</h4>
      <div>Encumberance: {{ gearWeight }}/{{ gearWeightMax }}</div>
      <div v-if="inventory.length < 1">No gear added yet...</div>
      <div v-for="(item, index) in inventory" v-bind:key="index">
        <span>{{ item.name }}</span>
        <span>{{ item.weight }}</span>
        <button @click="removeGear(index)">X</button>
      </div>
      <button v-if="!adding" @click="setAdding">Add</button>
      <form v-if="adding">
        <input v-model="tmpGear.name" ref="tmpGearNameInput" />
        <select v-model.number="tmpGear.weight">
          <option :value="0">Tiny</option>
          <option :value="0.5">Small</option>
          <option :value="1">Normal</option>
          <option :value="2">Large</option>
        </select>
        <button @click="addGear">OK</button>
        <button @click="cancelAddGear">Cancel</button>
      </form>
    </div>

    <!-- end -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.consumables {
  display: flex;
  justify-content: space-around;
}

.fl-number-row {
  display: flex;
}

.fl-number-input {
  width: var(--width);
  border: solid 1px;
  border-left: 0;
  border-right: 0;
}

.fl-number-button {
  border: solid 1px black;
  background: @pastel-green;
  color: white;
  cursor: pointer;
}

.shared {
  height: auto;
  font-size: 2rem;
  padding: 1px 5px;
  // box-sizing: border-box;
  box-sizing: content-box;
  text-align: center;
  font-family: monospace;
  // border: solid 1px;
}

// input[type="number"]::-webkit-inner-spin-button,
// input[type="number"]::-webkit-outer-spin-button {
//   -webkit-appearance: none;
//   margin: 0;
// }

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
