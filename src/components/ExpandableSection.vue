<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

@Component
export default class ExpandableSection extends Vue {
  @Prop({ required: true }) label!: string

  expanded = false

  get icon() {
    return this.expanded ? "▼" : "▶"
  }
}
</script>

<template>
  <div class="expander" @click.self="expanded = !expanded">
    {{ icon }}
    {{ label }}
    <div class="expanded-content" v-if="expanded">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.expander {
  cursor: pointer;
  margin-top: 1rem;
  font: outline;
  text-align: left;
}
.expanded-content {
  cursor: default;
}
</style>
