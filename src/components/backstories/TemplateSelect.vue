<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import SvgIcon from "@/components/SvgIcon.vue"
import Card from "@/components/Card.vue"

@Component({
  components: {
    Card,
    SvgIcon,
  },
})
export default class TemplateSelect extends Vue {
  @Prop({ default: "" }) title!: string
  @Prop({ default: "" }) description!: string
  @Prop({}) diceValue!: number
  @Prop({}) numeralValue!: number

  rollClicked() {
    this.$emit("randomClicked")
  }

  get diceResults() {
    return this.diceValue.toString()
  }
}
</script>

<template>
  <!-- <div class="card"> -->
  <Card :noSign="true" :defaultOpen="false">
    <template v-slot:header>
      <div v-if="description" class="description">{{ description }}</div>
      <div class="heading capitalize">
        {{ title }}
      </div>
    </template>
    <template v-slot:icon-right>
      <button
        v-if="diceValue"
        class="button button-white button-ghost button-icon"
        @click.stop="rollClicked"
      >
        <SvgIcon
          v-if="diceResults[0] <= 6"
          :name="`d6-${diceResults[0]}-inverted`"
          class="dice-icon dice-black"
        />
        <SvgIcon
          v-else
          :name="`swords-${diceResults[0]}`"
          class="dice-icon dice-black"
        />
        <SvgIcon
          v-if="diceResults[1]"
          :name="`d6-${diceResults[1]}`"
          class="dice-icon dice-red"
        />
      </button>
      <button
        v-else-if="numeralValue || numeralValue === 0"
        @click.stop="rollClicked"
        class="button button-white button-ghost button-numeral"
      >
        {{ numeralValue }}
      </button>
    </template>
    <button v-if="false" class="button-icon" @click="rollClicked">
      <SvgIcon :name="`rolling-dice-cup`" class="dice-icon" />
      <span v-if="false">{{ $t("roll") }}</span>
    </button>
    <slot :diceValue="diceValue">
      <!-- contents of TemplateSelect, passing result of roller as prop -->
    </slot>
  </Card>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
.button-icon {
  padding: 5px;
  display: inline-flex;
  justify-content: baseline;
  margin: 0 2px;
}

.button-numeral {
  font-size: 20px;
  padding: 0.5rem 1rem;
}

.description {
  font-size: 0.7rem;
  color: gray;
  &::first-letter {
    text-transform: capitalize;
  }
}

.dice-icon {
  height: 30px;
  width: 30px;
}

.heading {
  font-size: 20px;
  line-height: 1;
}
</style>
