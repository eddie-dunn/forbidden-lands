<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

import { SET_PAGE_TITLE } from "@/store/store-types"
import DiceRoller from "@/components/dice/DiceRoller.vue"
import { FLNumberInput } from "@/components/base/FLNumberInput.vue"
import FLButton from "@/components/base/FLButton.vue"
import { CharData } from "@/data/character/characterData"
import { FLSelect } from "@/components/base/FLSelect.vue"
import { actionsSlow, actionsFast } from "@/data/combat/combat.ts"
import {
  ICombatAction,
  ACTION_SLOW,
  ACTION_FAST,
  ACTION_ALL,
} from "@/data/combat/typesCombat.ts"
import { capitalize } from "@/util/util"
import SvgIcon from "@/components/SvgIcon.vue"
import IconButton from "@/components/base/IconButton.vue"
import { DiceModal } from "@/components/dice/combat/DiceModalCombat.vue"
import { GearCard } from "@/components/sheet/cards/GearCard.vue"
import { Item } from "@/data/items/itemTypes"
import { TSkillId } from "@/types"

const NoAction: ICombatAction = {
  id: "",
  skill: null,
  prereqOk: () => true,
  prerequisite: () => "",
}

@Component({
  components: {
    DiceModal,
    DiceRoller,
    FLButton,
    FLNumberInput,
    FLSelect,
    GearCard,
    IconButton,
    SvgIcon,
  },
})
export class Combat extends Vue {
  @Prop({ required: true }) charData!: CharData

  modalOpen = false

  get actionsFast() {
    return (
      actionsFast
        // .filter((action) => action.prereqOk(this.charData))
        .map((action) => {
          return { ...action, name: capitalize(String(this.$t(action.id))) }
        })
    )
  }
  get actionsSlow() {
    return (
      actionsSlow
        // .filter((action) => action.prereqOk(this.charData))
        .map((action) => {
          return { ...action, name: capitalize(String(this.$t(action.id))) }
        })
    )
  }
  get selectedFastAction(): ICombatAction {
    return (
      this.actionsFast.find(
        (action) => action.id === this.selectedFastActionId
      ) || NoAction
    )
  }
  get selectedSlowAction(): ICombatAction {
    return (
      this.actionsSlow.find(
        (action) => action.id === this.selectedSlowActionId
      ) || NoAction
    )
  }
  get items(): { id: string; name: string }[] {
    // TODO: filter appropriately, e.g, only equipped weapons when doing
    // attacks, when 'use item', return all
    // if (this.selectedFastActionId === ACTION_FAST.use_item) {
    // return this.charData.gear.inventory
    // }
    return this.charData.gear.inventory.filter(
      (i) => i.equipped || i.type === "other"
    )
  }

  itemId = ""
  itemIdFast: string = ""
  itemIdSlow: string = ""
  skillId: TSkillId | "" = ""
  actionId: ACTION_ALL | "" = ""

  initiative = null
  fastActionPerformed = false
  slowActionPerformed = false
  selectedSlowActionId: ACTION_SLOW | "" = ""
  selectedFastActionId: ACTION_FAST | "" = ""

  nextRound() {
    this.selectedSlowActionId = ""
    this.selectedFastActionId = ""
    this.fastActionPerformed = false
    this.slowActionPerformed = false
  }

  rollDice(action: ICombatAction, item: string = "") {
    this.skillId = action.skill || ""
    this.actionId = action.id || ""
    this.itemId = item || ""
    this.modalOpen = true

    this.$emit("roll", { ...action, item })
  }

  rollDisabled(action: ICombatAction) {
    return !action.prereqOk(this.charData, {
      fastActionPerformed: this.fastActionPerformed,
      slowActionPerformed: this.slowActionPerformed,
    })
  }

  get equippedArmor(): Item | undefined {
    return this.charData.gear.inventory.find(
      (i) => i.type === "armor" && i.equipped
    )
  }
  get equippedHelmet(): Item | undefined {
    return this.charData.gear.inventory.find(
      (i) => i.type === "helmet" && i.equipped
    )
  }
  armorClicked() {
    if (!this.equippedArmor && !this.equippedHelmet) return
    const black =
      (this.equippedHelmet || { bonus: 0 }).bonus +
      (this.equippedArmor || { bonus: 0 }).bonus
    this.$root.$emit("open-dice-modal", {
      title: "armor",
      dice: { black },
      disablePush: true,
    })
  }
}
export default Combat
</script>

