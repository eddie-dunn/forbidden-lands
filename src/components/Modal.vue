<script lang="ts">
/* eslint-disable no-console */
import Vue from "vue"
import Component from "vue-class-component"
import SvgIcon from "@/components/SvgIcon.vue"
// https://github.com/vuejs/vue-class-component/blob/master/example/src/App.vue

const Props = Vue.extend({
  components: {
    SvgIcon,
  },
  props: {
    maximized: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "70%",
    },
    height: {
      type: String,
      default: "70%",
    },
    // TODO: Add css parsing, see FLNumberInput
  },
})

export default class Modal extends Props {
  close(param: string): void {
    this.$emit("close", param)
  }
}
</script>

<template>
  <transition name="modal">
    <div class="modal-mask" @click.self="close()">
      <div
        :class="[
          'modal-container',
          this.maximized ? 'modal-container-full' : '',
        ]"
      >
        <div class="close-button-container" @click="close()">
          <SvgIcon name="close-button" title="Close" class="close-button" />
        </div>
        <div class="__modal-header">
          <slot name="header">
            <!-- <h2>default header with a lot of text and stuff</h2> -->
          </slot>
        </div>

        <div class="__modal-body">
          <slot name="body" class="__modal-body">
            default body
          </slot>
        </div>

        <div class="__modal-footer">
          <slot name="footer">
            <!-- default footer -->
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.close-button {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  fill: white;
  &:hover {
    fill: @pastel-red;
  }
}

.close-button-container {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: @pastel-red;
  margin-left: auto;
  margin-top: 3px;
  margin-right: 3px;
  &:hover {
    background: white;
  }
  &:active {
    transform: translateY(2px);
  }
}

.modal-mask {
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 501;
  max-height: 100vh;
  max-width: 100vh;
  &-full {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    max-width: 100vh;
  }
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.__modal-header {
  text-align: center;
  color: #42b983;
  text-transform: capitalize;
}

.__modal-body {
  overflow: auto;
  max-height: 100vh;
  flex-grow: 1;
}

.__modal-footer {
  border-top: 4px solid @pastel-green-transparent;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

// .modal-enter .modal-container,
// .modal-leave-active .modal-container {
//   -webkit-transform: scale(0.9);
//   transform: scale(0.9);
// }
</style>
