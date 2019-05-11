<script lang="ts">
import Vue from "vue"
import { AGE, ATTRIBUTE, CLASS, KIN } from "@/keys.ts"
import { getAttributePoints, getAgeType } from "@/age"
import { Attribute, KinName, Profession, Age } from "@/types"
import { CLASS as PROFESSION_MAP } from "@/classes"
import { KIN as KIN_MAP } from "@/kin"
import { validateAttributes, CharacterData } from "@/characterData"

const acrobatic = require("@/assets/icons/acrobatic.svg")

function getMaxAttribLevel(
  attribute: Attribute,
  kin: KinName | null,
  profession: Profession | null
): number {
  if (!kin || !profession) return 1
  const kinMod = KIN_MAP[kin].key_attribute === attribute ? 1 : 0
  const professionMod =
    PROFESSION_MAP[profession].key_attribute === attribute ? 1 : 0
  return 4 + kinMod + professionMod
}

interface AttributeInterface {
  strength: number | null
  agility: number | null
  wits: number | null
  empathy: number | null
}

export default Vue.extend({
  props: {
    charData: {
      type: Object as () => CharacterData,
      required: true,
    },
  },
  created() {
    this.charData.ageType = getAgeType(this.charData.age, this.charData.kin)
  },
  computed: {
    pointsLeft(): number {
      return this.pointsAvailable() - this.pointsSpent()
    },
    ageType(): Age {
      return getAgeType(this.charData.age, this.charData.kin)
    },
    acrobatic() {
      return acrobatic
    },
  },
  methods: {
    validateAttributes,
    getAttribArray(attribute: Attribute): number[] {
      return [1, 2, 3, 4, 5, 6].slice(0, this.getMax(attribute))
    },
    getMax(attribute: Attribute): number {
      return getMaxAttribLevel(
        attribute,
        this.charData.kin,
        this.charData.class
      )
    },
    pointsAvailable() {
      // return getAttributePoints(getAgeType(this.age, this.kin))
      return getAttributePoints(
        getAgeType(this.charData.age, this.charData.kin)
      )
    },
    pointsSpent(): number {
      return Number(
        Object.entries(this.charData.attributes)
          .map((attribute) => attribute[1])
          .reduce((sum, value) => Number(sum) + Number(value))
      )
    },
    validate() {
      return this.charData && this.validateAttributes(this.charData)
      // return this.pointsSpent() === this.pointsAvailable()
    },
    iconFor(attribute: string) {
      return "{}"
    },
  },
  data() {
    return {
      ATTRIBUTE,
    }
  },
  watch: {
    charData: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.$emit("attributes-updated", this.charData.attributes)
        const valid = this.validate() ? "✓" : "✖"
        this.$parent.$emit("card-sign", valid)
      },
    },
  },
})
</script>

<template>
  <div v-if="!charData.age || !charData.kin || !charData.class">
    {{ $t("Please select the following in") }} {{ $t("Base data") }}:
    <ul>
      <li class="capitalize" v-if="!charData.age">{{ $t("age") }}</li>
      <li class="capitalize" v-if="!charData.kin">{{ $t("kin") }}</li>
      <li class="capitalize" v-if="!charData.class">{{ $t("Profession") }}</li>
    </ul>
  </div>
  <div v-else class="attribute-selector-content">
    <div>{{ acrobatic }}</div>
    <span>{{ $t("Remaining") }}: {{ pointsAvailable() - pointsSpent() }}</span>
    <div
      v-for="attribute in Object.keys(charData.attributes)"
      class="attribute-item"
      :key="attribute"
    >
      <label :for="attribute" class="attribute-item-label">
        {{ iconFor(attribute) }}{{ $t(attribute) }}
      </label>
      <input
        class="attribute-input"
        :id="attribute"
        :name="attribute"
        type="number"
        required
        :placeholder="'1-' + getMax(attribute)"
        min="1"
        :max="getMax(attribute)"
        v-model.number="charData.attributes[attribute]"
      />
      <span class="attribute-damage">******</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.attribute-selector-content {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  div > {
    margin: 0.25rem;
  }
  // min-width: 300px;
  // min-width: 32%;
  // max-width: 50%;
}

.attribute-item {
  display: flex;
  flex-grow: 0;
  justify-content: space-around;
  align-items: baseline;
  margin: 0.25rem;
}

.attribute-input {
  width: 2.1rem;
  height: 1rem;
  margin-right: 2rem;
  flex-basis: 2;
  flex-grow: 0;
}

.attribute-damage {
  flex-basis: 2;
  flex-grow: 1;
}

.attribute-item-label {
  margin-right: 1rem;
  flex: 0 0 20%;
  text-transform: capitalize;
}

.attribute-input-group {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  // * > {
  //   margin-right: 1rem;
  //   // margin-left: 1rem;
  // }
}

// input[type="number"].with-checkbox {
//   // max-width: 50%;
//   width: 3em;
// }

// input:valid.with-checkbox + span::before {
//   content: "✓";
//   // padding-left: 5px;
// }

// input:invalid.with-checkbox + span::before {
//   content: "✖";
//   // padding-left: 5px;
// }
</style>
