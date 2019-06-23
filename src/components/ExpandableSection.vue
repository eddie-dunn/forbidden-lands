<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

// TODO: Implement saving last state to local storage
const BASE_STORE_KEY = "__fl_expandable_section"

@Component
export default class ExpandableSection extends Vue {
  @Prop({ required: true }) label!: string
  @Prop({ default: false }) defaultOpen!: boolean
  @Prop({ default: "" }) saveStateId!: string

  key = `${BASE_STORE_KEY}-${this.saveStateId}`
  isExpanded = this.load(this.key)
  focused = false

  get icon() {
    return this.isExpanded ? "▼" : "▶"
  }

  load(key: string) {
    // don't load state if no unique id:
    if (!this.saveStateId) return this.defaultOpen

    const state = localStorage.getItem(key)
    // console.log("loading state", this.key, "state", state)
    if (state === null) return this.defaultOpen
    return !!state
  }

  save() {
    // console.log("saving state", this.key, this.isExpanded)
    localStorage.setItem(this.key, this.isExpanded ? "open" : "")
  }

  expandToggle(ev: any) {
    if (ev.type === "click") this.isExpanded = !this.isExpanded
    else if (this.focused && ev.code === "Enter") {
      this.isExpanded = !this.isExpanded
    }

    if (this.saveStateId) {
      this.save() // save state if id is supplied
    }
  }

  focus() {
    // console.log("focus event", ev)
    // this.isExpanded = true
    this.focused = true
  }

  blur() {
    this.focused = false
  }
}
</script>

<template>
  <div>
    <div
      :class="['expander', focused || isExpanded ? 'focus' : '']"
      ref="expander"
      tabindex="0"
      @click="expandToggle"
      @focus="focus"
      @blur="blur"
      v-on:keyup="expandToggle"
    >
      <span class="expander-icon">{{ icon + " " }}</span>
      <span :class="focused ? 'underline' : ''">{{ label }}</span>
    </div>
    <!-- <div class="expanded-content" v-if="isExpanded"> -->
    <div :class="['expanded-content', !isExpanded ? 'hidden' : '']">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

// .focus {
//   // border-bottom: 5px solid @pastel-green;
//   border-bottom: 3px solid @pastel-green;
//   padding-bottom: 0px;
// }

.underline {
  // text-decoration: underline;
}

.expander {
  cursor: pointer;
  // margin-top: 1rem;
  margin: 0.5rem 0.2rem;
  text-align: left;
  font-size: 2rem;
  outline-color: ~"@{pastel-green}55";
  // outline-style: none;
  // border-bottom: 5px solid #ffffff00;
  // padding-bottom: 3px;
  // &:focus {
  //   // border-bottom: 3px solid @pastel-green;
  //   // padding-bottom: 0px;
  // }
}

.expander-icon {
  font-family: monospace;
}

.expanded-content {
  cursor: default;
  // font-size: initial;
  text-align: left;
}
</style>
