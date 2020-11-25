<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"

// TODO: SUpport label prefix/suffix

@Component({
  components: {
    SvgIcon,
  },
})
export class FLToggle extends Vue {
  @Prop({ default: false }) value!: boolean
  @Prop({ default: "" }) label!: string
  @Prop({ default: "" }) suffix!: string
  @Prop({ default: "" }) icon!: string
  @Prop({ default: "" }) id!: string
  @Prop({ default: false }) column!: boolean
  @Prop({ default: false }) dangerOff!: boolean
  @Prop({ default: false }) dangerOn!: boolean
  @Prop({ default: false }) block!: boolean

  randId = Math.random()
  get mId() {
    if (this.id) return this.id
    return `${this.randId}-${this.label}`
  }

  inputEvent($event: any) {
    this.$emit("input", $event.target.checked)
  }
}

export default FLToggle
</script>

<template>
  <div :class="['fl-toggle', column ? '' : 'row']">
    <SvgIcon v-if="icon" class="" :name="icon" />
    <label v-if="label" class="label-text" :for="mId"> {{ label }}</label>
    <label :class="['switch']">
      <input :id="mId" type="checkbox" :checked="value" @input="inputEvent" />
      <span
        :class="[
          'slider',
          !block && 'round',
          !value && dangerOff && 'dangerbg',
          value && dangerOn && 'dangerbg',
        ]"
      ></span>
    </label>
    <label v-if="suffix" class="label-suffix" :for="mId"> {{ suffix }}</label>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.fl-toggle {
  display: inline-flex;
  position: relative;
  // align-items: center;
  flex-direction: column;
  align-items: flex-start;
}

.row {
  flex-direction: row;
  align-items: center;
  .label-text {
    margin-right: 0.5rem;
  }
  .label-suffix {
    margin-left: 0.5rem;
  }
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  width: 4em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: calc(2em - 6px);
  width: calc(2em - 6px);
  left: 3px;
  bottom: 3px;
  // height: calc(2em - 16%);
  // width: calc(2em - 8%);
  // left: calc(4%);
  // bottom: calc(7%);
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider:before {
  transform: translateX(2em);
}

.dangerbg {
  background-color: @color-danger;
}

input:checked + .slider {
  background-color: @color-main;
  &.dangerbg {
    .dangerbg();
  }
}

/* Rounded sliders */
.slider.round {
  border-radius: 1em;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
