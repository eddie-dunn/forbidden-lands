<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import uuid1 from "uuid/v1"
import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    SvgIcon,
  },
})
export default class FLInput extends Vue {
  @Prop({ default: "" }) value!: string
  @Prop({ default: "" }) label!: string
  @Prop({ default: "" }) id!: string
  @Prop({ default: "text" }) type!: string
  @Prop({ default: "" }) iconName!: string
  @Prop({ default: false }) required!: boolean
  @Prop({ default: () => {} }) enterCb!: Function
  @Prop({ default: false }) readonly error!: boolean
  @Prop({ default: "" }) readonly errorText!: string
  @Prop({ default: () => {} }) readonly validate!: Function

  showError = this.error

  get _id(): string {
    return this.id || uuid1()
  }

  inputEvent($event: any) {
    this.$emit("input", $event.target.value)
  }

  onBlur() {
    if (!this.validate || this.error) {
      return this.error
    }
    if (!this.validate()) {
      this.showError = true
    } else {
      this.showError = false
    }
  }
}
</script>

<template>
  <div class="fl-input">
    <label :for="_id">
      <SvgIcon v-if="iconName" class="" :name="iconName" />
      <span>{{ label }}</span>
      <span v-if="required" class="required-sign">*</span>
    </label>
    <input
      v-bind="$attrs"
      :required="required"
      :id="_id"
      :class="['input', showError && 'error']"
      :type="type"
      v-on:keyup.enter.exact="() => enterCb && enterCb()"
      @input="inputEvent"
      :value="value"
      @blur="() => onBlur()"
    />
    <div v-if="showError && errorText" class="error-text font-small">
      {{ errorText }}
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.fl-input {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}

.error-text {
  color: @pastel-red;
}

label {
  white-space: nowrap;
}

// input[type="number"],
// input[type="text"] {
//   min-height: 1rem;
//   background-color: @background-color;
//   color: @slate-black;
//   height: auto;
//   min-height: 1rem;
//   padding: 0.3rem;
//   appearance: none;
//   inline-size: auto;
//   box-sizing: border-box;
//   &:disabled {
//     background-image: none;
//     border: 2px solid ~"@{pastel-green}55";
//   }
// }

.input {
  width: 100%;
  border: 2px solid @pastel-green-transparent;
  box-sizing: border-box;
  &.error {
    border: 2px solid @pastel-red;
  }
}

.required-sign {
  color: @pastel-red;
}
</style>
