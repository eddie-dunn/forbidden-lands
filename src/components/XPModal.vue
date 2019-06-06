<script lang="ts">
import Modal from "@/components/Modal.vue"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import FLNumberInput from "@/components/FLNumberInput.vue"

@Component({
  components: {
    FLNumberInput,
    Modal,
  },
})
export default class XPModal extends Vue {
  @Prop({ default: "" }) width!: string
  // @Prop({ default: "" }) height!: string
  @Prop({ default: false }) show!: boolean

  showXPModal = this.show

  get EXP_DESC(): string[] {
    return (this.$t("XP_DESCR") as string).split("\n\n")
  }

  newXP = 0

  emitNewXP() {
    this.$emit("newXP", Number(this.newXP))
    this.$emit("close")
  }
}
</script>

<template>
  <Modal class="xp-modal" @close="$emit('close')" :maximized="false">
    <div slot="body" class="experience-description">
      <h2 slot="header">Calculate XP</h2>
      <div>{{ EXP_DESC[0] }}</div>
      <ul>
        <li v-for="(line, index) in EXP_DESC.slice(1, -1)" v-bind:key="index">
          <!-- <input type="checkbox" /> -->
          <span>
            {{ line }}
          </span>
        </li>
      </ul>
      <div class="experience-input">
        <label for="xp-input">Experience gained</label>
        <FLNumberInput min="0" max="100" v-model="newXP" />
      </div>
      <div class="modal-button-row" slot="footer">
        <button @click="$emit('close')" class="button">
          {{ $t("Cancel") }}
        </button>
        <button @click="emitNewXP" class="button">OK</button>
      </div>
    </div>
  </Modal>
</template>

<style lang="less">
@import "~Style/colors.less";

.experience-description {
  overflow: auto;
  text-align: left;
  max-width: 70rem;
  padding: 0 1rem;
  max-width: 60rem;

  ul {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
    li {
      padding: 0.5em;
      text-indent: -1em;
      &:before {
        content: "✥";
      }
    }
  }
}

.experience-input {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 4rem;
  label {
    margin-right: 1rem;
  }
}

.modal-button-row {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 1rem;
}

.xp-modal {
  margin: 0 auto;
}
</style>
