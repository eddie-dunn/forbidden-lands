<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"

interface Tab {
  name: string
  component: Vue.Component
}

@Component({
  components: {
    SvgIcon,
  },
})
export default class TabView extends Vue {
  @Prop({ required: true }) views!: Tab[]
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: 1 }) startIndex!: number

  currentTab = this.startIndex
  get currentTabComponent() {
    return this.views[this.currentTab].component
  }

  setActiveTab(index: number) {
    if (this.disabled) return
    this.currentTab = index
  }
}

// https://jsfiddle.net/chrisvfritz/o3nycadu/ or "Dynamic components Vue" for
// more info
</script>

<template>
  <div class="tabview">
    <div class="tab-bar">
      <div
        v-for="(tab, index) in views"
        :key="index"
        @click.self="setActiveTab(index)"
        :class="[
          'tab',
          index === currentTab ? 'tab--current' : '',
          disabled ? 'tab--disabled' : '',
        ]"
      >
        {{ views[index].name }}
      </div>
    </div>
    <component :is="currentTabComponent" class="tab-contents" />
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.tab {
  background: white;
  color: @pastel-green;
  padding: 0.5rem 0.5rem 0.25rem 0.5rem;
  margin-right: 5px;
  border: solid 1px @pastel-green;
  border-bottom: unset;
  display: inline-block;
  cursor: pointer;
  &:active {
    transform: translateY(3px);
  }
  &--current {
    background: @pastel-green;
    color: white;
  }
  &--disabled {
    cursor: not-allowed;
    &:active {
      transform: none;
    }
  }
}

.tab-bar {
  text-align: left;
  padding: 0 1rem;
  border-bottom: solid @pastel-green 5px;
  overflow-y: hidden;
}
</style>
