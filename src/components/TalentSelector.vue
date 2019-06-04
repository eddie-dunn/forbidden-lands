<script lang="ts">
import { AGE, CLASS, KIN } from "@/keys.ts"
import {
  GENERAL_TALENTS2,
  getClassTalents,
  KIN_TALENTS2,
  transformToTranslationKey,
  Talent,
  getTalentsForProfession,
} from "@/talents.ts"
import { getStartingTalents } from "@/age.ts"
import {
  Age,
  KinName,
  TalentKin,
  Profession,
  TalentProfession,
  TalentAll,
} from "@/types"
import {
  CharacterData,
  CharacterTalent,
  CharacterMetaDataStatus,
} from "@/characterData"
import Vue from "vue"
import { TranslateResult } from "vue-i18n"
// import TalentSelect from "@/components/TalentSelect.vue"

function talentsSortedByTranslation(
  vm: any, // Vue instance with $t function
  talentIds: string[],
  idsToExclude: string[] = []
) {
  const translationList = talentIds
    .filter((id) => !idsToExclude.includes(id))
    .map((id) => {
      const translation: TranslateResult = vm.$t(id)
      return { translation, id }
    })

  const sortedTalents = translationList.sort((item1, item2) => {
    return item1.translation < item2.translation ? -1 : 1
  })
  return sortedTalents
}

// TODO: The method to map a talent to a translation key is overly complicated
// and should be fixed; a general talent object should be created which contains
// the translation keys for each talent, and that should be used instead from
// which a sorted list can be extracted

// Step one should be to break out the talent-selects to separate components,
// which can individually deal with sorting by translation

export function getTalentObjects(
  talentList: TalentAll[],
  talentRanks: (number | undefined)[]
): CharacterTalent[] {
  const talentObj = talentList.map((talentName: TalentAll, index) => {
    return {
      id: talentName,
      rank: talentRanks[index],
    }
  })
  return talentObj
}

const TalentSelector = Vue.extend({
  components: {
    // TalentSelect,
  },
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
      talentRanks: this.charData.talents.map((talent) => talent.rank),
      additionalTalents: 0,
    }
  },
  computed: {
    ageType(): number | null {
      return this.charData.age
    },
    classTalents(): TalentProfession[] {
      return getTalentsForProfession(this.charData.profession)
    },
    kinTalent(): TalentKin {
      if (!this.charData.kin) return "Adaptive"
      return KIN_TALENTS2[this.charData.kin]
    },
    baseStartingTalents(): number {
      return getStartingTalents(this.ageType, this.charData.kin)
    },
    generalTalentsAllowed(): number {
      return (
        this.baseStartingTalents - this.talentRanksSum + this.additionalTalents
      )
    },
    totalTalentsAllowed(): number {
      return 2 + this.generalTalentsAllowed
    },
    talentIncreased(): boolean {
      return this.talentRanks.filter((rank) => (rank || 0) > 1).length > 0
    },
    talentRanksSum(): number {
      return this.talentIncreased ? 1 : 0 // this works for now
    },
    exportedTalents(): TalentAll[] {
      return this.selectedTalents.slice(0, 2 + this.generalTalentsAllowed)
    },
    exported(): CharacterTalent[] {
      // this.selectedTalents[0] = this.kinTalent
      const talentsSelected = [
        this.kinTalent,
        ...this.selectedTalents.slice(1, this.totalTalentsAllowed),
      ]
      const ranksSelected = this.talentRanks.slice(0, this.totalTalentsAllowed)
      const charTalents = talentsSelected.map((id, index) => ({
        id,
        rank: this.talentRanks[index],
      }))
      return charTalents
    },
    characterStatus(): CharacterMetaDataStatus {
      return this.charData.metadata.status
    },
    canAddTalent(): boolean {
      // TODO: we should check if XP is enough to add talent
      return ["levelup", "freeEdit"].includes(this.characterStatus)
    },
    canRemoveTalent(): boolean {
      return [/*"new",*/ "freeEdit"].includes(this.characterStatus)
    },
  },
  methods: {
    generalTalents(index: number): any {
      const talentFilter = this.selectedTalents.filter(
        (_, index2) => index !== index2
      )
      return talentsSortedByTranslation(this, GENERAL_TALENTS2, talentFilter)
    },
    isTalentRankDisabled(index: number): boolean {
      return this.talentIncreased || index > this.generalTalentsAllowed
    },
    removeTalent(index: number) {
      this.additionalTalents--
      this.selectedTalents.splice(index + 1, 1)
    },
  },
  watch: {
    selectedTalents: {
      immediate: true,
      handler() {
        // Set all undefined/falsy talent ranks to 1
        this.selectedTalents.map((_, index) => {
          if (!this.talentRanks[index]) this.talentRanks[index] = 1
        })
      },
    },
    ageType() {
      // Reset all talent ranks to 1 if age is changed
      this.talentRanks = this.talentRanks.map(() => 1)
    },
    exported: {
      immediate: true,
      handler() {
        this.$emit("talents-updated", this.exported)
      },
    },
  },
})

