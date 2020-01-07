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
  <div :class="['overlay', visible ? 'visible' : '']" @click.self="close">
    <nav :class="['nav-drawer', visible ? 'nav-show' : '']">
      <h2 class="heading">
        <FLButton
          :class="['close-button', visible ? 'visible' : '']"
          @click="close"
          >></FLButton
        >
        <div class="title">{{ title }}</div>
      </h2>
      <slot class="body">
        content
      </slot>
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
  background: @color-background;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 50vw;
  max-width: 30rem;
  min-width: 300px;
  z-index: @z-navbar-2;

  text-align: left;
  box-shadow: @box-shadow-normal;

  transform: translateX(100%);
  transition: transform 0.2s ease-in-out;
}

.nav-show {
  transform: translateX(0);
}

.heading {
  margin: 0 0 1rem 0;
  display: flex;
}

.body {
  padding: 1rem;
}

.title {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  flex-grow: 1;
}

.close-button {
  transition: none;
}

.visible {
  visibility: visible;
}
</style>
