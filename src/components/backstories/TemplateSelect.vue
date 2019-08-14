<script lang="ts">
// TODO: Look into http://youmightnotneedjs.com/#tabs for tabs

import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

@Component({
  components: {},
})
export default class TemplateSelect extends Vue {
  @Prop({ required: true }) title!: string
  @Prop({ required: true }) diceValue!: number

  rollClicked() {
    this.$emit("randomClicked")
  }
}
</script>

<template>
  <div>
    <h1>
      {{ title }}
      {{ diceValue }}
      <button @click="rollClicked">roll</button>
    </h1>
    <slot :diceValue="diceValue">
      <!-- contents of TemplateSelect, passing result of roller as prop -->
    </slot>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
h2 {
  margin: 0rem 1rem 1rem 1rem;
}

.modal-body {
  overflow: auto;
  text-align: left;
  max-width: 70rem;
  padding: 1rem;
  margin: 1rem auto;
  max-width: 60rem;

  ul {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
    li {
      padding: 0.5em;
      text-indent: -0.5rem;
      &:before {
        content: "✥";
      }
    }
  }
}

.experience-input {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 4rem;
  label {
    margin-right: 1rem;
  }
}

.header {
  border-bottom: solid @pastel-green 5px;
}

.modal-button-row {
  border-top: solid @pastel-green 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0.5rem;
}

.tab {
  background: white;
  color: @pastel-green;
  padding: 0.5rem;
  margin-right: 5px;
  outline: solid 1px @pastel-green;
  display: inline-block;
  cursor: pointer;
  &:active {
    transform: translateY(3px);
    background: @pastel-green;
    color: white;
  }
  &--active {
    background: @pastel-green;
    color: white;
  }
}

.tab-bar {
  text-align: left;
  margin: 0 1rem;
}

.xp-modal {
  margin: 0 auto;
}
</style>
