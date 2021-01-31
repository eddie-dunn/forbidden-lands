<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    SvgIcon,
  },
})
export class NavDrawer extends Vue {
  @Prop({ default: "" }) title!: string
  @Prop({ default: false }) visible!: boolean

  close() {
    this.$emit("close")
  }
}
export default NavDrawer
</script>

<template>
  <div class="nav">
    <div
      :class="['overlay', visible ? 'visible' : '']"
      @click.self="close"
    ></div>

    <nav :class="['nav-drawer', visible ? 'nav-show' : '']">
      <h2 v-if="title" class="title">{{ title }}</h2>
      <div @click="close" class="nav-show-button">
        <SvgIcon name="close" title="close" />
      </div>
      <slot>
        content
      </slot>
    </nav>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

h2 {
  margin: 0.25em 0;
}

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
  display: flex;
  flex-direction: column;

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

  font-size: 1.3rem;

  transform: translateX(100%);
  transition: transform 0.2s ease-in-out;
}

.nav-show {
  transform: translateX(0);
}

.nav-show-button {
  cursor: pointer;
  position: absolute;
  right: 0.4rem;
  top: 0.1rem;
}

.title {
  font-size: 1.4rem;
  flex-grow: 1;
  margin: 0 1rem;
}

.visible {
  visibility: visible;
}
</style>
