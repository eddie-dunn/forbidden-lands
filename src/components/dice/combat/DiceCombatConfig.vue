<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import {
  actionsSlow,
  actionsFast,
  actionsAll,
  TARGET,
} from "@/data/combat/combat.ts"
import ExpandableSection from "@/components/ExpandableSection.vue"
import { FLSelect, Option, Optgroup } from "@/components/base/FLSelect.vue"
import { FLNumberInput } from "@/components/base/FLNumberInput.vue"
import { IconButton } from "@/components/base/IconButton.vue"
import { CharData } from "@/data/character/characterData"
import { ACTION_FAST, ACTION_SLOW, ACTION_ALL } from "@/data/combat/typesCombat"
import { TSkillId } from "@/types"
import { SKILLS } from "@/skills"
import { capitalize } from "@/util/util"
import { Item } from "@/data/items/itemTypes"

type TCombatOption = Option & { id: ACTION_ALL }

const skills: Option[] = Object.values(SKILLS).map(({ id }) => ({ id }))

@Component({
  components: {
    ExpandableSection,
    FLSelect,
    FLNumberInput,
    IconButton,
  },
})
export class DiceCombatConfig extends Vue {
  @Prop({ default: null }) charData!: CharData
  @Prop({ default: "" }) actionId!: ACTION_ALL | ""
  @Prop({ default: "" }) skillId!: TSkillId | ""
  @Prop({ default: "" }) itemId!: string
  @Prop({ default: false }) isMonster!: boolean

  actionIdLocal = this.actionId
  skillIdLocal = this.skillId
  mItemId = this.itemId
  bonus = 0
  target: TARGET = this.isMonster ? TARGET.monster : TARGET.humanoid

  fastOptions: TCombatOption[] = actionsFast
    .filter((a) => a.skill)
    .map((a) => ({ id: a.id }))
  fastGroup: Optgroup = {
    label: "combat-action-fast",
    options: this.fastOptions,
  }

  slowOptions: TCombatOption[] = actionsSlow
    .filter((a) => {
      if (a.id === ACTION_SLOW.unarmed_attack) {
        return !this.charData.gear.inventory.some(
          (i) => i.type === "weapon" && i.equipped
        )
      }
      if (
        [ACTION_SLOW.slash, ACTION_SLOW.stab, ACTION_SLOW.shoot].includes(a.id)
      ) {
        return this.charData.gear.inventory.some(
          (i) => i.type === "weapon" && i.equipped
        )
      }
      return !!a.skill
    })
    .map((a) => ({ id: a.id }))

  slowGroup: Optgroup = {
    label: "combat-action-slow",
    options: this.slowOptions,
  }

  get itemSelected() {
    return this.charData?.gear.inventory.find((i) => i.id === this.mItemId)
  }

  get none() {
    return capitalize(String(this.$t("none")))
  }

  get actions(): { options: Option[]; groups: Optgroup[] } {
    return {
      options: [{ id: "", name: this.none }],
      groups: [this.fastGroup, this.slowGroup],
    }
  }

  get skills(): Option[] {
    return [{ id: "", name: this.none }, ...skills]
  }

  get targetOptions(): Option[] {
    return [
      { id: "", name: this.none },
      { id: TARGET.humanoid },
      { id: TARGET.monster },
    ]
  }

  get items(): Option[] {
    // TODO: Optgroups, equipped & unequipped
    // TODO: Filter on item type weapon
    return [
      { id: "", name: "-" },
      ...this.charData?.gear.inventory.filter((i) => {
        if (
          [ACTION_SLOW.slash, ACTION_SLOW.stab, ACTION_SLOW.shoot].includes(
            this.actionIdLocal as ACTION_SLOW
          )
        ) {
          return i.equipped
        }
        return true
      }),
    ]
  }

  handleTarget(newTarget: TARGET) {
    this.target = newTarget
    this.emit()
  }

  handleActionId(actionId: ACTION_ALL) {
    this.actionIdLocal = actionId
    const newSkillId = actionsAll.find((a) => a.id === actionId)?.skill || ""
    this.skillIdLocal = newSkillId
    this.emit()
  }

  handleSkillId(newSkillId: TSkillId) {
    this.skillIdLocal = newSkillId || ""
    this.emit()
  }

  handleItem(newItemId: string) {
    this.mItemId = newItemId
    this.emit()
  }

  emit() {
    this.$emit("update", {
      monster: this.target === TARGET.monster,
      action: this.actionIdLocal,
      skill: this.skillIdLocal,
      item: this.itemSelected,
      bonus: this.bonus,
    })
  }
}

export default DiceCombatConfig
</script>

<template>
  <div class="Box-CombatConfig">
    <div class="conf-grid">
      <label class="capitalize-first">{{ $t("bonus") }}</label>
      <FLNumberInput
        :value="bonus"
        @input="
          (val) => {
            bonus = Number(val)
            emit()
          }
        "
        max="100"
        min="-99"
        fontSize="1.5rem"
        :inGrid="true"
      />

      <FLSelect
        :label="$t('action')"
        :options="actions.options"
        :optgroups="actions.groups"
        :value="actionIdLocal"
        @input="handleActionId"
        :translateOptions="true"
        :inGrid="true"
        class="select"
      />

      <FLSelect
        :label="$t('skill')"
        :options="skills"
        :value="skillIdLocal"
        @input="handleSkillId"
        :translateOptions="true"
        :inGrid="true"
        class="select"
      />

      <label class="capitalize-first">{{ $t("item") }}</label>
      <div class="CombatConfig-item">
        <FLSelect
          v-if="items.length"
          :options="items"
          :value="mItemId"
          @input="handleItem"
          class="select item-select"
        />
        <div v-if="itemSelected" class="capitalize-first">
          {{ $t("bonus") + " " + itemSelected.bonus }}
        </div>
        <div
          v-if="itemSelected && itemSelected.damage"
          class="capitalize-first"
        >
          {{ $t("Damage") + " " + itemSelected.damage }}
        </div>
      </div>

      <FLSelect
        :label="$t('opponent')"
        :options="targetOptions"
        :inGrid="true"
        :value="target"
        @input="handleTarget"
        class="select"
      />
    </div>
    <div>
      <!-- {{ itemSelected }} -->
    </div>
  </div>
</template>

<style lang="less">
// NOTE: style-sheet is not scoped in order to be able to affect child component
// styles!
@import "~Style/colors.less";

.Box-CombatConfig {
  display: block;
}

.conf-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.7rem;
  align-items: center;
  label {
    font-size: 1rem;
  }
}

.CombatConfig-item {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-row-gap: 5px;
  align-items: center;
  .item-select {
    grid-column-start: 1;
    grid-column-end: -1;
    select {
      width: 100%;
    }
  }
}
</style>
