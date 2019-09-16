<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    SvgIcon,
  },
})
export default class CharacterListView extends Vue {
  @Prop({ default: "" }) text!: string

  refreshPage() {
    window.location.reload(true)
  }
}
</script>

<template>
  <button class="refresh-button button" @click="refreshPage">
    <SvgIcon name="refresh" />
    <div v-if="text" class="refresh-button-text">{{ text }}</div>
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
.refresh-button-text {
  display: inline-block;
}
.refresh-button {
  padding: 0;
  border: none;
  box-shadow: none;
}
</style>
