<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    SvgIcon,
  },
})
export default class TemplateSelect extends Vue {
  @Prop({ required: true }) title!: string
  @Prop({ required: true }) diceValue!: number

  rollClicked() {
    this.$emit("randomClicked")
  }

  get diceResults() {
    return this.diceValue.toString()
  }
}
</script>

<template>
  <div>
    <div class="heading small-caps">
      {{ title }}
      {{ diceValue }}
    </div>
    <button class="button-icon" @click="rollClicked">
      <SvgIcon
        :name="`d6-${diceResults[0]}-inverted`"
        class="dice-icon dice-black"
      />
      <SvgIcon
        v-if="diceResults[1]"
        :name="`d6-${diceResults[1]}`"
        class="dice-icon dice-red"
      />
    </button>
    <button class="button-icon" @click="rollClicked">
      <SvgIcon :name="`rolling-dice-cup`" class="dice-icon" />
      <span v-if="false">{{ $t("roll") }}</span>
    </button>
    <slot :diceValue="diceValue">
      <!-- contents of TemplateSelect, passing result of roller as prop -->
    </slot>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.button-icon {
  padding: 1px;
  display: inline-flex;
  justify-content: baseline;
  margin: 0 2px;
}

.dice-icon {
  height: 30px;
  width: 30px;
}

.heading {
  font-size: 30px;
}
</style>
