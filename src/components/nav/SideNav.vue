<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

import { NavContent } from "src/components/nav/NavContent.vue"
import { APP_VERSION } from "src/util/const"
import NavDrawer from "src/components/base/NavDrawer.vue"

@Component({
  components: {
    NavContent,
    NavDrawer,
  },
})
export class SideNav extends Vue {
  @Prop({ default: false }) visible!: boolean

  buildVersion = APP_VERSION
}

export default SideNav
</script>

<template>
  <NavDrawer :visible="visible" @close="$emit('close')" class="Box-SideNav">
    <NavContent class="nav-content" @close="$emit('close')" />

    <section class="nav-section-footer">
      {{ buildVersion }}
    </section>
  </NavDrawer>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.Box-SideNav {
  display: flex;
  flex-direction: column;
}

.nav-content {
  flex-grow: 1;
}

.nav-section-footer {
  font-size: 0.75rem;
  text-align: center;
}
</style>
