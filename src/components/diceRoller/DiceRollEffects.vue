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
import { DiceSides, TSkillId } from "src/types"
import { rollDiceType } from "src/dice/diceRoller.ts"
import { ACTION_ALL } from "src/data/combat/typesCombat"
import { isDmgAttack } from "src/data/combat/combatActions.ts"
import { TranslateResult } from "vue-i18n"
import { capitalize } from "src/util/util"

interface IEffect {
  id: string
  value: number | null
  label: string | TranslateResult
  description: string
  apply?: () => void
}

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
  @Prop({ required: true }) arrowRoll!: number

  effectsApplied = false

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

  get attackDmgEffect() {
    if (!isDmgAttack(this.actionId)) {
      return { value: null }
    }
    const nbrSuccess = this.rollResult.success
    const weaponDmg = this.weapon ? this.weapon.damage : 1
    const dmg = Math.max(0, nbrSuccess + weaponDmg - 1)
    return { value: dmg, name: "Damage" }
  }

  get attributeDamage(): IEffect {
    const value = this.rollResult.whiteSkulls || 0
    const id = this.skillId ? this.charData.skills[this.skillId].attribute : ""
    const label = capitalize(String(this.$t(id)))
    const description = `-${value}`
    const apply = () => {
      const newAttrDmg =
        (this.charData.attributeDmg[this.attributeDamage.id] || 0) + value
      this.charData.attributeDmg[this.attributeDamage.id] = newAttrDmg
    }
    return { id, value, label, description, apply }
  }

  get willpowerEffect(): IEffect {
    const value = this.attributeDamage.value || 0
    const id = "Willpower"
    const label = this.$t(id)
    const description = `+${value}`
    const apply = () => {
      this.charData.willpower += value
    }
    return { id, value, label, description, apply }
  }

  get itemDamage(): IEffect {
    const value = this.rollResult.blackSkulls || 0
    const id = "item-dmg"
    const label = this.item?.name || "Item"
    const description = `-${value}`
    const apply = () => {
      const item = this.charData.gear.inventory.find(
        (i) => i.id === this.itemId
      )
      if (item) {
        item.bonus -= value
      }
    }
    return { id, value, label, description, apply }
  }

  oldArrows = this.charData.gear.consumables.arrows
  get arrowChange(): IEffect {
    const id = "Arrows"
    const label = this.$t(id)
    if (!this.isBow) {
      return { id, value: 0, label, description: "" }
    }
    const oldArrows = this.oldArrows
    const roll = this.arrowRoll
    const newArrows = roll <= 2 ? oldArrows - 2 : oldArrows
    const newValue = newArrows < 6 ? "" : this.$t("D") + String(newArrows)
    const oldValue = this.$t("D") + String(oldArrows)
    const description = `${oldValue} => ${newValue || 0} (🎲 = ${roll})`
    const value = roll
    if (oldArrows === newArrows) {
      return { id, value, label, description }
    }

    const apply = () => {
      this.charData.gear.consumables.arrows = newArrows as DiceSides
    }

    return { id, value, label, description, apply }
  }

  get canApply() {
    return !!this.selfEffects.some((e) => !!e.apply)
  }

  get anyEffects() {
    return Boolean(this.attackDmgEffect.value || !!this.selfEffects.length)
  }

  get selfEffects() {
    return [
      this.attributeDamage,
      this.willpowerEffect,
      this.itemDamage,
      this.arrowChange,
    ].filter((e) => e.value)
  }

  applyEffects() {
    const message = this.selfEffects
      .map((e) => `${e.label}: ${e.description}`)
      .join(" | ")
    this.$notify({ type: "info", message, displayTime: 10000 })
    this.selfEffects.forEach((e) => {
      if (e.apply) {
        e.apply()
      }
    })
    this.effectsApplied = true
    this.$emit("applied")
  }
}

export default DiceRollEffects
</script>

<template>
  <div v-if="anyEffects" class="Box-DiceRollEffects">
    <div v-if="attackDmgEffect.value" class="damage-box">
      Damage: {{ attackDmgEffect.value }}
      {{ (isCrit && attackDmgEffect.value > 0 && " +CRIT") || "" }}
    </div>

    <div v-for="effect in selfEffects" :key="effect.id">
      <span class="capitalize">{{ effect.label }}: </span>
      <span> {{ effect.description }}</span>
    </div>

    <div class="effect-action-box">
      <IconButton
        v-if="canApply"
        @click="applyEffects"
        color="danger"
        :disabled="effectsApplied"
      >
        Apply
      </IconButton>
    </div>

    <div v-if="$DEBUG">
      <div v-if="item">{{ item.name }} {{ item.bonus }}</div>
      <div v-if="isBow">Arrows {{ charData.gear.consumables.arrows }}</div>
      <div>
        {{ attributeDamage.id }} dmg
        {{ charData.attributeDmg[this.attributeDamage.id] }}
      </div>
      <div>WP {{ charData.willpower }}</div>
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
