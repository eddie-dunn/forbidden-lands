<script lang="ts">
/* eslint-disable no-console */
import { AGE, CLASS, KIN } from "@/keys.ts"
import {
  GENERAL_TALENTS2,
  GENERAL_TALENTS,
  getClassTalents,
  getKinTalent,
  KIN_TALENTS2,
  transformToTranslationKey,
  Talent,
  getTalentsForProfession,
  getTalentObjects,
} from "@/talents.ts"
import { getStartingTalents } from "@/age.ts"
import {
  KinName,
  TalentKin,
  Profession,
  TalentProfession,
  TalentAll,
} from "@/types"
import { CharacterData } from "@/characterData"
import Vue from "vue"
import { TranslateResult } from "vue-i18n"

const TalentSelector = Vue.extend({
  props: {
    charData: {
      type: Object as () => CharacterData,
      required: true,
    },
  },
  data() {
    return {
      GENERAL_TALENTS2,
      selectedTalents: this.charData.talents.map((talent) => talent.id),
      talentRanks: {
        classRank: {
          value: 1,
          disabled: false,
        },
        talent1: {
          value: 1,
          disabled: false,
        },
        talent2: {
          value: 1,
          disabled: false,
        },
        talent3: {
          value: 1,
          disabled: false,
        },
      },
    }
  },
  created() {
    this.selectedTalents[0] = this.kinTalent
  },
  // mounted(): {
  //   this.selectedTalents[0] = this.kinTalent
  // },
  computed: {
    classTalents(): TalentProfession[] {
      return getTalentsForProfession(this.charData.class)
    },
    kinTalent(): TalentKin {
      if (!this.charData.kin) return "Adaptive"
      return KIN_TALENTS2[this.charData.kin]
    },
    baseStartingTalents(): number {
      return getStartingTalents(this.charData.age, this.charData.kin)
    },
    generalTalentsAllowed(): number {
      return this.baseStartingTalents - this.talentRanksSum
    },
    talentRanksSum(): number {
      const sum = Object.values(this.talentRanks)
        .slice(0, this.baseStartingTalents)
        .map((
          talent: any // any for now
        ) => Number(talent.value))
        // .reduce((prevSum, value) => prevSum + value)
        .filter((value) => value === 2)
      console.log(sum, "sum")
      return sum.length
    },
  },
  methods: {
    validated(): boolean {
      const talentsRequired = this.generalTalentsAllowed + 1
      console.log("selected", this.selectedTalents)
      const talentsSelected = this.selectedTalents.filter((item) => !!item)
        .length
      console.log("filter selected", talentsSelected)
      return talentsRequired === talentsSelected
    },
    tName(name: string): TranslateResult {
      return this.$t(transformToTranslationKey(name))
    },
    talentUpdateHandler() {
      // Remap component-local selected talents to a character-talent, and
      // emit update of map
      console.log(this.talentRanksSum)
      const talentList: TalentAll[] = [
        ...this.selectedTalents.slice(0, 2 + this.generalTalentsAllowed),
      ]
      const exportedTalents = getTalentObjects(talentList)
      console.log("talents emitted", exportedTalents)
      this.$emit("talents-updated", exportedTalents)
      const valid = this.validated() ? "✓" : "✖"
      this.$parent.$emit("card-sign", valid)
    },
  },
  watch: {
    selectedTalents: {
      immediate: true,
      // deep: true,
      handler() {
        this.talentUpdateHandler()
      },
    },
    talentRanks: {
      deep: true,
      handler(oldData, newData) {
        this.talentUpdateHandler()
        // console.log("talent rank change", oldData, newData)
        // console.log("talentRanks.classTalent", this.talentRanks.classRank)
        // console.log("talentRanks.general1", this.talentRanks["talent1"])
        // console.log("talentRanks.general2", this.talentRanks["talent2"])
        // console.log("talentRanks.general3", this.talentRanks["talent3"])
      },
    },
  },
})

export default TalentSelector
</script>

<template>
  <div class="talent-contents">
    Extra talents: {{ baseStartingTalents }} Allowed number of general talents:
    {{ generalTalentsAllowed }}
    <div class="talent-item">
      <label for="kin-talent">{{ $t("Kin talent") }}</label>
      <select id="kin-talent" disabled>
        <option v-bind:value="selectedTalents[0]">{{
          tName(kinTalent)
        }}</option>
      </select>
      <span class="toggle hidden">
        <input type="radio" name="kinTalentRank" checked="checked" disabled />
        <label for="sizeWeight">1</label>
        <input type="radio" name="kinTalentRank" disabled />
        <label for="sizeDimensions">2</label>
      </span>
    </div>
    <div class="talent-item">
      <label for="class-talent">{{ $t("Class talent") }}</label>
      <select id="class-talent" v-model="selectedTalents[1]" required>
        <option
          v-for="talent in classTalents"
          :key="talent"
          v-bind:value="talent"
        >
          {{ tName(talent) }}
        </option>
      </select>
      <span class="toggle">
        <input
          type="radio"
          name="classTalentRank"
          v-model.number="talentRanks['classRank'].value"
          value="1"
          checked="checked"
          :disabled="talentRanks.classRank.disabled"
        />
        <label for="sizeWeight">1</label>
        <input
          type="radio"
          name="classTalentRank"
          v-model.number="talentRanks['classRank'].value"
          value="2"
          :disabled="talentRanks.classRank.disabled"
        />
        <label for="sizeDimensions">2</label>
      </span>
    </div>
    <div
      v-for="index in generalTalentsAllowed"
      :key="index"
      class="talent-item"
    >
      <label for="general-talent">{{ $t("General talent") }} {{ index }}</label>
      <select id="general-talent" v-model="selectedTalents[index + 1]" required>
        <optgroup :label="$t('General talents')">
          <option
            v-for="talent in GENERAL_TALENTS2"
            :key="talent"
            v-bind:value="talent"
          >
            {{ tName(talent) }}
          </option>
        </optgroup>
      </select>
      <span class="toggle">
        <input
          type="radio"
          :name="'talent' + index"
          v-model.number="talentRanks['talent' + index].value"
          value="1"
          checked="checked"
        />
        <label for="'talent' + index">1</label>
        <input
          type="radio"
          :name="'talent' + index"
          v-model.number="talentRanks['talent' + index].value"
          value="2"
          :disabled="index >= generalTalentsAllowed"
        />
        <label for="'talent + index'">2</label>
        <!-- TODO: Add input for lvl 3 as well when supporting live Character Sheet -->
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.talent-item {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0.25rem;
  * > {
    flex-basis: 50%;
  }
}

.talent-rank {
  max-width: 3rem;
}

.hidden {
  visibility: hidden;
}
</style>
