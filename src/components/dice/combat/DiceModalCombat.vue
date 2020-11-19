<script lang="ts">
import DiceActions from "@/components/dice/DiceActions.vue"
import DiceRollerConfig from "@/components/dice/DiceRollerConfig.vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import FLButton from "@/components/base/FLButton.vue"
import Modal from "@/components/Modal.vue"

import { CharData } from "@/data/character/characterData"
import { Component, Prop, Vue } from "vue-property-decorator"
import { DiceCombat } from "@/components/dice/combat/DiceCombat.vue"
import { DiceRollerCombat } from "@/components/dice/combat/DiceRollerCombat.vue"
import { FLNumberInput } from "@/components/base/FLNumberInput.vue"
import { IDiceConfig } from "@/dice/diceTypes"
import { Notification, notify } from "@/util/notifications"
import { SkillObj } from "@/skills"
import { ACTION_ALL } from "@/data/combat/typesCombat"
import { TSkillId } from "@/types"
import { Item } from "@/data/items/itemTypes"

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

  canPush = this.disablePush
  canRoll = true
  mDice = { ...this.dice }
  mDiceKey = "0"

  get showWillpower() {
    return this.charData && this.charData.willpower !== null
  }

  close(ev: any) {
    this.$emit("close")
  }
  onRoll() {
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
    this.canPush = !pushDisabled
  }

  handleConfigUpdate(newConf: IDiceConfig) {
    this.mDice = newConf
    this.mDiceKey = JSON.stringify(newConf)
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
      />
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
