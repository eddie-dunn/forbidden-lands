<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import Modal from "@/components/Modal.vue"
import { Notification, notify } from "@/util/notifications"
import DiceRoller from "@/components/dice/DiceRoller.vue"
import { CharData } from "@/characterData"
import { SkillObj } from "@/skills"

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
    DiceRoller,
    Modal,
  },
})
export default class DiceModal extends Vue {
  @Prop({ default: "" }) title!: string
  @Prop({ default: () => defaultDice() }) dice!: Dice

  close(ev: any) {
    this.$emit("close")
  }
}
</script>

<template>
  <Modal @close="close" :title="title || $t('Roll dice')">
    <div slot="body" style="height: 100%">
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
  </Modal>
</template>

<style lang="less" scoped></style>
