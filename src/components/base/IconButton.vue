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
export class IconButton extends Vue {
  @Prop({ required: false }) icon!: string
  @Prop({ default: "inherit" }) color!: "main" | "danger" | "inherit"
  @Prop({ default: "24px" }) width!: string
  @Prop({ default: "24px" }) height!: string
  @Prop({ default: null }) title!: string | null

  get cssVars() {
    return {
      width: this.width,
      height: this.height,
    }
  }
}

export default IconButton
</script>

<template>
  <FLButton
    v-bind="$attrs"
    :class="['icon-button', 'color-' + color]"
    :title="title"
    type="ghost"
    @click="$emit('click', $event)"
  >
    <SvgIcon v-if="icon" :name="icon" :style="cssVars"></SvgIcon>
    <div><slot></slot></div>
  </FLButton>
</template>

<style lang="less" scoped>
@import (reference) "~Style/colors.less";

.icon-button {
  box-shadow: none;
  padding: 0;
  // white-space: nowrap;
  display: inline-flex;
  align-items: center;
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
