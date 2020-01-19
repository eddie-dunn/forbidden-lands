<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    SvgIcon,
  },
})
export default class FLButton extends Vue {
  @Prop({ default: "button" }) formButtonType!: string
  @Prop({ default: "" }) type!: "" | "danger" | "cancel" | "ghost"
  @Prop({ default: "white" }) color!: "main" | "danger" | "white" | "inherit"
}
</script>

<template>
  <button
    v-bind="$attrs"
    :type="formButtonType"
    @click="$emit('click', $event)"
    :class="['button', 'button-' + type, 'color-' + color]"
  >
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.button {
  @media print {
    display: none;
  }
  &::-moz-focus-inner {
    border: 0;
  }
  outline: 0;
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: inline-block;
  color: #fff;
  background-color: @pastel-green;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: none;
  cursor: pointer;
  box-shadow: @box-shadow-normal;

  &:active {
    transform: scale(0.97);
  }
  &:focus {
    outline: #0002 dotted 1px;
  }

  &-red,
  &-danger {
    color: #fff;
    background-color: @pastel-red;
  }

  &-white,
  &-cancel {
    background-color: white;
    color: #4fc08d;
    // border: 1px solid @pastel-green;
  }

  &-shadow,
  &-ghost {
    font-weight: bold;
    background-color: white;
    color: #4fc08d;
    box-shadow: none;
  }

  &:disabled {
    background: slategray;
    color: lightgray;
    &:hover {
      cursor: not-allowed;
    }
    &:active {
      transform: unset;
    }
  }
}

.color-main {
  color: @color-main;
}

.color-danger {
  color: @color-danger;
}

.color-inherit {
  color: inherit;
}
</style>
