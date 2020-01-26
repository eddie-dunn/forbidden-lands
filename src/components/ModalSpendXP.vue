<script lang="ts">
// TODO: Look into http://youmightnotneedjs.com/#tabs for tabs

import Modal from "@/components/Modal.vue"
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import {
  CharacterData,
  CharacterTalent,
  calcCharacterXP,
} from "@/characterData"

import SkillSelector from "@/components/SkillSelector.vue"
import TalentSelector from "@/components/TalentSelector.vue"
import FLButton from "@/components/base/FLButton.vue"

@Component({
  components: {
    FLButton,
    Modal,
    SkillSelector,
    TalentSelector,
  },
})
export default class XPModal extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: "" }) width!: string
  @Prop({ default: false }) show!: boolean

  showXPModal = this.show

  charDataCopy: CharacterData = JSON.parse(JSON.stringify(this.charData))
  originalStatus = this.charData.metadata.status

  get xpSpent() {
    return (
      calcCharacterXP(this.charDataCopy) -
      this.charDataCopy.metadata.xpAtCreation
    )
  }
  emitCharData() {
    const charData = { ...this.charDataCopy }
    charData.metadata.status = this.originalStatus
    this.$emit("updated-chardata", charData)
    this.close()
  }

  mounted() {
    this.charDataCopy.metadata.status = "levelup"
  }

  updateTalents(talents: CharacterTalent[]) {
    this.$set(this.charDataCopy, "talents", talents)
  }

  close() {
    this.$emit("close")
  }

  get title() {
    return `${this.$t("XP")}: ${this.charDataCopy.experience}`
  }
}
</script>

<template>
  <Modal class="xp-modal" @close="close" :maximized="true" :title="title">
    <div slot="header">
      <div class="spent">{{ $t("Total spent") }}: {{ xpSpent }}</div>
    </div>
    <div slot="body" class="modal-body">
      <h3 class="capitalize">{{ $t("talents") }}</h3>
      <TalentSelector
        :charData="charDataCopy"
        @talents-updated="updateTalents"
      />
      <h3 class="capitalize">{{ $t("skills") }}</h3>
      <SkillSelector
        :profession="charDataCopy.profession"
        :skills="charDataCopy.skills"
        :charData="charDataCopy"
      />
    </div>

    <div class="modal-button-row" slot="footer">
      <FLButton @click="close" type="cancel">
        {{ $t("Cancel") }}
      </FLButton>
      <FLButton @click="emitCharData">OK</FLButton>
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
  max-width: 60rem;
}

.modal-button-row {
  // border-top: solid @pastel-green 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0.5rem;
}

.spent {
  margin: 0.5rem;
}

.xp-modal {
  margin: 0 auto;
}
</style>
