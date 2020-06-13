<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { CharacterData } from "@/characterData"
import PicturePicker from "@/components/PicturePicker.vue"
import Card from "@/components/Card.vue"

@Component({
  components: {
    PicturePicker,
    Card,
  },
})
export default class PortraitCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  setImgSource(img: any) {
    this.charData.portrait = img
  }
}
</script>

<template>
  <Card class="row-half" :title="$t('Portrait')" :noSign="true">
    <PicturePicker
      :portrait="charData.portrait"
      :viewOnly="viewOnly"
      @pickedPicture="setImgSource"
    />
  </Card>
</template>

<style lang="less" scoped></style>
