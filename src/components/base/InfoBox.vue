<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    SvgIcon,
  },
})
export default class InfoBox extends Vue {
  @Prop({ default: "info" }) boxType!: string

  visible = true

  get infoType() {
    return this.boxType === "warning" ? "info-danger" : "info-base"
  }
  get buttonType() {
    return this.boxType === "warning"
      ? "hide-button-danger"
      : "hide-button-info"
  }

  hideClicked() {
    this.visible = false
  }
}
</script>

<template>
  <div v-if="visible" :class="infoType">
    <div class="text-box">
      <slot></slot>
    </div>
    <div :class="['hide-button', buttonType]" @click="hideClicked">
      <SvgIcon class="" name="close" />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.info-base {
  position: relative;
  margin: 1rem 0.2rem;
  border: 0.2rem solid @pastel-green;
  text-align: left;
  display: flex;
}

.text-box {
  padding: 1rem;
}

.info-danger {
  .info-base();
  border: 0.2rem solid @pastel-red;
}

.hide-button {
  cursor: pointer;
  margin: 5px;
}

.hide-button-info {
  color: @pastel-green;
}

.hide-button-danger {
  color: @pastel-red;
}
</style>
