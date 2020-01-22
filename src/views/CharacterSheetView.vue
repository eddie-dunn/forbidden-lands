<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { BusEvent, EventBus } from "@/util/eventBus"
import { Protocol, ProtocolTypes } from "@/components/multiplay/protocol"
import { getNewCharacterData, CharData } from "@/characterData"
import { getCharDataFromQuery, CharDataQueryObj } from "@/util/characterUtil"
import {
  GET_MP_PLAYER,
  GET_MP_ACTIVE,
  SET_PAGE_TITLE,
  SET_PAGE_SUBTITLE,
} from "@/store/store-types"
import { UserData, PeerId } from "@/components/multiplay/protocol"
import { errlog } from "@/util"

import CharacterSheet from "@/components/characterEditor/CharacterSheet.vue"

function initCharData(
  $characterStore: any,
  charId: string,
  templateQueryData: CharDataQueryObj | null
): { charData: CharData; type: "template" | "loaded" | "new" } {
  if (templateQueryData && templateQueryData.kinId) {
    return {
      charData: getCharDataFromQuery(templateQueryData),
      type: "template",
    }
  }
  const loadedCharData = $characterStore.characterById(charId)
  if (loadedCharData) {
    return { charData: loadedCharData, type: "loaded" }
  }
  return {
    charData: getNewCharacterData(),
    type: "new",
  }
}

const getPlayerChar = (
  user: UserData | undefined,
  charId: string
): CharData | null => {
  if (!user) return null
  const char = user.characters.find((char) => {
    if (!char) return false
    return char.metadata.id === charId
  })
  return char || null
}

@Component({
  components: {
    CharacterSheet,
  },
})
export default class CharacterEditorView extends Vue {
  @Prop({ default: "" }) id!: string
  @Prop({ default: null }) templateQueryData!: null | CharDataQueryObj
  @Prop({ default: false }) multiplayer!: boolean
  @Prop({ default: "" }) peerId!: string

  charData: null | CharData = null
  mKey = 0

  get mpActive(): boolean {
    return this.$store.getters[GET_MP_ACTIVE]
  }

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
      this.$store.commit(SET_PAGE_TITLE, "View")
    } else {
      const { charData, type } = initCharData(
        this.$characterStore,
        this.id,
        this.templateQueryData
      )
      const title = { new: "Create", template: "Create", loaded: "Edit" }[type]
      this.$store.commit(SET_PAGE_TITLE, title)
      this.charData = charData
    }
  }
  mounted() {
    EventBus.$on(BusEvent.characterUpdate, (data: Protocol.MsgCharacter) => {
      if (
        !this.multiplayer ||
        !this.charData ||
        data.type !== ProtocolTypes.charData ||
        data.character.metadata.id !== this.charData.metadata.id ||
        JSON.stringify(this.charData) === JSON.stringify(data.character)
      ) {
        return
      }
      this.updateCharData(data.character)
    })
  }
  destroyed() {
    EventBus.$off(BusEvent.characterUpdate)
  }

  updateCharData(data: CharData) {
    this.charData = data
    this.mKey++ // TODO: is there a better way to avoid re-rendering everything?
  }
}
</script>

<template>
  <CharacterSheet
    :isTemplateData="!!templateQueryData"
    :viewOnly="this.multiplayer"
    :charData="charData"
    :key="mKey"
    @chardata-updated="updateCharData"
  />
</template>

<style lang="less" scoped></style>
