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
  KinName,
  TalentKin,
  Profession,
  TalentProfession,
  TalentAll,
} from "@/types"
import { CharacterData, CharacterTalent } from "@/characterData"
import Vue from "vue"
import { TranslateResult } from "vue-i18n"
// import TalentSelect from "@/components/TalentSelect.vue"

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
    }
  },
  computed: {
    generalTalents(): any {
      return this.talentsSortedByTranslation2(GENERAL_TALENTS2)
    },
    classTalents(): TalentProfession[] {
      return getTalentsForProfession(this.charData.profession)
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
    totalTalentsAllowed(): number {
      return 2 + this.baseStartingTalents - this.talentRanksSum
    },
    talentIncreased(): boolean {
      return (
        Object.values(this.talentRanks).filter((rank) => (rank || 0) > 1)
          .length > 0
      )
    },
    talentRanksSum(): number {
      return this.talentIncreased ? 1 : 0
    },
    exportedTalents(): TalentAll[] {
      return this.selectedTalents.slice(0, 2 + this.generalTalentsAllowed)
    },
  },
  methods: {
    talentsSortedByTranslation2(
      talentIds: string[],
      idsToExclude: string[] = []
    ) {
      // TODO: This really should be simpler; find out if refactor is possible
      const translationList = talentIds
        .filter((id) => !idsToExclude.includes(id))
        .map((id) => {
          const translation: TranslateResult = this.$t(
            transformToTranslationKey(id)
          )
          return { translation, id }
        })

      const sortedTalents = translationList.sort((item1, item2) => {
        return item1.translation < item2.translation ? 0 : 1
      })
      return sortedTalents
    },
    tName(name: string): TranslateResult {
      return this.$t(transformToTranslationKey(name))
    },
    talentUpdateHandler() {
      // Remap component-local selected talents to a character-talent, and
      // emit update of map
      this.selectedTalents[0] = this.kinTalent
      const exportedTalents = getTalentObjects(
        this.exportedTalents,
        this.talentRanks
      )
      this.$emit("talents-updated", exportedTalents)
    },
    isTalentDisabled(index: number) {
      return this.talentIncreased || index >= this.generalTalentsAllowed
    },
  },
  watch: {
    selectedTalents: {
      immediate: true,
      deep: true,
      handler() {
        this.talentUpdateHandler()
      },
    },
    talentRanks: {
      deep: true,
      handler(oldData, newData) {
        this.talentUpdateHandler()
        // set all other ranks to 1?
      },
    },
  },
})

export default TalentSelector
</script>

<template>
  <div class="talent-contents">
    Base general talents: {{ baseStartingTalents }} Allowed number of general
    talents:
    {{ generalTalentsAllowed }}
    talent increased: {{ talentIncreased }}
    <div class="talent-item">
      <label for="kin-talent">{{ $t("Kin") }}</label>
      <select id="kin-talent" disabled>
        <option v-bind:value="selectedTalents[0]">
          {{ tName(kinTalent) }}
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
          :disabled="isTalentDisabled(1)"
        />
        <label for="classTalentRank">2</label>
      </span>
    </div>

    <div
      v-for="index in generalTalentsAllowed"
      :key="index"
      class="talent-item"
    >
      <label for="general-talent">{{ $t("Talent") }} {{ index }}</label>
      <select id="general-talent" v-model="selectedTalents[index + 1]" required>
        <optgroup :label="$t('General talents')">
          <option
            v-for="talent in generalTalents"
            :key="talent.id"
            v-bind:value="talent.id"
          >
            {{ talent.translation }}
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
          :disabled="isTalentDisabled(index)"
        />
        <label :for="'talent + index'">2</label>
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
  margin-top: 0.25rem;
  select,
  span > {
    flex-basis: 40%;
  }
}

label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-basis: 10ch;
}

.talent-rank {
  max-width: 3rem;
}

.hidden {
  visibility: hidden;
}
</style>
