<script lang="ts">
/* eslint-disable no-console */
import Vue from "vue"
import LocaleChanger from "@/components/LocaleChanger.vue"
import Notify from "@/components/base/Notify.vue"
import NavBar from "@/components/base/NavBar.vue"
import NavDrawer from "@/components/base/NavDrawer.vue"
import Backup from "@/components/Backup.vue"
import FLButton from "@/components/base/FLButton.vue"
import DiceModal, { defaultDice } from "@/components/dice/DiceModal.vue"

import {
  GET_PAGE_TITLE,
  GET_PAGE_SUBTITLE,
  GET_MP_ACTIVE,
} from "@/store/store-types"

const DEFAULT_DICE_MODAL_CONF = {
  title: "",
  dice: defaultDice(),
  charData: null,
  disablePush: false,
}

export default Vue.extend({
  components: {
    Backup,
    DiceModal,
    FLButton,
    LocaleChanger,
    NavDrawer,
    NavBar,
    Notify,
  },
  data() {
    return {
      refreshing: false,
      registration: null as any,
      updateExists: false,
      showNav: false,
      showDiceModal: false,
      diceModalConfig: DEFAULT_DICE_MODAL_CONF,
    }
  },
  methods: {
    showRefreshUI(e: any) {
      this.registration = e.detail
      // this.updateExists = true
    },
    refreshApp() {
      console.log("App update clicked")
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) {
        console.log("early return", {
          registration_waiting: (this.registration || {}).waiting,
          registration: this.registration,
        })
        return
      }
      console.log("Service workier postMessage: skipWaiting")
      this.registration.waiting.postMessage("skipWaiting")
    },
    onOpenDiceModal(args: any) {
      // FIXME: Abstract away the keys for settings this up into separate module
      // FIXME: Enable handling of willpower
      const { title, dice, disablePush, charData = null } = args
      this.diceModalConfig = {
        ...this.diceModalConfig,
        title,
        dice,
        disablePush,
        charData,
      }
      this.showDiceModal = true
    },
    onCloseDiceModal() {
      this.diceModalConfig = DEFAULT_DICE_MODAL_CONF
      this.showDiceModal = false
    },
    addEventListener(name: string) {
      this.$root.$on(name, this.onOpenDiceModal)
    },
    removeEventListener(name: string) {
      this.$root.$off(name)
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
    if (!navigator.serviceWorker) {
      return
    }
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
    this.addEventListener("open-dice-modal")
  },
  beforeDestroy() {
    this.removeEventListener("open-dice-modal")
  },
})
</script>

<template>
  <div id="app">
    <NavBar
      :showNav="showNav"
      :showMp="showMp"
      :pageTitle="pageTitle"
      :pageSubtitle="pageSubtitle"
      @click-menu="showNav = !showNav"
      @click-dice="showDiceModal = !showDiceModal"
    />
    <FLButton
      v-if="updateExists"
      type="danger"
      style="margin: 1rem"
      @click="refreshApp"
    >
      New version available! Click to update
    </FLButton>
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
            Sandbox
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

    <DiceModal
      v-if="showDiceModal"
      @close="onCloseDiceModal"
      :title="diceModalConfig.title"
      :dice="diceModalConfig.dice"
      :disablePush="diceModalConfig.disablePush"
    />
    <Notify />
  </div>
</template>

<style lang="less">
@import "~Style/colors.less";

body {
  margin: 0;
  color: @color-text;
}

.page-title {
  margin: 0;
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

  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 0 auto;
  min-height: 100vh;
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
  height: 2.5rem;
  font-size: 1rem;
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
  height: 2.5rem;
  font-size: 1rem;
  border: 2px solid @pastel-green-transparent;
  border-radius: 0;
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

.font-small {
  font-size: 0.875rem;
}
</style>
