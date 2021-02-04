<script lang="ts">
import DiceActions from "@/components/dice/DiceActions.vue"
import DiceRollerConfig from "@/components/dice/DiceRollerConfig.vue"
import ExpandableSection, {
  EXPANDER_SLOT,
} from "@/components/ExpandableSection.vue"
import FLButton from "@/components/base/FLButton.vue"
import Modal from "@/components/Modal.vue"

import { CharData } from "@/data/character/characterData"
import { Component, Prop, Vue } from "vue-property-decorator"
import { DiceCombat } from "@/components/dice/combat/DiceCombat.vue"
import { DiceRollerCombat } from "@/components/dice/combat/DiceRollerCombat.vue"
import { FLNumberInput } from "@/components/base/FLNumberInput.vue"
import { IDiceConfig } from "@/dice/diceTypes"
import { ACTION_ALL, ACTION_FAST } from "@/data/combat/typesCombat"
import { TSkillId } from "@/types"
import { IResultSummary } from "src/components/dice/diceTypes"
import { DiceRollEffects } from "src/components/diceRoller/DiceRollEffects.vue"
import { rollDiceType } from "src/dice/diceRoller"

function defaultDice(): IDiceConfig {
  return {
    white: null,
    red: null,
    black: null,
    green: null,
    blue: null,
    orange: null,
  }
}

@Component({
  components: {
    DiceActions,
    DiceCombat,
    DiceRollerCombat,
    DiceRollerConfig,
    DiceRollEffects,
    Modal,
    FLButton,
    FLNumberInput,
    ExpandableSection,
  },
})
export class DiceModal extends Vue {
  @Prop({ default: "" }) title!: string
  @Prop({ default: () => defaultDice() }) dice!: IDiceConfig
  @Prop({ default: null }) charData!: CharData
  @Prop({ default: false }) disablePush!: boolean
  @Prop({ default: "" }) actionId!: ACTION_ALL | ""
  @Prop({ default: "" }) skillId!: TSkillId | ""
  @Prop({ default: "" }) itemId!: ""
  @Prop({ default: false }) isMonster!: boolean

  arrowRoll: number = 6

  canPush = this.disablePush
  canRoll = true

  mDice = { ...this.dice }
  mDiceKey = "0"

  EXPANDER_SLOT = EXPANDER_SLOT

  get showWillpower() {
    return this.charData && this.charData.willpower !== null
  }

  close() {
    this.$emit("close")
  }
  onRoll() {
    this.arrowRoll = rollDiceType(this.charData.gear.consumables.arrows)
    this.rollCb()
  }
  onPush() {
    this.pushCb()
  }
  onReset() {
    this.resetCb()
  }

  onWillpower(value: number) {
    this.charData.willpower = value
  }

  pushCb = () => {}
  rollCb = () => {}
  resetCb = () => {}

  setCb(type: "push" | "roll" | "reset", fn: () => void) {
    switch (type) {
      case "push":
        this.pushCb = fn
        break
      case "roll":
        this.rollCb = fn
        break
      case "reset":
        this.resetCb = fn
        break
      default:
        /* eslint-disable-next-line no-console */
        console.error(`Got invalid cb type ${type}`)
        break
    }
  }

  updateCanPush(pushDisabled: boolean) {
    // FIXME: Move willpower & dwarf push logic here instead
    if (this.disablePush) {
      this.canPush = false
      return
    }
    if (
      this.actionId === ACTION_FAST.parry ||
      this.actionId === ACTION_FAST.dodge
    ) {
      this.canPush = false
      return
    }
    this.canPush = !pushDisabled
  }

  handleConfigUpdate(newConf: IDiceConfig) {
    this.mDice = newConf
    // FIXME: Handle updates more gracefully than this
    this.mDiceKey = JSON.stringify(newConf)
  }

  rollResult: IResultSummary | null = null
  onResult(result: IResultSummary) {
    this.rollResult = result
  }

  effectsApplied() {
    this.canPush = false
    this.canRoll = false
  }
}
export default DiceModal
</script>

<template>
  <Modal @close="close" :title="title || $t('Roll dice')">
    <div slot="body" class="dicemodal-body">
      <DiceCombat
        :charData="charData"
        :skillId="skillId"
        :actionId="actionId"
        :itemId="itemId"
        :isMonster="isMonster"
        @dice-config="handleConfigUpdate"
      />
      <!-- FIXME: Integrate DiceRollerCombat with DiceCombat -->
      <DiceRollerCombat
        :key="mDiceKey"
        :white="mDice.white"
        :red="mDice.red"
        :black="mDice.black"
        :green="mDice.green"
        :blue="mDice.blue"
        :orange="mDice.orange"
        :showButtonBar="false"
        :isDwarf="charData && charData.kin === 'dwarf'"
        :willpower="charData && charData.willpower"
        :infinityPush="charData === null"
        @close="close"
        @resetCb="(cb) => setCb('reset', cb)"
        @rollCb="(cb) => setCb('roll', cb)"
        @pushCb="(cb) => setCb('push', cb)"
        @pushDisabled="updateCanPush"
        @wp-update="onWillpower"
        @result="onResult"
      />
      <ExpandableSection
        v-if="rollResult"
        :defaultOpen="true"
        saveStateId="dice-roll-effects"
      >
        <div :slot="EXPANDER_SLOT.header_center" style="font-size: 1rem;">
          Effects
        </div>
        <DiceRollEffects
          :key="mDiceKey"
          :rollResult="rollResult"
          :itemId="itemId"
          :skillId="skillId"
          :actionId="actionId"
          :charData="charData"
          :arrowRoll="arrowRoll"
          @applied="effectsApplied"
        />
      </ExpandableSection>
    </div>
    <div slot="footer">
      <div v-if="showWillpower" class="wp-input">
        <label for="willpower">{{ $t("WP") }}</label>
        <FLNumberInput
          id="willpower"
          fontSize="1.7rem"
          min="0"
          max="10"
          v-model.number="charData.willpower"
        />
      </div>

      <DiceActions
        @roll="onRoll"
        @push="onPush"
        @reset="onReset"
        @close="close"
        :canRoll="canRoll"
        :canPush="canPush"
        :showClose="true"
        :showReset="false"
      />
    </div>
  </Modal>
</template>

<style lang="less" scoped>
.dicemodal-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 30vh;
}

.wp-input {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  position: sticky;
  bottom: 0px;
  border-top: 1px solid #33333333;
  background: white;
  label {
    font-size: 1.5rem;
    margin-right: 10px;
  }
}
</style>
