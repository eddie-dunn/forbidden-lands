<template>
  <!-- Childhood  -->
  <TemplateSelect
    :title="'Childhood, ' + $t(selectedKinId)"
    :diceValue="childhoodValue"
    @randomClicked="$emit('randomClicked')"
  >
    <div
      v-for="(childhoodData, index) in characterTemplate.CHILDHOOD[
        selectedKinId
      ]"
      class="template-grid"
    >
      <div class="bold text-center">{{ index + 1 }}</div>

      <label
        class="small-caps bold template-grid-title"
        :for="'childhood-' + selectedKinId + '-' + index"
      >
        {{ childhoodData.name }}
      </label>

      <div>
        <input
          type="radio"
          :id="'childhood-' + selectedKinId + '-' + index"
          :value="index + 1"
          v-model="childhoodValue"
        />
      </div>

      <div>
        <span>{{ childhoodData.story }}</span>
      </div>

      <div>
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

      <div>
        <div v-for="(value, skill) in childhoodData.skills">
          <span class="capitalize">
            {{ $t(skill.replace(/_/gi, " ")) }}: {{ value }}
          </span>
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

  @Prop({ required: true }) selectedKinId!: string
  @Prop({ required: true }) value!: number

  childhoodValue = this.value

  @Watch("value")
  onPropValueChanged() {
    this.childhoodValue = this.value
  }

  @Watch("childhoodValue")
  onChildhoodValueChanged() {
    this.$emit("input", this.childhoodValue)
  }
}
</script>

<style scoped lang="less">
.template-grid {
  display: grid;
  grid-template-columns: min-content 2fr 1fr 1fr;
  grid-gap: 1rem;
  margin: 1rem;
  &-title {
    grid-column-start: 2;
    grid-column-end: -1;
  }
}

.bold {
  font-weight: bold;
}

.template-childhood {
  text-align: left;
}
</style>
