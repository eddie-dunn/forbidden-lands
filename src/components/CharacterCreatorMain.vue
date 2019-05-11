<script lang="ts">
/* eslint-disable no-console */
import AttributesSelector from "@/components/AttributesSelector.vue"
import SkillSelector from "@/components/SkillSelector.vue"
import TalentSelector from "@/components/TalentSelector.vue"
import BaseSelector from "@/components/BaseSelector.vue"
import PicturePicker from "@/components/PicturePicker.vue"
import Card from "@/components/Card.vue"
import { AGE, CLASS, KIN } from "@/keys.ts"
import { getSkills } from "@/skills"
import i18n from "@/i18n.ts"
import { getAgeType } from "@/age.ts"
import {
  getNewCharacterData,
  CharacterData,
  validateNewCharacter,
} from "@/characterData"
import {
  loadCharacterFromLocalStorage,
  saveCharacterToLocalStorage,
} from "@/characterStorage"
import Vue from "vue"
// import { workerData } from "worker_threads" // ???

const CharacterCreatorMain = Vue.extend({
  name: "CharacterCreatorForm",
  components: {
    AttributesSelector,
    BaseSelector,
    Card,
    PicturePicker,
    SkillSelector,
    TalentSelector,
  },
  props: ["charName"],
  created() {
    this.characterData = loadCharacterFromLocalStorage(this.charName)
    if (!this.characterData.name && this.charName) {
      this.characterData.name = this.charName
    }
  },
  data: () => {
    return {
      characterData: getNewCharacterData(),
      showJSON: false,
    }
  },
  methods: {
    canActivateCharacter: validateNewCharacter,
    saveClicked(event: any) {
      if (event && this.characterData.name) {
        saveCharacterToLocalStorage(this.characterData)
        this.$router.push("/character-list")
      }
    },
    resetClicked(event: any) {
      if (event) event.preventDefault()
      this.characterData = getNewCharacterData()
    },
    getAgeType() {
      return getAgeType(this.characterData.age, this.characterData.kin)
    },
    updateAttributes(attributes: any) {
      this.characterData.attributes = attributes
    },
    updateTalents(talents: any) {
      console.log("new talents", talents)
      this.characterData.talents = talents
    },
    setImgSource(img: any) {
      console.log("setting", img)
      this.characterData.portrait = img
    },
  },
})
export default CharacterCreatorMain
</script>

<template>
  <div class="character_creator">
    <form class="character_creator-form" v-on:submit.prevent>
      <Card :title="$t('Base data')">
        <BaseSelector :data="characterData" />
      </Card>

      <Card>
        <PicturePicker
          :portrait="characterData.portrait"
          @pickedPicture="setImgSource"
        />
      </Card>

      <Card :title="$t('attributes')">
        <AttributesSelector
          :charData="characterData"
          @attributes-updated="updateAttributes"
        />
      </Card>

      <Card :title="$t('talents')">
        <TalentSelector
          class="content"
          :profession="characterData.class"
          :age="characterData.age || -1"
          :kin="characterData.kin"
          :intalents="characterData.talents"
          :charData="characterData"
          @talents-updated="updateTalents"
        />
      </Card>

      <Card :title="$t('skills')">
        <SkillSelector
          :profession="characterData.class"
          :age="getAgeType()"
          :skills="characterData.skills"
          :lang="$i18n.locale"
        />
      </Card>

      <div class="row-full row-flex">
        <Card :full-width="true" title="Flavor">
          <div>
            <label for="appearance">Appearance</label>
            <textarea
              id="appearance"
              v-model="characterData.appearance"
              placeholder="Face: Body: Clothing:"
            ></textarea>
          </div>
          <div>
            <label for="appearance">Pride</label>
            <textarea
              id="appearance"
              v-model="characterData.pride"
              placeholder="Pride"
            ></textarea>
          </div>
          <div>
            <label for="appearance">Dark Secret</label>
            <textarea
              id="appearance"
              v-model="characterData.darkSecret"
              placeholder="Dark secret"
            ></textarea>
          </div>
          <div>
            <label for="appearance">Relationships</label>
            <textarea
              id="appearance"
              v-model="characterData.relationships"
              placeholder="Relationships"
            ></textarea>
          </div>
        </Card>
      </div>

      <div class="action-bar-wrapper">
        <div class="action-bar">
          <button
            class="button-action-bar button-white"
            v-on:click="resetClicked"
          >
            Delete
          </button>
          <button class="button-action-bar" v-on:click="saveClicked">
            Save
          </button>
        </div>
      </div>
    </form>
    <div @click="showJSON = !showJSON">
      Click to show/hide JSON
      <div v-if="showJSON">
        {{ JSON.stringify(characterData, null, 2) }}
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1,
h2,
h3 {
  // margin: 40px 0 0;
  width: 100%;
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  // color: red;
}
p {
  text-align: left;
  margin: 0.4rem;
}
label {
  // margin: 0.5rem;
  margin-right: 0.5rem;
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
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.25rem;
  margin-top: 1rem;
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
  justify-content: space-around;
  background: #fffe;
  border: solid #42b98344 2px;
}

.row-card {
  border: solid #42b98344 2px;
  border-radius: 1rem;
  padding: 1rem;
}

.row-full {
  width: 100%;
}

.row-flex {
  display: flex;
  justify-content: space-between;
}

// .content {
//   flex-grow: 2;
//   display: flex;
//   flex-direction: column;
//   flex-basis: 50%;
//   // justify-content: wrap;
//   * > {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }
// }

// input:valid.with-checkbox + span::before {
//   content: "✓";
//   // padding-left: 5px;
// }

// input:invalid.with-checkbox + span::before {
//   content: "✖";
//   // padding-left: 5px;
// }
</style>
