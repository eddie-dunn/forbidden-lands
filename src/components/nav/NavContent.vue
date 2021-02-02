<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { MULTIPLAY_KEY } from "src/util/const"

@Component({
  components: {},
})
export class NavContent extends Vue {
  get multiplayEnabled() {
    return !!localStorage.getItem(MULTIPLAY_KEY)
  }
}

export default NavContent
</script>

<template>
  <section class="Box-NavContent">
    <h2>Navigation</h2>
    <div class="route-links" @click="$emit('close')">
      <router-link to="/" exact>{{ $t("Characters") }}</router-link>
      <router-link v-if="multiplayEnabled" to="/multiplayer" exact>
        {{ $t("Multiplay") + " (beta)" }}
      </router-link>
      <router-link to="/options">
        Options
      </router-link>
      <router-link to="/sandbox" exact v-if="$debugMode">
        Sandbox
      </router-link>
      <router-link to="/dice">{{ $t("Dice") }}</router-link>
      <router-link to="/about">{{ $t("About") }}</router-link>
    </div>
  </section>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.Box-NavContent {
  display: block;
  padding: 0 0.4rem;

  a {
    font-weight: bold;
    color: @color-text;
    text-decoration: none;
    &.router-link-active {
      color: @color-main;
    }
  }

  .route-links {
    display: grid;
    grid-gap: 0.75rem;
  }
}
</style>
