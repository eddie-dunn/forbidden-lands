<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { getNewCharacterData, CharacterData } from "@/characterData"
import { getCharDataFromQuery, CharDataQueryObj } from "@/util/characterUtil"
import { GET_MP_PLAYER } from "@/store/store-types"
import { UserData, PeerId } from "@/components/multiplay/protocol"
import { errlog } from "@/util"

import CharacterEditorMain from "@/components/characterEditor/CharacterEditorMain.vue"

function initCharData(
  $characterStore: any,
  charId: string,
  templateQueryData: CharDataQueryObj | null
): CharacterData {
  if (templateQueryData && templateQueryData.kinId) {
    return getCharDataFromQuery(templateQueryData)
  }
  return $characterStore.characterById(charId) || getNewCharacterData()
}

const getPlayerChar = (
  user: UserData | undefined,
  charId: string
): CharacterData | null => {
  if (!user) return null
  const char = user.characters.find((char) => {
    if (!char) return false
    return char.metadata.id === charId
  })
  return char || null
}

@Component({
  components: {
    CharacterEditorMain,
  },
})
export default class CharacterEditorView extends Vue {
  @Prop({ default: "" }) id!: string
  @Prop({ default: null }) templateQueryData!: null | CharDataQueryObj
  @Prop({ default: null }) fromRoute!: any // figure out to know who navigateed to this page
  @Prop({ default: false }) multiplayer!: boolean
  @Prop({ default: "" }) peerId!: string

  charData: null | CharacterData = null

  created() {
    if (this.multiplayer) {
      const user: UserData | undefined = this.$store.getters[GET_MP_PLAYER](
        this.peerId
      )
      const char = getPlayerChar(user, this.id)
      if (!char) {
        errlog("character not found", this.peerId, this.id)
        return
      }
      this.charData = char
    } else {
      this.charData = initCharData(
        this.$characterStore,
        this.id,
        this.templateQueryData
      )
    }
  }
}
</script>

<template>
  <CharacterEditorMain
    :isTemplateData="!!templateQueryData"
    :viewOnly="this.multiplayer"
    :charData="charData"
  />
</template>

<style lang="less"></style>
