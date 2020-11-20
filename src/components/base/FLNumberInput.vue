<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

@Component
export class FLNumberInput extends Vue {
  @Prop({ default: "" }) width!: string
  // @Prop({ default: "" }) height!: string
  @Prop({ default: "" }) fontSize!: string
  @Prop({ default: "" }) placeholder!: string
  @Prop({ default: "" }) max!: string
  @Prop({ default: "" }) min!: string
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: () => () => {} }) enterCb!: Function
  @Prop({ default: () => () => {} }) ctrlEnterCb!: Function
  @Prop({ default: null }) value!: number | null
  @Prop({ default: "" }) label!: string
  @Prop({ default: false }) inGrid!: boolean

  @Prop({ default: true }) canIncrement!: boolean
  @Prop({ default: true }) canDecrement!: boolean
  @Prop({ default: false }) fieldDisabled!: boolean

  get cssProps() {
    const placeholderWidth = this.placeholder
      ? `${this.placeholder.length}ch`
      : ""
    const maxWidth = this.max ? `${this.max.length}ch` : ""
    return {
      "--width": this.width || placeholderWidth || maxWidth || "2rem",
      "--font-size": this.fontSize || "2rem",
    }
  }

  inputEvent($event: any) {
    this.$emit("input", Number($event.target.value))
  }

  increment() {
    if (this.max && Number(this.value) >= Number(this.max)) {
      return
    }
    this.$emit("input", Math.max(Number(this.value) + 1, Number(this.min)))
  }

  decrement() {
    if (this.min && Number(this.value) <= Number(this.min)) {
      return
    }
    this.$emit("input", Number(this.value) - 1)
  }

  get incrementDisabled() {
    if (this.disabled || !this.canIncrement) return true
    if (!this.max || !this.value) return false
    return Number(this.value) >= Number(this.max)
  }

  get decrementDisabled() {
    if (this.disabled || !this.canDecrement) return true
    if (!this.min) return false
    return Number(this.value) <= Number(this.min)
  }
}

export default FLNumberInput
</script>

<template>
  <div :class="['fl-number', inGrid && 'display-contents']">
    <label
      v-if="label"
      :for="label"
      :class="[
        'fl-number-row-label',
        'capitalize-first',
        inGrid && 'font-small',
      ]"
    >
      {{ label }}
    </label>
    <div class="fl-number-row">
      <button
        class="fl-number-button shared"
        type="button"
        :disabled="decrementDisabled"
        @click="decrement"
        tabindex="-1"
        :style="cssProps"
      >
        -
      </button>
      <input
        :id="label"
        v-bind="$attrs"
        class="fl-number-input shared"
        :disabled="disabled || fieldDisabled"
        :value="value"
        :style="cssProps"
        type="number"
        :placeholder="placeholder"
        :max="max"
        :min="min"
        @input="inputEvent"
        v-on:keyup.ctrl.enter.exact="ctrlEnterCb"
        v-on:keyup.enter.exact="enterCb"
      />
      <button
        class="fl-number-button shared"
        type="button"
        :disabled="incrementDisabled"
        @click="increment"
        tabindex="-1"
        :style="cssProps"
      >
        +
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.display-contents {
  display: contents;
}

.fl-number {
  text-align: left;
}

.fl-number-row {
  display: flex;
}

.fl-number-input {
  width: var(--width);
  border: solid 1px @pastel-green;
  border-left: 0;
  border-right: 0;
  &:invalid {
    color: @pastel-red;
    border: solid 1px @pastel-red;
  }
  &:disabled {
    border: 1px solid @color-main-transparent;
  }
}

.fl-number-button {
  display: inline-block;
  @media print {
    display: none;
  }
  touch-action: manipulation;
  margin: 0;
  outline-width: 0;
  border: solid 1px @pastel-green;
  background: @pastel-green;
  color: white;
  cursor: pointer;
  &:disabled {
    // background: @pastel-red;
    cursor: not-allowed;
    color: @pastel-green;
  }
}

.shared {
  height: auto;
  font-size: var(--font-size);
  padding: 1px 5px;
  // box-sizing: border-box;
  box-sizing: content-box;
  text-align: center;
  font-family: monospace;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
