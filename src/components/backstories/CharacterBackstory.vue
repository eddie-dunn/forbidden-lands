<script lang="ts">
import Vue from "vue"
import { Component, Watch } from "vue-property-decorator"
import { Skill } from "@/types.ts"

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
    return {
      kinId: this.selectedKin.id,
      professionId: this.selectedProfession.id,
      talentId: this.selectedTalent.id,
      childhoodIndex: String(this.childhoodNum - 1),
      formativeEventIndex: String(this.formativeNum - 1),
    }
  }

  backClicked() {
    this.$router.go(-1)
  }

  nextClicked() {
    this.$router.push({
      name: "character_creator-template-edit",
      query: this.characterTemplateData(),
    })
  }
}
</script>

<template>
  <div class="character-template">
    <div class="templates-grid">
      <div>
        <button class="button button-green" @click="rollAll">
          Randomize all
        </button>
      </div>
      <KinTemplate v-model="selectedKin" />

      <!-- Childhood  -->
      <ChildhoodTemplate
        v-model="childhoodNum"
        :selectedKinId="selectedKin.id"
      />

      <div class="grid-2-col">
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
      </div>

      <!-- formative event -->
      <FormativeEventTemplate
        v-model="formativeNum"
        :selectedProfessionId="selectedProfession.id"
      />
    </div>

    <div v-if="false">
      <!-- TODO: Add summary -->
      <pre style="overflow: scroll">
        {{ JSON.stringify(characterTemplateData(), null, 2) }}
      </pre>
    </div>

    <div class="action-bar-wrapper">
      <div class="action-bar-left">
        <button
          class="item-action-bar button button-white"
          @click="backClicked"
        >
          {{ $t("Back") }}
        </button>
      </div>
      <div class="action-bar-middle"></div>

      <div class="action-bar-right">
        <button
          :class="['button', 'button-shadow', 'item-action-bar']"
          @click="nextClicked"
        >
          {{ $t("Next") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "~Style/colors.less";

.action-bar-wrapper {
  display: flex;
  overflow: auto;
  // width: 100%;
  position: sticky;
  bottom: 0;
  overflow: hidden;
  margin: 0 0.25rem;
  background: #fffe;
  border: solid ~"@{pastel-green}99" 2px;
  padding: 0.5rem;
  justify-content: space-around;
}

.action-bar {
  &-right {
    justify-self: flex-end;
    display: flex;
    flex: 1 1 33%;
    justify-content: flex-end;
  }
  &-left {
    justify-self: flex-start;
  }
  align-items: center;
}

.character-template {
  text-align: left;
  margin: 0.3rem;
}

.templates-grid {
  display: grid;
  grid-gap: 1rem;
}

.grid-2-col {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  &-item {
    flex-grow: 1;
  }
}
</style>
