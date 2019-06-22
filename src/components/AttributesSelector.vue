<script lang="ts">
import Vue from "vue"
import { AGE, ATTRIBUTE, CLASS, KIN } from "@/keys.ts"
import { getAttributePoints, getAgeType } from "@/age"
import { Attribute, KinName, Profession, Age } from "@/types"
import { CLASS as PROFESSION_MAP } from "@/classes"
import { KIN as KIN_MAP } from "@/kin"
import { CharacterData, CharacterMetaDataStatus } from "@/characterData"
import SvgIcon from "@/components/SvgIcon.vue"
import NumberInput from "@/components/FLNumberInput.vue"

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
  components: {
    NumberInput,
    SvgIcon,
  },
  props: {
    charData: {
      type: Object as () => CharacterData,
      required: true,
    },
  },
  created() {
    if (!this.charData.attributeDmg) {
      const attributeDmg = { agility: 0, empathy: 0, strength: 0, wits: 0 }
      this.$set(this.charData, "attributeDmg", attributeDmg)
    }
    // TODO: Check if this is necessary
    this.charData.ageType = getAgeType(this.charData.age, this.charData.kin)
  },
  computed: {
    pointsLeft(): number {
      return this.pointsAvailable() - this.pointsSpent()
    },
    characterStatus(): CharacterMetaDataStatus {
      return this.charData.metadata.status
    },
    baseAttributesEditable(): boolean {
      return ["new", undefined, "freeEdit"].includes(this.characterStatus)
    },
    active(): boolean {
      return this.characterStatus === "active"
    },
  },
  methods: {
    getAttribArray(attribute: Attribute): number[] {
      return [1, 2, 3, 4, 5, 6].slice(0, this.getMax(attribute))
    },
    getMax(attribute: Attribute): number {
      return getMaxAttribLevel(
        attribute,
        this.charData.kin,
        this.charData.profession
      )
    },
    pointsAvailable() {
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
    iconFor(attribute: Attribute): string {
      const map = {
        [ATTRIBUTE.STRENGTH]: "strong",
        [ATTRIBUTE.AGILITY]: "acrobatic",
        [ATTRIBUTE.WITS]: "brain",
        [ATTRIBUTE.EMPATHY]: "shaking-hands",
      }
      return map[attribute] || "close-button"
    },
    remaining(attributeId: string) {
      return (
        Number(this.charData.attributes[attributeId]) -
        Number(this.charData.attributeDmg[attributeId])
      )
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
      },
    },
  },
})
</script>

<template>
  <div v-if="!charData.age || !charData.kin || !charData.profession">
    {{ $t("Please select the following in") }} {{ $t("Base data") }}:
    <ul>
      <li class="capitalize" v-if="!charData.age">{{ $t("age") }}</li>
      <li class="capitalize" v-if="!charData.kin">{{ $t("kin") }}</li>
      <li class="capitalize" v-if="!charData.profession">
        {{ $t("Profession") }}
      </li>
    </ul>
  </div>

  <div v-else>
    <table style="width: 100%">
      <thead>
        <tr>
          <th></th>
          <th v-if="active">{{ $t("Damage") }}</th>
          <th v-if="active">{{ $t("Remaining") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="attribute in Object.keys(charData.attributes)"
          :key="attribute"
        >
          <td class="attribute-item">
            <SvgIcon
              :name="iconFor(attribute)"
              :title="attribute"
              class="attribute-icon"
            />
            <label :for="attribute" class="attribute-item-label">
              {{ $t(attribute) }}
            </label>
            <span v-if="active" class="active-attributes">
              {{ charData.attributes[attribute] }}
            </span>
            <NumberInput
              v-if="baseAttributesEditable"
              fontSize="1.4rem"
              :id="attribute"
              :name="attribute"
              type="number"
              :placeholder="'2-' + getMax(attribute)"
              min="2"
              :max="getMax(attribute)"
              v-model.number="charData.attributes[attribute]"
            />
          </td>
          <td v-if="active">
            <NumberInput
              fontSize="1.4rem"
              :id="attribute"
              :name="attribute"
              placeholder=""
              type="number"
              min="0"
              width="1ch"
              :max="getMax(attribute)"
              v-model.number="charData.attributeDmg[attribute]"
            />
          </td>
          <td
            v-if="active"
            :class="[
              remaining(attribute) === 0 ? 'broken' : '',
              'active-attributes',
            ]"
          >
            {{ remaining(attribute) }}
          </td>
        </tr>
      </tbody>
    </table>
    <span v-if="pointsLeft"> {{ $t("Remaining") }}: {{ pointsLeft }} </span>
  </div>

  <!-- spacer -->
</template>

<style lang="less" scoped>
.attribute-item {
  display: flex;
  flex-grow: 0;
  justify-content: flex-start;
  align-items: center;
  margin: 0.2rem;
}

.active-attributes {
  font-family: monospace;
  font-size: 1.5rem;
}

.attribute-input {
  width: 2.5rem;
  height: 1rem;
  flex-basis: 1;
  flex-grow: 0;
}

.attribute-icon {
  flex: 0 0 auto;
  margin-right: 0.25rem;
}

.attribute-item-label {
  flex: 0 0 9ch;
  text-transform: capitalize;
}

.broken {
  color: red;
  &:after {
    content: "✖";
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
