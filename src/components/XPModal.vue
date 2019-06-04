<script lang="ts">
import Modal from "@/components/Modal.vue"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

@Component
export default class XPModal extends Vue {
  @Prop({ default: "" }) width!: string
  // @Prop({ default: "" }) height!: string
  @Prop({ default: "" }) fontSize!: string
  @Prop({ default: "" }) placeholder!: string
  @Prop({ default: "" }) max!: string
  @Prop({ default: "" }) min!: string

  get cssProps() {
    const placeholderWidth = this.placeholder
      ? `${this.placeholder.length}ch`
      : ""
    const maxWidth = this.max ? `${this.max.length}ch` : ""
    return {
      "--width": this.width || placeholderWidth || maxWidth || "2rem",
      "--font-size": this.fontSize || "2rem",
      "--height": "70%",
    }
  }
}
</script>

<template>
  <div class="xp-modal">
    <Modal v-if="showXPModal" @close="showXPModal = false">
      <h2 slot="header">Calculate XP</h2>
      <div slot="body">
        Have you...
        <div>
          <input type="checkbox" />
          <span>Done this</span>
        </div>
        <div>
          <input type="checkbox" />
          <span>Done something else</span>
        </div>
      </div>
      <div class="modal-button-row" slot="footer">
        <button @click="showXPModal = false" class="button">
          {{ $t("Cancel") }}
        </button>
        <button @click="showXPModal = false" class="button">OK</button>
        <!-- TODO: Commit XP if OK is clicked -->
      </div>
    </Modal>
  </div>
</template>

<style lang="less">
@import "~Style/colors.less";
</style>
