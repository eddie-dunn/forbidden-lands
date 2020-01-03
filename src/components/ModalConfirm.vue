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
  @Prop({ default: "" }) title!: string
  @Prop({ default: "" }) body!: string
  @Prop({ default: true }) showTitle!: boolean

  get mTitle() {
    if (!this.showTitle) return ""
    if (this.title) return this.title
    return this.$t("Confirm")
  }

  close() {
    this.$emit("close")
  }
}
</script>

<template>
  <Modal @close="close" :maximized="false" :title="mTitle">
    <div slot="body" class="body">
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
