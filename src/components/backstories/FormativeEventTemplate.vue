<template>
  <TemplateSelect
    :title="eventName"
    :description="description"
    :diceValue="value"
    @randomClicked="emitRandom"
  >
    <div
      v-for="(formativeData, index) in characterTemplate.FORMATIVE_EVENTS[
        selectedProfessionId
      ]"
      v-bind:key="selectedProfessionId + index"
      class="template-grid"
    >
      <input
        type="radio"
        class="template-grid-radio"
        :id="'event-' + selectedProfessionId + '-' + index"
        :value="index + 1"
        :checked="index + 1 === value"
        @change="emit(index + 1)"
      />

      <label
        class="small-caps bold template-grid-title"
        :for="'event-' + selectedProfessionId + '-' + index"
      >
        <span class="bold text-center">{{ index + 1 }}</span>
        {{ formativeData.name }}
      </label>

      <div class="template-grid-story">
        <div>{{ formativeData.story }}</div>
        <div class="with-margin">✣ {{ formativeData.items }}</div>
      </div>

      <div class="template-grid-skills-title small-caps">
        {{ $t("skills") }}
      </div>
      <div class="template-grid-skills">
        <div
          v-for="(value, skill) in formativeData.skills"
          v-bind:key="value + skill"
        >
          <span class="capitalize"> {{ $t(skill) }}: {{ value }} </span>
        </div>
      </div>

      <div class="template-grid-talent-title small-caps">
        {{ $t("Talent") }}
      </div>
      <div class="template-grid-talent capitalize">
        {{ $t(formativeData.talent) }}
      </div>

      <!-- spacer -->
    </div>
  </TemplateSelect>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import TemplateSelect from "@/components/backstories/TemplateSelect.vue"
import characterTemplate, {
  KIN_66,
  PROFESSION_66,
  TemplateItem,
} from "@/data/character_template/character_template"
import { rollDice } from "@/dice"

@Component({
  components: {
    TemplateSelect,
  },
})
export default class CharacterTemplateChildhood extends Vue {
  characterTemplate = characterTemplate
  rollDice = rollDice

  @Prop({ required: true }) selectedProfessionId!: string
  @Prop({ required: true }) value!: number

  get eventName() {
    return characterTemplate.FORMATIVE_EVENTS[this.selectedProfessionId][
      (this.value || 1) - 1
    ].name
  }

  get description() {
    return (
      this.$t("formative event") + ", " + this.$t(this.selectedProfessionId)
    )
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
  @media (min-width: 500px) {
    grid-template-columns: min-content minmax(20ch, 2fr) 1fr 1fr;
    grid-template-areas:
      "radio title skills-title talent-title"
      ". story skills talent";
  }
  grid-template-rows: auto;
  grid-template-areas:
    "radio title title"
    ". story story"
    ". skills-title talent-title"
    ". skills talent";
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
  &-talent {
    grid-area: talent;
    &-title {
      grid-area: talent-title;
    }
  }
}

.bold {
  font-weight: bold;
}

.template-profession {
  text-align: left;
}

.with-margin {
  margin: 0.7rem 0 0 0;
}
</style>
