<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { CharData } from "@/data/character/characterData"

import {
  ExpandableSection,
  EXPANDER_SLOT,
} from "@/components/ExpandableSection.vue"
import { FLSelect, Option } from "@/components/base/FLSelect.vue"
import { FLNumberInput } from "@/components/base/FLNumberInput.vue"
import { IconButton } from "@/components/base/IconButton.vue"
import { CombatConfig } from "@/components/dice/combat/CombatConfig.vue"
import { ACTION_FAST, ACTION_ALL } from "@/data/combat/typesCombat"
import { TSkillId } from "@/types"

import {
  convertLogToConfig,
  diceLogAttributes,
  diceLogBonus,
  diceLogCombat,
  diceLogItem,
  diceLogSkill,
} from "@/dice/diceConfigurator"
import { IDiceConfig, TDiceConfigLog } from "@/dice/diceTypes"
import { Item } from "@/data/items/itemTypes"

@Component({
  components: {
    CombatConfig,
    ExpandableSection,
    FLSelect,
    FLNumberInput,
    IconButton,
  },
})
export class DiceCombat extends Vue {
  @Prop({ default: null }) charData!: CharData
  @Prop({ default: "" }) actionId!: ACTION_ALL | ""
  @Prop({ default: "" }) skillId!: TSkillId | ""
  @Prop({ default: "" }) itemId!: string

  SLOT = EXPANDER_SLOT

  diceLog: TDiceConfigLog | null = null
  diceConfig: IDiceConfig | null = null
  mBonus: number = 0
  mAction: ACTION_ALL | "" = ""
  mItemName: string = ""
  mOpponent: string = ""
  mSkillId: TSkillId | "" = ""

  onClickPush() {}
  onClickRoll() {}
  onClickReset() {}

  onConfigUpdate(config: {
    action: ACTION_ALL
    item: Item | undefined
    monster: boolean
    skill: TSkillId | undefined
    bonus: number
  }) {
    this.mBonus = config.bonus
    this.mAction = config.action
    this.mItemName = config.item?.name || ""
    this.mOpponent = config.monster ? "monster" : ""
    this.mSkillId = config.skill || ""

    const log = [
      diceLogBonus(config.bonus),
      diceLogAttributes(this.charData, config.skill),
      diceLogSkill(this.charData, config.skill),
      diceLogItem(config.item),
      diceLogCombat(this.charData, config.action, config.item, config.monster),
    ].flat()
    const diceConf = convertLogToConfig(log)
    this.diceLog = log
    this.diceConfig = diceConf
    this.$emit("dice-config", diceConf)
    // console.log("config summary", JSON.stringify(config, null, 2))
    // console.log("diceLog", JSON.stringify(log, null, 2))
    // console.log("diceConf", JSON.stringify(diceConf, null, 2))
  }
  created() {
    const item = this.charData.gear.inventory.find((i) => i.id === this.itemId)
    this.onConfigUpdate({
      action: this.actionId,
      item,
      monster: false,
      skill: this.skillId || undefined,
      bonus: 0,
    })
  }
}

export default DiceCombat
</script>

<template>
  <div class="dice-roller">
    <ExpandableSection saveStateId="combat-config" :defaultOpen="true">
      <template :slot="SLOT.header_center">
        <!-- <div class="small-fonts">Setup</div> -->
        <div class="small-fonts setup-summary">
          <div>
            <span class="small-caps">Bonus {{ mBonus }}</span>
          </div>
          <div>
            <span class="small-caps">{{ $t(mAction) }}</span>
          </div>
          <div>
            <span class="small-caps">{{ $t(mSkillId) }}</span>
          </div>
          <div>
            <span class="small-caps max-len">{{ mItemName }}</span>
          </div>
          <div>
            <span class="small-caps">
              {{ mOpponent ? "vs " + $t(mOpponent) : "" }}
            </span>
          </div>
        </div>
      </template>
      <CombatConfig
        :charData="charData"
        :actionId="actionId"
        :skillId="skillId"
        :itemId="itemId"
        @update="onConfigUpdate"
        class="padding"
      />
    </ExpandableSection>

    <ExpandableSection saveStateId="dice-log" :defaultOpen="true">
      <template :slot="SLOT.header_center">
        <div class="small-fonts">Modifiers</div>
      </template>

      <pre>{{ JSON.stringify(diceLog, null, 2) }}</pre>
    </ExpandableSection>

    <!-- FIXME: Setup missing sections -->
    <ExpandableSection
      v-if="false"
      label="Dice"
      class="small-fonts"
      :iconRightOK="true"
    >
      <template :slot="SLOT.header_center">
        <div class="small-fonts">Dice</div>
        <div>
          3⚀ 2⚀
        </div>
      </template>
      <template :slot="SLOT.header_right">
        <div>
          <IconButton icon="rolling-dices" @click.stop="onClickRoll" />
          <IconButton icon="plus_one" @click.stop="onClickPush" />
        </div>
      </template>

      <pre>{{ JSON.stringify(diceConfig, null, 2) }}</pre>
      <IconButton color="danger" icon="restore" @click.stop="onClickReset">
        <span>{{ $t("Reset") }}</span>
      </IconButton>
      <!-- Add summary of dice config in header, buttons for [roll], [push] &
        [reset], and general dice configurator here -->

      <ExpandableSection v-if="$DEBUG">
        <template :slot="SLOT.header_center">
          <div class="small-fonts capitalize">{{ $t("probability") }}</div>
        </template>

        <div>
          Make font much smaller and add dice probabilities based on dice config
          here
        </div>
      </ExpandableSection>
    </ExpandableSection>

    <ExpandableSection v-if="$DEBUG">
      <template v-slot:header>
        <div class="small-fonts">Result</div>
      </template>

      <template v-slot:icon-right>
        3⚀ 2⚀
      </template>

      <div>
        Add summary of dice roll result (if dice have been rolled) in header,
        and details inside here
      </div>
      <div>
        3⚀ 2⚀ 3⚀ 2⚀ 3⚀ 2⚀ 3⚀ 2⚀
      </div>
    </ExpandableSection>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.dice-roller {
  text-align: left;
}

.select {
  display: inline-block;
}

.inline-block {
  display: inline-block;
}

.small-fonts {
  font-size: 0.9rem;
}

.log-item {
  .inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.expander-wrapper {
  border: 1px solid #0003;
}

.padding {
  margin: 0 2rem;
}

.setup-summary {
  display: grid;
  grid-template-columns: auto auto auto;
  display: flex;
  flex-wrap: wrap;
  div > {
    margin-right: 0.5em;
  }
}
</style>
