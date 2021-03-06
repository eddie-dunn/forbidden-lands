<script lang="ts">
/* eslint-disable no-console */
import Vue from "vue"

import Notify from "@/components/base/Notify.vue"
import NavBar from "@/components/base/NavBar.vue"
import DiceModal, { defaultDice } from "@/components/dice/DiceModal.vue"
import { Updater } from "@/components/base/Updater.vue"
import { SideNav } from "src/components/nav/SideNav.vue"
import { LOCALE_KEY } from "@/i18n"
import { getDefaultLocale } from "src/locales/localeUtil.ts"

const DEFAULT_DICE_MODAL_CONF = {
  title: "",
  dice: defaultDice(),
  charData: null,
  disablePush: false,
}

export default Vue.extend({
  components: {
    DiceModal,
    NavBar,
    Notify,
    SideNav,
    Updater,
  },
  data() {
    return {
      showNav: false,
      showDiceModal: false,
      diceModalConfig: DEFAULT_DICE_MODAL_CONF,
    }
  },
  methods: {
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
    useLocale() {
      if (localStorage.getItem(LOCALE_KEY)) {
        return // locale has been set by user
      }
      this.$i18n.locale = getDefaultLocale(navigator.languages)
    },
  },
  created() {
    this.addEventListener("open-dice-modal")
    this.useLocale()
  },
  mounted() {
    const d = document.getElementById("splash-screen")
    d?.classList.toggle("hidden", true)
  },
  beforeDestroy() {
    this.removeEventListener("open-dice-modal")
  },
})
</script>

<template>
  <div id="app" style="margin: 0 auto;">
    <NavBar
      :showNav="showNav"
      @click-menu="showNav = !showNav"
      @click-dice="showDiceModal = !showDiceModal"
    />
    <SideNav :visible="showNav" @close="showNav = false" />

    <Updater />

    <router-view />

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
  background-color: @color-background;
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
  min-height: 100vh;
}

.capitalize {
  text-transform: capitalize;
}

.capitalize-first {
  display: inline-block;
  &::first-letter {
    text-transform: capitalize;
  }
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
