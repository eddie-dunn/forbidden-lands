<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { Skill } from "@/types"
import { SKILLS, SkillObj } from "@/skills.ts"
import { capitalize } from "@/util/util.ts"

import FLButton from "@/components/base/FLButton.vue"
import IconButton from "@/components/base/IconButton.vue"

import { CharacterData } from "@/characterData"
import FLSelect, { Option } from "@/components/base/FLSelect.vue"

/**
Component for managing mount skills

To implement
- Add skill
- Remove skill
- Dice roll for skill

*/

export const ADDING_DONE = "adding-done"
export const CANCEL = "adding-cancel"
export const skillInputRanks: Option[] = [
  { id: "1", name: "1" },
  { id: "2", name: "2" },
  { id: "3", name: "3" },
  { id: "4", name: "4" },
  { id: "5", name: "5" },
]

function skillOptions(vm: any, filterSkills: SkillObj[]): Option[] {
  return Object.values(SKILLS)
    .filter((skill) => !filterSkills.map((s) => s.id).includes(skill.id))
    .map((s) => {
      return {
        id: s.id as string,
        name: capitalize(vm.$t(s.id) as string),
      }
    })
    .sort((a, b) => (a.name < b.name ? -1 : 1))
}

@Component({
  components: {
    FLButton,
    FLSelect,
    IconButton,
  },
})
export default class MountSkillInput extends Vue {
  @Prop({ default: () => [] }) filterSkills!: SkillObj[]

  skillOptions = skillOptions
  ranks = skillInputRanks
  skillId = null
  rank = 1

  emitAdd() {
    const data = { skillId: this.skillId, rank: this.rank }
    this.$emit(ADDING_DONE, data)
  }
  emitCancel() {
    this.$emit(CANCEL)
  }
}
</script>

<template>
  <div class="skill-input">
    <FLSelect
      :options="skillOptions(this, filterSkills)"
      v-model="skillId"
      class="select"
    />
    <FLSelect :options="ranks" v-model.number="rank" class="select" />
    <IconButton
      icon="close"
      class="button-edit button-cancel"
      color="danger"
      title="Cancel"
      @click="emitCancel"
    />
    <IconButton
      icon="check"
      color="main"
      class="button-edit"
      title="Add"
      @click="emitAdd"
      :disabled="!skillId || !skillId"
    />
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.skill-input {
  display: inline-grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 1rem;
}

.button-edit {
  padding: 0 0.5rem;
}

.select {
  margin: 0;
}
</style>
