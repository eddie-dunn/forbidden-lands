<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { CharData } from "@/data/character/characterData"

import XPModal from "@/components/XPModal.vue"
import ModalSpendXP from "@/components/ModalSpendXP.vue"
import Card from "@/components/Card.vue"
import FLButton from "@/components/base/FLButton.vue"

@Component({
  components: {
    Card,
    FLButton,
    XPModal,
    ModalSpendXP,
  },
})
export class SessionCard extends Vue {
  @Prop({ required: true }) charData!: CharData
  @Prop({ default: false }) viewOnly!: boolean

  showXPModal = false
  showSpendXPModal = false

  get status() {
    return this.charData.metadata.status
  }
  get saveStateId() {
    if (this.charData.metadata.status !== "active") return ""
    return "card_session"
  }

  handleNewCharData(charData: CharData) {
    this.$emit("updated-chardata", charData)
  }
}
export default SessionCard
</script>

<template>
  <Card :title="$t('Post session')" :noSign="true" :saveStateId="saveStateId">
    <div class="flex-row-wrap">
      <FLButton class="spacing" @click="showXPModal = true">
        {{ $t("Add XP/Reputation") }}
      </FLButton>
      <FLButton class="spacing" @click="showSpendXPModal = true">
        {{ $t("Spend XP") }}
      </FLButton>
    </div>

    <XPModal
      v-if="showXPModal"
      :charData="charData"
      @close="showXPModal = false"
      @updated-chardata="handleNewCharData"
    />

    <ModalSpendXP
      v-if="showSpendXPModal"
      :charData="charData"
      @close="showSpendXPModal = false"
      @updated-chardata="handleNewCharData"
    />
  </Card>
</template>

<style lang="less" scoped>
.spacing {
  margin: 1rem;
}
</style>
