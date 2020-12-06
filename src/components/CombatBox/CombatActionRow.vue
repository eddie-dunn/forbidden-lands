<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

import { CharData } from "@/data/character/characterData"
import { FLSelect, Option, Optgroup } from "@/components/base/FLSelect.vue"
import { ICombatAction, ACTION_ALL } from "@/data/combat/typesCombat.ts"
import IconButton from "@/components/base/IconButton.vue"
import { getActions } from "src/data/combat/logic/combatAction"
import { getCombatItems } from "src/data/combat/logic/combatItems"
import { TItem } from "src/data/items/itemTypes"
import { capitalize } from "src/util/util"

const nullItem = { id: "", name: "-" }

const NoAction: ICombatAction = {
  id: "",
  name: "-",
  skill: null,
  prereqOk: () => true,
  prerequisite: () => "",
}

@Component({
  components: {
    FLSelect,
    IconButton,
  },
})
export class CombatActionRow extends Vue {
  @Prop({ required: true }) charData!: CharData
  @Prop({ required: true }) round!: number
  @Prop({ required: true }) actionPerformed!: boolean
  @Prop({ required: true }) type!: "fast" | "slow"

  get actionLabel() {
    return this.$t(
      this.type === "fast" ? "combat-action-fast" : "combat-action-slow"
    )
  }
  itemId: string = ""
  selectedActionId: ACTION_ALL | "" = ""

  async setSelectedActionId(value: ACTION_ALL | "") {
    this.selectedActionId = value
    // Also select first item, if available
    await this.$nextTick()
    this.itemId = this.items[0]?.id || nullItem.id
  }

  @Watch("charData.gear.inventory")
  resetForInv() {
    this.setSelectedActionId("")
  }

  @Watch("round")
  reset() {
    this.setSelectedActionId("")
  }

  get items(): TItem[] {
    return getCombatItems(
      this.type,
      this.charData.gear.inventory,
      this.selectedActionId
    )
  }

  get itemOptions(): Option[] {
    return [nullItem, ...this.items]
  }

  get actions(): { valid: ICombatAction[]; invalid: ICombatAction[] } {
    const addName = (action: ICombatAction) => ({
      ...action,
      name: capitalize(String(this.$t(action.id))),
    })
    const { valid, invalid } = getActions(this.type, this.charData)
    return {
      valid: [NoAction, ...valid.map(addName)],
      invalid: invalid.map(addName),
    }
  }

  get actionGroups(): Optgroup[] {
    if (!this.actions.invalid.length) {
      return []
    }
    return [{ label: "---", options: this.actions.invalid }]
  }

  get selectedAction(): ICombatAction {
    const { valid, invalid } = this.actions
    const a = [...valid, ...invalid]
    return a.find((action) => action.id === this.selectedActionId) || NoAction
  }

  get rollDisabled() {
    return (
      this.actionPerformed ||
      !this.selectedAction.skill ||
      !this.selectedAction.prereqOk(this.charData)
    )
  }

  get prereqOk() {
    return this.selectedAction.prereqOk(this.charData)
  }

  rollDice() {
    const action = this.selectedAction
    const itemId = this.itemId
    this.$emit("roll", { action, itemId })
  }
}

export default CombatActionRow
</script>

<template>
  <div class="CombatActionRow-box">
    <FLSelect
      :label="actionLabel"
      :fullWidth="true"
      :disabled="actionPerformed"
      :options="actions.valid"
      :optgroups="actionGroups"
      :value="selectedActionId"
      @input="setSelectedActionId"
    />

    <FLSelect
      :label="$t('item')"
      :fullWidth="true"
      :disabled="!items.length || actionPerformed"
      :options="itemOptions"
      v-model="itemId"
    />

    <div>
      <IconButton
        icon="rolling-dices"
        color="green"
        @click="rollDice"
        :disabled="rollDisabled"
        class="capitalize no-padding button-margin"
      >
      </IconButton>
    </div>
    <div :class="['grid-row grid-aside capitalize-first', !prereqOk && 'red']">
      {{ selectedAction.prerequisite() }}
    </div>
  </div>
</template>

<style scoped lang="less">
@import "~Style/colors.less";

.CombatActionRow-box {
  display: contents;
}

.red {
  color: @color-danger;
}

.grid-row {
  grid-column-start: 1;
  grid-column-end: -1;
}

.grid-aside {
  margin-top: -0.9rem;
}

.button-margin {
  margin-top: 2em;
}
</style>
