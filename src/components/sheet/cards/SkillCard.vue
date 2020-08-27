<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { CharacterData, validateSkills } from "@/characterData"
import { getAgeType } from "@/age.ts"
import { Age } from "@/types.ts"

import SkillSelector from "@/components/SkillSelector.vue"
import Card from "@/components/Card.vue"

@Component({
  components: { SkillSelector, Card },
})
export class SkillCard extends Vue {
  @Prop({ required: true }) charData!: CharacterData
  @Prop({ default: true }) viewOnly!: boolean

  get isNew() {
    return this.charData.metadata.status === "new"
  }
  get ageType(): Age {
    return getAgeType(this.charData.age, this.charData.kin)
  }
  get skillsValid(): boolean {
    return validateSkills(this.charData)
  }
  get saveStateId() {
    if (this.charData.metadata.status !== "active") return ""
    return "card_skills"
  }
}

export default SkillCard
</script>

<template>
  <Card
    class="row-half"
    :title="$t('skills')"
    :valid="skillsValid"
    :noSign="!isNew"
    :saveStateId="saveStateId"
  >
    <SkillSelector
      :profession="charData.profession"
      :age="ageType"
      :skills="charData.skills"
      :charData="charData"
    />
  </Card>
</template>

<style lang="less" scoped></style>
