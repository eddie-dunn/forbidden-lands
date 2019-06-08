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
  },
  created() {
    this.characterData = this.data
  },
  data() {
    return {
      characterData: this.data as CharacterData,
    }
  },
  computed: {
    appearancePlaceholder(): string {
      return `${this.$t("Face")}:\n${this.$t("Body")}:\n${this.$t(
        "Clothing"
      )}:\n`
    },
  },
})
</script>

<template>
  <div>
    <div class="contentgroup">
      <div>
        <label for="appearance">{{ $t("Appearance") }}</label>
        <textarea
          class="textarea-fullwidth"
          id="appearance"
          v-model="characterData.appearance"
          :placeholder="appearancePlaceholder"
        ></textarea>
      </div>
      <div>
        <label for="pride">{{ $t("Pride") }}</label>
        <textarea
          id="pride"
          class="textarea-fullwidth"
          v-model="characterData.pride"
          placeholder="..."
        ></textarea>
      </div>
      <div>
        <label for="dark-secret">{{ $t("Dark secret") }}</label>
        <textarea
          id="dark-secret"
          class="textarea-fullwidth"
          v-model="characterData.darkSecret"
          placeholder="..."
        ></textarea>
      </div>
      <div>
        <label for="relationships">{{ $t("Relationships") }}</label>
        <textarea
          id="relationships"
          class="textarea-fullwidth"
          v-model="characterData.relationships"
          placeholder="..."
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
label,
.contentgroup {
  display: flex;
  flex-wrap: wrap;
}

.contentgroup {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  div > {
    flex: 1 1 100%;
    text-align: center;
    margin-bottom: 0.5rem;
    @media (min-width: 768px) {
      flex-basis: 50%;
    }
  }
}
.textarea-fullwidth {
  width: 95%;
  height: 4rem;
}
</style>
