<script lang="ts">
// TODO: Split this up into smaller components
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import SvgIcon from "@/components/SvgIcon.vue"
import {
  ExpandableSection,
  EXPANDER_SLOT,
} from "@/components/ExpandableSection.vue"
import DiceInput from "@/components/dice/DiceInput.vue"
import DiceResult from "@/components/dice/DiceResult.vue"
import FLButton from "@/components/base/FLButton.vue"
import { getRandomIntInclusive } from "@/dice/diceUtil"
import { IDiceConfig } from "@/dice/diceTypes"
import { FLNumberInput } from "@/components/base/FLNumberInput.vue"

import { DiceProbability } from "@/components/dice/DiceProbability.vue"
import { capitalize } from "@/util/util"
import { DiceConfSummary } from "src/components/diceRoller/DiceConfSummary.vue"

enum DiceType {
  White,
  Red,
  Black,
  Green,
  Blue,
  Orange,
}

function successMap(val: number) {
  if (val < 6) return 0
  if (val >= 6 && val <= 7) {
    return 1
  } else if (val >= 8 && val <= 9) {
    return 2
  } else if (val >= 10 && val <= 11) {
    return 3
  }
  return 4
}

function diceResult(sides = 6) {
  return getRandomIntInclusive(1, sides)
}

function diceResults(nbrDice: number | null, sides = 6): number[] {
  let result: number[] = []
  if (!nbrDice) return result
  for (let i = 0; i < nbrDice; i++) {
    result.push(diceResult(sides))
  }
  return result
}

function sidesFor(diceType: DiceType): number {
  const map = {
    [DiceType.Green]: 8,
    [DiceType.Blue]: 10,
    [DiceType.Orange]: 12,
  }
  return (map as any)[diceType] || 6
}

function getNbrDice(
  white: number | null,
  red: number | null,
  black: number | null,
  green: number | null,
  blue: number | null,
  orange: number | null
): (number | null)[] {
  return [white, red, black, green, blue, orange]
}

function diceArrayToConf(dice: (number | null)[]): IDiceConfig {
  return {
    white: dice[0],
    red: dice[1],
    black: dice[2],
    green: dice[3],
    blue: dice[4],
    orange: dice[5],
  }
}

@Component({
  components: {
    DiceInput,
    DiceProbability,
    DiceResult,
    ExpandableSection,
    FLButton,
    FLNumberInput,
    SvgIcon,
    DiceConfSummary,
  },
})
export class DiceRollerCombat extends Vue {
  // FIXME: Take an IDiceConfig instead of individual values
  @Prop({ default: null }) white!: number
  @Prop({ default: null }) red!: number
  @Prop({ default: null }) black!: number
  @Prop({ default: null }) green!: number
  @Prop({ default: null }) blue!: number
  @Prop({ default: null }) orange!: number
  @Prop({ default: true }) showReset!: boolean
  @Prop({ default: undefined }) willpower!: number | undefined | null
  @Prop({ default: false }) isDwarf!: boolean
  @Prop({ default: false }) infinityPush!: boolean
  @Prop({ default: false }) showButtonBar!: boolean // remove?

  EXPANDER_SLOT = EXPANDER_SLOT

  @Watch("black", { immediate: true })
  setBlack() {
    this.nbrDice = [
      this.white,
      this.red,
      this.black,
      this.green,
      this.blue,
      this.orange,
    ]
  }

  DiceType = DiceType

  nbrDice: (number | null)[] = getNbrDice(
    this.white,
    this.red,
    this.black,
    this.green,
    this.blue,
    this.orange
  )

  rollResult: number[][] = [
    /* Address by enum number */
  ]
  rollResultLog: number[][][] = []

  accumulator = (sum: number, value: number | null) => sum + Number(value)

  created() {
    this.$emit("rollCb", this.rollDice)
    this.$emit("pushCb", this.pushRoll)
    this.$emit("resetCb", this.resetDice)
    this.$emit("pushDisabled", this.pushDisabled)
  }

  get showWillpower() {
    return this.willpower !== null && Number(this.willpower) >= 2
  }

  get conf(): IDiceConfig {
    return diceArrayToConf(this.nbrDice)
  }

