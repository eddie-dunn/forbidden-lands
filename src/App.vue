<script lang="ts">
import Vue from "vue"
import LocaleChanger from "@/components/LocaleChanger.vue"
export default Vue.extend({
  components: {
    LocaleChanger,
  },
})
</script>

<template>
  <div id="app">
    <div class="navbar navbar-top">
      <div class="route-links">
        <router-link to="/">{{ $t("List") }}</router-link>
        |
        <router-link to="/dice">{{ $t("Dice") }}</router-link>
        |
        <router-link to="/about">{{ $t("About") }}</router-link>
      </div>
      <div class="route-links">
        <LocaleChanger />
      </div>
    </div>
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
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: @background-color;
  // border: solid ~"@{pastel-green}99" 2px;
  box-shadow: 0px 1px 4px #5f5f5fff;
  padding: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      color: @color-background;
    }
  }
  z-index: 10;

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
  // border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: @pastel-green;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
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
</style>
