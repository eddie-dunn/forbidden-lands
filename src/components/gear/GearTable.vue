<script lang="ts">
import Vue from "vue"
import { Prop } from "vue-property-decorator"

export class GearTable extends Vue {}
export default GearTable
</script>

<template>
  <table class="Box-GearTable">
    <slot></slot>
  </table>
</template>

<style lang="less">
@import "~Style/colors.less";

.Box-GearTable {
  width: 100%;
  border-collapse: collapse;
  text-align: center;

  th {
    font-weight: normal;
    font-size: 0.8rem;
  }
  th,
  td > {
    border: 1px solid @pastel-green-transparent;
    padding: 5px;
  }
}
</style>
