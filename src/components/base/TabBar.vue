<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import FLButton from "@/components/base/FLButton.vue"

interface Tab {
  name: string
  disabled: boolean
  onClick: () => {}
}

@Component({
  components: {
    FLButton,
  },
})
export default class TabBar extends Vue {
  @Prop({ required: true }) buttons!: Tab[]
  @Prop({ default: false }) disabled!: boolean
  @Prop({ required: true }) currentTabIndex!: number

  get currentTabComponent() {
    return this.buttons[this.currentTabIndex].name
  }

  setActiveTab(index: number) {
    if (this.disabled || this.buttons[index].disabled) return
    ;(this.buttons[index].onClick || (() => {}))()
    this.$emit("tab-active", index)
  }
}

// https://jsfiddle.net/chrisvfritz/o3nycadu/ or "Dynamic components Vue" for
// more info
</script>

<template>
  <div class="tab-bar">
    <FLButton
      v-for="(tab, index) in buttons"
      :key="index"
      @click.self="setActiveTab(index)"
      :type="index === currentTabIndex ? 'main' : 'cancel'"
      :class="['tab']"
      :disabled="buttons[index].disabled"
    >
      {{ buttons[index].name }}
    </FLButton>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.tab {
  margin-right: 0px;
  padding: 0.4rem 0.5rem 0.3rem 0.5rem;
  border-bottom: unset;
}

.tab-bar {
  text-align: left;
  // border-bottom: solid @pastel-green 5px;
  overflow-y: hidden;
}
</style>
