<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import FLButton from "@/components/base/FLButton.vue"
import Modal from "@/components/Modal.vue"
// https://github.com/vuejs/vue-class-component/blob/master/example/src/App.vue

@Component({
  components: {
    FLButton,
    Modal,
  },
})
export class ModalConfirm extends Vue {
  @Prop({ required: true }) confirmAction!: CallableFunction
  @Prop({ default: "" }) title!: string
  @Prop({ default: "" }) body!: string
  @Prop({ default: true }) showTitle!: boolean
  @Prop({ default: false }) danger!: boolean

  get mTitle() {
    if (!this.showTitle) return ""
    if (this.title) return this.title
    return this.$t("confirm")
  }

  close() {
    this.$emit("close")
  }
}

export default ModalConfirm
</script>

<template>
  <Modal @close="close" :maximized="false" :title="mTitle">
    <div slot="body" class="body">
      {{ body }}
      <slot></slot>
    </div>
    <div class="modal-button-row" slot="footer">
      <FLButton type="cancel" @click="close">
        {{ $t("Cancel") }}
      </FLButton>
      <FLButton :type="danger ? 'danger' : 'main'" @click="confirmAction">
        OK
      </FLButton>
    </div>
  </Modal>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.body {
  padding: 1rem;
}

.modal-button-row {
  border-top: solid @pastel-green 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0.5rem;
}
</style>
