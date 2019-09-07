<template>
  <div class="character-creator">
    <CharacterCreatorMain :charId="id" :useTemplateData="templateData" />
  </div>
</template>

<script>
// @ is an alias to /src
import CharacterCreatorMain from "@/components/CharacterCreatorMain.vue"

export default {
  name: "character_creator",
  components: {
    CharacterCreatorMain,
  },
  props: {
    id: String,
    templateData: Boolean,
  },
}
</script>

<style lang="less"></style>
