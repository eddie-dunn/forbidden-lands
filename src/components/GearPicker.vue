<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { CLASS as PROFESSION } from "@/classes"
import { CharacterData, Gear } from "@/characterData"
import FLNumberInput from "@/components/FLNumberInput.vue"
import SvgIcon from "@/components/SvgIcon.vue"

const DEFAULT_GEAR = {
  name: "",
  weight: 1,
}
function defaultItem() {
  return {
    name: "",
    weight: 1,
  }
}

type VType = Vue & { focus: () => {} }

@Component({
  components: {
    FLNumberInput,
    SvgIcon,
  },
})
export default class ExpandableSection extends Vue {
  @Prop({ required: true }) characterData!: CharacterData

  PROFESSION = PROFESSION
  adding = false

  tmpGear = defaultItem()
  inventory: any = []
  gold = 0
  silver = 0
  copper = 0

  addGear() {
    this.adding = false
    this.inventory.push(this.tmpGear)
    this.tmpGear = defaultItem()
  }

  cancelAddGear() {
    this.tmpGear = defaultItem()
    this.adding = false
  }

  removeGear(index: number) {
    this.inventory.splice(index, 1)
  }

  setAdding() {
    this.adding = true
    this.$nextTick(() => (this.$refs.tmpGearNameInput as VType).focus())
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
    return this.characterData.gear.inventory
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

    <div class="money">
      <div class="money-item">
        <label for="copper">
          <SvgIcon class="coin copper" name="two-coins" title="copper" />
        </label>
        <FLNumberInput
          id="copper"
          fontSize="1.2rem"
          min="0"
          max="300"
          v-model="characterData.gear.money.copper"
        />
      </div>
      <div class="money-item">
        <label for="silver">
          <SvgIcon class="coin silver" name="two-coins" title="silver" />
        </label>
        <FLNumberInput
          id="silver"
          fontSize="1.2rem"
          min="0"
          max="300"
          v-model="characterData.gear.money.silver"
        />
      </div>
      <div class="money-item">
        <label for="gold">
          <SvgIcon class="coin gold" name="two-coins" title="gold" />
        </label>
        <FLNumberInput
          id="gold"
          fontSize="1.2rem"
          :min="0"
          v-model="characterData.gear.money.gold"
        />
      </div>
    </div>

    <!-- TODO: Complete gear selector -->
    <div class="inventory" v-if="showWIP">
      <div>
        <h4>{{ $t("Backpack") }}</h4>
        <div>Encumberance: {{ gearWeight }}/{{ gearWeightMax }}</div>
        <div v-if="inventory.length < 1">No gear added yet...</div>
        <div v-for="(item, index) in inventory" v-bind:key="index">
          <span>{{ item.name }}</span>
          <span>{{ item.weight }}</span>
          <button @click="removeGear(index)">X</button>
        </div>
        <button v-if="!adding" @click="setAdding">Add Item</button>
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

      <div>
        <div>
          <h4>Vapen</h4>
          Bonus Skada Räckvidd Övrigt
        </div>
        <div>
          <h4>Skydd</h4>
          <div>Hjälm</div>
          <div>Sköld</div>
          <div>Rustning</div>
        </div>
      </div>
    </div>

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

    <!-- end -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

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
  justify-content: space-around;
}

.inventory {
  display: flex;
  flex-wrap: wrap;
}

.money {
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15ch, 1fr));
  grid-gap: 10px;
}

.money-item {
  flex: 1 0 30%;
  display: flex;
  align-items: center;
  label {
    margin-right: 0.5rem;
    // flex-basis: 50%;
    // flex-grow: 1;
    // text-align: right;
  }
}

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
