<template>
  <div class="character-template">
    <h1>Backstories</h1>
    <div>
      <button @click="rollAll">Random</button>
    </div>
    <div>
      <pre>{{ JSON.stringify(characterTemplateData(), null, 2) }}</pre>
    </div>

    <!-- Kin  -->
    <TemplateSelect
      :title="$t('Kin')"
      :diceValue="selectedKin.diceRoll"
      @randomClicked="selectedKin = rollKin()"
    >
      <div
        v-for="(kin, index) in characterTemplate.KIN_66"
        @click="setKinWithValue(kin.d_min)"
      >
        <input
          :id="'template-' + kin.id"
          type="radio"
          :checked="kin.id === selectedKin.id"
          @change="setKinWithValue(kin.d_min)"
          :value="kin.id"
        />
        <span>
          {{ kin.d_min }}-{{ kin.d_max }}
          <label :for="'template-' + kin.id">{{ $t(kin.id) }}</label>
        </span>
      </div>
    </TemplateSelect>

    <!-- Childhood  -->
    <ChildhoodTemplate
      :selectedKinId="selectedKin.id"
      v-model="childhoodNum"
      @randomClicked="childhoodNum = rollDice(6)"
    />

    <!-- Childhood OLD, TODO: Remove this -->
    <TemplateSelect
      v-if="false"
      :title="'Childhood, ' + $t(selectedKin.id)"
      :diceValue="childhoodDie"
      @randomClicked="childhoodDie = rollDice(6)"
    >
      <div
        v-for="(childhoodData, index) in characterTemplate.CHILDHOOD[
          selectedKin.id
        ]"
        class="template-grid"
      >
        <div class="bold text-center">{{ index + 1 }}</div>
        <label
          class="small-caps bold template-grid-title"
          :for="'childhood-' + selectedKin.id + '-' + index"
        >
          {{ childhoodData.name }}
        </label>
        <div>
          <input
            :id="'childhood-' + selectedKin.id + '-' + index"
            type="radio"
            v-model="childhoodDie"
            :value="index + 1"
          />
        </div>
        <div>
          <span>{{ childhoodData.story }}</span>
        </div>
        <div v-if="childhoodData.attributes">
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
        <div v-if="childhoodData.skills">
          <div v-for="(value, skill) in childhoodData.skills">
            <span class="capitalize">
              {{ $t(skill.replace(/_/gi, " ")) }}: {{ value }}
            </span>
          </div>
        </div>
      </div>
    </TemplateSelect>

    <!-- profession  -->
    <TemplateSelect
      :title="$t('Profession')"
      :diceType="66"
      :diceValue="professionDie"
      @randomClicked="selectedProfession = rollProfession()"
    >
      <div>Selected {{ selectedProfession.id }}</div>
      <div v-for="prof in characterTemplate.PROFESSION_66">
        <div :class="prof.id === selectedProfession.id ? 'bold' : ''">
          <input
            :id="'template-' + prof.id"
            type="radio"
            v-model="selectedProfession.id"
            :value="prof.id"
          />
          <span>{{ prof.d_min }}-{{ prof.d_max }} {{ $t(prof.id) }}</span>
        </div>
      </div>
    </TemplateSelect>

    <!-- profession talent -->
    <TemplateSelect
      :title="$t('Profession') + ' ' + $t('Talent')"
      :diceValue="professionTalentNum"
      @randomClicked="professionTalentNum = rollDice(talentDice)"
    >
      talentDice = {{ talentDice }} professionTalent = {{ professionTalent }}
    </TemplateSelect>

    <!-- formative event -->
    <TemplateSelect
      :title="'Formative Event: ' + $t(selectedProfession.id)"
      :diceType="6"
      :diceValue="formativeNum"
      @randomClicked="formativeNum = rollDice(6)"
    >
      <div>Profession {{ selectedProfession.id }}</div>
      <div>Selected Profession {{ selectedProfession.id }}</div>
      <div>dice result = {{ formativeNum }}</div>
      <div
        v-for="(formativeData, index) in characterTemplate.FORMATIVE_EVENTS[
          selectedProfession.id
        ]"
        class="template-grid"
      >
        <div class="bold text-center">{{ index + 1 }}</div>
        <label
          class="small-caps bold template-grid-title"
          :for="'childhood-' + selectedProfession.id + '-' + index"
        >
          {{ formativeData.name }}
        </label>
        <div>
          <input
            :id="'childhood-' + selectedProfession.id + '-' + index"
            type="radio"
            v-model="formativeNum"
            :value="index + 1"
          />
        </div>
        <div>
          <span>{{ formativeData.story }}</span>
        </div>

        <div>
          <div v-for="(value, skill) in formativeData.skills">
            <span class="capitalize">
              {{ $t(skill.replace(/_/gi, " ")) }}: {{ value }}
            </span>
          </div>
        </div>

        <div>
          {{ formativeData.talent }}
        </div>
      </div>
    </TemplateSelect>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { DiceSides, Profession } from "@/types.ts"
