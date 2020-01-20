<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

import FLButton from "@/components/base/FLButton.vue"
import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    FLButton,
    SvgIcon,
  },
})
export default class CloseButton extends Vue {
  @Prop({ required: true }) icon!: string
  @Prop({ default: "inherit" }) color!: "main" | "danger" | "inherit"
  @Prop({ default: "24px" }) width!: string
  @Prop({ default: "24px" }) height!: string

  get cssVars() {
    return {
      width: this.width,
      height: this.height,
    }
  }
}
</script>

<template>
  <FLButton
    v-bind="$attrs"
    :class="['icon-button', 'color-' + color]"
    type="ghost"
    @click="$emit('click', $event)"
  >
    <SvgIcon v-if="icon" :name="icon" :style="cssVars"></SvgIcon>
    <slot></slot>
  </FLButton>
</template>

<style lang="less" scoped>
@import (reference) "~Style/colors.less";

.icon-button {
  box-shadow: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.color-inherit {
  color: inherit;
}

.color-main {
  color: @color-main;
}

.color-danger {
  color: @color-danger;
}
</style>
