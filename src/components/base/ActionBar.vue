<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    SvgIcon,
  },
})
export default class InfoBox extends Vue {}
</script>

<template>
  <div class="action-bar-wrapper">
    <div class="action-bar action-bar-left">
      <slot name="left"></slot>
    </div>
    <div class="action-bar action-bar-center">
      <slot name="center"></slot>
    </div>

    <div class="action-bar action-bar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.action-bar-wrapper {
  @media print {
    display: none;
  }
  display: flex;
  overflow: auto;
  position: sticky;
  pointer-events: none;
  // .old-version();
  bottom: 0;
  justify-content: space-between;
}

.action-bar {
  padding: 0.25rem;
  margin: 0.25rem 0.25rem;
  pointer-events: all;
  flex: 0 1 auto;
  &-left {
    text-align: left;
  }
  // &-center {
  // }
  &-right {
    text-align: right;
  }
  // align-items: center;
}

.old-version {
  pointer-events: all;
  background: #fffc;
  box-shadow: @box-shadow-normal;
}
</style>
