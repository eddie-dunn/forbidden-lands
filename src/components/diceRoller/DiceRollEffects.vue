<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

import ExpandableSection from "@/components/ExpandableSection.vue"
import { FLSelect, Option } from "@/components/base/FLSelect.vue"
import { FLNumberInput } from "@/components/base/FLNumberInput.vue"
import { IconButton } from "@/components/base/IconButton.vue"
import { CharData } from "@/data/character/characterData"
import { IDiceConfigLogEntry } from "src/dice/diceTypes"
import { IResultSummary } from "src/components/dice/diceTypes"
import { WEAPON_CATEGORY } from "src/data/items/itemTypes"
import { TSkillId } from "src/types"
import { rollDiceType } from "src/dice/diceRoller.ts"
import { ACTION_ALL } from "src/data/combat/typesCombat"
import { isDmgAttack } from "src/data/combat/combat.ts"

@Component({
  components: {
    ExpandableSection,
    FLSelect,
    FLNumberInput,
    IconButton,
  },
})
export class DiceRollEffects extends Vue {
  @Prop({ default: () => [] }) rolls!: IDiceConfigLogEntry[]
  @Prop({ required: true }) rollResult!: IResultSummary
  @Prop({ default: null }) charData!: CharData
  @Prop({ default: "" }) itemId!: ""
  @Prop({ default: "" }) skillId!: TSkillId | ""
  @Prop({ default: "" }) actionId!: ACTION_ALL

  get item() {
    const item = this.charData.gear.inventory.find((i) => i.id === this.itemId)
    return item
  }
  get weapon() {
    if (this.item?.type === "weapon") {
      return this.item
    }
    return null
  }
  get isCrit(): boolean {
    if (!this.weapon) {
      return false
    }
    return Boolean(
      this.weapon.category === WEAPON_CATEGORY.axe &&
        this.charData.talents.find(
          (t) => t.id === "axe fighter" && Number(t.rank) >= 2
        )
    )
  }
  get isBow(): boolean {
    if (!this.weapon) {
      return false
    }
    const category = this.weapon.category
    return Boolean(
      category === WEAPON_CATEGORY.bow || category === WEAPON_CATEGORY.crossbow
    )
  }

  get effectDmgInflicted() {
    if (!isDmgAttack(this.actionId)) {
      return { value: null }
    }
    const nbrSuccess = this.rollResult.success
    const weaponDmg = this.weapon ? this.weapon.damage : 1
    const dmg = Math.max(0, nbrSuccess + weaponDmg - 1)
    return { value: dmg, name: "Damage" }
  }

  // damage to attribute if white skulls
  get attributeDamage() {
    const whiteSkulls = this.rollResult.whiteSkulls
    const id = this.skillId ? this.charData.skills[this.skillId].attribute : ""
    const effect = `-${whiteSkulls}`
    return { value: whiteSkulls, name: "Attribute damage", id, effect }
  }

  // damage to item if black skulls
  get itemDamage() {
    if (!this.item) {
      return { name: "Item damage", value: null, id: "Item" }
    }
    const blackSkulls = this.rollResult.blackSkulls
    const effect = `-${blackSkulls}`
    return { value: blackSkulls, id: this.item.name || "Item", effect }
  }

  // effect ammo (if bow/crossbow)
  get arrowChange() {
    if (!this.isBow) {
      return { roll: null, id: "Arrows" }
    }
    const oldArrows = this.charData.gear.consumables.arrows
    const roll = rollDiceType(oldArrows)
    const newArrows = roll <= 2 ? oldArrows - 2 : oldArrows
    const newValue = newArrows < 6 ? "0" : this.$t("D") + String(newArrows)
    const oldValue = this.$t("D") + String(oldArrows)
    const effect = `${oldValue} => ${newValue}`

    return { id: "Arrows", effect, roll }
  }

  get canApply() {
    return false
    // return Boolean(
    //   this.attributeDamage.value ||
    //     this.itemDamage.value ||
    //     this.arrowChange.roll
    // )
  }

  get anyEffects() {
    return Boolean(
      this.effectDmgInflicted.value ||
        this.attributeDamage.value ||
        this.itemDamage.value ||
        this.arrowChange.roll
    )
  }

  applyEffects() {
    const attributeDamage = this.attributeDamage
    const itemDamage = this.itemDamage
    const arrowChange = this.arrowChange
    const message = [
      `${this.$t(attributeDamage.id)}: ${attributeDamage.effect}`,
      `${this.$t("WP")}: +${-attributeDamage.effect}`,
      `${this.$t(itemDamage.id)}: ${itemDamage.effect}`,
      `${this.$t(arrowChange.id)}: ${arrowChange.effect}`,
    ].join("\n")
    this.$notify({ type: "info", message, displayTime: 5000 })
  }
}

export default DiceRollEffects
</script>

<template>
  <div v-if="anyEffects" class="Box-DiceRollEffects">
    <div v-if="effectDmgInflicted.value" class="damage-box">
      Damage: {{ effectDmgInflicted.value }}
      {{ (isCrit && effectDmgInflicted.value > 0 && " +CRIT") || "" }}
    </div>

    <h4>Effects on self</h4>
    <div v-if="attributeDamage.value">
      <span class="capitalize">{{ $t(attributeDamage.id) }}:</span>
      <span> {{ attributeDamage.effect }}</span>
    </div>

    <div v-if="attributeDamage.value">
      {{ $t("WP") }}:
      <span>+{{ attributeDamage.value }}</span>
    </div>

    <div v-if="itemDamage.value">
      {{ itemDamage.id }}:
      <span> {{ itemDamage.effect }}</span>
    </div>

    <div v-if="arrowChange.roll">
      <span class="capitalize">{{ $t(arrowChange.id) }}:</span>
      <span> {{ arrowChange.effect }} </span>
      <span>(roll: {{ arrowChange.roll }})</span>
    </div>

    <div class="effect-action-box">
      <IconButton v-if="canApply" @click="applyEffects" color="danger">
        Apply
      </IconButton>
    </div>
  </div>
  <div v-else class="Box-DiceRollEffects">
    No effects
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.Box-DiceRollEffects {
  display: block;
  margin: 0 1rem;
  padding-bottom: 5rem;
}

.damage-box {
  margin: 1rem 0;
  padding: 5px;
  border: 1px solid @color-main;
}

.effect-action-box {
  margin: 1rem 0;
}
</style>
