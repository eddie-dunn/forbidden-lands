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

interface Dice {
  white: number | null
  red: number | null
  black: number | null
  blue: number | null
  green: number | null
  orange: number | null
}

function defaultDice(): Dice {
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
    DiceRoller,
    DiceRollerConfig,
    Modal,
    FLButton,
    ExpandableSection,
  },
})
export default class DiceModal extends Vue {
  @Prop({ default: "" }) title!: string
  @Prop({ default: () => defaultDice() }) dice!: Dice

  close(ev: any) {
    this.$emit("close")
  }
  onRoll() {
    console.log("ROLL!")
  }
  onPush() {
    console.log("PUSH!")
  }
  canPush = true
  canRoll = true
}
</script>

<template>
  <Modal @close="close" :title="title || $t('Roll dice')">
    <div slot="body" style="height: 100%">
      <ExpandableSection
        v-if="$debugMode"
        :label="$t('Config')"
        :defaultOpen="true"
      >
        <DiceRollerConfig />
      </ExpandableSection>
      <DiceRoller
        style="height: 100%"
        :white="dice.white"
        :red="dice.red"
        :black="dice.black"
        :green="dice.green"
        :blue="dice.blue"
        :orange="dice.orange"
        @close="close"
      />
    </div>
    <div v-if="$debugMode" slot="footer">
      <DiceActions
        @roll="onRoll"
        @push="onPush"
        @close="close"
        :canRoll="canRoll"
        :canPush="canPush"
      />
    </div>
  </Modal>
</template>

<style lang="less" scoped></style>
