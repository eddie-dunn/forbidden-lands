<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { CharacterData } from "@/characterData"

import Mount from "@/components/Mount.vue"
import Card from "@/components/Card.vue"

@Component({
  components: {
    Mount,
    Card,
  },
})
export default class MountCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: true }) viewOnly!: boolean
}
</script>

<template>
  <Card class="row-full" :title="$t('Mount')" :noSign="true">
    <Mount :charData="charData" :viewOnly="viewOnly" />
  </Card>
</template>

<style lang="less" scoped></style>
