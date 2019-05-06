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
    <div class="navbar">
      <div class="route-links">
        <router-link to="/">Home</router-link> |
        <router-link to="/character-creator">Character Creator </router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div class="route-links">
        <LocaleChanger />
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  // Make it follow on scroll
  position: sticky;
  top: 0px;
  background: white;

  // // width: 100%;
  // background: #fafafa;
  border: solid #42b98344 2px;
  // border-radius: 1rem;
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  // padding: 1rem;
  // margin: .5rem;
  // // width: 100vw;
  // max-width: 1024px;
  // // max-width: 768px;
}
</style>
