<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import Card from "@/components/Card.vue"

@Component({
  components: {
    Card,
  },
})
export default class NoteCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean
}
</script>

<template>
  <Card :title="$t('Notes')" :noSign="true">
    <textarea v-model="charData.notes" rows="10" class="note-area"></textarea>
  </Card>
</template>

<style lang="less" scoped>
.note-area {
  display: block;
  width: 96%;
  margin: 0 1% 10px 2%;
  max-width: 100%;
}
</style>
