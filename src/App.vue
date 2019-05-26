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
  // background: #2c3e50;
  // background: #282c34;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // color: white;

  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 0.5rem auto;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  // Make it follow on scroll
  position: sticky;
  background: white;
  // border: solid #42b98344 2px;
  border: solid #42b98399 2px;
  // background: #2c3e50;
  // background: #282c34;

  // // width: 100%;
  // background: #fafafa;
  // border-radius: 1rem;
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  z-index: 10;

  &-top {
    top: 0px;
  }

  &-bottom {
    bottom: 0px;
  }
}

.capitalize {
  text-transform: capitalize;
}

input[type="number"] {
  min-height: 1rem;
}

button::-moz-focus-inner {
  border: 0;
}

select {
  // background-color: @pastel-green;
  // color: white;
  // height: 1.5rem;
  // border: 0;
  padding: 0.3rem;
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
  padding: 0.5em 2em;
  // border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
  cursor: pointer;

  &-white {
    background-color: white;
    color: #4fc08d;
  }

  &:active {
    // box-shadow: none;
    transform: translateY(2px);
  }
  &:hover {
    color: #42b983;
    background-color: #fff;
    // box-shadow: 0px -5px 5px rgba(255, 229, 255, 0.4) inset;
  }
  &-red {
    color: #fff;
    background-color: @pastel-red;
    border: 1px solid @pastel-red;
  }
}
</style>
