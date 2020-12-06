<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

import { CharData } from "@/data/character/characterData"
import { ACTION_ALL, ICombatAction } from "@/data/combat/typesCombat.ts"
import SvgIcon from "@/components/SvgIcon.vue"
import IconButton from "@/components/base/IconButton.vue"
import { DiceModal } from "@/components/dice/combat/DiceModalCombat.vue"
import { GearCard } from "@/components/sheet/cards/GearCard.vue"
import { CombatActionRow } from "./CombatActionRow.vue"
import { TSkillId } from "@/types"

@Component({
  components: {
    CombatActionRow,
    DiceModal,
    GearCard,
    IconButton,
    SvgIcon,
  },
})
export class CombatActionBox extends Vue {
  @Prop({ required: true }) charData!: CharData
  @Prop({ required: true }) round!: number
  @Prop({ required: true }) fastActionDone!: boolean
  @Prop({ required: true }) slowActionDone!: boolean
  @Prop({ required: true }) monsterOpponent!: boolean

  modalOpen = false
  modalItemId = ""
  modalSkillId: TSkillId | "" = ""
  modalActionId: ACTION_ALL | "" = ""

  handleRoll(data: { action: ICombatAction; itemId: string }) {
    this.modalItemId = data.itemId
    this.modalSkillId = data.action.skill || ""
    this.modalActionId = data.action.id
    this.modalOpen = true
  }
}
export default CombatActionBox
</script>

<template>
  <div class="fl-combat">
    <section class="grid">
      <CombatActionRow
        type="fast"
        :round="round"
        :actionPerformed="fastActionDone"
        :charData="charData"
        @roll="handleRoll"
      />
      <CombatActionRow
        type="slow"
        :round="round"
        :actionPerformed="slowActionDone"
        :charData="charData"
        @roll="handleRoll"
      />
      <!-- end -->
    </section>

    <DiceModal
      v-if="modalOpen"
      @close="modalOpen = false"
      :charData="charData"
      :title="$t('combat')"
      :skillId="modalSkillId"
      :actionId="modalActionId"
      :itemId="modalItemId"
      :isMonster="monsterOpponent"
    />
  </div>
</template>

<style scoped lang="less">
@import "~Style/colors.less";

.grid {
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 2fr 2fr auto auto;
  align-items: center;
  row-gap: 1rem;
  column-gap: 1rem;
}
</style>
