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
      <div class="heading">
        <h2 v-if="title" class="title">{{ title }}</h2>
        <div @click="close" class="nav-show-button">
          <SvgIcon name="more_vert" title="Show options" />
        </div>
      </div>
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
  &-button {
    display: inline-block;
    margin-left: auto;
    margin-right: 0;
  }
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
  font-size: 1.4rem;
  flex-grow: 1;
  margin: 0;
  text-align: center;
}

.visible {
  visibility: visible;
}
</style>
