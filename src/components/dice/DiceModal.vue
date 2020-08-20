<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import Modal from "@/components/Modal.vue"
import { Notification, notify } from "@/util/notifications"
import DiceRoller from "@/components/dice/DiceRoller.vue"
import { CharData } from "@/characterData"
import { SkillObj } from "@/skills"
import DiceRollerConfig from "@/components/dice/DiceRollerConfig.vue"
import FLButton from "@/components/base/FLButton.vue"
import DiceActions from "./DiceActions.vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import { IDiceConfig } from "@/dice/diceTypes"
import { FLNumberInput } from "@/components/FLNumberInput.vue"

function defaultDice(): IDiceConfig {
  return {
    white: 3,
    red: 2,
    black: 1,
    green: null,
    blue: null,
    orange: null,
  }
}

@Component({
  components: {
    DiceActions,
    DiceRoller,
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
  // FIXME: Get charData via Vuex instead

  get showWillpower() {
    return (
      this.charData &&
      this.charData.willpower !== null &&
      Number(this.charData.willpower) >= 2
    )
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

  canPush = false
  canRoll = true

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
    this.canPush = !pushDisabled
  }
}

export default DiceModal
</script>

<template>
  <Modal @close="close" :title="title || $t('Roll dice')">
    <div slot="body" class="dicemodal-body">
      <ExpandableSection
        v-if="$debugMode"
        :label="$t('Config')"
        :defaultOpen="true"
      >
        <DiceRollerConfig />
      </ExpandableSection>
      <slot name="top"></slot>
      <DiceRoller
        :white="dice.white"
        :red="dice.red"
        :black="dice.black"
        :green="dice.green"
        :blue="dice.blue"
        :orange="dice.orange"
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
      />
    </div>
  </Modal>
</template>

<style lang="less" scoped>
.dicemodal-body {
  display: flex;
  flex-direction: column;
  height: 100%;
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
