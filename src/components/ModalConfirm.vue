<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import Modal from "@/components/Modal.vue"
// https://github.com/vuejs/vue-class-component/blob/master/example/src/App.vue

@Component({
  components: {
    Modal,
  },
})
export default class ModalConfirm extends Vue {
  @Prop({ required: true }) confirmAction!: CallableFunction
  @Prop({ required: true }) title!: string
  @Prop({ default: "" }) body!: string

  close() {
    this.$emit("close")
  }
}
</script>

<template>
  <Modal @close="close" :maximized="false">
    <h3 slot="header">
      {{ title }}
    </h3>
    <div slot="body">
      {{ body }}
    </div>
    <div class="modal-button-row" slot="footer">
      <button @click="close" class="button button-cancel">
        {{ $t("Cancel") }}
      </button>
      <button @click="confirmAction" class="button button-danger">OK</button>
    </div>
  </Modal>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.modal-button-row {
  border-top: solid @pastel-green 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0.5rem;
}
</style>
