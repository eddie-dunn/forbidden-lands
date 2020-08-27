<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { CharacterData } from "@/characterData"

import Card from "@/components/Card.vue"

@Component({
  components: {
    Card,
  },
})
export class NoteCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  get saveStateId() {
    if (this.charData.metadata.status !== "active") return ""
    return "card_notes"
  }
}

export default NoteCard
</script>

<template>
  <Card :title="$t('Notes')" :noSign="true" :saveStateId="saveStateId">
    <textarea
      v-model="charData.notes"
      rows="10"
      cols="20"
      class="note-area"
    ></textarea>
  </Card>
</template>

<style lang="less" scoped>
.note-area {
  display: block;
  width: 96%;
  margin: 0 1% 10px 2%;
  max-width: 100%;
  @media print {
    height: 50rem;
  }
}
</style>
