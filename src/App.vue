<script lang="ts">
import Vue from "vue"
import LocaleChanger from "@/components/LocaleChanger.vue"
import Notify from "@/components/base/Notify.vue"
import NavDrawer from "@/components/base/NavDrawer.vue"
import SvgIcon from "@/components/SvgIcon.vue"
import Backup from "@/components/Backup.vue"
import IconButton from "@/components/base/IconButton.vue"
import DiceModal from "@/components/dice/DiceModal.vue"

import {
  GET_PAGE_TITLE,
  GET_PAGE_SUBTITLE,
  GET_MP_ACTIVE,
} from "@/store/store-types"

export default Vue.extend({
  components: {
    Backup,
    DiceModal,
    IconButton,
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
      if (sub && this.pageTitle) return ": " + sub
      if (sub && !this.pageTitle) return sub
      return sub
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
      if (!sessionStorage.getItem("__hasPreviousSW")) {
        /* eslint-disable no-console */
        console.warn("SETTING SW")
        /* eslint-enable no-console */
        sessionStorage.setItem("__hasPreviousSW", "true")
        return
      }
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
          <router-link class="nav-icon-highlight" to="/multiplayer" exact>
            <SvgIcon name="chat_bubble" title="Multiplayer" />
          </router-link>
        </div>

        <IconButton
          style="margin-right: .5rem;"
          height="32px"
          width="32px"
          icon="rolling-dices"
          @click="showDiceModal = !showDiceModal"
        ></IconButton>

        <IconButton icon="menu_open" @click="showNav = !showNav"></IconButton>
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

    <NavDrawer :visible="showNav" @close="showNav = false" class="nav-body">
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
        <Backup />
      </section>
    </NavDrawer>

    <DiceModal v-if="showDiceModal" @close="showDiceModal = false" />
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
