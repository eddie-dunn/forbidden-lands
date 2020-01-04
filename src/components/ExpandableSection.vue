<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import SvgIcon from "@/components/SvgIcon.vue"

const BASE_STORE_KEY = "__fl_expandable_section"

@Component({
  components: {
    SvgIcon,
  },
})
export default class ExpandableSection extends Vue {
  @Prop({ default: "" }) label!: string
  @Prop({ default: false }) defaultOpen!: boolean
  @Prop({ default: "" }) saveStateId!: string
  @Prop({ required: false, default: null }) iconRight!: string
  @Prop({ default: false }) iconRightOK!: boolean

  key = `${BASE_STORE_KEY}-${this.saveStateId}`
  isExpanded = this.load(this.key)
  focused = false

  get icon() {
    return this.isExpanded ? "chevron_down" : "chevron_right"
  }

  load(key: string) {
    // don't load state if no unique id:
    if (!this.saveStateId) return this.defaultOpen

    const state = localStorage.getItem(key)
    // console.log("loading state", this.key, "state", state)
    if (state === null) return this.defaultOpen
    return !!state
  }

  expandToggle(ev: any) {
    if (ev.type === "click") this.isExpanded = !this.isExpanded
    else if (this.focused && ev.code === "Enter") {
      this.isExpanded = !this.isExpanded
    }

    if (this.saveStateId) {
      // save toggled state if id is supplied
      localStorage.setItem(this.key, this.isExpanded ? "open" : "")
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
  <div :class="['expander-wrapper', isExpanded ? '' : 'max-content']">
    <div
      :class="['expander']"
      ref="expander"
      tabindex="0"
      @click="expandToggle"
      @focus="focus"
      @blur="blur"
      v-on:keyup="expandToggle"
    >
      <div class="icon-left">
        <SvgIcon :name="icon" :title="icon" />
      </div>
      <div :class="['expander-label']">
        {{ label }}
        <slot name="header"></slot>
      </div>
      <div
        :class="[
          'icon-right',
          iconRightOK ? 'icon-right-ok' : 'icon-right-nok',
        ]"
      >
        {{ iconRight }}
        <slot name="icon-right"></slot>
      </div>
    </div>
    <div class="expander-content" v-if="isExpanded">
      <!-- <div
      :class="['expander-content', isExpanded ? 'is-expanded' : 'not-expanded']"
    > -->
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.max-content {
  height: max-content;
  min-height: 1rem;
}

// TODO: Check if we can animate with this: https://stackoverflow.com/a/43965099
.is-expanded {
  // height: auto;
  // min-height: auto;
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}

.not-expanded {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.8s cubic-bezier(0, 1, 0, 1) -0.1s;
}

.expander {
  cursor: pointer;
  margin: 0.5rem 0.2rem;
  font-size: 2rem;
  outline-color: ~"@{pastel-green}55";
  display: flex;
  align-items: center;
}

.expander-content {
  cursor: default;
  height: auto;
}

.icon-left {
  display: inline-block;
  @media print {
    display: none;
  }
  margin: 0 0.5rem;
  & > svg {
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
  }
}

.expander-label {
  display: inline-block;
  text-align: left;
  width: max-content;
  // white-space: nowrap;
  &::first-letter {
    text-transform: uppercase;
  }
}

.icon-right {
  display: inline-block;
  margin-left: auto;
  margin-right: 1rem;
  &-ok {
    color: @color-main;
  }
  &-nok {
    color: @color-danger;
  }
}
</style>
