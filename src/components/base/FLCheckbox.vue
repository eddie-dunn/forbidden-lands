<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    SvgIcon,
  },
})
export class FLCheckbox extends Vue {
  @Prop({ default: false }) value!: boolean
  @Prop({ default: "" }) label!: string
  @Prop({ default: "" }) iconName!: string
  @Prop({ default: false }) required!: boolean
  @Prop({ default: () => {} }) enterCb!: Function
  @Prop({ default: "left" }) labelPosition!: "left" | "right"
  @Prop({ default: false }) column!: boolean

  id = `${this.label}-flcheckbox`

  inputEvent($event: any) {
    this.$emit("input", $event.target.checked)
  }
}
export default FLCheckbox
</script>

<template>
  <div :class="['fl-input', column ? 'column' : 'row']">
    <label v-if="labelPosition === 'left'" class="label" :for="id">
      <SvgIcon v-if="iconName" class="" :name="iconName" />
      <div class="inline-block capitalize-first">
        {{ label }}
        <span v-if="required" class="required-sign">*</span>
      </div>
    </label>
    <input
      class="input"
      type="checkbox"
      v-bind="$attrs"
      :id="id"
      v-on:keyup.enter.exact="() => enterCb && enterCb()"
      @input="inputEvent"
      :checked="value"
    />
    <label v-if="labelPosition === 'right'" class="label" :for="id">
      <SvgIcon v-if="iconName" class="" :name="iconName" />
      <div class="inline-block capitalize-first">
        {{ label }}
        <span v-if="required" class="required-sign">*</span>
      </div>
    </label>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.fl-input {
  display: inline-flex;
}

.row {
  align-items: center;
}

.column {
  flex-direction: column;
}

.label {
  display: inline-block;
}

.inline-block {
  display: inline-block;
}

.input {
  display: inline-block;
  box-sizing: border-box;
}

.required-sign {
  color: @pastel-red;
}
</style>
