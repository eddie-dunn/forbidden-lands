<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import ExpandableSection from "@/components/ExpandableSection.vue"
import FLButton from "@/components/base/FLButton.vue"
import Modal from "@/components/Modal.vue"
import { Notification, notify } from "@/util/notifications"
import DiceRoller from "@/components/dice/DiceRoller.vue"
import { CharData } from "@/data/character/characterData"
import { SkillObj } from "@/skills"
import { Option, Optgroup, FLSelect } from "@/components/base/FLSelect.vue"
import { ItemWeapon } from "src/data/items/itemTypes"

const rollTypes = [
  { type: "generic", name: "Generic" },
  { type: "attribute", name: "Attribute" },
  { type: "skill", name: "Skill" },
  { type: "combat", name: "Combat" },
]

const rollForAttribute = [
  { type: "strength" },
  { type: "agility" },
  { type: "intelligence" },
  { type: "charisma" },
]

const rollForCombat = [
  { type: "melee" },
  { type: "ranged" },
  { type: "dodge" },
  { type: "parry" },
]

const skill = [
  { type: "skill1" },
  { type: "skill2" },
  { type: "skill3" },
  { type: "skill4" },
]

/**
 * TODO:
 * Enable rolling dice for
 * - attributes
 * - skills
 * - combat (melee, ranged, armor, ducky, parry)
 *
 * Go through talents for talents that add bonuses to appropriate rolls
 */
@Component({
  components: {
    DiceRoller,
    ExpandableSection,
    FLButton,
    Modal,
    FLSelect,
  },
})
export default class SkillRoller extends Vue {
  @Prop({ required: false }) charData!: CharData

  rollTypes = rollTypes
  rollForAttribute = rollForAttribute
  rollForCombat = rollForCombat
  skill = skill

  selectedRollType = rollTypes[0].type
  selectedAttribute = rollForAttribute[0].type
  selectedCombatAction = rollForCombat[0].type
  selectedSkill = null
}
</script>

<template>
  <div class="roll-config">
    <div>Selected type: {{ selectedRollType }}</div>
    <div>Selected attrib: {{ selectedAttribute }}</div>

    <div class="roll-config-row">
      <label for="roll-type">Roll type</label>
      <select id="roll-type" v-model="selectedRollType">
        <option
          v-for="(roll, i) in rollTypes"
          :key="`${roll.type}-${i}`"
          :value="roll.type"
        >
          {{ roll.name }}
        </option>
      </select>
    </div>

    <div v-if="selectedRollType === 'attribute'" class="roll-config-row">
      <label for="attribute-type">Attribute</label>
      <select id="attribute-type" v-model="selectedAttribute">
        <option
          v-for="(roll, i) in rollForAttribute"
          :key="`${roll.type}-${i}`"
          :value="roll.type"
        >
          {{ roll.type }}
        </option>
      </select>
    </div>

    <div v-if="selectedRollType === 'combat'" class="roll-config-row">
      <label for="combat-type">Combat action</label>
      <select id="combat-type" v-model="selectedCombatAction">
        <option
          v-for="(roll, i) in rollForCombat"
          :key="`${roll.type}-${i}`"
          :value="roll.type"
        >
          {{ roll.type }}
        </option>
      </select>
    </div>

    <div v-if="selectedRollType === 'skill'" class="roll-config-row">
      <label for="combat-type">Skill</label>
      <select id="combat-type" v-model="selectedSkill">
        <option
          v-for="(roll, i) in skill"
          :key="`${roll.type}-${i}`"
          :value="roll.type"
        >
          {{ roll.type }}
        </option>
      </select>
    </div>

    <div>Item: (item selector)</div>
    <div>Item bonus</div>
    <div>Item damage (if weapon)</div>

    <div>Roll bonus (or penalty, where red success => failure)</div>
    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
.roll-config {
  text-align: left;
  margin: 1rem;
}
.roll-config-row {
  display: inline-grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin: 1rem;
}
.dice-config-body {
  display: flex;
  flex-direction: column;
}
</style>
