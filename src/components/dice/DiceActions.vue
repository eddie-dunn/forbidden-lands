<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import FLButton from "@/components/base/FLButton.vue"

@Component({
  components: {
    FLButton,
  },
})
export default class DiceActions extends Vue {
  @Prop({ required: true }) canPush!: boolean
  @Prop({ required: true }) canRoll!: boolean

  @Prop({ default: true }) showClose!: boolean
  @Prop({ default: false }) showReset!: boolean

  close(ev: any) {
    this.$emit("close")
  }
  resetDice() {
    this.$emit("reset")
  }
  pushRoll() {
    this.$emit("push")
  }
  rollDice() {
    this.$emit("roll")
  }
}
</script>

<template>
  <div class="button-bar">
    <FLButton v-if="showClose" type="cancel" @click="$emit('close')">
      {{ $t("Close") }}
    </FLButton>

    <FLButton v-if="showReset" type="cancel" @click="resetDice">
      {{ $t("Reset") }}
    </FLButton>

    <FLButton type="danger" @click="pushRoll" :disabled="!canPush">
      {{ $t("Push") }}
    </FLButton>

    <FLButton @click="rollDice" :disabled="!canRoll">
      {{ $t("Roll dice") }}
    </FLButton>
  </div>
</template>

<style lang="less" scoped>
.button-bar {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.95rem;
}
</style>
