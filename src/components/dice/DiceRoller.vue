<script lang="ts">
// TODO: Split this up into smaller components
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import SvgIcon from "@/components/SvgIcon.vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import NumberInput from "@/components/FLNumberInput.vue"
import DiceInput from "@/components/dice/DiceInput.vue"
import DiceResult from "@/components/dice/DiceResult.vue"
import FLButton from "@/components/base/FLButton.vue"
import { getRandomIntInclusive } from "@/dice/diceUtil"

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

@Component({
  components: {
    DiceInput,
    DiceResult,
    ExpandableSection,
    FLButton,
    NumberInput,
    SvgIcon,
  },
})
export default class DiceRoller extends Vue {
  @Prop({ default: 3 }) white!: number
  @Prop({ default: 2 }) red!: number
  @Prop({ default: 1 }) black!: number
  @Prop({ default: null }) green!: number
  @Prop({ default: null }) blue!: number
  @Prop({ default: null }) orange!: number
  @Prop({ default: true }) showReset!: boolean

  DiceType = DiceType

  // nbrDice: (number | null)[] = [
  //   /* Address by enum number */
  //   this.white,
  //   this.red,
  //   this.black,
  //   this.green,
  //   this.blue,
  //   this.orange,
  // ]
  nbrDice = getNbrDice(
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

  get totals() {
    const rolls = this.rollResultLog.slice(-1).pop()
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

  get pushDisabled() {
    return this.rollResultLog.length < 1
  }

  get rollDisabled() {
    return this.nbrDice.reduce(this.accumulator, 0) < 1
  }

  pushRoll() {
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
    this.rollResultLog.push(this.rollResult)
    const chatBox = this.$refs.rollResults as any
    this.$nextTick(() => {
      chatBox.scrollTop = chatBox.scrollHeight
    })
  }

  rollDice() {
    this.rollResultLog = []
    this.rollResult = this.nbrDice.map((nbrDice, diceType) => {
      const sides = sidesFor(diceType)
      return diceResults(nbrDice, sidesFor(diceType))
    })
    this.rollResultLog.push(this.rollResult)
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
}
</script>

<template>
  <div class="dice-view">
    <ExpandableSection
      v-if="false"
      :label="$t('Dice')"
      :defaultOpen="true"
      class="content"
    >
      <!-- Don't use for now -->
    </ExpandableSection>

    <div class="dice-inputs">
      <DiceInput
        v-for="dice in basicDice"
        :key="dice.color"
        :color="dice.color"
        v-model="nbrDice[dice.type]"
        :rollCb="rollDice"
        :pushCb="pushRoll"
      />
      <DiceInput
        v-for="dice in artifactDice"
        :key="dice.color"
        :color="dice.color"
        v-model="nbrDice[dice.type]"
        :rollCb="rollDice"
        :pushCb="pushRoll"
      />
    </div>

    <!-- Roll result -->
    <div class="roll-results" ref="rollResults">
      <div
        v-for="(rolls, index) in rollResultLog"
        v-bind:key="index"
        :class="[
          'roll-result',
          index !== rollResultLog.length - 1 ? 'transparent' : '',
        ]"
      >
        <DiceResult color="white" :rolls="rolls[DiceType.White]" />
        <DiceResult color="red" :rolls="rolls[DiceType.Red]" />
        <DiceResult color="black" :rolls="rolls[DiceType.Black]" />
        <DiceResult color="green" :rolls="rolls[DiceType.Green]" />
        <DiceResult color="blue" :rolls="rolls[DiceType.Blue]" />
        <DiceResult color="orange" :rolls="rolls[DiceType.Orange]" />
      </div>
    </div>

    <!-- Result summary -->
    <div v-if="totals.length > 0" class="result-summary">
      <div :class="['result-summary-item', pushed ? '' : 'transparent']">
        <pre>{{ totalWhiteSkulls }}</pre>
        <SvgIcon name="skulls-1-inverted" class="dice-icon" />
      </div>
      <div :class="['result-summary-item', pushed ? '' : 'transparent']">
        <pre>{{ totalBlackSkulls }}</pre>
        <SvgIcon name="skulls-1" class="dice-icon dice-black" />
      </div>
      <div class="result-summary-item">
        <pre>{{ totalSuccess }}</pre>
        <SvgIcon name="swords-1-inverted" class="dice-icon" />
      </div>
    </div>

    <div class="button-bar">
      <FLButton v-if="showReset" type="cancel" @click="resetDice">
        {{ $t("Reset") }}
      </FLButton>
      <FLButton v-else type="cancel" @click="$emit('close')">
        {{ $t("Close") }}
      </FLButton>
      <FLButton type="danger" @click="pushRoll" :disabled="pushDisabled">
        {{ $t("Push") }}
      </FLButton>
      <FLButton @click="rollDice" :disabled="rollDisabled">
        {{ $t("Roll dice") }}
      </FLButton>
    </div>
  </div>
</template>

<style scoped lang="less">
.dice-icon {
  height: 3rem;
  width: 3rem;
}

.dice-view {
  text-align: center;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .content {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden; // due to weird bug adding scrollbar to button-bar
  }

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

.roll-result {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.roll-results {
  height: 250px;
  overflow-y: auto;
  flex-grow: 1;
}

.transparent {
  * > {
    opacity: 0.3;
  }
}

.result-summary-item {
  font-size: 2.5rem;
  display: flex;
  justify-content: baseline;
  align-items: center;
}

.result-summary {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.dice-inputs {
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr 1fr 1fr;
  grid-auto-flow: column;
  grid-row-gap: 0.5rem;
  grid-column-gap: 2rem;
  margin: 0.5rem;
}
</style>
