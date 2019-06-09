<script lang="ts">
/* eslint-disable no-console */
import { AGE, CLASS, KIN } from "@/keys.ts"
import { GENERAL_TALENTS, getClassTalents } from "@/talents.ts"
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
      selected_sex: "",
      PROFESSION,
    }
  },
  computed: {
    ageType(): VueI18n.TranslateResult {
      this.$emit("basedata-updated", this.mdata)
      return this.$t(getAgeType(this.mdata.age, this.mdata.kin))
    },
    reputation(): number {
      return getReputation(getAgeType(this.mdata.age, this.mdata.kin))
    },
    disabled(): boolean {
      return this.data.metadata.status === "active"
    },
  },
  watch: {
    // mdata: {
    //   immediate: true,
    //   deep: true,
    //   handler(newValue, oldValue) {
    //     this.$emit("basedata-updated", this.mdata)
    //   },
    // },
  },
  methods: {
    nameSuggestion() {
      // TODO Get suggested names from docs, output them based on selected kin
      return ""
    },
    ageRange() {
      return getAgeRange(this.mdata.kin)
    },
  },
})

/*

    <div class="cell" style="display: none;">
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
*/
</script>

<template>
  <div class="contentgroup">
    <div class="cell full-width">
      <label for="character-name">{{ $t("Name") }}</label>
      <input
        id="character-name"
        class="input-max-width"
        type="text"
        v-model="mdata.name"
        :placeholder="nameSuggestion()"
        required
      />
    </div>

    <div class="base-flex2">
      <div class="base-flex">
        <label for="age" class="base-label">{{ $t("age") }}</label>
        <input
          :disabled="disabled"
          id="age"
          type="number"
          v-model.number="mdata.age"
          :placeholder="ageRange()"
          class="smallnumber"
          min="1"
        />
      </div>
      <div class="base-flex">
        <label for="character-kin" class="base-label">{{ $t("kin") }}</label>
        <select id="character-kin" v-model="mdata.kin" :disabled="disabled">
          <option v-for="kin in kin_select" :key="kin.id" v-bind:value="kin.id">
            {{ capitalize($t(kin.id)) }}
          </option>
        </select>
      </div>
      <div class="base-flex">
        <label for="character-class" class="base-label">
          {{ $t("Profession") }}
        </label>
        <select
          id="character-class"
          v-model="mdata.profession"
          :disabled="disabled"
        >
          <option v-for="c in class_select" :key="c.id" v-bind:value="c.id">
            {{ capitalize($t(c.id)) || c.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="cell full-width">
      <span v-if="this.mdata.age" class="capitalize">
        {{ this.ageType }}
      </span>
      <span v-if="this.mdata.age" class="capitalize">
        {{ $t("Reputation") }}: {{ this.reputation }}
      </span>
      <span v-if="this.mdata.experience" class="capitalize">
        {{ $t("Experience") }}: {{ this.mdata.experience }}
      </span>
    </div>
    <!-- spacer -->
  </div>
</template>

<style scoped lang="less">
.base-flex2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.base-flex {
  // TODO: Clean up this mess
  display: flex;
  align-items: center;
  // flex: 1 0 25%;
  flex-grow: 1;
  margin: 0.2rem;
  label,
  select {
    flex-grow: 1;
  }
  input {
    max-width: 4rem;
  }
}

label,
.capitalize {
  text-transform: capitalize;
}

.full-width {
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}

.contentgroup {
  display: flex;
  flex-wrap: wrap;
}

.consumables {
  // display: flex;
  // flex: 1 1 100%;
  // justify-items: stretch;
  // flex-grow: 1;
  // justify-content: space-between;
  // margin: 1rem;
  div > {
    display: inline-block;
    margin-right: 1rem;
  }
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

.input-max-width {
  width: 100%;
}

.smallnumber {
  width: 4rem;
}
</style>
