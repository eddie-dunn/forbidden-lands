<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    SvgIcon,
  },
})
export class FLButton extends Vue {
  @Prop({ default: "button" }) formButtonType!: string
  @Prop({ default: "main" }) type!: "" | "danger" | "cancel" | "ghost" | "main"
  @Prop({ default: "white" }) color!: "main" | "danger" | "white" | "inherit"
  @Prop({ default: "" }) href!: string
}

export default FLButton
</script>

<template>
  <a
    v-if="href"
    v-bind="$attrs"
    :class="['button', 'button-' + type, 'color-' + color]"
    :href="href"
  >
    <slot></slot>
  </a>
  <button
    v-else
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
  touch-action: manipulation;
  color: #fff;
  background-color: @pastel-green;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: none;
  cursor: pointer;
  box-shadow: @box-shadow-normal;

  &:active {
    // transform: scale(0.97);
    transform: translate(0px, 1px);
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
    background-color: transparent;
    color: #4fc08d;
    box-shadow: none;
    &:disabled {
      background: transparent;
    }
  }

  &:disabled {
    &:not(.button-ghost) {
      background: slategray;
    }

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
