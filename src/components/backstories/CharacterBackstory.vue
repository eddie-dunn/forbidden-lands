<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"

import characterTemplate from "@/data/character_template/character_template"
import { rollDice } from "@/dice"

import {
  rollProfession,
  rollKin,
  rollTalent,
} from "@/components/backstories/characterTemplate.ts"

import ChildhoodTemplate from "@/components/backstories/ChildhoodTemplate.vue"
import FormativeEventTemplate from "@/components/backstories/FormativeEventTemplate.vue"
import KinTemplate from "@/components/backstories/KinTemplate.vue"
import ProfessionTemplate from "@/components/backstories/ProfessionTemplate.vue"
import TalentTemplate from "@/components/backstories/TalentTemplate.vue"
import TemplateSelect from "@/components/backstories/TemplateSelect.vue"

@Component({
  components: {
    ChildhoodTemplate,
    FormativeEventTemplate,
    KinTemplate,
    ProfessionTemplate,
    TalentTemplate,
    TemplateSelect,
  },
})
export default class CharacterTemplateView extends Vue {
  // Init values
  selectedKin = rollKin()
  childhoodNum = rollDice(6)
  selectedProfession = rollProfession()
  selectedTalent = rollTalent(this.selectedProfession.id)
  formativeNum = rollDice(6)

  rollAll() {
    this.selectedKin = rollKin()
    this.childhoodNum = rollDice(6)
    this.selectedProfession = rollProfession()
    this.selectedTalent = rollTalent(this.selectedProfession.id)
    this.formativeNum = rollDice(6)
  }

  characterTemplateData() {
    const selectedChildhood =
      characterTemplate.CHILDHOOD[this.selectedKin.id][this.childhoodNum - 1]
    const selectedFormativeEvent =
      characterTemplate.FORMATIVE_EVENTS[this.selectedProfession.id][
        this.formativeNum - 1
      ]

    return {
      kinId: this.selectedKin.id,
      professionId: this.selectedProfession.id,
      talentId: this.selectedTalent.id,
      childhood: selectedChildhood,
      formativeEvent: selectedFormativeEvent,
    }
  }
}
</script>

<template>
  <div class="character-template">
    <div>
      <button @click="rollAll">Random</button>
    </div>

    <div class="templates-grid">
      <KinTemplate v-model="selectedKin" />

      <!-- Childhood  -->
      <ChildhoodTemplate
        v-model="childhoodNum"
        :selectedKinId="selectedKin.id"
      />

      <div class="grid-2-col">
        <!-- profession  -->
        <ProfessionTemplate v-model="selectedProfession" />

        <!-- profession talent -->
        <TalentTemplate
          v-model="selectedTalent"
          :professionId="selectedProfession.id"
        />
      </div>

      <!-- formative event -->
      <FormativeEventTemplate
        v-model="formativeNum"
        :selectedProfessionId="selectedProfession.id"
      />
    </div>

    <div v-if="false">
      <pre style="overflow: scroll">
        {{ JSON.stringify(characterTemplateData(), null, 2) }}
      </pre>
    </div>
  </div>
</template>

<style scoped lang="less">
.character-template {
  text-align: left;
}

.templates-grid {
  display: grid;
  grid-gap: 1rem;
  margin: 0.8rem;
}

.grid-2-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
