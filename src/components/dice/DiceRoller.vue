<script lang="ts">
// TODO: Split this up into smaller components
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import SvgIcon from "@/components/SvgIcon.vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import NumberInput from "@/components/FLNumberInput.vue"
import DiceInput from "@/components/dice/DiceInput.vue"
import DiceResult from "@/components/dice/DiceResult.vue"

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

function getRandomIntInclusive(min: number, max: number) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
  min = Math.ceil(min)
  max = Math.floor(max)
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min
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

@Component({
  components: {
    DiceInput,
    DiceResult,
    ExpandableSection,
    NumberInput,
    SvgIcon,
  },
})
export default class DiceRoller extends Vue {
  DiceType = DiceType

  showLog = false
  numberInputValue = 0

  nbrDice: (number | null)[] = [
    /* Address by enum number */
    3,
    2,
    1,
    null,
    null,
    null,
  ]
  rollResult: number[][] = [
    /* Address by enum number */
  ]
  rollResultLog: number[][][] = []

  accumulator = (sum: number, value: number) => sum + value

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
    this.rollResultLog.unshift(this.rollResult)
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
    this.$set(this, "nbrDice", [])
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
    <div class="content">
      <ExpandableSection :label="$t('Basic dice')" :defaultOpen="true">
        <div class="dice-inputs">
          <DiceInput
            v-for="dice in basicDice"
            :key="dice.color"
            :color="dice.color"
            v-model="nbrDice[dice.type]"
            :rollCb="rollDice"
            :pushCb="pushRoll"
          />
        </div>
      </ExpandableSection>

      <ExpandableSection :label="$t('Artifact dice')">
        <div class="dice-inputs">
          <DiceInput
            v-for="dice in artifactDice"
            :key="dice.color"
            :color="dice.color"
            v-model="nbrDice[dice.type]"
            :rollCb="rollDice"
            :pushCb="pushRoll"
          />
        </div>
      </ExpandableSection>

      <!-- Result summary -->
      <div v-if="totals.length > 0" class="result-box">
        <div :class="['result-summary', pushed ? '' : 'transparent']">
          <pre>{{ totalWhiteSkulls }}</pre>
          <SvgIcon name="skulls-1-inverted" class="dice-icon" />
        </div>
        <div :class="['result-summary', pushed ? '' : 'transparent']">
          <pre>{{ totalBlackSkulls }}</pre>
          <SvgIcon name="skulls-1" class="dice-icon dice-black" />
        </div>
        <div class="result-summary">
          <pre>{{ totalSuccess }}</pre>
          <SvgIcon name="swords-1-inverted" class="dice-icon" />
        </div>
      </div>

      <!-- Roll result -->
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

    <div class="navbar navbar-bottom">
      <button class="button button-white" @click="resetDice">
        {{ $t("Reset") }}
      </button>
      <button class="button" @click="pushRoll">{{ $t("Push") }}</button>
      <button class="button" @click="rollDice">{{ $t("Roll dice") }}</button>
    </div>
  </div>
</template>

<style scoped lang="less">
.dice-icon {
  height: 3rem;
  width: 3rem;
}

.dice-view {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.roll-result {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.transparent {
  * > {
    opacity: 0.3;
  }
}

.result-summary {
  // font-size: calc(2.3rem - 1.1vmin);
  font-size: 2.5rem;
  display: flex;
  justify-content: baseline;
  align-items: center;
}

.result-box {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.content {
  flex-grow: 2;
}

.dice-inputs {
  display: flex;
  flex-wrap: wrap;
}

.navbar-bottom {
  overflow-x: scroll;
  scrollbar-width: none;
  > button {
    margin: 0 0.24rem;
  }
}
.navbar-bottom::-webkit-scrollbar {
  display: none;
}
</style>
