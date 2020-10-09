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
import { ItemWeapon, Range } from "@/data/items/itemTypes"
import { DiceModal } from "@/components/dice/DiceModal.vue"
import { capitalize } from "@/util/util"

const fists: ItemWeapon = {
  name: "Unarmed",
  grip: 1,
  bonus: 0,
  damage: 1,
  range: Range.armslength,
  cost: 0,
  weight: 0,
  features: {},
  equipped: false,
  bonusType: "black",
  type: "weapon",
  id: "fists",
  skill: "melee",
}

/**
 * TODOs
 * Go through inventory for items that add bonuses
 * Go through talents for talents that add bonuses
 *
 * Weapons: Show base damage
 * Melee: Allow selection of equipped weapon to roll for
 * Marksmanship: Also show dice for rolling for loss of arrows
 *
 * Enable rolling for armor & helmet and shield as well
 */
@Component({
  components: {
    DiceRoller,
    DiceModal,
    ExpandableSection,
    FLButton,
    Modal,
    FLSelect,
  },
})
export default class SkillRoller extends Vue {
  @Prop({ required: true }) skill!: SkillObj
  @Prop({ required: true }) charData!: CharData

  get title() {
    return `${this.$t(this.skill.id)}: ${this.charData.name}`
  }

  /** Attribute bonus */
  get white() {
    const attrib = this.skill.attribute
    return (
      Number(this.charData.attributes[attrib]) -
      Number(this.charData.attributeDmg[attrib])
    )
  }

  /** Skill bonus */
  get red() {
    return this.skill.rank
  }

  /** Item bonus */
  get black() {
    // TODO: Return bonus for items related to skill
    return (
      (this.selectedWeaponData && this.selectedWeaponData.bonus) ||
      (this.selectedItemData && this.selectedItemData.bonus)
    )
  }

  /** Mighty bonus */
  get green() {
    return null
  }

  /** Epic bonus */
  get blue() {
    return null
  }

  /** Legendary bonus */
  get orange() {
    return null
  }

  get diceConfig() {
    const conf = {
      white: this.white,
      red: this.red,
      black: this.black,
    }
    return conf
  }

  close(ev: any) {
    this.$emit("close")
  }

  handleWillpower(value: number) {
    this.charData.willpower = value
  }

  /* Item stuff */
  selectedItem = this.isMelee ? fists.id : null
  get items() {
    return this.charData.gear.inventory
  }

  /* Weapon stuff */
  get isMelee() {
    return this.skill.id === "melee"
  }
  isMarksmanship = this.skill.id === "marksmanship"

  get weapons(): ItemWeapon[] {
    return this.charData.gear.inventory.filter(
      (item) => item.equipped && item.type === "weapon"
    ) as ItemWeapon[]
  }
  get rangedWeapons() {
    return this.weapons.filter((weapon) => weapon.range > 1)
  }
  get meleeWeapons() {
    const name = capitalize(this.$t(fists.name.toLowerCase()) as string)
    const mFists = { ...fists, name }
    return [mFists, ...this.weapons.filter((weapon: any) => weapon.range <= 1)]
  }

  get selectedWeaponData() {
    if (this.selectedItem === fists.id) {
      return fists
    }
    const data = this.weapons.find((weapon) => weapon.id === this.selectedItem)
    return data || null
  }

  get selectedItemData() {
    const data = this.items.find((item) => item.id === this.selectedItem)
    if (this.isMelee) {
      return data || fists
    }
    return data || null
  }
}
</script>

<template>
  <DiceModal @close="close" v-if="true" :dice="diceConfig" :charData="charData">
    <div slot="top">
      <div v-if="isMelee || isMarksmanship" class="weapon-box">
        <h4 v-if="!weapons.length" class="capitalize-first">
          {{ $t("no suitable weapon equipped") }}
        </h4>
        <FLSelect
          v-else
          :label="$t('Weapon')"
          :options="isMelee ? meleeWeapons : rangedWeapons"
          :initial="$t('None selected')"
          :initialDisabled="false"
          v-model="selectedItem"
        />
        <div v-if="selectedWeaponData">
          {{ $t("Damage") + ": " + selectedWeaponData.damage }}
        </div>
      </div>
      <div v-else>
        <FLSelect
          :label="$t('Use gear') + '?'"
          :options="items"
          :initial="$t('None selected')"
          :initialDisabled="false"
          v-model="selectedItem"
        />
      </div>
    </div>
  </DiceModal>
</template>

<style lang="less" scoped>
.weapon-box {
  display: flex;
  justify-content: left;
  align-items: center;
}

// .skillroller-body {
//   height: 100%;
//   display: flex;
//   flex-direction: column;
// }
// .skillroller-dice {
//   flex-grow: 1;
// }
</style>
