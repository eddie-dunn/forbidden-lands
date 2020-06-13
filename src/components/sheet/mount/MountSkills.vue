<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import FLButton from "@/components/base/FLButton.vue"
import FLSelect, { Option } from "@/components/base/FLSelect.vue"
import IconButton from "@/components/base/IconButton.vue"

import { CharacterData } from "@/characterData"
import { SKILLS, SkillObj } from "@/skills.ts"

import MountSkillInput, { mountSkillInputRanks } from "./MountSkillInput.vue"
import { Skill } from "@/types.ts"

/**
Component for managing mount skills

To implement
- Add skill
- Remove skill
- Dice roll for skill

*/

@Component({
  components: {
    FLButton,
    FLSelect,
    IconButton,
    MountSkillInput,
  },
})
export default class MountSkills extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: false }) viewOnly!: boolean

  adding = false
  editing: Skill | null = null
  mountSkillInputRanks = mountSkillInputRanks

  addSkill({ skillId, rank }: { skillId: Skill; rank: number }) {
    this.adding = false
    const updatedSkill: SkillObj = { ...SKILLS[skillId], rank }

    const skillToUpdate = this.charData.mount.skills.find(
      (o) => o.id === skillId
    )
    if (!skillToUpdate) {
      this.charData.mount.skills.push(updatedSkill)
    } else {
      const index = this.charData.mount.skills.indexOf(skillToUpdate)
      this.charData.mount.skills[index] = updatedSkill
    }
  }

  removeSkill(id: string) {
    this.charData.mount.skills = this.charData.mount.skills.filter(
      (skill) => skill.id !== id
    )
  }
}
</script>

<template>
  <div>
    <!-- spacer -->
    <h4 class="capitalize">
      {{ $t("skills") }}
    </h4>

    <div class="skill-display">
      <div
        v-for="(skill, index) in charData.mount.skills"
        v-bind:key="skill.name"
        class="skill-display-row"
      >
        <span class="capitalize-first skill">{{ $t(skill.id) }}</span>
        <FLSelect
          :options="mountSkillInputRanks"
          :value="skill.rank"
          v-model="charData.mount.skills[index].rank"
          :disabled="viewOnly"
          class="rank-select"
        />
        <IconButton
          class="skill-display-delete-row"
          title="Remove"
          icon="delete"
          color="danger"
          :disabled="viewOnly"
          @click="removeSkill(skill.id)"
        />
      </div>
    </div>
    <!-- TODO: Add Edit button for existing skills -->

    <section class="add-section">
      <MountSkillInput
        v-if="adding"
        :filterSkills="charData.mount.skills"
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
  &-delete-row {
    margin-left: 2rem;
  }
}

.rank-select {
  margin: 0;
}

.add-section {
  margin-top: 1rem;
}
</style>
