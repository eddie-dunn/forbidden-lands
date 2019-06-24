<script lang="ts">
import Modal from "@/components/Modal.vue"
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { CharacterData, CharacterTalent } from "@/characterData"
import DiceView from "@/views/DiceView.vue"

// TODO: Split DiceView into separate components that can be re-used in this
// modal

@Component({
  components: {
    DiceView,
    Modal,
  },
})
export default class DiceModal extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: "" }) width!: string

  close() {
    this.$emit("close")
  }
}
</script>

<template>
  <Modal class="xp-modal" @close="close" :maximized="true">
    <div slot="header" class="header">
      <div class="tab-bar"></div>
    </div>
    <div slot="body" class="modal-body">
      <DiceView />
    </div>
    <div class="modal-button-row" slot="footerr">
      <!-- <button @click="close" class="button button-cancel">
        {{ $t("Cancel") }}
      </button>
      <button @click="close" class="button">OK</button> -->
    </div>

    <!-- spacer -->
  </Modal>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
h2 {
  margin: -1rem 1rem 1rem 1rem;
}

.modal-body {
  overflow: auto;
  text-align: left;
  max-width: 70rem;
  padding: 1rem;
  margin: 1rem auto;
  height: 100%;
}

.header {
  border-bottom: solid @pastel-green 5px;
}

.modal-button-row {
  // border-top: solid @pastel-green 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0.5rem;
}

.xp-modal {
  margin: 0 auto;
}
</style>
