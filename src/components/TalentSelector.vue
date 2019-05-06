<script lang="ts">
/* eslint-disable no-console */
import { AGE, CLASS, KIN } from "@/keys.ts"
import {
  GENERAL_TALENTS,
  getClassTalents,
  getKinTalent,
  transformToTranslationKey,
  Talent,
} from "@/talents.ts"
import { getNumberOfStartingTalents } from "@/age.ts"
import { KinName, Profession } from "@/types"
import Vue from "vue"
import { TranslateResult } from "vue-i18n"

const TalentSelector = Vue.extend({
  props: {
    age: {
      type: Number,
      required: true,
    },
    kin: {
      type: String as () => KinName,
      required: true,
    },
    profession: {
      type: String as () => Profession,
      required: true,
    },
    intalents: {
      required: false,
      type: Array as () => Talent[],
    },
  },
  data() {
    return {
      // talents: [getKinTalent(this.kin)],
      // talents: [getKinTalent(this.kin)],
      talents: [
        getKinTalent(this.kin),
        ...this.intalents.slice(1),
      ] as (Talent | null)[],
      // return this.intalents.length > 0
      //   ? this.intalents
      //   : [getKinTalent(this.kin)]
    }
  },
  computed: {
    // talents: this.computeTalents()
  },
  methods: {
    computeTalents(): (Talent | null)[] {
      console.log("intalents", this.intalents)
      const computedTalents = [
        getKinTalent(this.kin),
        ...this.intalents.slice(1),
      ]
      console.log("computedTalents", computedTalents)
      return computedTalents
    },
    getKinTalent() {
      return getKinTalent(this.kin)
    },
    getClassTalents() {
      return getClassTalents(this.profession)
    },
    getGeneralTalents() {
      return { ...GENERAL_TALENTS }
    },
    getNumberOfTalents() {
      return getNumberOfStartingTalents(this.age, this.kin)
    },
    validated(): boolean {
      console.log("thistalents", this.talents)
      const talentNum = this.getNumberOfTalents() + 2
      return this.talents.filter(item => !!item).length === talentNum
    },
    tName(name: string): TranslateResult {
      return this.$t(transformToTranslationKey(name))
    },
  },
  watch: {
    talents: {
      // immediate: true,
      // deep: true,
      handler() {
        const exportedTalents = this.talents.slice(
          0,
          2 + this.getNumberOfTalents()
        )
        this.$emit("talents-updated", exportedTalents)
        const valid = this.validated() ? "✓" : "✖"
        this.$parent.$emit("card-sign", valid)
      },
    },
    kin() {
      this.talents[0] = getKinTalent(this.kin)
      this.talents = this.talents.slice(0, 2 + this.getNumberOfTalents())
    },
    age() {
      this.talents = this.talents.slice(0, 2 + this.getNumberOfTalents())
    },
    profession() {
      this.talents[1] = null
    },
  },
})

export default TalentSelector
</script>

<template>
  <div v-if="age" class="talent-contents">
    <div class="talent-item">
      <label for="kin-talent">{{ $t("Kin talent") }}</label>
      <select id="kin-talent" v-model="talents[0]" disabled>
        <option :value="talents[0]">{{ $t(talents[0].id) }}</option>
      </select>
    </div>
    <div class="talent-item">
      <label for="class-talent">{{ $t("Class talent") }}</label>
      <select id="class-talent" v-model="talents[1]">
        <option
          v-for="talent in getClassTalents()"
          :key="talent.name"
          v-bind:value="talent"
        >
          {{ tName(talent.name) }}
        </option>
      </select>
    </div>
    <div v-for="index in getNumberOfTalents()" :key="index" class="talent-item">
      <label for="general-talent">{{ $t("General talent") }} {{ index }}</label>
      <select id="general-talent" v-model="talents[index + 1]">
        <optgroup :label="$t('General talents')">
          <option
            v-for="talent in getGeneralTalents()"
            :key="talent.name"
            v-bind:value="talent"
          >
            {{ tName(talent.name) }}
          </option>
        </optgroup>
        <optgroup :label="$t('Class talents')">
          <option
            v-for="talent in getClassTalents()"
            :key="talent.name"
            v-bind:value="talent.name"
            >{{ tName(talent.name) }}</option
          >
        </optgroup>
      </select>
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

sellect {
  background: white;
  color: #42b983;
  border: 1px solid black;
  /* border-color: chartreuse; */
  -webkit-appearance: none;
  -webkit-appearance: button;
  -webkit-border-radius: 2px;
  -webkit-padding-end: 20px;
  -webkit-padding-start: 2px;
  // background-image: url(http://i62.tinypic.com/15xvbd5.png),
  //   -webkit-linear-gradient(#fafafa, #f4f4f4 40%, #e5e5e5);
  background-position: 97% center;
  background-repeat: no-repeat;
  border: 1px solid #aaa;
  color: #555;
  font-size: inherit;
  margin: 20px;
  overflow: hidden;
  padding: 5px 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 300px;
  background-color: #779126;
  color: #fff;
  // background-image: url(http://i62.tinypic.com/15xvbd5.png),
  //   -webkit-linear-gradient(#779126, #779126 40%, #779126);
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  padding-left: 15px;
  color: #42b983;
}
</style>
