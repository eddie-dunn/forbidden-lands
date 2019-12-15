<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    SvgIcon,
  },
})
export default class FLCheckbox extends Vue {
  @Prop({ default: false }) value!: boolean
  @Prop({ default: "" }) label!: string
  @Prop({ default: "text" }) type!: string
  @Prop({ default: "" }) iconName!: string
  @Prop({ default: false }) required!: boolean
  @Prop({ default: () => {} }) enterCb!: Function
  @Prop({ default: "flcheckbox" }) id!: string

  inputEvent($event: any) {
    this.$emit("input", $event.target.checked)
  }
}
</script>

<template>
  <div class="fl-input">
    <label :for="id">
      <SvgIcon v-if="iconName" class="" :name="iconName" />
      <span>{{ label }}</span>
      <span v-if="required" class="required-sign">*</span>
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
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.fl-input {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}

.input {
  width: 100%;
  box-sizing: border-box;
  flex-grow: 1;
}

.required-sign {
  color: @pastel-red;
}
</style>
