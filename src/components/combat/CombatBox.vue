<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

import { SET_PAGE_TITLE } from "@/store/store-types"
import DiceRoller from "@/components/dice/DiceRoller.vue"
import { FLNumberInput } from "@/components/base/FLNumberInput.vue"
import FLButton from "@/components/base/FLButton.vue"
import { CharData } from "@/data/character/characterData"
import { FLSelect, Option } from "@/components/base/FLSelect.vue"
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
import { Item, ItemWeapon, WEAPON_CATEGORY } from "@/data/items/itemTypes"
import { TSkillId } from "@/types"
import { isRangedWeapon } from "src/dice/diceConfigurator"

const isSlashing = (i: any | ItemWeapon) =>
  !!(i?.features?.blunt || i?.features?.edged)

const isStabbing = (i: any | ItemWeapon) => !!i?.features?.pointed

const nullItem = { id: "", name: "-" }

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
  monsterOpponent = false

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
  get items(): Item[] {
    // TODO: filter appropriately, e.g, only equipped weapons when doing
    // attacks, when 'use item', return all
    // if (this.selectedFastActionId === ACTION_FAST.use_item) {
    // return this.charData.gear.inventory
    // }
    return [
      ...this.charData.gear.inventory.filter(
        (i) => i.equipped || i.type === "other"
      ),
    ]
  }
  get itemsFast(): Option[] {
    switch (this.selectedFastActionId) {
      case ACTION_FAST.parry:
        return [
          nullItem,
          ...this.items.filter(
            (i) =>
              i.type === "shield" ||
              (i.type === "weapon" && i.features.parrying)
          ),
        ]

      case ACTION_FAST.disarm:
        return [
          nullItem,
          ...this.items.filter((i) => !!(isStabbing(i) || isSlashing(i))),
        ]

      case ACTION_FAST.shove:
        return [
          nullItem,
          ...this.items.filter(
            (i) =>
              !!(
                i.type === "shield" ||
                (i.type === "weapon" && i.features.hook)
              )
          ),
        ]

      case ACTION_FAST.use_item:
        return this.items

      default:
        return [nullItem]
    }
  }

  get itemsSlow(): Option[] {
    switch (this.selectedSlowActionId) {
      case ACTION_SLOW.slash:
        return [nullItem, ...this.items.filter(isSlashing)]

      case ACTION_SLOW.stab:
        return [nullItem, ...this.items.filter(isStabbing)]

      case ACTION_SLOW.charge:
        return [
          nullItem,
          ...this.items.filter((i) => !!(isStabbing(i) || isSlashing(i))),
        ]

      case ACTION_SLOW.shoot:
        return [
          nullItem,
          ...this.items.filter(
            (i) => i.type === "weapon" && isRangedWeapon(i) && i.bonus
          ),
        ]

      default:
        return [nullItem]
    }
  }

  itemId = ""
  itemIdFast: string = ""
  itemIdSlow: string = ""
  skillId: TSkillId | "" = ""
  actionId: ACTION_ALL | "" = ""

  initiative: null | number = null
  fastActionPerformed = false
  slowActionPerformed = false
  selectedSlowActionId: ACTION_SLOW | "" = ""
  selectedFastActionId: ACTION_FAST | "" = ""

  created() {
    const storedInitiative = Number(sessionStorage.getItem("combat-initiative"))
    if (storedInitiative) {
      this.initiative = storedInitiative
    }
  }
  setInitiative(value: number) {
    this.initiative = Number(value)
    sessionStorage.setItem("combat-initiative", String(value))
  }

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
  get isArmorEquipped(): boolean {
    return Boolean(this.equippedArmor || this.equippedHelmet)
  }

  armorClicked() {
    if (!this.equippedArmor && !this.equippedHelmet) return
    const black =
      (this.equippedHelmet || { bonus: 0 }).bonus +
      (this.equippedArmor || { bonus: 0 }).bonus
    this.$root.$emit("open-dice-modal", {
      title: this.$t("armor"),
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
        :value="initiative"
        @input="setInitiative"
      />

      <label v-if="false" for="initiative">{{ $t("Willpower") }}</label>
      <FLNumberInput
        :label="$t('Willpower')"
        id="initiative"
        min="0"
        max="10"
        v-model.number="charData.willpower"
      />

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
      <div v-if="false" class="grid-head grid-full bold">
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
        :label="$t('combat-action-fast') + ' ' + $t('action')"
        :fullWidth="true"
        :disabled="fastActionPerformed"
        :options="actionsFast"
        v-model="selectedFastActionId"
      />
      <FLSelect
        :label="$t('item')"
        :fullWidth="true"
        :disabled="!itemsFast || fastActionPerformed"
        :options="itemsFast"
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
        :label="$t('combat-action-slow') + ' ' + $t('action')"
        :fullWidth="true"
        :disabled="slowActionPerformed"
        :options="actionsSlow"
        v-model="selectedSlowActionId"
      />
      <FLSelect
        :label="$t('item')"
        :fullWidth="true"
        :disabled="!itemsSlow || slowActionPerformed"
        :options="itemsSlow"
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
      <div
        :class="[
          'grid-row grid-aside capitalize-first',
          rollDisabled(selectedSlowAction) && 'red',
        ]"
      >
        {{ selectedSlowAction.prerequisite() }}
      </div>

      <!-- end -->
    </section>

    <!-- only enable if shown in separate view -->
    <GearCard v-if="false" :charData="charData" />

    <section class="setup-grid">
      <label>
        <input
          type="checkbox"
          name="fast-action"
          id="fast-action"
          v-model="slowActionPerformed"
        />
        <span>Fast action performed</span>
      </label>
      <label>
        <input
          type="checkbox"
          name="long-action"
          id="long-action"
          v-model="fastActionPerformed"
        />
        <span>Slow action performed</span>
      </label>
      <label>
        <input
          type="checkbox"
          name="opponent"
          id="opponent"
          v-model="monsterOpponent"
        />
        <span>Fighting monster</span>
      </label>
    </section>

    <div class="next-round">
      <IconButton
        icon="rolling-dices"
        @click="armorClicked"
        :disabled="!isArmorEquipped"
      >
        {{ $t("Armor") }}
      </IconButton>
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
      :isMonster="monsterOpponent"
    />
  </div>
</template>

<style scoped lang="less">
@import "~Style/colors.less";

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
  max-width: 500px;
}

.grid {
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
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.red {
  color: @color-danger;
}

.setup-grid {
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-gap: 0.5rem;
  align-items: center;
}
</style>
