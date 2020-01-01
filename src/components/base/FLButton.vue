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
}
</script>

<template>
  <button
    v-bind="$attrs"
    :type="formButtonType"
    @click="$emit('click', $event)"
    :class="['button', 'button-' + type]"
  >
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.button {
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
  border: 1px solid #4fc08d;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:active {
    transform: scale(0.97);
  }
  &:focus {
    outline: @color-danger dotted 1px;
  }

  &-red,
  &-danger {
    color: #fff;
    background-color: @pastel-red;
    border: 1px solid @pastel-red;
  }

  &-white,
  &-cancel {
    background-color: white;
    color: #4fc08d;
  }

  &-shadow,
  &-ghost {
    font-weight: bold;
    background-color: white;
    color: #4fc08d;
    border: 1px #0000;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  &:disabled {
    background: slategray;
    border: 1px solid slategray;
    color: lightgray;
    &:hover {
      cursor: not-allowed;
    }
    &:active {
      transform: unset;
    }
  }
}
</style>
