<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import FlavorSelector from "@/components/FlavorSelector.vue"
import Card from "@/components/Card.vue"

@Component({
  components: {
    FlavorSelector,
    Card,
  },
})
export default class FlavorCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean
}
</script>

<template>
  <Card class="row-full" :noSign="true" :title="$t('Personality')">
    <FlavorSelector :data="charData" :viewOnly="viewOnly" />
  </Card>
</template>

<style lang="less" scoped></style>