import TemplateSelect from "@/components/backstories/TemplateSelect.vue"
import ChildhoodTemplate from "@/components/backstories/ChildhoodTemplate.vue"
import characterTemplate, {
  KIN_66,
  PROFESSION_66,
  TemplateItem,
} from "@/data/character_template/character_template"
import { rollDice } from "@/dice"

function diceRollToValue(
  diceRoll: number,
  valueList: TemplateItem[]
): TemplateItem | null {
  return (
    valueList.find(
      (item) => diceRoll >= item.d_min && diceRoll <= item.d_max
    ) || null
  )
}

function roll66(diceRoll: number | undefined, valueList: TemplateItem[]) {
  diceRoll = diceRoll || rollDice(66)
  const result = diceRollToValue(diceRoll, valueList)
  return {
    diceRoll,
    result,
    id: result ? result.id : "elf",
  }
}

function rollProfession(diceRoll?: number) {
  return roll66(diceRoll, characterTemplate.PROFESSION_66)
}

function rollKin(diceRoll?: number) {
  return roll66(diceRoll, characterTemplate.KIN_66)
}

@Component({
  components: {
    TemplateSelect,
    ChildhoodTemplate,
  },
})
export default class CharacterTemplateView extends Vue {
  rollProfession = rollProfession
  rollKin = rollKin

  characterTemplate = characterTemplate
  rollDice = rollDice

  // TODO: Roll on page load
  childhoodDie = rollDice(6)
  childhoodNum = rollDice(6)
  professionTalentNum = rollDice(6)
  formativeNum = rollDice(6)

  professionDie = 24

  selectedKin = rollKin()
  selectedProfession = rollProfession()

  rollAll() {
    this.selectedKin = rollKin()
    this.selectedProfession = rollProfession()
    this.childhoodDie = rollDice(6)
    this.professionDie = rollDice(66)
    this.professionTalentNum = rollDice(6)
    this.formativeNum = rollDice(6)
  }

  setProfessionWithValue(diceVal: number) {
    // Profession is set by 'rolling' with a fixed value
    this.selectedProfession = rollProfession(diceVal)
  }
  setKinWithValue(diceVal: number) {
    // Kin is set by 'rolling' with a fixed value
    this.selectedKin = rollKin(diceVal)
  }

  get talentDice() {
    if (this.selectedProfession.id === "sorcerer") return 8
    return 6
  }

  get professionTalent() {
    const talent =
      characterTemplate.PROFESSION_TALENTS[
        this.selectedProfession.id as Profession
      ][Math.round(this.professionTalentNum / 2) - 1]
    return talent
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
      professionTalent: this.professionTalent,
      childhood: selectedChildhood,
      formativeEvent: selectedFormativeEvent,
    }
  }
}
</script>

<style scoped lang="less">
.character-template {
  text-align: left;
}

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
