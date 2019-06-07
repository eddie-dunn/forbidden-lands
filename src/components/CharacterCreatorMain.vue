<script lang="ts">
import AttributesSelector from "@/components/AttributesSelector.vue"
import SkillSelector from "@/components/SkillSelector.vue"
import TalentSelector from "@/components/TalentSelector.vue"
import BaseSelector from "@/components/BaseSelector.vue"
import PicturePicker from "@/components/PicturePicker.vue"
import FlavorSelector from "@/components/FlavorSelector.vue"
import GearPicker from "@/components/GearPicker.vue"
import Modal from "@/components/Modal.vue"
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
  CharacterMetaDataStatus,
  CharacterMetaData,
} from "@/characterData"
import {
  loadCharacterFromLocalStorage,
  saveCharacterToLocalStorage,
} from "@/characterStorage"
import Vue from "vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import XPModal from "@/components/XPModal.vue"

const CharacterCreatorMain = Vue.extend({
  name: "CharacterCreatorForm",
  components: {
    AttributesSelector,
    BaseSelector,
    Card,
    ExpandableSection,
    FlavorSelector,
    GearPicker,
    PicturePicker,
    SkillSelector,
    TalentSelector,
    XPModal,
  },
  props: ["charName"],
  watch: {
    $route(to, from) {
      if (to.name === "character_creator-new") {
        Vue.set(this, "characterData", getNewCharacterData())
      }
    },
  },
  data() {
    return {
      characterData:
        this.$characterStore.characterById(this.charName) ||
        getNewCharacterData(),
      showJSON: false,
      showXPModal: false,
      newXP: 0,
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
    status(): CharacterMetaDataStatus {
      return this.characterData.metadata.status
    },
    canToggleXpMode(): boolean {
      return ["active", "levelup"].includes(this.status)
    },
  },
  methods: {
    saveClicked(event: any) {
      if (!event || !this.characterData.name) return
      this.$characterStore.addCharacter(this.characterData)
      if (this.status === "new") {
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
      this.$set(this.characterData, "talents", talents)
    },
    updateStatus(status: CharacterMetaDataStatus) {
      this.$set(this.characterData.metadata, "status", status)
    },
    toggleSpendXpMode() {
      const newStatus = this.status === "active" ? "levelup" : "active"
      this.$set(this.characterData.metadata, "status", newStatus)
    },
    setImgSource(img: any) {
      this.characterData.portrait = img
    },
    handleNewXP(experience: number) {
      this.characterData.experience = this.characterData.experience || 0
      this.characterData.experience += experience
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
    <div v-if="showWIP">
      <span>Status: {{ this.status }}</span>
      <button @click="updateStatus('new')">New</button>
      <button @click="updateStatus('freeEdit')">Free</button>
      <button @click="updateStatus('active')">Active</button>
      <button @click="updateStatus('levelup')">Level-up</button>
    </div>
    <form
      class="character_creator-form"
      @submit="checkForm"
      action="/character-list"
      method="get"
      :key="id"
    >
      <Card
        class="row-half"
        :title="$t('Base data')"
        :valid="baseDataValid && attributesValid"
        :noSign="baseDataValid && attributesValid && status != 'new'"
      >
        <BaseSelector :data="characterData" @basedata-updated="updateBase" />

        <h4>{{ $t("Attributes") }}</h4>
        <AttributesSelector
          :charData="characterData"
          @attributes-updated="updateAttributes"
        />
      </Card>

      <Card class="row-half" :noSign="true">
        <div class="flex-row-wrap space-around appearance-section">
          <PicturePicker
            :portrait="characterData.portrait"
            @pickedPicture="setImgSource"
          />
        </div>
      </Card>

      <Card class="row-half" :noSign="true">
        <FlavorSelector class="flex-col-half" :data="characterData" />
      </Card>

      <Card
        class="row-half"
        :title="$t('talents')"
        :valid="talentsValid"
        :noSign="characterData.metadata.status != 'new'"
      >
        <TalentSelector
          class="content"
          :charData="characterData"
          @talents-updated="updateTalents"
        />
      </Card>

      <Card
        class="row-half"
        :title="$t('skills')"
        :valid="skillsValid"
        :noSign="status != 'new'"
      >
        <SkillSelector
          :profession="characterData.profession"
          :age="ageType"
          :skills="characterData.skills"
          :charData="characterData"
        />
      </Card>

      <Card class="row-half" :title="$t('Gear')" :noSign="true">
        <GearPicker :characterData="characterData" />
      </Card>

      <Card class="row-half" :title="$t('Notes')" :noSign="true">
        <textarea
          v-model="characterData.notes"
          rows="10"
          style="width: 100%"
        ></textarea>
      </Card>

      <Card
        v-if="status === 'active'"
        class="row-half"
        :title="$t('Pre/post session')"
        :noSign="true"
      >
        <button
          class="button item-action-bar"
          v-if="canToggleXpMode"
          @click="toggleSpendXpMode"
        >
          {{ status === "active" ? "Spend xp" : "Done" }}
        </button>
        <span>XP: {{ this.characterData.experience }}</span>
        <button
          class="button item-action-bar"
          v-if="status === 'active'"
          @click="showXPModal = true"
        >
          Add XP
        </button>
      </Card>

      <div class="action-bar-wrapper">
        <div class="action-bar-left">
          <div
            v-if="['levelup'].includes(status)"
            class="item-action-bar experience-bar"
          >
            <button class="button item-action-bar" @click="showXPModal = true">
              Add XP
            </button>
            <span>XP: {{ this.characterData.experience }}</span>
          </div>
        </div>
        <div class="action-bar-middle"></div>

        <div class="action-bar-right">
          <button
            v-if="false"
            class="item-action-bar button button-white"
            v-on:click="() => {}"
          >
            Cancel
          </button>
          <button
            class="button item-action-bar"
            v-if="status === 'levelup'"
            @click="toggleSpendXpMode"
          >
            OK
          </button>
          <button
            v-if="status !== 'levelup'"
            class="button item-action-bar"
            v-on:click="saveClicked"
          >
            Save
          </button>
        </div>
      </div>

      <XPModal
        v-if="showXPModal"
        @close="showXPModal = false"
        @newXP="handleNewXP"
      />
    </form>
    <ExpandableSection v-if="showWIP" label="JSON Export">
      <!-- TODO Use same import/export functionality as for char list -->
      <pre>{{ JSON.stringify(characterData, null, 2) }}</pre>
    </ExpandableSection>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~Style/colors.less";

.appearance-section {
  flex: 1 1 45%;
}

.flex-col-half {
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.character_creator {
  margin-bottom: 20vh;
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
  display: flex;
  overflow: auto;
  width: 100%;
  position: sticky;
  bottom: 0;
  overflow: hidden;
  margin: 0 0.25rem;
  background: #fffe;
  border: solid ~"@{pastel-green}99" 2px;
  padding: 0.5rem;
  justify-content: space-around;
}

.action-bar {
  &-right {
    justify-self: flex-end;
    display: flex;
    flex: 1 1 33%;
    justify-content: flex-end;
  }
  &-left {
    justify-self: flex-start;
  }
  align-items: center;
}

.experience-bar {
  justify-self: flex-start;
  text-align: left;
  flex-grow: 1;
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
