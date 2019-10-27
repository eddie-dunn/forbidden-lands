<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { getNewCharacterData, CharacterData } from "@/characterData"
import { getCharDataFromQuery, CharDataQueryObj } from "@/util/characterUtil"

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

@Component({
  components: {
    CharacterEditorMain,
  },
})
export default class CharacterEditorView extends Vue {
  @Prop({ default: "" }) id!: string
  @Prop({ default: null }) templateQueryData!: null | CharDataQueryObj

  charData = initCharData(this.$characterStore, this.id, this.templateQueryData)
  beforeRouteEnter(to: any, from: any, next: any) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    // console.log("beforeRouteEnter to/from/next", to, from, next)
    console.log("enter")
    next()
  }
  beforeRouteUpdate(to: any, from: any, next: any) {
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    // console.log("beforeRouteUpdate to/from/next", to, from, next)
    next()
  }
  beforeRouteLeave(to: any, from: any, next: any) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    // console.log("beforeRouteLeave to/from/next", to, from, next)
    console.log("enter")
    next()
  }
}
</script>

<template>
  <CharacterEditorMain
    :useTemplateData="templateQueryData"
    :charData="charData"
  />
</template>

<style lang="less"></style>
