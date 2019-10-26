<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { getNewCharacterData, CharacterData } from "@/characterData"
import { getCharDataFromQuery, CharDataQueryObj } from "@/util/characterUtil"

import CharacterEditorMain from "@/components/characterEditor/CharacterEditorMain.vue"

function initCharData(
  $characterStore: any,
  charId: string,
  query: CharDataQueryObj | null
): CharacterData {
  if (query && query.kinId) {
    return getCharDataFromQuery(query)
  }
  return $characterStore.characterById(charId) || getNewCharacterData()
}

@Component({
  components: {
    CharacterEditorMain,
  },
})
export default class CharacterEditorView extends Vue {
  @Prop({ default: "" }) id!: string
  @Prop({ default: null }) templateData!: null | CharDataQueryObj

  charData = initCharData(this.$characterStore, this.id, this.templateData)
}
</script>

<template>
  <CharacterEditorMain :useTemplateData="templateData" :charData="charData" />
</template>

<style lang="less"></style>
