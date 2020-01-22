<script lang="ts">
import Vue from "vue"
import { Component, Watch } from "vue-property-decorator"
import { Skill, Age } from "@/types.ts"

import characterTemplate from "@/data/character_template/character_template"
import { rollDice } from "@/dice"

import {
  rollProfession,
  rollKin,
  rollTalent,
  rollAge,
} from "@/components/backstories/characterTemplate.ts"
import { getAgeType, getStartingTalentsFromType } from "@/age.ts"
import { CharDataQueryObj, kinTransform } from "@/util/characterUtil.ts"

import ChildhoodTemplate from "@/components/backstories/ChildhoodTemplate.vue"
import FormativeEventTemplate from "@/components/backstories/FormativeEventTemplate.vue"
import KinTemplate from "@/components/backstories/KinTemplate.vue"
import AgeTemplate from "@/components/backstories/AgeTemplate.vue"
import ProfessionTemplate from "@/components/backstories/ProfessionTemplate.vue"
import TalentTemplate from "@/components/backstories/TalentTemplate.vue"
import TemplateSelect from "@/components/backstories/TemplateSelect.vue"
import ActionBar from "@/components/base/ActionBar.vue"
import FLButton from "@/components/base/FLButton.vue"

type SkillObj = { [S in Skill]?: number }
function mergeSkills(skills1: SkillObj, skills2: SkillObj) {
  const mergedSkills = { ...skills1 }
  const skills2Entries = Object.entries(skills2) as [Skill, number][]
  skills2Entries.map((skill) => {
    const name = skill[0]
    const value = skill[1]
    if (mergedSkills[name]) {
      ;(mergedSkills[name] as number) += value
    } else {
      mergedSkills[name] = value
    }
  })
  return mergedSkills
}

@Component({
  components: {
    ActionBar,
    AgeTemplate,
    ChildhoodTemplate,
    FLButton,
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
  age = rollAge(kinTransform(this.selectedKin.id))
  formativeEvents = this.getFormativeEvents()

  rollAll() {
    this.selectedKin = rollKin()
    this.age = rollAge(kinTransform(this.selectedKin.id))
    this.childhoodNum = rollDice(6)
    this.selectedProfession = rollProfession()
    this.selectedTalent = rollTalent(this.selectedProfession.id)
    this.formativeEvents = this.getFormativeEvents()
  }

  getFormativeEvents() {
    // TODO: Rewrite, avoid multiple loops
    let formativeEvents = Array.from(Array(this.formativeEventNumber)).map(
      (element) => {
        return rollDice(6)
      }
    )
    for (let i = 0; i < this.formativeEventNumber; i++) {
      let diceVal = formativeEvents[i]
      while (formativeEvents.includes(diceVal)) {
        diceVal = rollDice(6)
      }
      formativeEvents[i] = diceVal
    }
    return formativeEvents
  }

  get ageType(): Age {
    const kinId = kinTransform(this.selectedKin.id)
    return getAgeType(this.age, kinId)
  }

  get kin() {
    return kinTransform(this.selectedKin.id)
  }

  get formativeEventNumber() {
    return getStartingTalentsFromType(this.ageType)
  }

  @Watch("ageType", { immediate: true })
  updateFormativeEvent() {
    this.formativeEvents = this.getFormativeEvents()
  }

  get characterTemplateData(): CharDataQueryObj {
    const roll = {
      kinId: this.selectedKin.id,
      professionId: this.selectedProfession.id,
      talentId: this.selectedTalent.id,
      childhoodIndex: String(this.childhoodNum - 1),
      formativeEvents: String(this.formativeEvents),
      age: String(this.age),
    }
    return roll
  }

  backClicked() {
    this.$router.go(-1)
  }

  nextClicked() {
    const query = this.characterTemplateData
    this.$router.push({ name: "character_creator-template-edit", query })
  }
}
</script>

<template>
  <div class="character-template">
    <div class="templates-grid">
      <div class="right-align">
        <button class="button button-green" @click="rollAll">
          Randomize all
        </button>
      </div>
      <KinTemplate v-model="selectedKin" />

      <AgeTemplate v-model.number="age" :kin="selectedKin.id" />

      <!-- Childhood  -->
      <ChildhoodTemplate
        v-model="childhoodNum"
        :selectedKinId="selectedKin.id"
      />

      <!-- profession  -->
      <ProfessionTemplate
        class="grid-2-col-item"
        v-model="selectedProfession"
      />

      <!-- profession talent -->
      <TalentTemplate
        class="grid-2-col-item"
        v-model="selectedTalent"
        :professionId="selectedProfession.id"
      />

      <!-- formative event -->
      <FormativeEventTemplate
        v-for="index in formativeEventNumber"
        v-bind:key="index"
        v-model="formativeEvents[index - 1]"
        :selectedProfessionId="selectedProfession.id"
      />
    </div>

    <div v-if="false">
      <!-- TODO: Add summary -->
      <pre style="overflow: scroll">
        {{ JSON.stringify(characterTemplateData, null, 2) }}
      </pre>
    </div>

    <ActionBar>
      <template v-slot:left>
        <FLButton @click="backClicked" type="cancel">
          {{ $t("Back") }}
        </FLButton>
      </template>
      <template v-slot:right>
        <FLButton @click="nextClicked" :disabled="age < 1">
          {{ $t("Next") }}
        </FLButton>
      </template>
    </ActionBar>

    <!-- spacer -->
  </div>
</template>

<style scoped lang="less">
@import "~Style/colors.less";

.character-template {
  margin: 0.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.templates-grid {
  flex: 1 auto;
}

.grid-2-col {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  &-item {
    flex-grow: 1;
  }
}

.right-align {
  text-align: right;
  margin: 1rem 0;
}
</style>
