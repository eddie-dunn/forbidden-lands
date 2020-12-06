<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"

import { CharData } from "@/data/character/characterData"

import Card from "@/components/Card.vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import FLButton from "@/components/base/FLButton.vue"
import { Combat } from "@/components/CombatBox/CombatBox.vue"
import { DiceCombat } from "@/components/dice/combat/DiceCombat.vue"
import { ICombatAction, ACTION_ALL } from "@/data/combat/typesCombat"
import { TSkillId } from "@/types"

@Component({
  components: {
    Card,
    Combat,
    DiceCombat,
    FLButton,
    ExpandableSection,
  },
})
export class CardCombat extends Vue {
  @Prop({ required: true }) charData!: CharData
  @Prop({ default: false }) viewOnly!: boolean

  get status() {
    return this.charData.metadata.status
  }
  get saveStateId() {
    if (this.charData.metadata.status !== "active") return ""
    return "card_combat"
  }

  skillId: TSkillId | "" = ""
  actionId: ACTION_ALL | string | "" = ""
  itemId: string = ""
  iteration = 0

  handleRoll({ skill, id, item }: ICombatAction & { item: string }) {
    if (!skill || !id) return

    this.skillId = skill
    this.actionId = id
    this.itemId = item
    this.iteration += 1
  }
}
export default CardCombat
</script>

<template>
  <Card :title="$t('combat')" :noSign="true" :saveStateId="saveStateId">
    <Combat :charData="charData" @roll="handleRoll" />

    <!-- <DiceCombat
      :key="iteration"
      :charData="charData"
      :skillId="skillId"
      :actionId="actionId"
      :itemId="itemId"
    /> -->
  </Card>
</template>

<style lang="less" scoped>
.spacing {
  margin: 1rem;
}
</style>
