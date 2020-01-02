<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import DiceRoller from "@/components/dice/DiceRoller.vue"

@Component({
  components: {
    DiceRoller,
  },
})
export default class DiceView extends Vue {}
</script>

<template>
  <DiceRoller class="dice-view" />
</template>

<style scoped lang="less">
.dice-view {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
