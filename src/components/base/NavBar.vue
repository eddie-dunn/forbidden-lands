<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import {
  GET_PAGE_TITLE,
  GET_PAGE_SUBTITLE,
  GET_MP_ACTIVE,
} from "@/store/store-types"
import SvgIcon from "@/components/SvgIcon.vue"
import IconButton from "@/components/base/IconButton.vue"

@Component({
  components: {
    IconButton,
    SvgIcon,
  },
})
export default class NavBar extends Vue {
  @Prop({ default: false }) showNav!: boolean

  get pageTitle(): string {
    const { title, translate } = this.$store.getters[GET_PAGE_TITLE]
    if (translate) {
      return String(this.$t(title))
    }
    return title
  }

  get pageSubtitle(): string {
    const sub = this.$store.getters[GET_PAGE_SUBTITLE]
    if (sub && this.pageTitle) return ": " + sub
    if (sub && !this.pageTitle) return sub
    return sub
  }

  get showMp(): boolean {
    return this.$store.getters[GET_MP_ACTIVE]
  }
}
</script>

<template>
  <div class="navbar navbar-top">
    <div class="navbar-left">
      <router-link class="nav-icon" to="/" exact>
        <SvgIcon name="home" title="Home" />
      </router-link>
      <div v-if="showMp" class="nav-icon">
        <router-link class="nav-icon-highlight" to="/multiplayer" exact>
          <SvgIcon name="chat_bubble" title="Multiplayer" />
        </router-link>
      </div>
    </div>
    <div class="navbar-center">
      <h1 class="page-title capitalize">{{ pageTitle }}{{ pageSubtitle }}</h1>
    </div>
    <div class="navbar-right">
      <IconButton
        aria-label="Roll dice"
        @click="$emit('click-dice', $event)"
        style="margin-right: .5rem;"
        height="32px"
        width="32px"
        icon="rolling-dices"
      ></IconButton>

      <IconButton
        aria-label="Toggle menu"
        @click="$emit('click-menu', $event)"
        icon="menu_open"
      ></IconButton>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.page-title {
  margin: 0;
  min-width: 0;
  display: inline-block;
  font-size: 1.4em;
  white-space: nowrap;
}

.navbar-left {
  flex: 0 0 auto;
  min-width: 0;
  display: flex;
}

.no-scrollbar {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.navbar-center {
  flex: 1 1 auto;
  min-width: 0;
  display: inline-block;
  margin: 0;
  overflow: auto;
  .no-scrollbar();
}

.navbar-right {
  flex: 0 0 auto;
  display: flex;
}

.nav-icon {
  text-decoration: none;
  color: @color-text;
  margin: 5px;
}

.nav-icon-highlight {
  color: @color-background;
  &.router-link-active {
    color: @color-text;
  }
}

.navbar {
  @media only screen and (min-height: 600px) {
    position: sticky;
    top: 0;
  }
  @media print {
    display: none;
  }
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;

  background: @color-background;
  box-shadow: @box-shadow-normal;
  padding: 3px;

  z-index: @z-navbar;

  &-top {
    top: 0px;
    background: @color-main;
  }

  &-bottom {
    position: sticky;
    bottom: 0px;
  }
}

.capitalize {
  text-transform: capitalize;
}
</style>
