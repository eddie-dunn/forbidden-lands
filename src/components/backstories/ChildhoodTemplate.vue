<template>
  <!-- Childhood  -->
  <TemplateSelect :title="title" :diceValue="value" @randomClicked="emitRandom">
    <div class="capitalize-first">
      {{ $t("childhood") }}, {{ $t(selectedKinId) }}
    </div>
    <div
      v-for="(childhoodData, index) in characterTemplate.CHILDHOOD[
        selectedKinId
      ]"
      v-bind:key="selectedKinId + index"
      class="template-grid"
    >
      <input
        type="radio"
        class="template-grid-radio"
        :id="'childhood-' + selectedKinId + '-' + index"
        :value="index + 1"
        :checked="index + 1 === value"
        @change="emit(index + 1)"
      />
      <label
        class="small-caps bold template-grid-title"
        :for="'childhood-' + selectedKinId + '-' + index"
      >
        <span class="bold text-center">{{ index + 1 }}</span>
        {{ childhoodData.name }}
      </label>

      <div class="template-grid-story">
        {{ childhoodData.story }}
      </div>

      <div class="template-grid-attributes-title small-caps">
        {{ $t("attributes") }}
      </div>
      <div class="template-grid-attributes">
        <div class="capitalize">
          {{ $t("strength") }}: {{ childhoodData.attributes.strength }}
        </div>
        <div class="capitalize">
          {{ $t("agility") }}: {{ childhoodData.attributes.agility }}
        </div>
        <div class="capitalize">
          {{ $t("wits") }}: {{ childhoodData.attributes.wits }}
        </div>
        <div class="capitalize">
          {{ $t("empathy") }}: {{ childhoodData.attributes.empathy }}
        </div>
      </div>

      <div class="template-grid-skills-title small-caps">
        {{ $t("skills") }}
      </div>
      <div class="template-grid-skills">
        <div
          v-for="(value, skill) in childhoodData.skills"
          v-bind:key="value + skill"
        >
          <span class="capitalize"> {{ $t(skill) }}: {{ value }} </span>
        </div>
      </div>

      <!-- spacer -->
    </div>
  </TemplateSelect>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import TemplateSelect from "@/components/backstories/TemplateSelect.vue"
import characterTemplate from "@/data/character_template/character_template"
import { rollDice } from "@/dice"

@Component({
  components: {
    TemplateSelect,
  },
})
export default class CharacterTemplateChildhood extends Vue {
  characterTemplate = characterTemplate

  @Prop({ required: true }) selectedKinId!: string
  @Prop({ required: true }) value!: number

  get title() {
    return characterTemplate.CHILDHOOD[this.selectedKinId][this.value - 1].name
  }

  emitRandom() {
    this.$emit("input", rollDice(6))
  }

  emit(num: number) {
    this.$emit("input", num)
  }
}
</script>

<style scoped lang="less">
.template-grid {
  display: grid;
  @media (min-width: 600px) {
    grid-template-columns: min-content 2fr 1fr 1fr;
    grid-template-areas:
      "radio title attributes-title skills-title"
      ". story attributes skills";
  }
  grid-template-rows: auto;
  grid-template-areas:
    "radio title title"
    ". story story"
    ". skills-title attributes-title"
    ". skills attributes";
  grid-gap: 0.5rem;
  margin-top: 1rem;

  &-title {
    grid-area: title;
  }
  &-story {
    grid-area: story;
  }
  &-radio {
    grid-area: radio;
  }
  &-skills {
    grid-area: skills;
    &-title {
      grid-area: skills-title;
    }
  }
  &-attributes {
    grid-area: attributes;
    &-title {
      grid-area: attributes-title;
    }
  }
}
</style>
