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
    <div class="flex-row-wrap space-around appearance-section">
      <PicturePicker
        :portrait="charData.portrait"
        :viewOnly="viewOnly"
        @pickedPicture="setImgSource"
      />
    </div>
  </Card>
</template>

<style lang="less" scoped></style>
