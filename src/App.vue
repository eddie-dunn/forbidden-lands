<script lang="ts">
import Vue from "vue"
import LocaleChanger from "@/components/LocaleChanger.vue"
import Notify from "@/components/base/Notify.vue"
import NavDrawer from "@/components/base/NavDrawer.vue"
import SvgIcon from "@/components/SvgIcon.vue"

import {
  GET_PAGE_TITLE,
  GET_PAGE_SUBTITLE,
  GET_MP_ACTIVE,
} from "@/store/store-types"

export default Vue.extend({
  components: {
    LocaleChanger,
    NavDrawer,
    Notify,
    SvgIcon,
  },
  data() {
    return {
      refreshing: false,
      registration: null as any,
      updateExists: false,
      showNav: false,
      showDiceModal: false,
    }
  },
  methods: {
    showRefreshUI(e: any) {
      this.registration = e.detail
      this.updateExists = true
    },
    refreshApp() {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) {
        return
      }
      this.registration.waiting.postMessage("skipWaiting")
    },
  },
  computed: {
    pageTitle(): string {
      return this.$store.getters[GET_PAGE_TITLE]
    },
    pageSubtitle(): string {
      const sub = this.$store.getters[GET_PAGE_SUBTITLE]
      return sub ? ": " + sub : ""
    },
    showMp(): boolean {
      return this.$store.getters[GET_MP_ACTIVE]
    },
  },
  created() {
    // Service worker update from:
    // https://medium.com/@dougallrich/give-users-control-over-app-updates-in-vue-cli-3-pwas-20453aedc1f2
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true })
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  },
})
</script>

<template>
  <div id="app">
    <Notify />

    <!-- TODO: Create separate component for navbar -->
    <div class="navbar navbar-top">
      <div class="navbar-left ">
        <router-link class="nav-icon" to="/" exact>
          <SvgIcon name="home" title="Home" />
        </router-link>
      </div>
      <div class="navbar-center no-scrollbar">
        <h1 class="page-title capitalize">
          {{ $t(pageTitle) }}{{ $t(pageSubtitle) }}
        </h1>
      </div>
      <div class="navbar-right">
        <div v-if="showMp" class="nav-icon">
          <router-link class="nav-icon" to="/multiplayer" exact>
            <SvgIcon name="chat_bubble" title="Multiplayer" />
          </router-link>
        </div>

        <div @click="showNav = true" class="show-nav">
          <SvgIcon name="menu_open" title="Show options" />
        </div>
      </div>
    </div>
    <button
      v-if="updateExists"
      style="margin: 1rem"
      class="button button-danger"
      @click="refreshApp"
    >
      New version available! Click to update
    </button>
    <router-view />

    <NavDrawer
      title="FLC"
      :visible="showNav"
      @close="showNav = false"
      class="nav-body"
    >
      <section class="nav-section">
        <h2>Navigation</h2>
        <div class="route-links" @click="showNav = false">
          <router-link to="/" exact>{{ $t("Characters") }}</router-link>
          <router-link to="/multiplayer" exact>
            {{ $t("Multiplay") + " (beta)" }}
          </router-link>
          <router-link to="/sandbox" exact v-if="$debugMode">
            {{ $t("Sandbox") }}
          </router-link>
          <router-link to="/dice">{{ $t("Dice") }}</router-link>
          <router-link to="/about">{{ $t("About") }}</router-link>
        </div>
      </section>
      <section class="nav-section">
        <h2>Options</h2>
        <div>{{ $t("Language") }} <LocaleChanger /></div>
      </section>
    </NavDrawer>
  </div>
</template>

<style lang="less">
@import "~Style/colors.less";

body {
  margin: 0;
  color: @color-text;
}

.page-title {
  margin: 0 6px;
  min-width: 0;
  display: inline-block;
  font-size: 1.4em;
  white-space: nowrap;
}

.show-nav {
  display: inline-block;
  cursor: pointer;
}

.nav-body {
  a {
    font-weight: bold;
    color: @color-text;
    text-decoration: none;
    &.router-link-active {
      color: @color-main;
    }
  }
}
.nav-section {
  padding: 0 0.4rem;
}

.route-links {
  display: flex;
  flex-direction: column;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  // font-family: "Averia Libre", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
}

.no-scrollbar {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.navbar-left {
  min-width: 0;
  overflow: auto;
}

.navbar-center {
  min-width: 0;
  display: inline-block;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.navbar-right {
  display: flex;
}

.nav-icon {
  text-decoration: none;
  color: #2c3e50;
  &.router-link-active {
    color: @color-background;
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

.capitalize-first::first-letter {
  text-transform: capitalize;
}

.small-caps {
  font-variant-caps: small-caps;
}

.hidden {
  display: none;
}

// TODO: Replace all instances of input with FLInput
input[type="number"],
input[type="text"] {
  min-height: 1rem;
  background-color: @background-color;
  color: @slate-black;
  height: auto;
  min-height: 1rem;
  border: 2px solid @pastel-green-transparent;
  padding: 0.3rem;
  appearance: none;
  inline-size: auto;
  box-sizing: border-box;
  &:disabled {
    background-image: none;
    border: 2px solid ~"@{pastel-green}55";
  }
}

// TODO: Replace all instances of select with FLSelect
select {
  background-color: @background-color;
  color: @slate-black;
  height: auto;
  border: 2px solid @pastel-green-transparent;
  appearance: none;
  background-image: url(~./assets/logo.png);
  background-size: 0.7rem;
  background-position: calc(100% - 3px) center;
  background-repeat: no-repeat;
  padding: 0.3rem;
  padding-right: 1rem;
  &:disabled {
    background-image: none;
    border: 2px solid ~"@{pastel-green}55";
  }
}

// &::-moz-focus-outer {
//   border: 0;
// }

// TODO: Replace all instances of class="button" with FLButton
.button {
  &::-moz-focus-inner {
    border: 0;
  }
  outline: 0;
  text-decoration: none;
  padding: 0.5rem 2rem;
  display: inline-block;
  color: #fff;
  background-color: @pastel-green;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:active {
    transform: scale(0.97);
  }
  &:focus {
    outline: @color-danger dotted 1px;
  }

  &-red,
  &-danger {
    color: #fff;
    background-color: @pastel-red;
    border: 1px solid @pastel-red;
  }

  &-white,
  &-cancel {
    background-color: white;
    color: #4fc08d;
  }

  &-shadow,
  &-ghost {
    border: 0;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  &:disabled {
    background: slategray;
    border: 1px solid slategray;
    color: lightgray;
    &:hover {
      cursor: not-allowed;
    }
    &:active {
      transform: unset;
    }
  }
}

.flex-row-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.space-around {
  justify-content: space-around;
}

.button-row {
  .flex-row-wrap();
  .space-around();
  align-items: center;
  margin: 0.5rem;
  & > button {
    margin: 0.2rem;
    flex: 1 0 auto;
    white-space: nowrap;
  }
}

.block {
  display: block;
}

.text {
  &-center {
    text-align: center;
  }
  &-left {
    text-align: left;
  }
  &-right {
    text-align: right;
  }
}

.bold {
  font-weight: bold;
}

.center {
  text-align: center;
}

// TODO: Are these needed? Remove or implement FLDice such that they can be removed
.dice {
  &-white {
    color: white;
  }
  &-black {
    color: black;
  }
  &-red {
    color: red;
  }
  &-green {
    color: green;
  }
  &-blue {
    color: blue;
  }
  &-orange {
    color: orange;
  }
}
</style>
