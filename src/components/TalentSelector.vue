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
import { TalentRank } from "@/talents"
import {
  CharacterData,
  CharacterTalent,
  CharacterMetaDataStatus,
} from "@/characterData"
import Vue from "vue"
import { TranslateResult } from "vue-i18n"
import TalentSelect from "@/components/TalentSelect.vue"

export function getTalentObjects(
  talentList: TalentAll[],
  talentRanks: (TalentRank | undefined)[],
  idsToExclude: string[] = []
): CharacterTalent[] {
  const talentObj = talentList
    .filter((talentId) => !idsToExclude.includes(talentId))
    .map((talentName: TalentAll, index) => {
      return {
        id: talentName,
        rank: talentRanks[index],
      }
    })
  return talentObj
}

const TalentSelector = Vue.extend({
  components: {
    TalentSelect,
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
      // TODO: Combine selectedTalents and ranks in object[]
      selectedTalents: this.charData.talents.map((talent) => talent.id),
      talentRanks: this.charData.talents.map((talent) => talent.rank),
      // Rename to nbrOfTalents
      additionalTalents: this.charData.talents.length || 3,
    }
  },
  computed: {
    talents(): CharacterTalent[] {
      return this.charData.talents
    },
    ageType(): number | null {
      return this.charData.age
    },
    kinTalent(): TalentKin {
      if (!this.charData.kin) return "Adaptive"
      return KIN_TALENTS2[this.charData.kin]
    },
    baseStartingTalents(): number {
      return getStartingTalents(this.ageType, this.charData.kin)
    },
    talentIncreased(): boolean {
      return this.talentRanks.filter((rank) => (rank || 0) > 1).length > 0
    },
    talentRanksSum(): number {
      return this.talentIncreased ? 1 : 0 // this works for now
    },
    exported(): CharacterTalent[] {
      const talentsSelected = [
        this.kinTalent,
        ...this.selectedTalents.slice(1, this.additionalTalents),
      ]
      const charTalents = talentsSelected.map((id, index) => ({
        id,
        rank: index === 0 ? 1 : this.talentRanks[index],
      }))
      return charTalents
    },
    characterStatus(): CharacterMetaDataStatus {
      return this.charData.metadata.status
    },
    canAddTalent(): boolean {
      if (this.characterStatus === "freeEdit") return true
      if (this.characterStatus === "levelup" && this.charData.experience >= 3) {
        return true
      }
      if (this.characterStatus === "new") {
        return (
          this.additionalTalents - 2 <
          this.baseStartingTalents - this.talentRanksSum
        )
      }
      return false
    },
    maxTalentRank(): number {
      if (this.characterStatus !== "new") return 3
      if (this.talentIncreased) return 1
      return 2
    },
    canRender(): boolean {
      return !!(
        this.charData.age &&
        this.charData.kin &&
        this.charData.profession
      )
    },
  },
  methods: {
    canIncreaseTalent(index: number): boolean {
      const status = this.characterStatus
      if (status === "freeEdit") return true
      if (status === "active") return false
      if (status === "new") {
        return !this.talentIncreased
      }
      if (status === "levelup") {
        const rankCost = ((this.talentRanks[index] || 1) + 1) * 3
        return this.charData.experience >= rankCost
      }
      return false
    },
    getAdditionalTalents(index: number): CharacterTalent[] {
      const idsToExclude = this.selectedTalents.filter(
        (_, index2) => index !== index2
      )
      const generalTalents = getTalentObjects(
        GENERAL_TALENTS2,
        this.talentRanks,
        idsToExclude
      )
      return generalTalents
    },
    classTalents(index: number): CharacterTalent[] {
      const idsToExclude = this.selectedTalents.filter(
        (_, index2) => index !== index2
      )
      const professionTalents = getTalentsForProfession(
        this.charData.profession
      )
      return getTalentObjects(professionTalents, this.talentRanks, idsToExclude)
    },
    removeTalent(index: number) {
      if (this.characterStatus === "levelup") {
        const rank = this.talentRanks[index] || 1
        const factor = (rank: number) => {
          if (rank === 3) return 18
          if (rank === 2) return 9
          if (rank === 1) return 3
          return 0
        }
        this.charData.experience += factor(rank)
      }
      this.additionalTalents--
      this.selectedTalents.splice(index, 1)
      this.talentRanks.splice(index, 1)
    },
    addTalent(index: number) {
      if (this.characterStatus === "levelup") {
        this.charData.experience -= 3
      }
      this.additionalTalents++
    },
    rankChanged(index: number, value: number) {
      if (this.characterStatus === "levelup") {
        const prevVal = this.talentRanks[index] || 0
        if (prevVal < value) this.charData.experience -= value * 3
        else this.charData.experience += prevVal * 3
      }
      this.$set(this.talentRanks, index, value)
    },
    talentChanged(index: number, talentId: TalentAll) {
      this.$set(this.selectedTalents, index, talentId)
    },
  },
  watch: {
    "selectedTalents": {
      immediate: true,
      handler() {
        // Set all undefined/falsy talent ranks to 1
        this.selectedTalents.map((_, index) => {
          if (!this.talentRanks[index]) this.talentRanks[index] = 1
        })
      },
    },
    "ageType"() {
      // Reset all talent ranks to 1 if age is changed
      this.talentRanks = this.talentRanks.map(() => 1) as TalentRank[]
    },
    ["charData.profession"]() {
      this.$set(this.selectedTalents, 1, null)
      this.$set(this.talentRanks, 1, 1)
    },
    ["charData.kin"]() {
      this.$set(this.selectedTalents, 0, this.kinTalent)
    },
    "exported": {
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
  <div v-if="canRender" class="talent-contents">
    <div
      v-for="(_, index) in additionalTalents"
      :key="'talent' + index"
      class="talent-item"
    >
      <TalentSelect
        v-if="index === 0"
        :charStatus="characterStatus"
        :charData="charData"
        :disabled="true"
        :talentOptions="[
          { translation: $t(kinTalent), rank: 1, id: kinTalent },
        ]"
        v-model="selectedTalents[0]"
      />
      <TalentSelect
        v-else-if="index === 1"
        :charStatus="characterStatus"
        :charData="charData"
        :maxTalentRank="maxTalentRank"
        :talentOptions="classTalents(1)"
        :talentRank="talentRanks[1]"
        @rank-changed="(value) => rankChanged(1, value)"
        v-model="selectedTalents[1]"
      />
      <TalentSelect
        v-else
        :charStatus="characterStatus"
        :charData="charData"
        :maxTalentRank="maxTalentRank"
        :talentOptions="getAdditionalTalents(index)"
        :talentRank="talentRanks[index]"
        :classTalentOptions="
          characterStatus !== 'new' ? classTalents(index) : []
        "
        @rank-changed="(value) => rankChanged(index, value)"
        @remove="removeTalent(index)"
        v-model="selectedTalents[index]"
      />
    </div>

    <div v-if="canAddTalent">
      <button class="button add-talent" @click="addTalent()">
        {{ $t("Add talent") }}
      </button>
    </div>

    <!-- end -->
  </div>
</template>

<style lang="less" scoped>
.talent-contents {
  margin: 1rem auto;
}

.add-talent {
  display: flex;
  margin: 1rem auto;
}
</style>
