<script lang="ts">
/* eslint-disable no-console */
import Vue from "vue"
import { AGE, ATTRIBUTE, CLASS, KIN } from "@/keys.ts"
import { getAttributePoints, getAgeType } from "@/age"
import { Attribute, KinName, Profession } from "@/types"
import { CLASS as PROFESSION_MAP } from "@/classes"
import { KIN as KIN_MAP } from "@/kin"

function getMaxAttribLevel(
  attribute: Attribute,
  kin: KinName,
  profession: Profession
): number {
  if (!kin) return 0
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
    kin: {
      type: String as () => KinName,
      required: true,
    },
    profession: {
      type: String as () => Profession,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    attributes: Object,
  },
  computed: {
    pointsLeft(): number {
      return this.pointsAvailable() - this.pointsSpent()
    },
    exportAttributes(): AttributeInterface {
      console.log(this.attributes)
      if (!this.attributes) {
        return {
          strength: null,
          agility: null,
          wits: null,
          empathy: null,
        }
      }
      const x = {
        strength: this.attributes.strength.value,
        agility: this.attributes.agility.value,
        wits: this.attributes.wits.value,
        empathy: this.attributes.empathy.value,
      }
      return x
    },
  },
  methods: {
    getAttribArray(attribute: Attribute): number[] {
      return [1, 2, 3, 4, 5, 6].slice(0, this.getMax(attribute))
    },
    getMax(attribute: Attribute): number {
      return getMaxAttribLevel(attribute, this.kin, this.profession)
    },
    pointsAvailable() {
      return getAttributePoints(getAgeType(this.age, this.kin))
    },
    pointsSpent(): number {
      return Number(
        Object.entries(this.attributes)
          .map(attribute => attribute[1])
          .reduce((sum, value) => Number(sum) + Number(value))
      )
    },
    validate() {
      return this.pointsSpent() === this.pointsAvailable()
    },
  },
  data() {
    return {
      // Attributes
      // attributes: {
      //   [ATTRIBUTE.STRENGTH]: { value: null, id: ATTRIBUTE.STRENGTH },
      //   [ATTRIBUTE.AGILITY]: { value: null, id: ATTRIBUTE.AGILITY },
      //   [ATTRIBUTE.WITS]: { value: null, id: ATTRIBUTE.WITS },
      //   [ATTRIBUTE.EMPATHY]: { value: null, id: ATTRIBUTE.EMPATHY },
      //   // [ATTRIBUTE.STRENGTH]: null,
      //   // [ATTRIBUTE.AGILITY]: null,
      //   // [ATTRIBUTE.WITS]: null,
      //   // [ATTRIBUTE.EMPATHY]: null,
      // },
      // Constants used in template
      ATTRIBUTE,
    }
  },
  watch: {
    attributes: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.$emit("attributes-updated", this.attributes)
        const valid = this.validate() ? "✓" : "✖"
        this.$parent.$emit("card-sign", valid)
      },
    },
  },
})
</script>

<template>
  <div class="attribute-selector-content">
    <div>
      Points available: {{ pointsAvailable() - pointsSpent() }} | Points spent:
      {{ pointsSpent() }}
    </div>
    <div>Valid: {{ validate() }}</div>
    <div
      v-for="attribute in Object.keys(attributes)"
      class="attribute-item"
      :key="attribute"
    >
      <input
        class="attribute-input with-checkbox"
        :id="attribute"
        :name="attribute"
        type="number"
        required
        :placeholder="'1-' + getMax(attribute)"
        min="1"
        :max="getMax(attribute)"
        v-model.number="attributes[attribute]"
      />
      <label :for="attribute" class="attribute-item-label">
        {{ $t(attribute) }}
      </label>
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
  // flex-grow: 1;
  // flex-direction: row-reverse;
  justify-content: space-between;
  align-items: baseline;
  margin: 0.25rem;
}

.attribute-item-label {
  margin-left: 1rem;
  margin-right: 1rem;
  // margin-right: auto;
  flex-grow: 2;
  text-transform: capitalize;
}

.attribute-input-group {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  * > {
    margin-right: 1rem;
    // margin-left: 1rem;
  }
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
