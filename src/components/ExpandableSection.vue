<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

@Component
export default class ExpandableSection extends Vue {
  @Prop({ required: true }) label!: string
  @Prop({ default: false }) expanded!: boolean

  isExpanded = this.expanded
  focused = false

  get icon() {
    return this.isExpanded ? "▼" : "▶"
  }

  expandToggle(ev: any) {
    if (ev.type === "click") this.isExpanded = !this.isExpanded
    else if (this.focused && ev.code === "Enter") {
      this.isExpanded = !this.isExpanded
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
  <div
    class="expander"
    ref="expander"
    tabindex="0"
    @click.self="expandToggle"
    @focus="focus"
    @blur="blur"
    v-on:keyup="expandToggle"
  >
    {{ icon }}
    {{ label }}
    <div class="expanded-content" v-if="isExpanded">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.expander {
  cursor: pointer;
  margin-top: 1rem;
  font: outline;
  text-align: left;
}
.expanded-content {
  cursor: default;
}
</style>
