<script lang="ts">
/* eslint-disable no-console */
import { AGE, CLASS, KIN } from "@/keys.ts"
import { GENERAL_TALENTS, getClassTalents, getKinTalent } from "@/talents.ts"
import { capitalize } from "@/util"
import { getAgeType, getAgeRange, getReputation } from "@/age"
import { CLASS as PROFESSION } from "@/classes"
import Vue from "vue"
import { CharacterData } from "@/characterData"
import VueI18n from "vue-i18n"

export default Vue.extend({
  props: {
    data: {
      type: Object as () => CharacterData,
      required: true,
    },
    // Functions
    capitalize: {
      default: () => capitalize,
    },
  },
  created() {
    this.mdata = this.data
  },
  data() {
    return {
      mdata: {} as CharacterData,
      kin_select: [
        { id: KIN.ELF, name: "Elf" },
        { id: KIN.DWARF, name: "Dwarf" },
        { id: KIN.GOBLIN, name: "Goblin" },
        { id: KIN.HALFELF, name: "Half-elf" },
        { id: KIN.HALFLING, name: "Halfling" },
        { id: KIN.HUMAN, name: "Human" },
        { id: KIN.ORC, name: "Orc" },
        { id: KIN.WOLFKIN, name: "Wolfkin" },
      ],
      class_select: [
        { id: CLASS.DRUID, name: "druid" },
        { id: CLASS.FIGHTER, name: "fighter" },
        { id: CLASS.HUNTER, name: "hunter" },
        { id: CLASS.MINSTREL, name: "minstrel" },
        { id: CLASS.PEDDLER, name: "peddler" },
        { id: CLASS.RIDER, name: "rider" },
        { id: CLASS.ROGUE, name: "rogue" },
        { id: CLASS.SORCERER, name: "sorcerer" },
      ],
      selected_sex: "male",
      PROFESSION,
    }
  },
  computed: {
    valid(): boolean {
      return (
        !!this.mdata.name &&
        !!this.mdata.sex &&
        !!this.mdata.age &&
        !!this.mdata.kin &&
        !!this.mdata.class
      )
    },
    ageType(): VueI18n.TranslateResult {
      return this.$t(getAgeType(this.mdata.age, this.mdata.kin))
    },
    reputation(): number {
      return getReputation(getAgeType(this.mdata.age, this.mdata.kin))
    },
  },
  watch: {
    // mdata: {
    //   immediate: true,
    //   deep: true,
    //   handler(newValue, oldValue) {
    //     this.$emit("data updated", this.mdata)
    //   },
    // },
    valid: {
      immediate: true,
      // deep: true,
      handler(newValue, oldValue) {
        const valid = this.valid ? "✓" : "✖"
        this.$parent.$emit("card-sign", valid)
        this.$emit("base-valid")
      },
    },
  },
  methods: {
    nameSuggestion() {
      // TODO Get suggested names from docs, output them based on selected kin
      return "Krom"
    },
    ageRange() {
      return getAgeRange(this.mdata.kin)
    },
  },
})
</script>

<template>
  <div class="contentgroup">
    <div class="cell">
      <label for="character-name">{{ $t("Name") }}</label>
      <input
        id="character-name"
        type="text"
        v-model="mdata.name"
        :placeholder="nameSuggestion()"
        required
      />
    </div>

    <div class="cell">
      <label for="sex">{{ capitalize($t("sex")) }}</label>
      <span id="sex">
        <input
          type="radio"
          id="male"
          name="sex"
          v-model="mdata.sex"
          value="male"
        />
        <label for="male">{{ $t("Male") }}</label>
        <input
          type="radio"
          id="female"
          name="sex"
          v-model="mdata.sex"
          value="female"
        />
        <label for="female">{{ $t("Female") }}</label>
      </span>
    </div>

    <div class="cell full-width">
      <label for="age">{{ $t("age") }}</label>
      <input
        id="age"
        type="number"
        v-model.number="mdata.age"
        :placeholder="ageRange()"
        class="smallnumber"
        min="1"
      />
      <span v-if="this.mdata.age" class="capitalize"
        >{{ this.ageType }} Reputation: {{ this.reputation }}</span
      >
    </div>
    <div class="cell">
      <label for="character-kin">{{ $t("kin") }}</label>
      <select id="character-kin" v-model="mdata.kin">
        <option v-for="kin in kin_select" :key="kin.id" v-bind:value="kin.id">
          {{ capitalize($t(kin.id)) }}
        </option>
      </select>
    </div>

    <div class="cell">
      <label for="character-class">{{ $t("class") }}</label>
      <select id="character-class" v-model="mdata.class">
        <option v-for="c in class_select" :key="c.id" v-bind:value="c.id">{{
          capitalize($t(c.id)) || c.name
        }}</option>
      </select>
    </div>
    <div v-if="this.mdata.class">
      <div>
        {{ $t("Food") }}:
        {{ $t("D") + PROFESSION[this.mdata.class].starting_resources.food }}
      </div>
      <div>
        {{ $t("Water") }}:
        {{ $t("D") + PROFESSION[this.mdata.class].starting_resources.water }}
      </div>
      <div>
        Silver:
        {{
          $t("D") +
            PROFESSION[this.mdata.class].starting_resources.silver +
            " (" +
            $t("Roll dice before session starts") +
            ")"
        }}
      </div>
      <div v-if="PROFESSION[this.mdata.class].starting_resources.arrows">
        {{ $t("Arrows") }}: D{{
          PROFESSION[this.mdata.class].starting_resources.arrows
        }}
      </div>

      <h4>{{ $t("Gear") }}</h4>
      {{ $t(PROFESSION[this.mdata.class].gear_description) }}
    </div>
  </div>
</template>

<style scoped lang="less">
label,
.capitalize {
  text-transform: capitalize;
}

.capitalize {
  margin: 0 1rem;
}

.full-width {
  width: 100%;
}

.contentgroup {
  display: flex;
  flex-wrap: wrap;
  // display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  // div > {
  //   margin-top: 0.5rem;
  //   margin-bottom: 0.5rem;
  // }
}

.cell {
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  // justify-content: center;
  align-items: center;
  label,
  select,
  input > {
    margin-left: 0.5rem;
    // margin-right: 0.5rem;
  }
}

.smallnumber {
  width: 4rem;
}
</style>
