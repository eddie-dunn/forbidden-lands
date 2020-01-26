<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import { SET_PAGE_TITLE } from "@/store/store-types"
import DiceRoller from "@/components/dice/DiceRoller.vue"

@Component({
  components: {
    DiceRoller,
  },
})
export default class DiceView extends Vue {
  mounted() {
    this.$store.commit(SET_PAGE_TITLE, "Dice roller")
  }
}
</script>

<template>
  <DiceRoller class="dice-view" :showReset="true" />
</template>

<style scoped lang="less">
.dice-view {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
