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
// import { workerData } from "worker_threads" // ???

const CharacterCreatorMain = Vue.extend({
  name: "CharacterCreatorForm",
  components: {
    AttributesSelector,
    BaseSelector,
    Card,
    ExpandableSection,
    FlavorSelector,
    GearPicker,
    Modal,
    PicturePicker,
    SkillSelector,
    TalentSelector,
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
      if (event && this.characterData.name) {
        this.$characterStore.addCharacter(this.characterData)
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

      <div class="action-bar-wrapper">
        <div class="action-bar">
          <div
            v-if="['active', 'levelup'].includes(status)"
            class="item-action-bar experience-bar"
          >
            <span>XP: {{ this.characterData.experience }}</span>
            <button
              class="button item-action-bar"
              v-if="canToggleXpMode"
              @click="toggleSpendXpMode"
            >
              {{ status === "active" ? "Spend xp" : "Done" }}
            </button>
            <button
              class="button item-action-bar"
              v-if="status === 'active'"
              @click="showXPModal = true"
            >
              Add XP
            </button>
          </div>
          <button
            v-if="false"
            class="item-action-bar button-white"
            v-on:click="() => {}"
          >
            Delete
          </button>
          <button class="button item-action-bar" v-on:click="saveClicked">
            Save
          </button>
        </div>
      </div>
    </form>
    <Modal v-if="showXPModal" @close="showXPModal = false">
      <h2 slot="header">Calculate XP</h2>
      <div slot="body">
        Have you...
        <div>
          <input type="checkbox" />
          <span>Done this</span>
        </div>
        <div>
          <input type="checkbox" />
          <span>Done something else</span>
        </div>
      </div>
      <div class="modal-button-row" slot="footer">
        <button @click="showXPModal = false" class="button">
          {{ $t("Cancel") }}
        </button>
        <button @click="showXPModal = false" class="button">OK</button>
        <!-- TODO: Commit XP if OK is clicked -->
      </div>
    </Modal>
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

.item-action-bar {
  margin: 0.5rem;
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
  align-items: center;
  @media (max-width: 400px) {
    justify-content: space-around;
  }
  background: #fffe;
  border: solid ~"@{pastel-green}99" 2px;
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