  get totals() {
    const rolls = this.rollResultLog[0]

    if (!rolls) return []
    const t = rolls.map((rolls, diceType) => {
      const success = rolls
        .map((value) => successMap(value))
        .filter((val) => val > 0)
        .reduce((sum: number, value: number) => sum + value, 0)
      const fails = [DiceType.White, DiceType.Black].includes(diceType)
        ? rolls.filter((val) => val <= 1).length
        : 0
      return { success, fails }
    })
    return t
  }

  get totalSuccess() {
    return this.totals.map((item) => item.success).reduce(this.accumulator, 0)
  }

  get totalWhiteSkulls() {
    return this.totals.length > 0 && this.totals[0] ? this.totals[0].fails : ""
  }

  get totalBlackSkulls() {
    return this.totals.length > 0 && this.totals[2] ? this.totals[2].fails : ""
  }

  get pushed() {
    return this.rollResultLog.length >= 2
  }

  get rolled() {
    return this.rollResultLog.length >= 1
  }

  get pushDisabled(): boolean {
    if (this.rolled && !this.pushed) {
      return false // can always push at least once after a roll
    }
    if (this.rolled && this.infinityPush) {
      return false // for dice roller not coupled with character
    }
    if (this.rolled && this.willpower === undefined) {
      return false // undefined WP will allow indefinite pushes after a roll
    }
    if (this.rolled && this.isDwarf && this.willpower) {
      return false // a dwarf with willpower kan keep pushing
    }
    return true
  }

  get rollDisabled() {
    return this.nbrDice.reduce(this.accumulator, 0) < 1
  }

  pushRoll() {
    if (this.pushed && this.isDwarf && this.willpower) {
      this.handleWillpower(this.willpower - 1)
    }

    const newRolls = this.rollResult.map((results, index) => {
      return results.map((result) => {
        if (
          (result === 1 && [DiceType.White, DiceType.Black].includes(index)) ||
          result >= 6
        ) {
          return result // Don't reroll 6's; or 1's for White and Black dice
        }
        return diceResult()
      })
    })
    this.rollResult = newRolls
    this.rollResultLog.unshift(this.rollResult)
    const refRollResult = this.$refs.rollResults as any
    this.$nextTick(() => {
      refRollResult.scrollTop = refRollResult.scrollHeight
    })
    const summary = {
      whiteSkulls: this.totalWhiteSkulls,
      blackSkulls: this.totalBlackSkulls,
      success: this.totalSuccess,
    }
    this.$emit("result", summary)
    this.$emit("pushDisabled", this.pushDisabled)
  }

  rollDice() {
    this.rollResultLog = []
    this.rollResult = this.nbrDice.map((nbrDice, diceType) => {
      const sides = sidesFor(diceType)
      return diceResults(nbrDice, sidesFor(diceType))
    })
    this.rollResultLog.push(this.rollResult)
    const summary = {
      success: this.totalSuccess,
    }
    this.$emit("result", summary)
    this.$emit("pushDisabled", this.pushDisabled)
  }

  resetDice() {
    this.nbrDice = getNbrDice(
      this.white,
      this.red,
      this.black,
      this.green,
      this.blue,
      this.orange
    )
    this.rollResult = []
    this.rollResultLog = []
    this.$emit("pushDisabled", this.pushDisabled)
  }

  handleWillpower(value: any) {
    this.$emit("wp-update", value)
  }

  get basicDice() {
    return [
      { color: "white", type: DiceType.White },
      { color: "red", type: DiceType.Red },
      { color: "black", type: DiceType.Black },
    ]
  }

  get artifactDice() {
    return [
      { color: "green", type: DiceType.Green },
      { color: "blue", type: DiceType.Blue },
      { color: "orange", type: DiceType.Orange },
    ]
  }

  get probabilityStr() {
    return capitalize(this.$t("probability") as string)
  }
}

export default DiceRollerCombat

// FIXME: Split this up into separate components
</script>

