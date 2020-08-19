<script lang="ts">
import Vue from "vue"
import { ATTRIBUTE } from "@/keys.ts"
import { getAttributePoints, getAgeType } from "@/age"
import { Attribute, KinName, Profession, Age } from "@/types"
import { CLASS as PROFESSION_MAP } from "@/classes"
import { KIN as KIN_MAP } from "@/kin"
import { CharacterData, CharacterMetaDataStatus } from "@/characterData"
import SvgIcon from "@/components/SvgIcon.vue"
import NumberInput from "@/components/FLNumberInput.vue"
import DiceModal from "@/components/dice/DiceModal.vue"
import { capitalize } from "@/util/util"
import { IDiceConfig } from "@/dice/diceTypes"

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

export default Vue.extend({
  components: {
    DiceModal,
    NumberInput,
    SvgIcon,
  },
  props: {
    charData: {
      type: Object as () => CharacterData,
      required: true,
    },
    viewOnly: {
      type: Boolean,
      default: false,
      required: false,
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
    roll(attributeId: Attribute, value: number) {
      console.log("roll", attributeId, this.remaining(attributeId))
      const diceConf: IDiceConfig = {
        white: this.remaining(attributeId),
        red: null,
        black: null,
      }
      this.rollingDice = diceConf
      const attributeString = capitalize(String(this.$t(attributeId)))
      this.modalTitle = this.$t("Roll dice") + ": " + attributeString
    },
    resetRoll() {
      this.rollingDice = {}
      this.modalTitle = ""
    },
  },
  data() {
    return {
      ATTRIBUTE,
      rollingDice: {},
      modalTitle: "",
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
  <div>
    <table class="attribute-table">
      <thead>
        <tr>
          <th class="capitalize">
            {{ $t("attribute") }}
          </th>
          <th>{{ $t("Damage") }}</th>
          <th class="capitalize">{{ $t("ATTRIB_REMAINING") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="attribute in Object.keys(charData.attributes)"
          :key="attribute"
        >
          <td @click="roll(attribute)" class="clickable">
            <div class="attribute-item">
              <SvgIcon
                :name="iconFor(attribute)"
                :title="attribute"
                class="attribute-icon"
              />
              <label :for="attribute" class="attribute-item-label">
                {{ $t(attribute) }}
              </label>
              <div class="active-attributes">
                {{ charData.attributes[attribute] }}
              </div>
            </div>
          </td>
          <td>
            <NumberInput
              fontSize="1.7rem"
              :id="attribute"
              :name="attribute"
              :disabled="viewOnly"
              placeholder=""
              type="number"
              min="0"
              width="1ch"
              :max="charData.attributes[attribute]"
              v-model.number="charData.attributeDmg[attribute]"
            />
          </td>
          <td
            @click="roll(attribute)"
            class="active-attributes clickable center"
          >
            <span
              class="remaining-attribute"
              :class="[remaining(attribute) === 0 ? 'broken' : '']"
            >
              {{ remaining(attribute) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <DiceModal
      v-if="rollingDice.white"
      :title="modalTitle"
      :charData="charData"
      @close="resetRoll"
      :dice="rollingDice"
    />
  </div>
  <!-- spacer -->
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.attribute-table {
  margin: 1rem 0;
  border-spacing: 0.5rem;
}

.clickable {
  cursor: pointer;
  box-shadow: @box-shadow-normal;
  padding: 0.25rem 0.5rem;
}

.remaining-attribute {
  margin: 0 1rem;

  &.broken {
    color: red;
  }
}

.attribute-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  grid-gap: 0.25rem;
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

.attribute-item-label {
  margin-right: 0.5rem;
  flex-grow: 1;
  text-transform: capitalize;
}
</style>
