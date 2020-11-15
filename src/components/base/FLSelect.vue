<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

import { capitalize } from "@/util/util"

export type Option = {
  id: string
  name?: string
  extras?: string[]
}

export type Optgroup = {
  label: string
  options: Option[]
}

@Component({
  components: {},
})
export class FLSelect extends Vue {
  @Prop({ default: "" }) label!: string
  @Prop({ default: () => [] }) options!: Option[]
  @Prop({ default: () => [] }) optgroups!: Optgroup[]
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: "" }) initial!: string
  @Prop({ default: true }) initialDisabled!: boolean
  @Prop({ default: null }) value!: string | null
  @Prop({ default: false }) fullWidth!: boolean
  @Prop({ default: false }) inGrid!: boolean
  @Prop({ default: "row" }) direction!: "row" | "column"
  @Prop({ default: false }) translateOptions!: boolean

  capitalize = capitalize

  optionExtras(option: Option): string {
    if (!option.extras || !option.extras.length) return ""
    return " " + option.extras.join(" ")
  }

  renderOption(option: Option): string {
    if (option.name) {
      // If caller provides options with names, we assume they are pre-formatted
      return option.name + this.optionExtras(option)
    }
    if (this.translateOptions) {
      return capitalize(String(this.$t(option.id))) + this.optionExtras(option)
    }
    return capitalize(option.id) + this.optionExtras(option)
  }

  onInput(ev: any) {
    const newValue = ev.target.value
    this.$emit("input", newValue)
  }
}

export default FLSelect
</script>

<template>
  <div
    :class="[
      'fl-select',
      direction === 'column' && 'fl-select-column',
      inGrid && 'in-grid',
    ]"
  >
    <label
      v-if="label"
      :for="label"
      :class="[!inGrid && 'label', 'font-small']"
    >
      <div class="capitalize-first">{{ label }}</div>
    </label>
    <select
      :id="label"
      :value="value"
      @input="onInput"
      :disabled="disabled"
      :class="fullWidth ? 'full-width' : ''"
    >
      <option
        v-if="initial"
        key="disabled"
        :disabled="initialDisabled"
        :value="null"
      >
        {{ initial }}
      </option>

      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ renderOption(option) }}
      </option>

      <optgroup
        v-for="(group, index) in optgroups"
        :key="`${group.label}-${index}`"
        :label="capitalize(translateOptions ? $t(group.label) : group.label)"
      >
        <option
          v-for="option in group.options"
          :key="option.id"
          :value="option.id"
        >
          {{ renderOption(option) }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<style lang="less" scoped>
// .fl-select {
//   margin: 1rem;
// }

.fl-select-column {
  display: inline-flex;
  flex-direction: column;
}

.label {
  margin-right: 1rem;
}

.full-width {
  width: 100%;
}

.in-grid {
  display: contents;
}
</style>