<template>
  <div class="dice-roller-view" ref="rollResults">
    <ExpandableSection :defaultOpen="true" saveStateId="dice-input">
      <div :slot="EXPANDER_SLOT.header_center" style="font-size: 1rem;">
        Dice
      </div>

      <div :slot="EXPANDER_SLOT.header_right" style="font-size: 1rem;">
        <DiceConfSummary :diceConf="conf" />
      </div>
      <div class="dice-input-contents">
        <div class="dice-inputs">
          <DiceInput
            v-for="dice in basicDice"
            :key="dice.color"
            :color="dice.color"
            v-model.number="nbrDice[dice.type]"
            :rollCb="rollDice"
            :pushCb="pushRoll"
          />
          <DiceInput
            v-for="dice in artifactDice"
            :key="dice.color"
            :color="dice.color"
            v-model.number="nbrDice[dice.type]"
            :rollCb="rollDice"
            :pushCb="pushRoll"
          />
        </div>
      </div>
    </ExpandableSection>

    <!-- Probability -->
    <ExpandableSection :defaultOpen="false" saveStateId="probability-calc">
      <div slot="header" style="font-size: 1rem;">{{ probabilityStr }}</div>
      <DiceProbability :conf="conf" />
    </ExpandableSection>

    <!-- Result summary -->
    <ExpandableSection
      v-if="totals.length"
      :defaultOpen="true"
      saveStateId="dice-input"
    >
      <div :slot="EXPANDER_SLOT.header_center" style="font-size: 1rem;">
        Results
      </div>
      <div :slot="EXPANDER_SLOT.header_right" style="font-size: 1rem;">
        <div v-if="totals.length > 0" class="result-summary">
          <div :class="['result-summary-item', pushed ? '' : 'transparent']">
            <pre>{{ totalWhiteSkulls }}</pre>
            <SvgIcon name="skulls-1-inverted" class="dice-icon-small" />
          </div>
          <div :class="['result-summary-item', pushed ? '' : 'transparent']">
            <pre>{{ totalBlackSkulls }}</pre>
            <SvgIcon name="skulls-1" class="dice-icon-small dice-black" />
          </div>
          <div class="result-summary-item">
            <pre>{{ totalSuccess }}</pre>
            <SvgIcon name="swords-1-inverted" class="dice-icon-small" />
          </div>
        </div>
      </div>

      <!-- Roll result -->
      <div class="roll-results">
        <div
          v-for="(rolls, index) in rollResultLog"
          v-bind:key="index"
          :class="['roll-result', index !== 0 ? 'transparent' : '']"
        >
          <DiceResult color="white" :rolls="rolls[DiceType.White]" />
          <DiceResult color="red" :rolls="rolls[DiceType.Red]" />
          <DiceResult color="black" :rolls="rolls[DiceType.Black]" />
          <DiceResult color="green" :rolls="rolls[DiceType.Green]" />
          <DiceResult color="blue" :rolls="rolls[DiceType.Blue]" />
          <DiceResult color="orange" :rolls="rolls[DiceType.Orange]" />
        </div>
      </div>
    </ExpandableSection>
  </div>
</template>

<style scoped lang="less">
@import "~Style/colors.less";
.dice-icon {
  height: 3rem;
  width: 3rem;
  &-small {
    height: 2rem;
    width: 2rem;
  }
}

.dice-roller-view {
  text-align: center;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;

  .button-bar {
    flex-shrink: 0;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.3rem;
    position: sticky;
    bottom: 0;
  }
  .navbar-bottom::-webkit-scrollbar {
    display: none;
  }
}

// .dice-input-contents {
//   // padding: 0 1rem;
// }

.roll-result {
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.roll-results {
  // overflow-y: auto;
  flex-grow: 1;
  margin: 0.5rem;
}

.transparent {
  * > {
    opacity: 0.3;
  }
}

.result-summary-item {
  font-size: 2rem;
  display: flex;
  justify-content: baseline;
  align-items: center;
}

.result-summary {
  color: @color-text;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  pre {
    margin: 0;
    margin-left: 10px;
  }
}

.dice-inputs {
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr 1fr 1fr;
  grid-auto-flow: column;
  grid-row-gap: 0.5rem;
  grid-column-gap: 2rem;
  margin: 1rem auto;
}

.wp-input {
  // margin: 1rem auto;
  // display: inline-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  position: sticky;
  bottom: 0px;
  border-top: 1px solid #33333333;
  background: white;
  label {
    font-size: 1.5rem;
    margin-right: 10px;
  }
}
</style>
