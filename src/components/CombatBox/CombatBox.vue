<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

import { RollArmorButton } from "./RollArmorButton.vue"
import { FLNumberInput } from "@/components/base/FLNumberInput.vue"
import FLButton from "@/components/base/FLButton.vue"
import { CharData } from "@/data/character/characterData"
import { CombatActionBox } from "./CombatActionBox.vue"
import { FLCheckbox } from "src/components/base/FLCheckbox.vue"

@Component({
  components: {
    CombatActionBox,
    FLButton,
    FLCheckbox,
    FLNumberInput,
    RollArmorButton,
  },
})
export class Combat extends Vue {
  @Prop({ required: true }) charData!: CharData

  round = 0

  modalOpen = false
  monsterOpponent = false

  initiative: null | number = null
  fastActionPerformed = false
  slowActionPerformed = false

  created() {
    const storedInitiative = Number(sessionStorage.getItem("combat-initiative"))
    if (storedInitiative) {
      this.initiative = storedInitiative
    }
  }

  setInitiative(value: number) {
    this.initiative = Number(value)
    sessionStorage.setItem("combat-initiative", String(value))
  }

  nextRound() {
    this.fastActionPerformed = false
    this.slowActionPerformed = false
    this.round++
  }
}

export default Combat
</script>

<template>
  <div class="fl-combat">
    <section class="details-top">
      <FLNumberInput
        :label="$t('initiative')"
        id="initiative"
        min="1"
        max="10"
        :value="initiative"
        @input="setInitiative"
      />

      <FLNumberInput
        :label="$t('Willpower')"
        id="initiative"
        min="0"
        max="10"
        v-model.number="charData.willpower"
      />
    </section>

    <CombatActionBox
      :charData="charData"
      :fastActionDone="fastActionPerformed"
      :slowActionDone="slowActionPerformed"
      :monsterOpponent="monsterOpponent"
      :round="round"
    />

    <section class="setup-grid">
      <FLCheckbox
        :label="$t('combat-action-fast-performed')"
        :labelPosition="'right'"
        v-model="fastActionPerformed"
      />
      <FLCheckbox
        :label="$t('combat-action-slow-performed')"
        :labelPosition="'right'"
        v-model="slowActionPerformed"
      />
      <FLCheckbox
        :label="$t('fighting monster')"
        :labelPosition="'right'"
        v-model="monsterOpponent"
      />
    </section>

    <div class="next-round">
      <RollArmorButton :charData="charData" />
      <FLButton class="capitalize-first" @click="nextRound">
        {{ $t("next round") }}
      </FLButton>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "~Style/colors.less";

.details-top {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  max-width: 400px;
  grid-gap: 1rem;
}

.fl-combat {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: left;
  max-width: 500px;
}

.grid {
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 2fr 2fr auto auto;
  align-items: center;
  row-gap: 1rem;
  column-gap: 1rem;
}

.grid-head {
  display: contents;
}

.grid-row {
  grid-column-start: 1;
  grid-column-end: -1;
}

.grid-aside {
  margin-top: -0.9rem;
}

.bold {
  font-weight: bold;
}
.center {
  text-align: center;
}
.no-padding {
  padding: unset;
}

.button-margin {
  margin-top: 2em;
}

.next-round {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.red {
  color: @color-danger;
}

.setup-grid {
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-gap: 0.5rem;
  align-items: center;
}
</style>
