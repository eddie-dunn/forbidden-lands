<script lang="ts">
import AttributesSelector from "@/components/AttributesSelector.vue"
import SkillSelector from "@/components/SkillSelector.vue"
import TalentSelector from "@/components/TalentSelector.vue"
import BaseSelector from "@/components/BaseSelector.vue"
import PicturePicker from "@/components/PicturePicker.vue"
import FlavorSelector from "@/components/FlavorSelector.vue"
import Card from "@/components/Card.vue"
import { AGE, CLASS, KIN } from "@/keys.ts"
import { getSkills } from "@/skills"
import i18n from "@/i18n.ts"
import { getAgeType } from "@/age.ts"
import { Age, TalentAll } from "@/types.ts"
import {
  getNewCharacterData,
  CharacterData,
  CharacterTalent,
  validateBase,
  validateAttributes,
  validateTalents,
  validateSkills,
} from "@/characterData"
import {
  loadCharacterFromLocalStorage,
  saveCharacterToLocalStorage,
} from "@/characterStorage"
import Vue from "vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
// import { workerData } from "worker_threads" // ???

const CharacterCreatorMain = Vue.extend({
  name: "CharacterCreatorForm",
  components: {
    AttributesSelector,
    BaseSelector,
    Card,
    ExpandableSection,
    FlavorSelector,
    PicturePicker,
    SkillSelector,
    TalentSelector,
  },
  props: ["charName"],
  // created() {
  //   this.characterData = loadCharacterFromLocalStorage(this.charName)
  //   if (!this.characterData.name && this.charName) {
  //     this.characterData.name = this.charName
  //   }
  // },
  watch: {
    $route(to, from) {
      if (to.name === "character_creator-new") {
        Vue.set(this, "characterData", getNewCharacterData())
      }
    },
  },
  data() {
    return {
      // TODO: Resolve double request to getNewCharacterData;
      // loadCharacterFromLocalStorage also calls that method
      // characterData: getNewCharacterData(),
      characterData: loadCharacterFromLocalStorage(this.charName),
      showJSON: false,
    }
  },
  computed: {
    id(): string {
      return this.characterData.metadata.id
    },
    ageType(): Age {
      return getAgeType(this.characterData.age, this.characterData.kin)
    },
    baseDataValid(): boolean {
      return validateBase(this.characterData)
    },
    attributesValid(): boolean {
      return validateAttributes(this.characterData)
    },
    talentsValid(): boolean {
      return validateTalents(this.characterData)
    },
    skillsValid(): boolean {
      return validateSkills(this.characterData)
    },
  },
  methods: {
    saveClicked(event: any) {
      if (event && this.characterData.name) {
        saveCharacterToLocalStorage(this.characterData)
        this.$router.push("/character-list")
      }
    },
    updateBase(character: CharacterData) {
      this.characterData.ageType = this.ageType
    },
    updateAttributes(attributes: any) {
      this.$set(this.characterData, "attributes", attributes)
    },
    updateTalents(talents: CharacterTalent[]) {
      /* eslint-disable-next-line no-console */
      console.log("new talents", talents)
      // this.characterData.talents = talents
      this.$set(this.characterData, "talents", talents)
    },
    setImgSource(img: any) {
      this.characterData.portrait = img
    },
    checkForm(event: any) {
      // console.log("form submit", event)
      // TODO: Run applicable validation
      event.preventDefault()
    },
  },
})
export default CharacterCreatorMain
</script>

<template>
  <div class="character_creator">
    <form
      class="character_creator-form"
      @submit="checkForm"
      action="/character-list"
      method="get"
      :key="id"
    >
      <Card class="row-half" :title="$t('Base data')" :valid="baseDataValid">
        <BaseSelector :data="characterData" @basedata-updated="updateBase" />
      </Card>

      <Card class="row-half" :noSign="true">
        <PicturePicker
          :portrait="characterData.portrait"
          @pickedPicture="setImgSource"
        />
      </Card>

      <Card class="row-half" :title="$t('attributes')" :valid="attributesValid">
        <AttributesSelector
          :charData="characterData"
          @attributes-updated="updateAttributes"
        />
      </Card>

      <Card class="row-half" :title="$t('talents')" :valid="talentsValid">
        <TalentSelector
          class="content"
          :charData="characterData"
          @talents-updated="updateTalents"
        />
      </Card>

      <Card class="row-half" :title="$t('skills')" :valid="skillsValid">
        <SkillSelector
          :profession="characterData.profession"
          :age="ageType"
          :skills="characterData.skills"
          :lang="$i18n.locale"
        />
      </Card>

      <FlavorSelector class="row-full" :data="characterData" />

      <div class="action-bar-wrapper">
        <div class="action-bar">
          <button
            v-if="false"
            class="button-action-bar button-white"
            v-on:click="() => {}"
          >
            Delete
          </button>
          <button class="button button-action-bar" v-on:click="saveClicked">
            Save
          </button>
        </div>
      </div>
    </form>
    <ExpandableSection label="JSON Export">
      <pre>{{ JSON.stringify(characterData, null, 2) }}</pre>
    </ExpandableSection>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.character_creator {
  margin-bottom: 20vh;
}

.button-action-bar {
  margin: 0.5rem;
}

.button-white {
  background-color: #fff;
  color: #42b983;
  // border-radius: 20%;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
  padding: 0.5rem 1rem;
}

.character_creator-form {
  margin: auto;
  row-gap: 0.5rem;
  column-gap: 0.5rem; // only seems to work in firefox
  margin: 0 -0.25rem;
  margin-top: 1rem;

  display: flex;
  flex-wrap: wrap;
  flex: 1 1 40%;
  // align-items: stretch;
  justify-content: space-evenly;
  align-content: stretch;
}

.action-bar-wrapper {
  display: block;
  width: 100%;
  position: sticky;
  bottom: 0;
  overflow: hidden;
  margin: 0 0.25rem;
}

.action-bar {
  display: flex;
  overflow: auto;
  justify-content: flex-end;
  @media (max-width: 400px) {
    justify-content: space-around;
  }
  background: #fffe;
  border: solid #42b98399 2px;
}

.row-full {
  flex-basis: 100%;
  flex-grow: 2;
}

.row-half {
  flex-basis: 40%;
  flex-grow: 1;
}
</style>
