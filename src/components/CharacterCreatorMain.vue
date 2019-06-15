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
import { getSkills, SkillMap } from "@/skills"
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
import Vue from "vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import XPModal from "@/components/XPModal.vue"
import ModalSpendXP from "@/components/ModalSpendXP.vue"
import Conditions from "@/components/Conditions.vue"
import FLNumberInput from "@/components/FLNumberInput.vue"

function stringChar(characterData: CharacterData) {
  return JSON.stringify(characterData)
}

const CharacterCreatorMain = Vue.extend({
  name: "CharacterCreatorForm",
  components: {
    AttributesSelector,
    BaseSelector,
    Card,
    Conditions,
    ExpandableSection,
    FlavorSelector,
    FLNumberInput,
    GearPicker,
    ModalSpendXP,
    PicturePicker,
    SkillSelector,
    TalentSelector,
    XPModal,
  },
  props: ["charId"],
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
        this.$characterStore.characterById(this.charId) ||
        getNewCharacterData(),
      showJSON: false,
      showXPModal: false,
      showSpendXPModal: false,
      characterDataCopy: "", // used to track if char data has changed or not
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
    talentSum(): number {
      const sum = (acc: number, number: number) => Number(acc) + Number(number)
      return this.characterData.talents
        .map((talent) => talent.rank || 0)
        .reduce(sum, 0)
    },
    charDataUpdated(): boolean {
      return stringChar(this.characterData) !== this.characterDataCopy
    },
  },
  methods: {
    saveClicked(event: any) {
      if (!event || !this.characterData.name) return
      this.$characterStore.addCharacter(this.characterData)
      if (this.status === "new") {
        this.$router.push("/character-list")
      }
      this.characterDataCopy = stringChar(this.characterData)
    },
    updateBase(character: CharacterData) {
      this.characterData.ageType = character.ageType
    },
    updateAttributes(attributes: any) {
      this.$set(this.characterData, "attributes", attributes)
    },
    updateTalents(talents: CharacterTalent[]) {
      this.$set(this.characterData, "talents", talents)
    },
    updateSkills(skills: SkillMap) {
      this.$set(this.characterData, "skills", skills)
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
    handleNewCharData(charData: CharacterData) {
      this.updateTalents(charData.talents)
      this.updateSkills(charData.skills)
      this.characterData.experience = charData.experience
      this.characterData.reputation = charData.reputation
    },
    checkForm(event: any) {
      // TODO: Run applicable validation
      event.preventDefault()
    },
  },
  mounted() {
    this.characterDataCopy = stringChar(this.characterData)
  },
})
export default CharacterCreatorMain
</script>