<template>
  <div class="fl-combat">
    <section class="details-top">
      <FLNumberInput
        :label="$t('initiative')"
        id="initiative"
        min="1"
        max="10"
        v-model.number="initiative"
      />

      <label v-if="false" for="initiative">{{ $t("Willpower") }}</label>
      <FLNumberInput
        :label="$t('Willpower')"
        id="initiative"
        min="0"
        max="10"
        v-model.number="charData.willpower"
      />

      <IconButton icon="rolling-dices" @click="armorClicked">
        {{ $t("Armor") }}
      </IconButton>

      <div v-if="false">
        <input
          type="checkbox"
          name="slow-action"
          id="slow-action"
          v-model="slowActionPerformed"
        />
        <label for="slow-action">{{ "Performed slow action" }}</label>
      </div>

      <div v-if="false">
        <input
          type="checkbox"
          name="fast-action"
          id="fast-action"
          v-model="fastActionPerformed"
        />
        <label for="fast-action">{{ "Performed fast action" }}</label>
      </div>
    </section>

    <section class="grid">
      <div class="grid-head grid-full bold">
        <div class="capitalize">{{ $t("action") }}</div>
        <div class="capitalize">{{ $t("item") }}</div>
        <div>
          <SvgIcon name="rolling-dices" />
          <!-- Skill -->
        </div>
        <div class="center">
          <SvgIcon name="check" />
        </div>
        <!-- <div>Prereq</div> -->
      </div>

      <!-- fast action -->
      <FLSelect
        :label="$t('combat-action-fast')"
        :fullWidth="true"
        :disabled="fastActionPerformed"
        :options="actionsFast"
        v-model="selectedFastActionId"
      />
      <FLSelect
        :label="' '"
        :fullWidth="true"
        :disabled="!items"
        :options="items"
        v-model="itemIdFast"
      />
      <div>
        <IconButton
          icon="rolling-dices"
          color="green"
          @click="rollDice(selectedFastAction, itemIdFast)"
          :disabled="
            rollDisabled(selectedFastAction) ||
              fastActionPerformed ||
              !selectedFastAction.skill
          "
          class="capitalize no-padding button-margin"
        >
          <!-- {{ $t(selectedFastAction.skill) }} -->
        </IconButton>
      </div>
      <input
        type="checkbox"
        class="button-margin"
        name="long-action"
        id="long-action"
        v-model="fastActionPerformed"
      />
      <div class="grid-row grid-aside capitalize-first">
        {{ selectedFastAction.prerequisite() }}
      </div>

      <!-- slow action -->
      <FLSelect
        :label="$t('combat-action-slow')"
        :fullWidth="true"
        :disabled="slowActionPerformed"
        :options="actionsSlow"
        v-model="selectedSlowActionId"
      />
      <FLSelect
        :label="' '"
        :fullWidth="true"
        :disabled="!items"
        :options="items"
        v-model="itemIdSlow"
      />
      <div>
        <IconButton
          icon="rolling-dices"
          color="green"
          :disabled="
            rollDisabled(selectedSlowAction) ||
              slowActionPerformed ||
              !selectedSlowAction.skill
          "
          @click="rollDice(selectedSlowAction, itemIdSlow)"
          class="capitalize no-padding button-margin"
        >
          <!-- {{ $t(selectedSlowAction.skill) }} -->
        </IconButton>
      </div>
      <input
        type="checkbox"
        name="fast-action"
        id="fast-action"
        class="button-margin"
        v-model="slowActionPerformed"
      />
      <div class="grid-row grid-aside capitalize-first">
        {{ selectedSlowAction.prerequisite() }}
      </div>

      <!-- end -->
    </section>

    <!-- only enable if shown in separate view -->
    <GearCard v-if="false" :charData="charData" />

    <div class="next-round">
      <FLButton class="capitalize-first" @click="nextRound">
        {{ $t("next round") }}
      </FLButton>
    </div>

    <DiceModal
      v-if="modalOpen"
      @close="modalOpen = false"
      :charData="charData"
      title="Combat"
      :skillId="skillId"
      :actionId="actionId"
      :itemId="itemId"
    />
  </div>
</template>

<style scoped lang="less">
.details-top {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  max-width: 400px;
  grid-gap: 1rem;
}

.fl-combat {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: left;
}

.grid {
  max-width: 55ch;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 2fr 2fr auto auto;
  align-items: center;
  row-gap: 1rem;
  column-gap: 1rem;
}

.grid-head {
  display: contents;
}

.grid-row {
  grid-column-start: 1;
  grid-column-end: -1;
}

.grid-aside {
  margin-top: -0.9rem;
}

.bold {
  font-weight: bold;
}
.center {
  text-align: center;
}
.no-padding {
  padding: unset;
}

.button-margin {
  margin-top: 2em;
}

.next-round {
  margin-left: auto;
  margin-top: 1rem;
}
</style>
