<template>
  <div class="home">
    <h1>SANDBOX</h1>
    <ExpandableSection label="Vue app info" class="text-center">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </ExpandableSection>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import HelloWorld from "@/components/HelloWorld.vue"
import ExpandableSection from "@/components/ExpandableSection.vue"

@Component({
  components: {
    HelloWorld,
    ExpandableSection,
  },
})
export default class Home extends Vue {}
</script>
