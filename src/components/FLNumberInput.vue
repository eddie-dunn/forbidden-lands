<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

@Component
export default class ExpandableSection extends Vue {
  @Prop({ default: "" }) width!: string
  // @Prop({ default: "" }) height!: string
  @Prop({ default: "" }) placeholder!: string
  @Prop({ default: "" }) max!: string
  @Prop({ default: "" }) min!: string
  @Prop({ default: "" }) num!: string
  @Prop({ default: () => () => {} }) enterCb!: Function
  @Prop({ default: () => () => {} }) ctrlEnterCb!: Function

  // value: number | "" = Number(this.num) || ""

  get cssProps() {
    const placeholderWidth = this.placeholder
      ? `${this.placeholder.length}ch`
      : ""
    const maxWidth = this.max ? `${this.max.length}ch` : ""
    return {
      "--width": this.width || placeholderWidth || maxWidth || "2rem",
    }
  }

  inputEvent($event: any) {
    this.$emit("input", $event.target.value)
  }

  increment() {
    // if (!this.value) this.value = this.min ? Number(this.min) - 1 : 0
    // if (this.max && this.value >= Number(this.max)) {
    //   return
    // }
    // this.value++
    // this.inputEvent(Number(this.num) + 1)
    this.$emit("input", Number(this.num) + 1)
  }

  decrement() {
    // if (!this.value) this.value = Number(this.min) || 0
    if (this.min && Number(this.num) <= Number(this.min)) {
      return
    }
    // this.value--
    // this.inputEvent(Number(this.num) - 1)
    this.$emit("input", Number(this.num) - 1)
  }

  get incrementDisabled() {
    if (!this.max || !this.num) return false
    return Number(this.num) >= Number(this.max)
  }

  get decrementDisabled() {
    if (this.min === "") return false
    return Number(this.num) <= Number(this.min)
  }
}
</script>

<template>
  <div class="fl-number-row">
    <button
      class="fl-number-button shared"
      :disabled="decrementDisabled"
      @click="decrement"
      tabindex="-1"
    >
      -
    </button>
    <input
      class="fl-number-input shared"
      :value="this.num"
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
      :disabled="incrementDisabled"
      @click="increment"
      tabindex="-1"
    >
      +
    </button>
  </div>
</template>

<style lang="less">
@import "~Style/colors.less";
.fl-number-row {
  display: flex;
}

.fl-number-input {
  width: var(--width);
  border: solid 1px;
  border-left: 0;
  border-right: 0;
}

.fl-number-button {
  border: solid 1px black;
  background: @pastel-green;
  color: white;
  cursor: pointer;
}

.shared {
  height: auto;
  font-size: 2rem;
  padding: 1px 5px;
  // box-sizing: border-box;
  box-sizing: content-box;
  text-align: center;
  font-family: monospace;
  // border: solid 1px;
}

// input[type="number"]::-webkit-inner-spin-button,
// input[type="number"]::-webkit-outer-spin-button {
//   -webkit-appearance: none;
//   margin: 0;
// }

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
