<template>
  <div class="home">
    <h1>SANDBOX</h1>
    <ExpandableSection label="Vue app info" class="text-center">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </ExpandableSection>
    <ExpandableSection label="Notify" saveStateId="notify-test">
      <div class="sandbox-content">
        <FLButton @click="notify('test')">Test</FLButton>
        <FLButton @click="notify('test 200 ms', 'warning', 2000)">
          Test 2000ms
        </FLButton>
      </div>
    </ExpandableSection>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import HelloWorld from "@/components/HelloWorld.vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import FLButton from "@/components/base/FLButton.vue"

@Component({
  components: {
    HelloWorld,
    ExpandableSection,
    FLButton,
  },
})
export default class Home extends Vue {
  notify(
    message: string,
    type?: "info" | "warning" | "error",
    displayTime?: number
  ) {
    this.$notify({
      type: type || "info",
      message,
      displayTime,
    })
  }
}
</script>

<style lang="less">
.sandbox-content {
  display: flex;
  flex-direction: row;
  margin: 1rem;
  * > {
    margin-right: 1rem;
    width: max-content;
  }
}
</style>
