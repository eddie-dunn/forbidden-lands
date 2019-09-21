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
  @Prop({ required: true }) type!: "refresh" | "back" | "forward"

  get iconName() {
    if (this.type === "back") return "chevron_left"
    if (this.type === "forward") return "chevron_right"
    return "refresh"
  }

  get clickAction() {
    if (this.type === "back") {
      return () => window.history.back()
    }
    if (this.type === "forward") {
      return () => window.history.forward()
    }
    return this.refreshPage
  }

  refreshPage() {
    window.location.reload(true)
  }

  get isDisabled() {
    return false
  }
}
</script>

<template>
  <button
    class="refresh-button button"
    @click="clickAction"
    :disabled="isDisabled"
  >
    <SvgIcon :name="iconName" />
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
  &:disabled {
    background-color: inherit;
    border: none;
  }
}
</style>
