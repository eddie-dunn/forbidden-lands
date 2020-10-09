<script lang="ts">
import Vue from "vue"
import VueI18n from "vue-i18n"
/* eslint-disable no-console */
import { AGE, CLASS, KIN } from "@/keys.ts"
import { Age } from "@/types"
import { capitalize } from "@/util/util"
import { getAgeType, getAgeRange, getReputation } from "@/age"
import { CLASS as PROFESSION } from "@/classes"
import { CharacterData } from "@/data/character/characterData"

import FLInput from "@/components/base/FLInput.vue"

export default Vue.extend({
  components: {
    FLInput,
  },
  props: {
    data: {
      type: Object as () => CharacterData,
      required: true,
    },
    viewOnly: {
      type: Boolean,
      default: false,
      required: false,
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
      if (!this.mdata.age) return ""
      return `(${this.$t(getAgeType(this.mdata.age, this.mdata.kin))})`
    },
    reputation(): number {
      return this.mdata.reputation || this.calcRep()
    },
    disabled(): boolean {
      return this.data.metadata.status === "active" || this.viewOnly
    },
    freeEdit(): boolean {
      return this.data.metadata.status === "freeEdit"
    },
  },
  watch: {
    mdata: {
      // immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.mdata.reputation =
          this.mdata.metadata.status !== "new"
            ? this.mdata.reputation
            : this.calcRep()
        this.mdata.ageType = getAgeType(this.mdata.age, this.mdata.kin)
        this.$emit("basedata-updated", this.mdata)
      },
    },
  },
  methods: {
    calcRep() {
      return getReputation(getAgeType(this.mdata.age, this.mdata.kin))
    },
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
    <div class="grid-3-col">
      <FLInput
        v-model="mdata.name"
        :placeholder="nameSuggestion()"
        :label="$t('Name')"
        :disabled="viewOnly"
        :validate="() => String(this.mdata.name)"
        id="character-name"
        class="grid-full-width"
        required
      />

      <div class="input-layout">
        <label for="character-kin" class="base-label font-small">
          {{ $t("kin") }}
        </label>
        <select id="character-kin" v-model="mdata.kin" :disabled="disabled">
          <option v-for="kin in kin_select" :key="kin.id" v-bind:value="kin.id">
            {{ capitalize($t(kin.id)) }}
          </option>
        </select>
      </div>

      <div class="input-layout">
        <label for="character-class" class="base-label font-small">
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

      <FLInput
        v-model="mdata.age"
        type="number"
        min="10"
        max="999"
        :placeholder="ageRange()"
        :disabled="disabled"
        :label="`${capitalize($t('age'))} ${this.ageType}`"
      />

      <div v-if="freeEdit && true" class="display-contents">
        <FLInput
          v-model.number="mdata.experience"
          type="number"
          min="0"
          max="99"
          :placeholder="0"
          :disabled="disabled"
          :label="capitalize($t('XP'))"
        />
        <FLInput
          v-model.number="mdata.reputation"
          type="number"
          min="0"
          max="99"
          :placeholder="0"
          :disabled="disabled"
          :label="capitalize($t('Reputation'))"
        />
      </div>
      <div v-else class="display-contents">
        <span class="capitalize">
          {{ $t("Reputation") }}: {{ this.reputation }}
        </span>
        <span class="capitalize">
          {{ $t("XP") }}: {{ this.mdata.experience }}
        </span>
      </div>
    </div>

    <!-- spacer -->
  </div>
</template>

<style scoped lang="less">
.grid-3-col {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem 5px;
}

.input-layout {
  display: flex;
  flex-direction: column;
}

label,
.capitalize {
  text-transform: capitalize;
}

.grid-full-width {
  grid-column-start: 1;
  grid-column-end: -1;
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

.display-contents {
  display: contents;
}

.cell {
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}
</style>