export default TalentSelector
</script>

<template>
  <div class="talent-contents">
    <div class="talent-item">
      <label for="kin-talent">{{ $t("Kin") }}</label>
      <select id="kin-talent" disabled>
        <option v-bind:value="selectedTalents[0]">
          {{ $t(kinTalent) }}
        </option>
      </select>
      <span class="toggle hidden">
        <input type="radio" name="kinTalentRank" checked="checked" disabled />
        <label for="kinTalentRank">1</label>
        <input type="radio" name="kinTalentRank" disabled />
        <label for="kinTalentRank">2</label>
      </span>
    </div>

    <!-- <div
      v-for="index in generalTalentsAllowed"
      :key="'General' + index"
      class="talent-item"
    >
      <TalentSelect
        :label="$t('Talent') + index"
        :talentOptions="generalTalents"
        :rankDisabled="isTalentDisabled(index)"
      />
    </div> -->

    <div class="talent-item">
      <label for="class-talent">{{ $t("Profession") }}</label>
      <select id="class-talent" v-model="selectedTalents[1]">
        <option
          v-for="talent in classTalents"
          :key="talent"
          v-bind:value="talent"
        >
          {{ $t(talent) }} {{ talentRanks[1] }}
        </option>
      </select>
      <span class="toggle">
        <input
          type="radio"
          name="classTalentRank"
          v-model.number="talentRanks[1]"
          value="1"
          checked="checked"
        />
        <label for="classTalentRank">1</label>
        <input
          type="radio"
          name="classTalentRank"
          v-model.number="talentRanks[1]"
          value="2"
          :disabled="characterStatus === 'new' && isTalentRankDisabled(1)"
        />
        <label for="classTalentRank">2</label>
      </span>
    </div>

    <div
      v-for="index in generalTalentsAllowed"
      :key="index"
      class="talent-item"
    >
      <label for="general-talent">{{ $t("General") }} {{ index }}</label>
      <select id="general-talent" v-model="selectedTalents[index + 1]">
        <optgroup :label="$t('General talents')">
          <option
            v-for="talent in generalTalents(index + 1)"
            :key="talent.id"
            v-bind:value="talent.id"
          >
            {{ talent.translation }} {{ talentRanks[index + 1] }}
          </option>
        </optgroup>
      </select>
      <span class="toggle">
        <input
          type="radio"
          :name="'talent' + index"
          v-model.number="talentRanks[index + 1]"
          value="1"
          checked="checked"
        />
        <label :for="'talent' + index">1</label>
        <input
          type="radio"
          :name="'talent' + index"
          v-model.number="talentRanks[index + 1]"
          value="2"
          :disabled="
            characterStatus === 'new' && isTalentRankDisabled(index + 1)
          "
        />
        <label :for="'talent + index'">2</label>
        <!-- TODO: Add input for lvl 3 as well when supporting live Character Sheet -->
      </span>
      <button v-if="canRemoveTalent" @click="removeTalent(index)">
        ✖
      </button>
    </div>
    <div v-if="canAddTalent">
      <button @click="additionalTalents++">Add talent</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.talent-contents {
  margin: 1rem auto;
}
.talent-item {
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
  select > {
    flex-grow: 1;
    flex-basis: 40%;
    max-width: 20ch;
  }
}

label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // flex-basis: 10ch;
  flex-basis: 25%;
}

.talent-rank {
  max-width: 3rem;
}

.hidden {
  visibility: hidden;
}
</style>
