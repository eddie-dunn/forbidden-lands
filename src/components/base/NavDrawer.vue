<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"
import FLButton from "@/components/base/FLButton.vue"

@Component({
  components: {
    FLButton,
    SvgIcon,
  },
})
export default class NavDrawer extends Vue {
  @Prop({ default: "" }) title!: string
  @Prop({ default: false }) visible!: boolean

  close() {
    this.$emit("close")
  }
}
</script>

<template>
  <div class="nav">
    <div
      :class="['overlay', visible ? 'visible' : '']"
      @click.self="close"
    ></div>
    <nav :class="['nav-drawer', visible ? 'nav-show' : '']">
      <h2 class="heading">
        <div class="title">{{ title }}</div>
        <div @click="close" class="show-nav">
          <SvgIcon name="more_vert" title="Show options" />
        </div>
      </h2>
      <div class="body">
        <slot>
          content
        </slot>
      </div>
    </nav>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.overlay {
  background: rgba(50, 50, 50, 50%);
  z-index: @z-navbar-1;
  top: 0;
  left: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  transition: opacity 0.3s ease-in-out;

  visibility: hidden;
}

.nav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 20rem;
  max-width: calc(100vw - 20px);
  z-index: @z-navbar-2;

  background: @color-background;
  color: @color-text;
  text-align: left;
  box-shadow: @box-shadow-normal;
  overflow: auto;

  transform: translateX(100%);
  transition: transform 0.2s ease-in-out;
}

.nav-show {
  transform: translateX(0);
}

.heading {
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.body {
  padding-bottom: 20vh;
}

.title {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  flex-grow: 1;
}

.visible {
  visibility: visible;
}
</style>
