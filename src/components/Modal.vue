<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import IconButton from "@/components/base/IconButton.vue"

@Component({
  components: {
    IconButton,
  },
})
export default class Modal extends Vue {
  @Prop({ default: true }) maximized!: boolean
  @Prop({ default: "70%" }) width!: string
  @Prop({ default: "70%" }) height!: string
  @Prop({ default: true }) toggleBodyOverflow!: boolean
  @Prop({ default: "" }) title!: string

  close(param: string): void {
    this.$emit("close", param)
  }

  bodyOverflow(show: boolean) {
    if (!this.toggleBodyOverflow) return
    if (!show) {
      document.querySelector("body")!.setAttribute("style", "overflow: hidden")
    } else {
      document.querySelector("body")!.removeAttribute("style")
    }
  }

  mounted() {
    this.bodyOverflow(false)
  }

  destroyed() {
    this.bodyOverflow(true)
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
        <div class="__modal-header">
          <div class="__modal-header-title capitalize-first">
            <h2 class="capitalize-first" v-if="title">{{ title }}</h2>
            <slot name="header"></slot>
          </div>
          <IconButton
            icon="close"
            class="close-button"
            color="danger"
            @click="close"
            width="2rem"
            height="2rem"
          />
        </div>

        <div class="__modal-body">
          <slot name="body">
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

h2 {
  margin: 0.5rem;
}

.close-button {
  margin-top: 2px;
  margin-right: 2px;
  align-self: start;
}

.modal-mask {
  overscroll-behavior: contain;
  position: fixed;
  z-index: @z-modal;
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
  overscroll-behavior: contain;
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
  flex: 0 0 auto;
  text-align: center;
  color: #42b983;
  padding-left: 1rem;
  display: flex;

  &-title {
    flex-grow: 1;
  }
  border-bottom: 4px solid @pastel-green;
}

.__modal-body {
  overflow-y: auto;
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
