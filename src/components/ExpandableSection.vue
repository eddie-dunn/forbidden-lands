<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import SvgIcon from "@/components/SvgIcon.vue"

const BASE_STORE_KEY = "__fl_expandable_section"

export enum EXPANDER_SLOT {
  header_center = "header",
  header_right = "icon-right",
}

@Component({
  components: {
    SvgIcon,
  },
})
export class ExpandableSection extends Vue {
  @Prop({ default: "" }) label!: string
  @Prop({ default: false }) defaultOpen!: boolean
  @Prop({ default: null }) saveStateId!: string | null
  @Prop({ required: false, default: null }) iconRight!: string
  @Prop({ default: false }) iconRightOK!: boolean
  @Prop({ default: true }) border!: boolean

  key = `${BASE_STORE_KEY}-${this.saveStateId}`
  isExpanded = this.load(this.key)
  focused = false
  SLOT = EXPANDER_SLOT

  load(key: string) {
    // don't load state if no unique id:
    if (!this.saveStateId) return this.defaultOpen

    const state = localStorage.getItem(key)
    // console.log("loading state", this.key, "state", state)
    if (state === null) return this.defaultOpen
    return state === "open" ? true : false
  }

  expandToggle(ev: any) {
    if (ev.type === "click") this.isExpanded = !this.isExpanded
    else if (this.focused && ev.code === "Enter") {
      this.isExpanded = !this.isExpanded
    }

    if (this.saveStateId) {
      // save toggled state if id is supplied
      localStorage.setItem(this.key, this.isExpanded ? "open" : "closed")
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

export default ExpandableSection
</script>

<template>
  <section
    :class="[border && 'border', isExpanded ? '' : 'max-content', 'focus']"
    tabindex="0"
    @focus="focus"
    @blur="blur"
    v-on:keyup="expandToggle"
  >
    <div :class="['expander']" ref="expander" @click="expandToggle">
      <div :class="['icon-left', isExpanded && 'rotate']">
        <SvgIcon name="chevron_right" />
      </div>
      <div :class="['expander-label']">
        <slot :name="SLOT.header_center">
          {{ label }}
        </slot>
      </div>
      <div
        :class="[
          'icon-right',
          iconRightOK ? 'icon-right-ok' : 'icon-right-nok',
        ]"
      >
        {{ iconRight }}
        <slot :name="SLOT.header_right"></slot>
      </div>
    </div>
    <div class="expander-content" v-if="isExpanded">
      <!-- <div
      :class="['expander-content', isExpanded ? 'is-expanded' : 'not-expanded']"
    > -->
      <slot></slot>
    </div>
  </section>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.focus {
  outline-color: ~"@{pastel-green}55";
  &:focus {
    outline: none; // disable outline for click
  }
  &:focus-visible {
    outline: 2px solid ~"@{pastel-green}55"; // enable focus for keyboard
    outline-style: solid;
  }
}

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
  display: flex;
  align-items: center;
}

.border {
  border: 1px solid ~"@{slate-black}15";
}

.expander-content {
  cursor: default;
  height: auto;
}

.icon-left {
  display: flex;
  @media print {
    display: none;
  }
  transition: transform 0.15s ease-in;
  margin: 0 0.5rem;
  & > svg {
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
  }
}

.rotate {
  transform: rotate(90deg);
}

.expander-label {
  display: inline-block;
  text-align: left;
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
