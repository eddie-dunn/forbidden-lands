<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import FLNumberInput from "@/components/FLNumberInput.vue"

@Component({
  components: {
    FLNumberInput,
  },
})
export default class ExpandableSection extends Vue {
  // FLNumberInput props
  @Prop({ default: "" }) placeholder!: string
  @Prop({ default: "" }) max!: number

  // Own props
  @Prop({ required: true }) status!: string
  @Prop({ required: true }) value!: number
  @Prop({ required: true }) experience!: number

  @Watch("status")
  onChildChanged(val: string, oldVal: string) {
    if (oldVal === "levelup" && val === "active") {
      this.copiedRank = this.value
    }
  }

  @Watch("value")
  valueChanged(val: number, oldVal: number) {
    if (this.status !== "levelup") return
    const xpVal = Math.max(val, oldVal) * 5
    if (val > oldVal) {
      this.$emit("xp-change", -xpVal)
    } else {
      this.$emit("xp-change", xpVal)
    }
  }

  copiedRank = this.value

  get canIncrement(): boolean {
    const status = this.status
    if (status === "freeEdit") return true
    if (status === "new" && this.value < this.max) return true
    if (status === "active") return false
    if (status === "levelup") {
      const rankCost = ((this.value || 0) + 1) * 5
      return this.experience >= rankCost
    }
    return false
  }

  get canDecrement(): boolean {
    if (this.value <= 0) return false
    const status = this.status
    if (status === "freeEdit") return true
    if (status === "new") return true
    if (status === "levelup") {
      return this.value > this.copiedRank
    }
    return false
  }

  get getPlaceholder(): string {
    return this.getMin + "-" + this.getMax
  }

  get getMax() {
    if (this.status === "new") return this.max
    return 5
  }

  get getMin() {
    return "0"
  }

  get canEditSkills() {
    return ["new", "freeEdit", "levelup"].includes(this.status)
  }

  //
}
</script>

<template>
  <div v-if="canEditSkills" class="fl-number-row">
    <FLNumberInput
      v-bind="$attrs"
      class="skill-input"
      fontSize="1.2rem"
      :placeholder="getPlaceholder"
      :min="getMin"
      :max="getMax"
      :canIncrement="canIncrement"
      :canDecrement="canDecrement"
      :fieldDisabled="status === 'levelup'"
      v-bind:value="value"
      v-on:input="$emit('input', $event)"
    />
  </div>
  <div v-else class="skill-display">
    {{ value || 0 }}
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.skill-display {
  flex-basis: 10%;
  font-size: 1.2rem;
  font-family: monospace;
}
</style>