<template>
  <div class="character_creator">
    <div v-if="showWIP" class="wip-bar">
      <div>updated: {{ charDataUpdated }}</div>
      <span>Status: {{ this.status }}</span>
      <button @click="updateStatus('new')">New</button>
      <button @click="updateStatus('freeEdit')">Free</button>
      <button @click="updateStatus('active')">Active</button>
      <button @click="updateStatus('levelup')">Level-up</button>
      <div>WP: {{ characterData.willpower }}</div>
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
        :noSign="baseDataValid && attributesValid && status !== 'new'"
      >
        <BaseSelector :data="characterData" @basedata-updated="updateBase" />

        <div class="base-data-sub">
          <div>
            <h4>{{ $t("Attributes") }}</h4>
            <AttributesSelector
              :charData="characterData"
              @attributes-updated="updateAttributes"
            />
          </div>
          <div v-if="showWIP && status !== 'new'">
            <h4>{{ $t("Conditions") }}</h4>
            <Conditions
              :conditions="this.characterData.conditions || {}"
              v-model="characterData.conditions"
            />
          </div>
        </div>
      </Card>

      <Card class="row-half" :noSign="true">
        <div class="flex-row-wrap space-around appearance-section">
          <PicturePicker
            :portrait="characterData.portrait"
            @pickedPicture="setImgSource"
          />
        </div>
      </Card>

      <Card class="row-full" :noSign="true">
        <FlavorSelector class="flex-col-half" :data="characterData" />
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

      <Card
        class="row-half"
        :title="$t('talents')"
        :valid="talentsValid"
        :noSign="characterData.metadata.status != 'new'"
      >
        <TalentSelector
          :key="talentSum"
          class="content"
          :charData="characterData"
          @talents-updated="updateTalents"
        />

        <div
          v-if="showWIP && status != 'new'"
          class="willpower flex-row-wrap space-around"
        >
          <label for="willpower">
            Willpower
          </label>
          <FLNumberInput
            id="willpower"
            fontSize="1.2rem"
            min="0"
            max="10"
            v-model="characterData.willpower"
          />
        </div>
      </Card>

      <Card class="row-full" :title="$t('Gear')" :noSign="true">
        <GearPicker :characterData="characterData" />
      </Card>

      <Card v-if="showWIP" class="row-half" :title="$t('Mount')" :noSign="true">
      </Card>

      <Card
        v-if="showWIP && status === 'active'"
        class="row-half"
        :title="$t('Pre/post session')"
        :noSign="true"
      >
        <div v-if="showWIP" class="flex-row-wrap space-around">
          <button class="button spacing" @click="showXPModal = true">
            {{ $t("Add XP/Reputation") }}
          </button>
          <button class="button spacing" @click="showSpendXPModal = true">
            {{ $t("Spend XP") }}
          </button>
        </div>
      </Card>

      <Card class="row-full" :title="$t('Notes')" :noSign="true">
        <textarea
          v-model="characterData.notes"
          rows="10"
          style="width: 100%"
        ></textarea>
      </Card>

      <XPModal
        v-if="showXPModal"
        :charData="characterData"
        @close="showXPModal = false"
        @updated-chardata="handleNewCharData"
      />

      <ModalSpendXP
        v-if="showSpendXPModal"
        :charData="characterData"
        @close="showSpendXPModal = false"
        @updated-chardata="handleNewCharData"
      />
    </form>

    <div class="action-bar-wrapper">
      <div class="action-bar-left">
        <button
          class="item-action-bar button button-white"
          v-on:click="() => {}"
        >
          Cancel
        </button>
      </div>
      <div class="action-bar-middle"></div>

      <div class="action-bar-right">
        <button
          v-if="status !== 'levelup'"
          :class="[
            'button',
            charDataUpdated ? '' : 'button-white',
            'item-action-bar',
          ]"
          v-on:click="saveClicked"
        >
          {{ status === "new" ? $t("Save & Close") : $t("Save") }}
        </button>
      </div>
    </div>
    <ExpandableSection v-if="showWIP" label="JSON Export">
      <!-- TODO Use same import/export functionality as for char list -->
      <pre>{{ JSON.stringify(characterData, null, 2) }}</pre>
    </ExpandableSection>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~Style/colors.less";

.action-bar-wrapper {
  display: flex;
  overflow: auto;
  // width: 100%;
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

.appearance-section {
  flex: 1 1 45%;
}

.base-data-sub {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.character_creator {
  margin-bottom: 20vh;
  width: 100%;
}

.character_creator-form {
  width: 100%;
  margin: auto;
  row-gap: 0.5rem;
  // column-gap: 0.5rem; // only seems to work in firefox
  // margin: 0 -0.25rem;
  margin-top: 1rem;

  display: flex;
  flex-wrap: wrap;
  flex: 1 1 40%;
  // align-items: stretch;
  justify-content: space-evenly;
  align-content: stretch;
}

.experience-bar {
  justify-self: flex-start;
  text-align: left;
  flex-grow: 1;
}

.flex-col-half {
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.row-full {
  flex-basis: 100%;
  flex-grow: 2;
}

.row-half {
  flex-basis: 40%;
  flex-grow: 1;
}

.spacing {
  margin: 1rem;
}

.willpower {
  align-items: center;
  max-width: 50%;
  margin: 1rem auto;
}

.wip-bar {
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
  position: sticky;
  top: 0;
  background: white;
  z-index: 200;
  border: solid;
  padding: 1rem;
}
</style>
