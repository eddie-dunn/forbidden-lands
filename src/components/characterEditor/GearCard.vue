<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { CharacterData } from "@/characterData"

import GearPicker from "@/components/GearPicker.vue"
import Card from "@/components/Card.vue"

@Component({
  components: {
    GearPicker,
    Card,
  },
})
export default class GearCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean
}
</script>

<template>
  <Card class="row-full" :title="$t('Gear')" :noSign="true">
    <GearPicker :characterData="charData" :viewOnly="viewOnly" />
  </Card>
</template>

<style lang="less" scoped></style>
