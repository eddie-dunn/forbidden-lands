<script lang="ts">
import Vue from "vue"
import LocaleChanger from "@/components/LocaleChanger.vue"
import NavButton from "@/components/NavButton.vue"
import Notify from "@/components/base/Notify.vue"

export default Vue.extend({
  components: {
    LocaleChanger,
    NavButton,
    Notify,
  },
  data() {
    return {
      refreshing: false,
      registration: null as any,
      updateExists: false,
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

    <div class="navbar navbar-top">
      <div class="navbar-left">
        <div v-if="false">
          <NavButton type="back" />
          <NavButton type="forward" />
          <NavButton type="refresh" />
        </div>
        <div class="route-links">
          <router-link to="/" exact>{{ $t("List") }}</router-link>
          |
          <span v-if="$debugMode">
            <router-link to="/multiplayer" exact>
              {{ $t("Multiplay") }}
            </router-link>
            |
            <router-link to="/sandbox" exact>
              {{ $t("Sandbox") }}
            </router-link>
            |
          </span>
          <router-link to="/dice">{{ $t("Dice") }}</router-link>
          |
          <router-link to="/about">{{ $t("About") }}</router-link>
        </div>
      </div>
      <div class="navbar-right">
        <LocaleChanger />
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
  </div>
</template>

<style lang="less">
@import "~Style/colors.less";
body {
  margin: 0;
  color: @color-text;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

.navbar-left {
  > div {
    display: inline-block;
    margin-right: 1rem;
    vertical-align: middle;
  }
}

.bold {
  font-weight: bold;
}

.center {
  text-align: center;
}

.navbar {
  @media (min-height: 500px) {
    position: sticky;
    top: 0;
  }
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: @background-color;
  box-shadow: 0px 1px 4px #5f5f5fff;
  padding: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-active {
      color: @color-background;
    }
  }
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
