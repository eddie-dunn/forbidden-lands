<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { CharData } from "@/characterData"

import XPModal from "@/components/XPModal.vue"
import ModalSpendXP from "@/components/ModalSpendXP.vue"
import Card from "@/components/Card.vue"

@Component({
  components: {
    Card,
    XPModal,
    ModalSpendXP,
  },
})
export default class SessionCard extends Vue {
  @Prop({ required: true }) charData!: CharData
  @Prop({ default: false }) viewOnly!: boolean

  showXPModal = false
  showSpendXPModal = false

  get status() {
    return this.charData.metadata.status
  }

  handleNewCharData(charData: CharData) {
    this.$emit("updated-chardata", charData)
  }
}
</script>

<template>
  <Card :title="$t('Post session')" :noSign="true">
    <div class="flex-row-wrap space-around">
      <button class="button spacing" @click="showXPModal = true">
        {{ $t("Add XP/Reputation") }}
      </button>
      <button class="button spacing" @click="showSpendXPModal = true">
        {{ $t("Spend XP") }}
      </button>
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
