<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import SvgIcon from "@/components/SvgIcon.vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import NumberInput from "@/components/FLNumberInput.vue"

const SKULL = "☠"
const SWORDS = "⚔"

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
    ExpandableSection,
    NumberInput,
    SvgIcon,
  },
})
export default class DiceView extends Vue {
  DiceType = DiceType
  SKULL = SKULL
  SWORDS = SWORDS

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

  // TODO Remove?
  // get currentRolls() {
  //   return this.rollResultLog.slice(-1)[0]
  // }
  accumulator = (sum: number, value: number) => sum + value

  get totals() {
    const rolls = this.rollResultLog.slice(-1)[0]
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
    // return this.totals[2].fails
  }

  // get totalFailure() {
  //   return this.totals.map((item) => item.fails).reduce(this.accumulator, 0)
  // }

  get rollResultLogReverse() {
    return [...this.rollResultLog.reverse()]
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
    // this.nbrDice = []
    // Vue.set(this, "nbrDice", [])
    this.$set(this, "nbrDice", [])
    this.rollResult = []
    this.rollResultLog = []
  }
}
</script>

<template>
  <div class="dice-view">
    <div class="content">
      <ExpandableSection label="Base Dice" :expanded="true">
        <div class="dice-inputs">
          <div class="dice-input">
            <label for="white-input" class="dice-label white">
              <SvgIcon
                name="d6-6-inverted"
                title="d6-white"
                class="dice-icon"
              />
            </label>
            <NumberInput
              id="white-input"
              v-model.number="nbrDice[DiceType.White]"
              :num="nbrDice[DiceType.White]"
              :min="0"
              :enterCb="rollDice"
              :ctrlEnterCb="pushRoll"
            />
          </div>
          <div class="dice-input">
            <label for="red-input" class="dice-label">
              <SvgIcon name="d6-6" title="d6-red" class="dice-icon dice-red" />
            </label>
            <NumberInput
              id="red-input"
              :num="nbrDice[DiceType.Red]"
              v-model.number="nbrDice[DiceType.Red]"
              :min="0"
              :enterCb="rollDice"
              :ctrlEnterCb="pushRoll"
            />
          </div>
          <div class="dice-input">
            <label for="black-input" class="dice-label">
              <SvgIcon
                name="d6-6"
                title="d6-red"
                class="dice-icon dice-black"
              />
            </label>
            <NumberInput
              id="black-input"
              :num="nbrDice[DiceType.Black]"
              v-model.number="nbrDice[DiceType.Black]"
              :min="0"
              :enterCb="rollDice"
              :ctrlEnterCb="pushRoll"
            />
          </div>
        </div>
      </ExpandableSection>
      <ExpandableSection label="Artifact Dice">
        <div class="dice-inputs">
          <div class="dice-input">
            <label for="green-input" class="dice-label">
              <SvgIcon
                name="d8"
                title="d8-green"
                class="dice-icon dice-green"
              />
            </label>
            <NumberInput
              id="green-input"
              :num="nbrDice[DiceType.Green]"
              v-model.number="nbrDice[DiceType.Green]"
              :min="0"
              :enterCb="rollDice"
              :ctrlEnterCb="pushRoll"
            />
          </div>
          <div class="dice-input">
            <label for="blue-input" class="dice-label">
              <SvgIcon
                name="d10"
                title="d10-blue"
                class="dice-icon dice-blue"
              />
            </label>
            <NumberInput
              id="blue-input"
              :num="nbrDice[DiceType.Blue]"
              v-model.number="nbrDice[DiceType.Blue]"
              :min="0"
              :enterCb="rollDice"
              :ctrlEnterCb="pushRoll"
            />
          </div>
          <div class="dice-input">
            <label for="orange-input" class="dice-label">
              <SvgIcon
                name="d12"
                title="d12-orange"
                class="dice-icon dice-orange"
              />
            </label>
            <NumberInput
              id="orange-input"
              :num="nbrDice[DiceType.Orange]"
              v-model.number="nbrDice[DiceType.Orange]"
              :min="0"
              :enterCb="rollDice"
              :ctrlEnterCb="pushRoll"
            />
          </div>
        </div>
      </ExpandableSection>
      <div
        v-for="(rolls, index) in rollResultLog"
        v-bind:key="index"
        :class="[
          'roll-result',
          index !== rollResultLog.length - 1 ? 'roll-result-old' : '',
        ]"
      >
        <span>
          <span
            v-for="(result, index) in rolls[DiceType.White]"
            v-bind:key="'whites' + index"
          >
            <SvgIcon
              v-if="result === 1"
              name="skulls-1-inverted"
              class="dice-icon"
            />
            <SvgIcon
              v-else-if="result === 6"
              name="swords-1-inverted"
              class="dice-icon"
            />
            <SvgIcon v-else :name="`d6-${result}-inverted`" class="dice-icon" />
          </span>
        </span>
        <span>
          <span
            v-for="(result, index) in rolls[DiceType.Red]"
            v-bind:key="'reds' + index"
          >
            <SvgIcon
              v-if="result === 6"
              name="swords-1"
              class="dice-icon dice-red"
            />
            <SvgIcon v-else :name="'d6-' + result" class="dice-icon dice-red" />
          </span>
        </span>
        <span>
          <span
            v-for="(result, index) in rolls[DiceType.Black]"
            v-bind:key="'blacks' + index"
          >
            <SvgIcon
              v-if="result === 1"
              name="skulls-1"
              class="dice-icon dice-black"
            />
            <SvgIcon
              v-else-if="result === 6"
              name="swords-1"
              class="dice-icon dice-black"
            />
            <SvgIcon
              v-else
              :name="'d6-' + result"
              class="dice-icon dice-black"
            />
          </span>
        </span>
        <span>
          <span
            v-for="(result, index) in rolls[DiceType.Green]"
            v-bind:key="'greens' + index"
            class="dice-green"
          >
            <SvgIcon
              v-if="result >= 6"
              :name="'swords-' + result"
              class="dice-icon dice-green"
            />
            <SvgIcon
              v-else
              :name="'d6-' + result"
              class="dice-icon dice-green"
            />
          </span>
        </span>
        <span>
          <span
            v-for="(result, index) in rolls[DiceType.Blue]"
            v-bind:key="'blues' + index"
          >
            <SvgIcon
              v-if="result >= 6"
              :name="'swords-' + result"
              class="dice-icon dice-blue"
            />
            <SvgIcon
              v-else
              :name="'d6-' + result"
              class="dice-icon dice-blue"
            />
          </span>
        </span>
        <span>
          <span
            v-for="(result, index) in rolls[DiceType.Orange]"
            v-bind:key="'oranges' + index"
          >
            <SvgIcon
              v-if="result >= 6"
              :name="'swords-' + result"
              class="dice-icon dice-orange"
            />
            <SvgIcon
              v-else
              :name="'d6-' + result"
              class="dice-icon dice-orange"
            />
          </span>
        </span>
      </div>
      <div v-if="totals.length > 0" class="result-box">
        <div class="result-summary">
          <pre>{{ totalWhiteSkulls }}</pre>
          <SvgIcon name="skulls-1-inverted" class="dice-icon" />
        </div>
        <div class="result-summary">
          <pre>{{ totalBlackSkulls }}</pre>
          <SvgIcon name="skulls-1" class="dice-icon dice-black" />
        </div>
        <div class="result-summary">
          <pre>{{ totalSuccess }}</pre>
          <SvgIcon name="swords-1-inverted" class="dice-icon" />
        </div>
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
.dice {
  &-white {
    color: white;
  }
  &-black {
    color: black;
  }
  &-red {
    color: red;
  }
  &-green {
    color: green;
    // background: white;
  }
  &-blue {
    color: blue;
    // background: yellow;
  }
  &-orange {
    color: orange;
    // background: black;
  }
  &-icon,
  &-label {
    height: 3rem;
    width: 3rem;
  }
}

// .dice-label {
//   height: 3rem;
// }

.dice-view {
  display: flex;
  flex-direction: column;
  // min-height: 80vh;
  min-height: 100vh;
}

.roll-result {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.roll-result-old {
  * > {
    opacity: 0.7;
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

.dice-nbr-input {
  width: 3rem;
}

.dice-input {
  display: flex;
  flex: 1 1 30%;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    justify-content: flex-start;
  }
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
</style>
