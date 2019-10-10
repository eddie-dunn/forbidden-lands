<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    SvgIcon,
  },
})
export default class FLInput extends Vue {
  @Prop({ required: true }) views!: Vue.Component[]

  activeTabNumber = 1
  get currentTabComponent() {
    console.log(this.views[this.activeTabNumber])
    return this.views[this.activeTabNumber]
  }
}

// TODO: Implement me. See XPModal.vue or
// https://jsfiddle.net/chrisvfritz/o3nycadu/ or "Dynamic components Vue" for
// more info
</script>

<template>
  <div class="tabview">
    <div class="tab-bar">
      <div
        v-for="(tab, index) in views"
        :key="index"
        @click.self="activeTabNumber = index"
        :class="['tab', index === activeTabNumber ? 'tab--active' : '']"
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
  padding: 0.5rem;
  margin-right: 5px;
  outline: solid 1px @pastel-green;
  display: inline-block;
  cursor: pointer;
  &:active {
    transform: translateY(3px);
    background: @pastel-green;
    color: white;
  }
  &--active {
    background: @pastel-green;
    color: white;
  }
}

.tab-bar {
  text-align: left;
  margin: 0 1rem;
  border-bottom: solid @pastel-green 5px;
}
</style>
