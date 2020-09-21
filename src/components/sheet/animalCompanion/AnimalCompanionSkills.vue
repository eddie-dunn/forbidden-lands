<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import FLButton from "@/components/base/FLButton.vue"
import FLSelect, { Option } from "@/components/base/FLSelect.vue"
import IconButton from "@/components/base/IconButton.vue"
import ModalConfirm from "@/components/ModalConfirm.vue"

import { CharacterData } from "@/characterData"
import { SKILLS, SkillObj } from "@/skills.ts"
import { Skill } from "@/types.ts"

import AnimalCompanionSkillInput, {
  skillInputRanks,
} from "./AnimalCompanionSkillInput.vue"

/** Component for managing animal companion skills */
@Component({
  components: {
    FLButton,
    FLSelect,
    IconButton,
    ModalConfirm,
    AnimalCompanionSkillInput,
  },
})
export class AnimalCompanionSkills extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  adding = false
  editing: Skill | null = null
  skillInputRanks = skillInputRanks
  showConfirmDelete = false
  skillToRemove = ""

  addSkill({ skillId, rank }: { skillId: Skill; rank: number }) {
    this.adding = false
    const updatedSkill: SkillObj = { ...SKILLS[skillId], rank }

    const skillToUpdate = this.charData.animalCompanion.skills.find(
      (o) => o.id === skillId
    )
    if (!skillToUpdate) {
      this.charData.animalCompanion.skills.push(updatedSkill)
    } else {
      const index = this.charData.animalCompanion.skills.indexOf(skillToUpdate)
      this.charData.animalCompanion.skills[index] = updatedSkill
    }
  }

  askRemoveSkill(id: string) {
    this.skillToRemove = id
    this.showConfirmDelete = true
  }

  removeSkill(id: string) {
    this.charData.animalCompanion.skills = this.charData.animalCompanion.skills.filter(
      (skill) => skill.id !== id
    )
    this.showConfirmDelete = false
  }
}

export default AnimalCompanionSkills
</script>

<template>
  <div>
    <!-- spacer -->
    <h4 class="capitalize">
      {{ $t("skills") }}
    </h4>

    <div class="skill-display">
      <div
        v-for="(skill, index) in charData.animalCompanion.skills"
        v-bind:key="skill.name"
        class="skill-display-row"
      >
        <span class="capitalize-first skill">{{ $t(skill.id) }}</span>
        <FLSelect
          :options="skillInputRanks"
          :value="skill.rank"
          v-model="charData.animalCompanion.skills[index].rank"
          :disabled="viewOnly"
          class="rank-select"
        />
        <IconButton
          class="skill-display-delete-row"
          title="Remove"
          icon="delete"
          color="danger"
          :disabled="viewOnly"
          @click="askRemoveSkill(skill.id)"
        />
      </div>
    </div>

    <section class="add-section">
      <AnimalCompanionSkillInput
        v-if="adding"
        :filterSkills="charData.animalCompanion.skills"
        @adding-done="addSkill"
        @adding-cancel="adding = false"
      />
      <IconButton
        v-if="!adding"
        icon="add"
        color="main"
        @click="adding = true"
        :disabled="viewOnly"
      >
        {{ $t("Add") }}
      </IconButton>
    </section>

    <ModalConfirm
      v-if="showConfirmDelete"
      :showTitle="false"
      :body="$t('Delete') + ' ' + $t(skillToRemove) + '?'"
      :confirmAction="() => removeSkill(skillToRemove)"
      @close="showConfirmDelete = false"
    />
    <!-- spacer -->
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

h4 {
  margin: 0;
  margin-bottom: 0.5rem;
}

.skill-display {
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  justify-content: start;
  grid-gap: 1rem;
  &-row {
    display: contents;
  }
  border-bottom: 1px #0002 solid;
  padding-bottom: 0.5rem;
}

.rank-select {
  margin: 0;
}

.add-section {
  margin-top: 0.25rem;
}
</style>
