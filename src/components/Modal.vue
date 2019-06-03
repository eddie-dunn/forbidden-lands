<script lang="ts">
/* eslint-disable no-console */
import Vue from "vue"
import Component from "vue-class-component"
// https://github.com/vuejs/vue-class-component/blob/master/example/src/App.vue

const Props = Vue.extend({
  props: {
    maximized: {
      type: Boolean,
      default: true,
    },
  },
})

export default class Modal extends Props {
  close(param: string): void {
    this.$emit("close", param)
  }
}
</script>

<template>
  <transition name="moldal">
    <div class="modal-mask" @click.self="close()">
      <div
        :class="[
          'modal-container',
          this.maximized ? 'modal-container-full' : '',
        ]"
      >
        <!-- <span class="button x" @click.self="close()">✖</span> -->
        <span class="close-button" @click="close()">
          <svg
            class="svg-button"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="612px"
            height="612px"
            viewBox="0 0 612 612"
            style="enable-background:new 0 0 612 612;"
            xml:space="preserve"
          >
            <g>
              <path
                d="M420.501,218.79c-0.286-6.942-2.868-13.827-8.186-19.125c-5.297-5.298-12.183-7.898-19.125-8.186
				c-7.726-0.325-15.548,2.276-21.438,8.186L306,265.436l-65.752-65.771c-5.909-5.91-13.712-8.492-21.439-8.186
				c-6.942,0.287-13.827,2.869-19.125,8.186c-5.297,5.298-7.898,12.183-8.186,19.125c-0.325,7.727,2.276,15.529,8.186,21.439
				L265.436,306l-65.752,65.752c-5.91,5.909-8.492,13.713-8.186,21.438c0.287,6.942,2.869,13.828,8.186,19.125
				c5.298,5.298,12.183,7.899,19.125,8.186c7.727,0.325,15.53-2.275,21.439-8.186L306,346.564l65.771,65.771
				c5.91,5.909,13.713,8.491,21.439,8.186c6.942-0.287,13.827-2.869,19.125-8.186c5.298-5.298,7.898-12.183,8.186-19.125
				c0.325-7.727-2.276-15.529-8.186-21.439L346.564,306l65.751-65.752C418.226,234.339,420.826,226.536,420.501,218.79z M306,0
				C137.012,0,0,137.012,0,306s137.012,306,306,306s306-137.012,306-306S474.988,0,306,0z M306,554.625
				C168.912,554.625,57.375,443.088,57.375,306S168.912,57.375,306,57.375S554.625,168.912,554.625,306S443.088,554.625,306,554.625
				z"
              />
            </g>
          </svg>
        </span>

        <div class="__modal-header">
          <slot name="header">
            default header
          </slot>
        </div>

        <div class="__modal-body">
          <slot name="body">
            default body
          </slot>
        </div>

        <div class="__modal-footer">
          <slot name="footer">
            default footer
            <button class="modal-default-button" @click="close()">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.svg-button {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  fill: white;
  &:hover {
    fill: @pastel-red;
  }
}

.close-button {
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  // background: white;
  // background: #42b983;
  background: @pastel-red;
  margin-left: auto;
  margin-top: 3px;
  margin-right: 3px;
  // margin-right: -16px; // Adjust if padding is changed in the modal container
  // margin-top: -16px; // Adjust if padding is changed in the modal container
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
  display: flex;
  flex-direction: column;
  z-index: 501;
  // min-height: 70%;
  // min-width: 70%;
  // max-height: 90%;
  // max-width: 90%;

  // width: 90vw; // we should actually slotted item decide size
  // height: 90vh;
  // width: 95%; // we should actually slotted item decide size
  // height: 95%;
  max-width: 70%;
  max-height: 70%;
  &-full {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
  // padding: 1rem;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.__modal-header {
  text-align: center;
  padding: 1rem;
  color: #42b983;
  flex-grow: 0;
}

.__modal-body {
  // overflow: scroll;
  overflow: hidden;
  flex-grow: 1;
  max-height: 99%;
  // border: solid #42b98344 2px;
}

.__modal-footer {
  // position: sticky;
  // margin-top: 10px;
  bottom: 0;
  flex-grow: 0;
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

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
